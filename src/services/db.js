// SQLITE IMPORTS
import { Plugins } from "@capacitor/core";
import { SQLiteConnection } from "@capacitor-community/sqlite";

const { CapacitorSQLite } = Plugins;

const sqlite = new SQLiteConnection(CapacitorSQLite);
let database;

export const initdb = async () => {
  try {
    database = await sqlite.createConnection(
      "capstone-db",
      false,
      "no-encryption",
      1
    );

    await database.open();

    // Create a table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        strand TEXT NOT NULL,
        id_number TEXT NOT NULL UNIQUE
      );
    `;
    await database.execute(createTableQuery);
    console.log('table created')

  } catch (e) {
    console.log('error')
    console.error("Database initialization failed:", e);
    return null;
  }
};

export const testDatabaseConnection = async () => {
  try {
    await database.open();
    console.log("Database connection is active.");
  } catch (e) {
    console.error("Failed to open database connection:", e);
  }
};


export const allStudents = async () => {
  const result = await database.query("SELECT * from students;");
  return result.values 
};

export const createStudent = async (name, strand, id_number) => {
  if (!database) {
    console.error("Database is not initialized.");
    return;
  }

  try {
    return await database.execute(
      "INSERT INTO students (name, strand, id_number) VALUES (?, ?, ?)",
      [name, strand, id_number]
    );
  } catch (e) {
    console.error("Failed to insert student:", e);
    throw e;
  }
};


