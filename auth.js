import md5 from "md5";
import { getUserByUsername, getUserByUsernameAndPassword } from "./repository.js";

export const handleLogin = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(403).json({ message: "username or password is required" });
    }

    // 2. Simple SQL injection pattern detection
    const sqliPattern = /('|--|;|=|OR|AND)/i;
    if (sqliPattern.test(username) || sqliPattern.test(password)) {
        console.warn("Potential SQL Injection Attempt:", { username, password });
        return res.status(403).json({ message: "Emergency!! The server is being attacked" });
    }

    const existedUser = await getUserByUsername(username);

    if (!existedUser) {
        return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = md5(password);

    if (existedUser.password !== hashedPassword) {
        return res.status(400).json({ message: "Wrong password" });
    }

    next(); // Login successful
};


export const handleLoginSQLInjection = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(403).json({ message: "username or password is required" });
    }

    const user = await getUserByUsernameAndPassword(username, password);

    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    req.user = user; // attach to request if needed
    
    next()
}