import { useLoaderData, useRouteLoaderData, useSearchParams, useSubmit } from "react-router-dom";
import SearchBar from "../components/UI/SearchBar";
import NewNoteInput, { postNewNote } from "../components/Notes/NewNoteInput";
import GridLayout from "../components/UI/GridLayout";
import Note, { deleteNote } from "../components/Notes/Note";
import { editNote } from "../components/Notes/NoteModal";
import { useEffect, useRef, useState } from "react";
import classes from '../components/Notes/Notes.module.css';
export default function NotesPage() {
  // const notes = useRouteLoaderData("goal")?.notes;
  const {notes} = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('')
  const timer = useRef();
  const submit = useSubmit()
  console.log(notes);
  useEffect(()=>{
    timer.current = setTimeout(()=>{
      // if(searchTerm.trim()!==''){
        let searchParams = new URLSearchParams();
        searchParams.append("q", searchTerm);
        submit(searchParams);
      // }
      
    },1000);
    return ()=>clearTimeout(timer.current)
  },[searchTerm])
  return (
    <section className={classes["notes-main"]}>
      <SearchBar className={classes["size"]} onChange={(e)=>{setSearchTerm(e.target.value)}}/>
      <NewNoteInput />
      {!notes.length && <p className={classes["backUp-text"]}>Add</p>}
      {notes.length > 0 && (
        <GridLayout>
          {notes.map((n) => (
            <Note key={n._id} n={n} />
          ))}
        </GridLayout>
      )}
    </section>
  );
}
export async function loader({params,request}) {
  const token = localStorage.getItem('token');

  const url = new URL(request.url);
  const { goalId } = params;
  const searchTerm = url.searchParams.get("q");
  console.log(searchTerm);
  const response = await fetch(`http://localhost:8080/goals/${goalId}/notes/search?q=${searchTerm}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log('searchData: ', data);
  
  return data;
}
export async function action({ params, request }) {
  const { goalId } = params;
  const date = new Date();
  let url = `http://localhost:8080/goals/${goalId}/notes`;
  console.log("id ", goalId);

  const token = localStorage.getItem("token");
  try {
    const formData = await request.formData();
    const actionType = formData.get("actionType");
    let data = {};
    if (actionType === "add") {
      url += `/new`;
      console.log(url);

      data = {
        title: formData.get("title"),
        text: formData.get("text"),
        // date
      };
      await postNewNote(url, data, token);
    } else if (actionType === "edit") {
      const noteId = formData.get("id");
      url += `/${noteId}`;
      console.log(url);

      data = {
        title: formData.get("title"),
        text: formData.get("text"),
      };
      await editNote(url, data, token);
    }else if(actionType === 'delete'){
      const noteId = formData.get("id");
      url += `/${noteId}`;
      await deleteNote(url, token)
    }
    return { success: true };
  } catch (err) {
    console.log(err);
    return null;
  }
}
