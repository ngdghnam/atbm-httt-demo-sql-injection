import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export const connection = knex({
    client: "mysql2",
    connection: {
        host: process.env.DB_HOST || "127.0.0.1",
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3307,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
});

export const createDatabase = async () => {
    const dbName = process.env.DB_NAME
    try {
      await connection.raw(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
      console.log(`>>> Database ${dbName} created or already exists`);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Database initialization failed: ${error.message}`);
      } else {
        throw new Error("Database initialization failed: Unknown error");
      }
    }
};

export const createUserTable = async () => {
    // Use parameterized query for database name
    await connection.raw(`USE ??`, [process.env.DB_NAME]);
    console.log(`>>> Access to ${process.env.DB_NAME} successful`);
    
    try {
        // Create users table if it doesn't exist
        await connection.raw(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        
        console.log('>>> Users table created successfully or already exists');
        
        // Optional: Insert some sample data if table is empty
        // const [rows] = await connection.raw('SELECT COUNT(*) as count FROM users');
        // if (rows[0].count === 0) {
        //     await connection.raw(`
        //         INSERT INTO users (username, email, password) VALUES 
        //         ('Hoai Nam', 'admin@example.com', 'hashed_password_here'),
        //         ('Quy Hai', 'user1@example.com', 'hashed_password_here'),
        //         ('testuser', 'test@example.com', 'hashed_password_here')
        //     `);
        //     console.log('>>> Sample users inserted');
        // }
        
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`User table creation failed: ${error.message}`);
        } else {
            throw new Error("User table creation failed: Unknown error");
        }
    }
};

export const checkConnection = async () => {
    try {
      await connection.raw("SELECT 1");
      console.log(">>> Database connected successfully!");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Database connection failed: ${error.message}`);
      } else {
        throw new Error("Database connection failed: Unknown error");
      }
    }
  };