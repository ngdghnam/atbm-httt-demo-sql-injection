import express from "express"
import { handleCreateUser, handleGetAllUsers } from "./controller.js"
import { handleLogin } from "./auth.js"

const router = express.Router()

router.post("/create-user", handleCreateUser)
router.post("/", handleLogin, handleGetAllUsers)

export default router