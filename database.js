import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('todo_app.db');

export default db;