import { SQLiteDatabase } from "react-native-sqlite-storage";
import { connectToDatabase, createTables } from "./database";

export const initDB = async (): Promise<SQLiteDatabase> => {
    const db = await connectToDatabase()
                await createTables(db)
    return db;
}