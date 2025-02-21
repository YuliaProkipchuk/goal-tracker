import classes from "../components/Notes/Notes.module.css";
import { useGetNoteByIdQuery } from "../features/notes/notesApiSlice";
export default function NotePage() {
  const { data: note } = useGetNoteByIdQuery();

  return (
    <>
      <section className={classes["note-section"]}>
        <h1>{note.title}</h1>
        <div className="" dangerouslySetInnerHTML={{ __html: note.body }}></div>
      </section>
    </>
  );
}
