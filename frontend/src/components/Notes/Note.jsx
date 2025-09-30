/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import classes from "./Notes.module.css";
import NoteModal from "./NoteModal";
import { useNavigate } from "react-router-dom";
import { useDeleteNoteMutation } from "../../features/notes/notesApiSlice";
export default function Note({ note }) {
  const [deleteNote] = useDeleteNoteMutation();
  const [isOpen, setIsOpen] = useState(false);

  const delRef = useRef(null);
  const editRef = useRef(null);

  const navigate = useNavigate();

  const date = new Date(note.date);

  function closeModal() {
    setIsOpen(false);
  }
  function openNote(e, id) {
    if (!e.target.id.includes("del") && !e.target.id.includes("edit")) {
      navigate(`${id}`);
    }
  }

  async function handleDelete(e) {
    e.stopPropagation();

    try {
      await deleteNote(note._id).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {isOpen && (
        <NoteModal closeModal={closeModal} openModal={isOpen} note={note} />
      )}

      <div className={classes.note} onClick={(e) => openNote(e, note._id)}>
        <div className={classes.del_btn} onClick={handleDelete} ref={delRef}>
          <i className="bi bi-trash3" id="delete"></i>
        </div>
        <div
          className={classes.edit_btn}
          onClick={() => {
            setIsOpen(true);
          }}
          ref={editRef}
          id="edit_btn"
        >
          <i className="bi bi-pencil" id="edit"></i>
        </div>
        {note.title && <p className={classes.noteTitle}>{note.title}</p>}
        <p
          dangerouslySetInnerHTML={{ __html: note.body }}
          className={classes.noteText}
          aria-multiline
          role="textbox"
        ></p>
        <span>{`${date.getDate()}.${
          date.getMonth() + 1
        }.${date.getFullYear()}  ${date.getHours()}:${
          date.getMinutes() < 10 ? "0" : ""
        }${date.getMinutes()}`}</span>
      </div>
    </>
  );
}
