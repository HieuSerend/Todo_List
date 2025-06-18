import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

enablePromise(true)

export const connectToDatabase = async () => {
  return openDatabase(
    { name: "todo.db", location: "default" },
    () => {},
    (error : any) => {
      console.error(error)
      throw Error("Could not connect to database")
    }
  )
}

export const createTables = async (db: SQLiteDatabase) => {
  const createTable = `CREATE TABLE IF NOT EXISTS todos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    title TEXT,
                    description TEXT,
                    deadline TEXT,
                    completed INTEGER DEFAULT 0)`
  try {
    await db.executeSql(createTable)
  } catch (error) {
    console.error(error)
    throw Error(`Failed to create tables, error code: 1`)
  }
}