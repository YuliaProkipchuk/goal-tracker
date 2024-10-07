import { useLoaderData } from "react-router-dom";
import classes from '../components/Notes/Notes.module.css';
export default function NotePage(){
    // console.log();
    const note = useLoaderData();
    console.log(note);
    
    return <>
    <section className={classes["note-section"]}>
        <h1>{note.title}</h1>
        <div className=""  dangerouslySetInnerHTML={{ __html: note.text }}></div>
    </section>
    </>
}
export async function loader({params}){
    const token = localStorage.getItem('token');
    const id = params.noteId;
    const response = await fetch(
      `http://localhost:8080/goals/${params.goalId}/notes/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
}