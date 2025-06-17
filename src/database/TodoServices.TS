import db from '../../database';

export interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
};

export const createTable = (): void => {
    db.transaction (
        tx => {
            tx.executeSql(`CREATE TABLE IF NOT EXITS todos
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                title TEXT,
                descriptions TEXT,
                complete INTEGER DEFAULT 0`
            )
        }
    )
}

