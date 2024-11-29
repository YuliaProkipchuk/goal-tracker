import { json, useLoaderData } from "react-router-dom";
import ToDoList from "../components/ToDo/ToDoList";
import Book from "../components/UI/Book";
import { createContext, useState } from "react";
import AsideMenu from "../components/AsideMenu/AsideMenu";

export const TodoDateContext = createContext();

export default function ToDoPage() {
  const loaderData = useLoaderData();

  const [currTodo, setCurrToDo] = useState(new Date());

  return (
    <TodoDateContext.Provider value={{ currTodo, setCurrToDo }}>
      <main className="todo-main">
        {loaderData ? <ToDoList /> : <p>Loading...</p>}
      </main>
    </TodoDateContext.Provider>
  );
}
export async function loader({ params }) {
  const token = localStorage.getItem("token");
 
    const response = await fetch(`http://localhost:8080/todo/${params.todoId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   if (!response.ok) {
        throw json({ message: 'Could not fetch to do' }, { status: 500 })
    }
    else {
        return response;
    }
}
