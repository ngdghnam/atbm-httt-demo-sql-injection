import express from "express"
import { handleCreateUser, handleGetAllUsers } from "./controller.js"
import { handleLogin, handleLoginSQLInjection } from "./auth.js"

const router = express.Router()

router.post("/create-user", handleCreateUser)
router.post("/normally", handleLogin, handleGetAllUsers)
router.post("/sql-injection", handleLoginSQLInjection, handleGetAllUsers)

export default router