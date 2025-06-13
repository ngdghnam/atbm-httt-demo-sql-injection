import md5 from "md5";
import { connection } from "./database.js"

const database = connection;

export const createUser = async (user) => {
    const createdUser = await database("users").insert(user)
    return createdUser
}

export const getAllUsers = async () => {
    const users = await database("users").select("*");
    return users;
}

export const getUserByUsername = async (username) => {
    const user = await database("users").where({ username }).first();
    return user;
};

export const getUserByUsernameAndPassword = async (username, password) => {
    const hashedPassword = md5(password);

    const rawQuery = `
        SELECT * FROM users 
        WHERE username = '${username}' 
        AND password = '${hashedPassword}'
    `;

    console.log(">>> Executing raw SQL:", rawQuery); // show dangerous query

    const result = await database.raw(rawQuery);
    return result.rows?.[0] || result[0]; // for PostgreSQL/MySQL
};