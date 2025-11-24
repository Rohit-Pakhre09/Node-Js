const RightContainer = () => {

    const trendingTopics = [
        { topic: "#ReactQuery", category: "Tech", tweets: "1.2K" },
        { topic: "Tailwind UI", category: "Design", tweets: "900" },
        { topic: "Next.js", category: "WebDev", tweets: "5K" },
    ];

    const suggestions = [
        { name: "Code Mentor", handle: "@CodeMentor", initials: "CM" },
        { name: "Design Lead", handle: "@DesignLead", initials: "DL" },
    ];

    return (
        <section className="min-h-full bg-white/50 rounded-xl w-80 p-5 flex flex-col gap-6 shadow-lg">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-extrabold mb-3 text-gray-800">What's happening</h3>

                <div className="flex flex-col gap-3">
                    {trendingTopics.map((item, index) => (
                        <div key={index} className="cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors">
                            <p className="text-xs text-gray-500">{item.category} · Trending</p>
                            <p className="font-bold text-gray-900 leading-tight">{item.topic}</p>
                            <p className="text-xs text-gray-500">{item.tweets} Tweets</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-extrabold mb-4 text-gray-800">Who to follow</h3>

                <div className="flex flex-col gap-4">
                    {suggestions.map((user, index) => (
                        <div key={index} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                                {/* Avatar */}
                                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                    {user.initials}
                                </div>
                                {/* User Info */}
                                <div>
                                    <p className="font-semibold text-sm text-gray-900 leading-tight">{user.name}</p>
                                    <p className="text-xs text-gray-600">{user.handle}</p>
                                </div>
                            </div>

                            {/* Follow Button */}
                            <button className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full hover:bg-gray-700 transition-colors shrink-0">
                                Follow
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-xs text-gray-400 mt-auto px-2">
                © 2025 Twitter Clone
            </p>
        </section>
    );
}

export default RightContainer;