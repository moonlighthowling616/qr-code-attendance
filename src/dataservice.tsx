// SQLITE IMPORTS
import { CapacitorSQLite } from "@capacitor-community/sqlite";
import { SQLiteConnection } from "@capacitor-community/sqlite";

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
      1,
      false // readonly argument
    );

    // Open the database
    await database.open();
    // REMOVING TABLES FOR TESTING
    // await database.execute("DROP TABLE IF EXISTS students;");
    // await database.execute("DROP TABLE IF EXISTS attendances;");
    // await database.execute("DROP TABLE IF EXISTS late_time;");

    // Create tables
    await database.execute(`
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY NOT NULL ,
        name TEXT NOT NULL,
        strand TEXT NOT NULL,
        id_number TEXT NOT NULL UNIQUE
      );
    `);

    await database.execute(`
      CREATE TABLE IF NOT EXISTS attendances (
        id INTEGER PRIMARY KEY NOT NULL ,
        student_id INTEGER NOT NULL,
        day DATE NOT NULL,
        time_in TIME NOT NULL,
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
      );
    `);

    await database.execute(`
      CREATE TABLE IF NOT EXISTS late_time (
        id INTEGER PRIMARY KEY NOT NULL,
        time TEXT DEFAULT '7:40 AM'
      );
    `);

    // await database.run(`
    //   INSERT OR IGNORE INTO late_time (time) VALUES ('7:40')
    // `);

    console.log("Database initialized successfully");
    return database;
  } catch (e) {
    console.error("Error initializing database:", e);
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
      "INSERT INTO students (name,strand, id_number) VALUES(?,?,?)",
      [name, strand, id_number]
    );
  } catch (err) {
    alert("err" + JSON.stringify(err));
    throw err;
  }
};

export const queryAllPresents = async () => {
  // open database
  await database.open();

  // query to get all of the contacts from database

  return database.query(`
    SELECT 
    attendances.id AS attendance_id,
    attendances.student_id,
    attendances.day,
    attendances.time_in,
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
    `);
};

export const createAttendance = async (studentId: any) => {
  try {
    const result = await database.query(
      "SELECT id FROM students WHERE id_number=?",
      [studentId]
    );

    if (!result.values.length) {
      throw new Error("Student not found");
    }

    const currentDate = new Date();
    const day = currentDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const timeIn = currentDate.toTimeString().split(" ")[0]; // Format: HH:MM:SS

    const existingAttendance = await database.query(
      "SELECT * FROM attendances WHERE student_id = ? AND day = ?",
      [result.values[0].id, day]
    );

    if (existingAttendance.values.length > 0) {
      return await database.run(
        `UPDATE attendances
         SET time_in = ?,
         WHERE student_id = ? AND day = ?`,
        [timeIn, result.values[0].id, day]
      );
    } else {
      return await database.run(
        `INSERT INTO attendances (student_id, day, time_in)
         VALUES (?, ?, ?)`,
        [result.values[0].id, day, timeIn]
      );
    }
  } catch (error) {
    console.error("Failed to create or update attendance record:", error);
    throw error;
  }
};

export const queryAllAbsents = async () => {
  // open database
  await database.open();

  // query to get all of the contacts from database

  return database.query(`
    SELECT students.id, students.name, students.strand, students.id_number
    FROM students
    LEFT JOIN attendances ON students.id = attendances.student_id AND attendances.day = DATE('now')
    WHERE attendances.id IS NULL;
    `);
};

export const filterPresentAttendances = async (date: any) => {
  return await database.query(
    `
    SELECT 
    attendances.id AS attendance_id,
    attendances.student_id,
    attendances.day,
    attendances.time_in,
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
        attendances.day = ?;  -- This gets the current date
  `,[date]
  );
};

export const filterAbsentAttendances = async (date: any) => {
  return await database.query(
    `
    SELECT students.id, students.name, students.strand, students.id_number
    FROM students
    LEFT JOIN attendances 
    ON students.id = attendances.student_id 
    AND attendances.day = ?
    WHERE attendances.id IS NULL;
  `,
  [date]
  );
};

export const setLateTime = async (time: string) => {
  try {
    if (!time) {
      throw new Error("Time cannot be null or undefined");
    }

      return await database.run(`
        INSERT INTO late_time (time) VALUES (?)
      `, [time]);
  } catch (err) {
    throw err;
  }
};

export const fetchLateTime = async () => {
  try {
    await database.open();
    return await database.query(`
      SELECT * FROM late_time
      ORDER BY id DESC
      LIMIT 1
    `);
  } catch (err) {
    throw err;
  }
};

const convertTo24Hour = (time: string): string => {
  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:00`;
};
