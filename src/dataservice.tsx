// SQLITE IMPORTS
import { Plugins } from "@capacitor/core";
import { SQLiteConnection } from "@capacitor-community/sqlite";

// JSON FILE WITH DATA
import jsonData from "./import-json.js";

const { CapacitorSQLite } = Plugins;

const mSQLite = new SQLiteConnection(CapacitorSQLite);
let database: any;

/**
 * load from json file initial content
 */
const loadJSON = async () => {
  return await mSQLite.importFromJson(JSON.stringify(jsonData));
};

/**
 * initialize database..
 */
export const initdb = async () => {
  try {
    database = await mSQLite.createConnection(
      "testdb",
      false,
      "no-encryption",
      1
    );

    // open the database
    await database.open();

    // Define and create the table
    await database.execute(`
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        strand TEXT NOT NULL,
        id_number TEXT NOT NULL UNIQUE
      );
    `);

    // Insert initial data
    // await database.execute(`
    //   INSERT INTO students (id, name, strand, id_number) VALUES
    //   (1, 'Hanni Pham', 'IOS-CUL', 'S23-4123'),
    //   (2, 'Danni', 'IOS-ICT', 'S23-4124'),
    //   (3, 'Haerin', 'IOS-CUL', 'S23-1244'),
    //   (4, 'Minji', 'IOS-CUL', 'S23-5131'),
    //   (5, 'Hyein', 'IOS-ICT', 'S23-4598')
    //   ON CONFLICT(id) DO NOTHING;
    // `);

    return database;
  } catch (e) {
    window.alert(JSON.stringify(e, null, 2));
    return null;
  }
};

/**
 * query all contacts from the database
 */
export const queryAllStudents = async () => {
  // open database
  await database.open();

  // query to get all of the contacts from database
  return database.query("SELECT * from students;");
};

/**
 *
 * @param studentId
 */
export const getStudentById = async (studentId: any) => {
  return await database.query("SELECT * FROM students WHERE id = ?;", [
    studentId + "",
  ]);
};

/**
 *
 * @param contactId
 */
export const deleteContactById = async (contactId: any) => {
  return await database.query("DELETE FROM contacts WHERE id = ?;", [
    contactId + "",
  ]);
};

/**
 *
 * @param   
 */
export const updateContactById = async (contactId: any, contactData: any) => {
  const { first_name, last_name, email } = contactData;
  return await database.query(
    "UPDATE contacts SET first_name=?, last_name=?, email=? WHERE id = ?;",
    [first_name, last_name, email, contactId + ""]
  );
};

/**
 *
 * @param studentData
 */
export const createStudent = async (studentData: any) => {
  try {
    const { name, strand, id_number } = studentData;
    return await database.run(
      "INSERT INTO students (name,strand,id_number) VALUES(?,?,?)",
      [name, strand, id_number]
    );
  } catch(err) {
    throw err;
  }
};