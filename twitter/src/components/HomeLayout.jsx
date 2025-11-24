import { useState, useEffect } from "react";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";
import axios from "axios";

const HomeLayout = () => {
    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("Guest");
    const [tweets, setTweets] = useState([]);
    const [error, setError] = useState("");
    const [editingTweetId, setEditingTweetId] = useState(null);
    const [editTweetText, setEditTweetText] = useState("");
    const [editUsernameText, setEditUsernameText] = useState("");

    const apiUrl = "http://localhost:3000/api/tweets/";
    const maxChar = 280;

    const fetchData = async () => {
        try {
            const res = await axios.get(apiUrl);
            setTweets(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    const formatDate = (isoString) => {
        if (!isoString) return "";
        const d = new Date(isoString);
        return d.toLocaleString();
    };

    const handleTitleChange = (e) => {
        const value = e.target.value;
        const length = value.length;

        if (length > maxChar) {
            setError(`Tweet too long! (${length}/${maxChar})`);
            return;
        }

        setError("");
        setTitle(value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleAddTweet = async () => {
        if (!title.trim() || !username.trim() || error) {
            setError(error || "Tweet content and Username cannot be empty!");
            return;
        }

        try {
            const newTweet = { tweet: title, username: username };
            await axios.post(apiUrl, newTweet);

            fetchData();
            setTitle("");
            setError("");
        } catch (error) {
            console.error("Add Tweet Error:", error);
            setError("Failed to add tweet. Check server connection.");
        }
    };

    const handleDeleteTweet = async (id) => {
        try {
            await axios.delete(`${apiUrl}${id}`);
            setTweets(tweets.filter((t) => t.id !== id));
        } catch (error) {
            console.error("Delete Tweet Error:", error);
            alert("Failed to delete tweet.");
        }
    };

    const handleEditClick = (tweet) => {
        setEditingTweetId(tweet.id);
        setEditTweetText(tweet.tweet);
        setEditUsernameText(tweet.username);
    };

    const handleUpdateTweet = async (id) => {
        if (!editTweetText.trim() || editTweetText.length > maxChar || !editUsernameText.trim()) return;

        try {
            const updatedData = {
                tweet: editTweetText,
                username: editUsernameText,
                isEdited: true,
            };

            await axios.patch(`${apiUrl}${id}`, updatedData);

            setEditingTweetId(null);
            setEditTweetText("");
            setEditUsernameText("");
            fetchData();

        } catch (error) {
            console.error("Update Tweet Error:", error.response ? error.response.data : error.message);
            alert("Failed to update tweet. Check console for server response details.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className="h-[700px] w-[1500px] p-5 bg-blue-200 rounded-2xl flex items-center justify-between gap-10">
            {/* Left Content */}
            <LeftContainer />

            {/* Center Content */}
            <section className="bg-neutral-50 h-full w-[800px] p-5 rounded-xl flex flex-col">
                <section className="flex flex-col gap-1">
                    {/* Title */}
                    <p className="font-bold text-5xl">Twitter</p>
                    <p className="pb-4 pt-2 italic font-light">Your Story Begins With a Tweet.</p>

                    <section className="flex items-start gap-3">

                        {/* Username Input */}
                        <div className="flex-initial w-1/4">
                            <input
                                className="border outline-0 px-2 py-2 w-full rounded-lg"
                                type="text"
                                onChange={handleUsernameChange}
                                value={username}
                                placeholder="Username"
                            />
                        </div>

                        {/* Tweet Input */}
                        <div className="flex-1 flex items-center gap-5">
                            <input
                                className="border outline-0 px-2 py-2 w-full rounded-lg"
                                type="text"
                                onChange={handleTitleChange}
                                value={title}
                                placeholder="What's on your mind?"
                            />
                            {/* Add Button */}
                            <button
                                className="bg-blue-300 p-2.5 rounded-lg flex items-center justify-center cursor-pointer shadow hover:bg-blue-400 transition-colors"
                                onClick={handleAddTweet}
                                disabled={!title.trim() || !username.trim() || !!error}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>
                        </div>
                    </section>

                    <p
                        className={`mt-1 text-sm px-2 ${error ? "text-red-500" : "text-gray-400"}`}
                    >
                        {error ? error : `${title.length}/${maxChar}`}
                    </p>
                    <hr className="opacity-10" />
                </section>

                {/* Tweets List */}
                <section className="flex-1 mt-5 overflow-y-auto">
                    <section className="flex flex-col gap-3">
                        {tweets.length === 0 ? (
                            <p className="text-sm text-gray-400">No tweets yet...</p>
                        ) : (
                            tweets.map((t) => (
                                <article
                                    key={t.id}
                                    className="flex gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
                                >
                                    {/* Initials */}
                                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                        {editingTweetId === t.id ? editUsernameText[0] : t.username && t.username[0]}
                                    </div>

                                    {/* Tweet content */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-sm">
                                                {editingTweetId === t.id ? editUsernameText : t.username}
                                            </p>

                                            {t.isEdited && (
                                                <span className="text-[10px] px-2 py-0.5 rounded-full border border-gray-200 text-gray-500">
                                                    Edited
                                                </span>
                                            )}

                                            <span className="ml-auto text-[10px] text-gray-400">
                                                {formatDate(t.createdAt)}
                                            </span>
                                        </div>

                                        {editingTweetId === t.id ? (
                                            <div className="flex flex-col gap-2 mt-1 pb-2">
                                                <input
                                                    className="border outline-0 px-2 py-1 w-full rounded-lg text-sm text-gray-800"
                                                    type="text"
                                                    value={editUsernameText}
                                                    onChange={(e) => setEditUsernameText(e.target.value)}
                                                    placeholder="Edit Username"
                                                />
                                                <textarea
                                                    className="border outline-0 px-2 py-1 w-full rounded-lg text-sm text-gray-800 resize-none"
                                                    value={editTweetText}
                                                    onChange={(e) => setEditTweetText(e.target.value)}
                                                    rows="3"
                                                />
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        className="text-gray-500 text-xs hover:text-gray-700 cursor-pointer"
                                                        onClick={() => setEditingTweetId(null)}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
                                                        onClick={() => handleUpdateTweet(t.id)}
                                                        disabled={editTweetText.length > maxChar || !editTweetText.trim() || !editUsernameText.trim()}
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="mt-1 text-sm text-gray-800">{t.tweet}</p>
                                        )}

                                        {t.updatedAt && (
                                            <p className="mt-1 text-[10px] text-gray-400">
                                                Updated: {formatDate(t.updatedAt)}
                                            </p>
                                        )}

                                        <div className="flex items-center justify-end gap-2">
                                            {/* Edit button */}
                                            <button
                                                className="text-blue-500 hover:text-blue-600 transition cursor-pointer disabled:opacity-50"
                                                onClick={() => handleEditClick(t)}
                                                disabled={editingTweetId !== null}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.8}
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.862 3.487a2.1 2.1 0 113.001 2.934L7.5 18.785l-4 1 1-4L16.862 3.487z"
                                                    />
                                                </svg>
                                            </button>

                                            {/* Delete button */}
                                            <button
                                                className="text-red-500 hover:text-red-600 transition cursor-pointer"
                                                onClick={() => handleDeleteTweet(t.id)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.8}
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9 13h6M6 7h12M10 7V5a1 1 0 011-1h2a1 1 0 011 1v2m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </section>
                </section>
            </section>

            {/* Right Content */}
            <RightContainer />
        </section>
    );
};

export default HomeLayout;