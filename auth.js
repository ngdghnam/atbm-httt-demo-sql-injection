import md5 from "md5";
import { getUserByUsername } from "./repository.js";

export const handleLogin = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(403).json({ message: "username or password is required" });
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
