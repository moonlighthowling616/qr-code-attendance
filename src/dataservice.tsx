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
    await database.execute(`
      INSERT INTO students (id, name, strand, id_number) VALUES
      (1, 'Hanni Pham', 'IOS-CUL', 'S23-4123'),
      (2, 'Danni', 'IOS-ICT', 'S23-4124'),
      (3, 'Haerin', 'IOS-CUL', 'S23-1244'),
      (4, 'Minji', 'IOS-CUL', 'S23-5131'),
      (5, 'Hyein', 'IOS-ICT', 'S23-4598')
      ON CONFLICT(id) DO NOTHING;
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
    
    console.log("Students inserted successfully");

    return database;
  } catch (e) {
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
    attendances.remarks as remark,
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

export const createAttendance = async (studentId: any) => {
  try {
    const result = await database.query('SELECT id FROM students WHERE id_number=?', [studentId]);

    if (!result.values.length) {
      throw new Error('Student not found');
    }

    // return alert(JSON.stringify(result))

    const currentDate = new Date();
    const day = currentDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const timeIn = currentDate.toTimeString().split(" ")[0]; // Format: HH:MM:SS

    const timeInObj = new Date(`1970-01-01T${timeIn}Z`);
    const eightAM = new Date("1970-01-01T08:00:00Z");
    const twelvePM = new Date("1970-01-01T12:00:00Z");

    let remarks = "ontime"; 
    if (timeInObj >= eightAM && timeInObj < twelvePM) {
      remarks = "late";
    } else if (timeInObj >= twelvePM) {
      remarks = "halfday";
    }

    const existingAttendance = await database.query(
      'SELECT * FROM attendances WHERE student_id = ? AND day = ?',
      [result.values[0].id, day]
    );

    if (existingAttendance.values.length > 0) {
      return await database.run(
        `UPDATE attendances
         SET time_in = ?, remarks = ?
         WHERE student_id = ? AND day = ?`,
        [timeIn, remarks, result.values[0].id, day]
      );
    } else {
      return await database.run(
        `INSERT INTO attendances (student_id, day, time_in, remarks)
         VALUES (?, ?, ?, ?)`,
        [result.values[0].id, day, timeIn, remarks]
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
    attendances.remarks as remark,
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