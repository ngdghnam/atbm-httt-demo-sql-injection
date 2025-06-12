import { createUser, getAllUsers } from "./repository.js"
import md5 from "md5"

export const handleCreateUser = async (req, res) => {    
    const {username, email, password} = req.body
    
    if (!username || !email || !password) {
        return res.status(400).json({message:"username or email or password is required"})
    }

    const hashedPassword = md5(password)

    const newUser = {username: username, email: email, password: hashedPassword} 

    await createUser(newUser)

    return res.status(200).json({user: newUser})
}

export const handleGetAllUsers = async (req, res) => {
    const users = await getAllUsers();
    return res.status(200).json({ users });
};