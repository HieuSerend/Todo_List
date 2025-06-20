import { SQLiteDatabase } from "react-native-sqlite-storage";


export interface Todo {
  id?: number;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
};

export const addTodo = async (db: SQLiteDatabase, todo: Todo) => {
  const insertQuery = `
   INSERT INTO todos (title, description, deadline, completed)
   VALUES (?, ?, ?, ?)
 `
  const values = [
    todo.title,
    todo.description,
    todo.deadline,
    todo.completed
  ]
  try {
    return db.executeSql(insertQuery, values)
  } catch (error) {
    console.error(error)
    throw Error("Failed to add todo")
  }
}

export const deleteTodo = async (db: SQLiteDatabase, id: number) => {
  const insertQuery = `
        DELETE FROM todos WHERE id = ?
    `
  const values = [id]
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

export const updateTodoStatus = async (db: SQLiteDatabase, completed: number, id: number) => {
  const insertQuery = `
        UPDATE todos SET completed = ? WHERE id = ?
    `
  const values = [
    completed,
    id,
  ]
  try {
    db.executeSql(insertQuery, values)
  } catch (error) {
    throw Error("Failed to update todo status")
  }
}

export const getTodos = async (db: SQLiteDatabase): Promise<Todo[]> => {
  const query = `
    SELECT * FROM todos ORDER BY deadline ASC
  `
  try {
    const todoList: Todo[] = []
    const results = await db.executeSql(query)
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

export const getDeadline = async (db: SQLiteDatabase, id: number) => {
  const insertQuery = `
    SELECT deadline FROM todos WHERE id = ?
  `
  const values = [id]
  try {
    const results = await db.executeSql(insertQuery, values)
    if (results && results[0] && results[0].rows.length > 0) {
      return results[0].rows.item(0)
    }
    return null
  } catch (error) {
    throw Error("Failed to get deadline")
  }
}

export const getTodoById = async (db: SQLiteDatabase, id: number) => {
  const insertQuery = `
    SELECT * FROM todos WHERE id = ?
  `
  const values = [id]
  try {
    const results = await db.executeSql(insertQuery, values)
    if (results && results[0] && results[0].rows.length > 0) {
      return results[0].rows.item(0)
    }
    return null
  } catch (error) {
    throw Error("Failed to get todo by id")
  }
}
