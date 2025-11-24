import express from "express";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// App instance
export const app = express();

// Data Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db = path.join(__dirname, "/data/tweets.json");

// Logs Directory
const logsDir = path.join(__dirname, "logs");

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const logsList = fs.createWriteStream(
    path.join(logsDir, "access.log"),
    { flags: "a" }
);

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("combined", { stream: logsList }));

// Custom Middleware
const validateTweet = (req, res, next) => {
    const { tweet } = req.body;

    if (tweet === undefined || tweet.trim() === "") {
        return res.status(400).json({ error: "Tweet cannot be empty" });
    }

    if (tweet.trim().length < 5) {
        return res
            .status(400)
            .json({ error: `Tweet must be at least 5 characters long` });
    }

    next();
};

// Default Port
app.get("/", (req, res) => {
    res
        .status(200)
        .send(
            "Twitter API is working, <a href='http://localhost:3000/api/tweets/'>Check http://localhost:3000/api/tweets/</a>"
        );
});

// Get All Data
app.get("/api/tweets", (req, res) => {
    try {
        fs.readFile(db, "utf-8", (err, data) => {
            if (err) return res.status(500).json({ err });
            res.status(200).json(JSON.parse(data));
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

// Search Query
app.get("/api/tweets/search", (req, res) => {
    const { q, username, tweet } = req.query;

    try {
        fs.readFile(db, "utf-8", (err, data) => {
            if (err) return res.status(500).json({ error: "Server Error" });

            let tweets = [];
            try {
                tweets = JSON.parse(data);
            } catch (e) {
                return res.status(500).json({ error: "Failed to parse tweets data" });
            }

            const query = q?.toLowerCase();
            const usernameQuery = username?.toLowerCase();
            const tweetQuery = tweet?.toLowerCase();

            const results = tweets.filter((t) => {
                const usernameMatch = usernameQuery
                    ? t.username.toLowerCase().includes(usernameQuery)
                    : true;

                const tweetMatch = tweetQuery
                    ? t.tweet.toLowerCase().includes(tweetQuery)
                    : true;

                const generalMatch = query
                    ? t.username.toLowerCase().includes(query) ||
                    t.tweet.toLowerCase().includes(query)
                    : true;

                return usernameMatch && tweetMatch && generalMatch;
            });

            res.status(200).json(results);
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

// Get by Id
app.get("/api/tweets/:id", (req, res) => {
    const { id } = req.params;

    try {
        fs.readFile(db, "utf-8", (err, data) => {
            if (err) return res.status(500).json({ err });

            let tweets = [];
            try {
                tweets = JSON.parse(data);
            } catch (err) {
                return res
                    .status(500)
                    .json({ err: "Failed to parse existing tweets data" });
            }

            const selectedObj = tweets.find((obj) => obj.id === Number(id));
            if (!selectedObj) {
                return res.status(404).json({ error: "Tweet not found" });
            }
            res.status(200).json(selectedObj);
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

// Post Method
app.post("/api/tweets", validateTweet, (req, res) => {
    const { username, tweet } = req.body;

    if (!username) {
        return res
            .status(400)
            .json({ err: "username should not be empty!" });
    }

    try {
        fs.readFile(db, "utf-8", (err, data) => {
            if (err) return res.status(500).json({ err });

            let tweets = [];
            try {
                tweets = JSON.parse(data);
            } catch (err) {
                return res
                    .status(500)
                    .json({ err: "Failed to parse existing tweets data" });
            }

            const newData = {
                id: Date.now(),
                username,
                tweet,
                isEdited: false,
                createdAt: new Date().toISOString(),
            };

            const exists = tweets.some(
                (t) => t.username === username && t.tweet === tweet
            );
            if (exists) {
                return res
                    .status(409)
                    .json({ error: "Same tweet already exists for this user!" });
            }

            tweets.push(newData);

            fs.writeFile(db, JSON.stringify(tweets, null, 2), "utf-8", (writeErr) => {
                if (writeErr) return res.status(500).json({ err: writeErr });

                res.status(201).json(newData);
            });
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

// Patch Method
app.patch(
    "/api/tweets/:id",
    (req, res, next) => {
        const { tweet } = req.body;

        if (tweet !== undefined) {
            return validateTweet(req, res, next);
        }

        next();
    },
    (req, res) => {
        const { id } = req.params;
        const { username, tweet } = req.body;

        if (username === undefined && tweet === undefined) {
            return res.status(400).json({
                error: "Provide at least one field to update: username or tweet",
            });
        }

        try {
            fs.readFile(db, "utf-8", (err, data) => {
                if (err)
                    return res
                        .status(500)
                        .json({ error: "There is some server error!" });

                let tweets = [];
                try {
                    tweets = JSON.parse(data);
                } catch (error) {
                    return res
                        .status(500)
                        .json({ error: "There is problem in parsing data!" });
                }

                const index = tweets.findIndex((obj) => obj.id === Number(id));

                if (index === -1) {
                    return res.status(404).json({ error: "Tweet not found" });
                }

                if (username !== undefined) {
                    tweets[index].username = username;
                }

                if (tweet !== undefined) {
                    tweets[index].tweet = tweet;
                }

                tweets[index].isEdited = true;
                tweets[index].updatedAt = new Date().toISOString();

                fs.writeFile(
                    db,
                    JSON.stringify(tweets, null, 2),
                    "utf-8",
                    (err) => {
                        if (err)
                            return res
                                .status(500)
                                .json({ error: "There is some server error!" });

                        res.status(200).json(tweets[index]);
                    }
                );
            });
        } catch (error) {
            return res
                .status(500)
                .json({ error: "There is some server error!" });
        }
    }
);

// Delete Method
app.delete("/api/tweets/:id", (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(500).json({ err: "Server Error" });

    try {
        fs.readFile(db, "utf-8", (err, data) => {
            if (err) return res.status(500).json({ err });

            let tweets = [];
            try {
                tweets = JSON.parse(data);
            } catch (error) {
                return res.status(500).json({ error: "Failed to parse tweets" });
            }

            const filteredTweets = tweets.filter(
                (obj) => obj.id !== Number(id)
            );

            fs.writeFile(
                db,
                JSON.stringify(filteredTweets, null, 2),
                "utf-8",
                (err) => {
                    if (err) return res.status(500).json({ err });

                    res.status(200).json(filteredTweets);
                }
            );
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
});