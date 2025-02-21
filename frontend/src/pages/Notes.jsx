import SearchBar from "../components/UI/SearchBar";
import NewNoteInput from "../components/Notes/NewNoteInput";
import GridLayout from "../components/UI/GridLayout";
import Note from "../components/Notes/Note";
import { useState } from "react";
import classes from "../components/Notes/Notes.module.css";
import { useGetNotesQuery } from "../features/notes/notesApiSlice";
export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: notes } = useGetNotesQuery(searchTerm);

  return (
    <section className={classes["notes-main"]}>
      <SearchBar
        className={classes["size"]}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <NewNoteInput />
      {!notes.length && <p className={classes["backUp-text"]}>Add</p>}
      {notes.length > 0 && (
        <GridLayout>
          {notes.map((note) => (
            <Note key={note._id} note={note} />
          ))}
        </GridLayout>
      )}
    </section>
  );
}
