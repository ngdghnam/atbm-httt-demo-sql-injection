import express from "express"
import { checkConnection, createDatabase, createUserTable } from "./database.js";
import router from "./userRoute.js";

const app = express()
const port = 3000

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
  res.send("Hello world")
})

createDatabase()
createUserTable()
checkConnection()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use("/user", router)