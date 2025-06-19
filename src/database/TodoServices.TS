import { SQLiteDatabase } from "react-native-sqlite-storage";


export interface Todo {
    id: number;
    title: string;
    description: string;
    deadline: string;
    completed: boolean;
};

export const addTodo = async (db: SQLiteDatabase, todo: Todo) => {
  const insertQuery = `
   INSERT INTO todos (title, description, deadline)
   VALUES (?, ?, ?)
 `
  const values = [
    todo.title,
    todo.description,
    todo.deadline,
  ]
  try {
    return db.executeSql(insertQuery, values)
  } catch (error) {
    console.error(error)
    throw Error("Failed to add todo")
  }
}

export const deleteTodo = async (db: SQLiteDatabase, todo: Todo) => {
    const insertQuery = `
        DELETE FROM todos WHERE id = ?
    `
    const values = [todo.id]
    try {
        return db.executeSql(insertQuery, values)
    } catch (error) {
        throw Error("Failed to delete todo")
    }
}

export const updateTodo = async (db: SQLiteDatabase, updatedTodo: Todo) => {
    const insertQuery = `
        UPDATE todos SET title = ?, description = ?, deadline = ?
        WHERE id = ?
    `
    const values = [
        updatedTodo.title,
        updatedTodo.description,
        updatedTodo.deadline,
        updatedTodo.id
    ]
    try {
        db.executeSql(insertQuery, values)
    } catch (error) {
        throw Error("Failed to update todo")
    }
}

export const updateTodoStatus = async (db: SQLiteDatabase, todo: Todo) => {
    const insertQuery = `
        UPDATE todos SET completed = ? WHERE id = ?
    `
    const values = [
        todo.completed,
        todo.id
    ]
    try {
        db.executeSql(insertQuery, values)
    } catch(error) {
        throw Error("Failed to update todo status")
    }
}

export const getTodos = async (db: SQLiteDatabase): Promise<Todo[]> => {
  try {
    const todoList: Todo[] = []
    const results = await db.executeSql("SELECT * FROM todos")
    results?.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        todoList.push(result.rows.item(index))
      }
    })
    return todoList
  } catch (error) {
    console.error(error)
    throw Error("Failed to get tasks from database")
  }
}

export const getDealine = async (db: SQLiteDatabase, todo: Todo) => {
  const insertQuery = `
    SELECT deadline FROM todos WHERE id = ?
  `
  const values = [todo.id]
  try {
    db.executeSql(insertQuery, values)
  } catch(error) {
    throw Error("Failed to get deadline")
  }
}
