import React, { createContext, useContext, useEffect, useState } from 'react';
import type { SQLiteDatabase } from 'react-native-sqlite-storage';
import { connectToDatabase, createTables } from './database';

const DatabaseContext = createContext<SQLiteDatabase | null>(null);

export const useDatabase = () => useContext(DatabaseContext);

export const initDB = async (): Promise<SQLiteDatabase> => {
    const db = await connectToDatabase()
                await createTables(db)
    return db;
}

export const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [db, setDb] = useState<SQLiteDatabase | null>(null);

  useEffect(() => {
    initDB().then(setDb).catch(console.error);
  }, []);

  if (!db) return null;

  return (
    <DatabaseContext.Provider value={db}>
      {children}
    </DatabaseContext.Provider>
  );
};