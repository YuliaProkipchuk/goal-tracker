import {useState } from "react";
import ToDoList from "../components/ToDo/ToDoList";
import { useGetTodoQuery } from "../features/todos/todoApiSlice";

export default function ToDoPage() {
  const [newDate, setNewDate] = useState(new Date());

  const { data, isError, isFetching } = useGetTodoQuery({
    year: newDate.getFullYear(),
    month: newDate.getMonth() + 1,
    day: newDate.getDate(),
  });
  if (isFetching) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  return (
    <main className="todo-main">
      <ToDoList tasks={data.tasks} newDate={newDate} setNewDate={setNewDate} />
    </main>
  );
}
