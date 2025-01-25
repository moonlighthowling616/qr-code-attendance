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

    await database.execute(`
      CREATE TABLE IF NOT EXISTS attendances (
        id INTEGER PRIMARY KEY NOT NULL,
        student_id INTEGER NOT NULL,
        day DATE NOT NULL,
        time_in TIME NOT NULL,
        remarks TEXT CHECK(remarks IN ('ontime', 'late', 'halfday')) DEFAULT 'ontime',
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
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
 * @param studentId
 */
export const deleteStudentById = async (studentId: any) => {
  return await database.query("DELETE FROM students WHERE id = ?;", [
    studentId + "",
  ]);
};

/**
 *
 * @param studentId, studentData
 */
export const updateStudentData = async (studentId: any, studentData: any) => {
  const { name, strand, id_number } = studentData;
  return await database.query(
    "UPDATE students SET name=?, strand=?, id_number=? WHERE id = ?;",
    [name, strand, id_number, studentId + ""]
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

export const queryAllPresents = async () => {
  // open database
  await database.open();

  // query to get all of the contacts from database

  return database.query( `
    SELECT 
    attendances.id AS attendance_id,
    attendances.student_id,
    attendances.day,
    attendances.time_in,
    attendances.remarks,
    students.id AS student_id,
    students.name AS student_name,
    students.strand AS student_strand,
    students.id_number AS student_id_number
    FROM 
        attendances
    JOIN 
        students 
    ON 
        attendances.student_id = students.id
    WHERE 
        attendances.day = DATE('now');  -- This gets the current date
    ` 
    );
};

export const createAttendance = async(studentId: any) => {
  try {
    const result = await database.query('SELECT id from students WHERE id_number=?', [studentId])
    // return alert(JSON.stringify(result));
    if (!result.values.length) {
      throw new Error('Student not found')
    }
    const currentDate = new Date();
    const day = currentDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const timeIn = currentDate.toTimeString().split(" ")[0]; // Format: HH:MM:SS

    return await database.run(
      `INSERT INTO attendances (student_id, day, time_in, remarks) 
       VALUES (?, ?, ?, ?)`,
      [result.values[0].id , day, timeIn, "ontime"] // Default remarks as 'ontime'
    );
  } catch (error) {
    console.error("Failed to create attendance record:", error);
    throw error;
  }
};

export const queryAllAbsents = async () => {
  // open database
  await database.open();

  // query to get all of the contacts from database

  return database.query( `
    SELECT students.id, students.name, students.strand, students.id_number
    FROM students
    LEFT JOIN attendances ON students.id = attendances.student_id AND attendances.day = DATE('now')
    WHERE attendances.id IS NULL;
    ` 
    );
};


export const filterPresentAttendances = async(date: any) => {
  return await database.query(`
    SELECT 
    attendances.id AS attendance_id,
    attendances.student_id,
    attendances.day,
    attendances.time_in,
    attendances.remarks,
    students.id AS student_id,
    students.name AS student_name,
    students.strand AS student_strand,
    students.id_number AS student_id_number
    FROM 
        attendances
    JOIN 
        students 
    ON 
        attendances.student_id = students.id
    WHERE 
        attendances.day = ?;
  `, [date])
}

export const filterAbsentAttendances = async(date: any) => {
  return await database.query(`
    SELECT students.id, students.name, students.strand, students.id_number
    FROM students
    LEFT JOIN attendances 
    ON students.id = attendances.student_id 
    AND attendances.day = ?
    WHERE attendances.id IS NULL;
  `, [date])
}