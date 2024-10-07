import { useRef, useState } from "react";
import classes from "./Notes.module.css";
import NoteModal from "./NoteModal";
import { useNavigate, useSubmit } from "react-router-dom";
export default function Note({ n }) {
  const submit = useSubmit();
  const [isOpen, setIsOpen] = useState(false);
  const delRef = useRef(null);
  const editRef = useRef(null);
  const navigate = useNavigate();
  const date = new Date(n.date);
  // console.log(todoId)
  function closeModal() {
    setIsOpen(false);
  }
  function handleDelete(e) {
    e.stopPropagation();
    const formData = new FormData();
    formData.append("actionType", "delete");
    formData.append("id", n._id);
    submit(formData, { method: "delete" });
  }
  function openNote(e, id){
    if (!e.target.id.includes('del')&&!e.target.id.includes('edit')) {      
      navigate(`${id}`)
    }
  }
  return (
    <>
      {isOpen && (
        <NoteModal closeModal={closeModal} openModal={isOpen} note={n} />
      )}

      <div className={classes.note} onClick={(e)=>openNote(e,n._id)} >
        <div className={classes.del_btn} onClick={handleDelete} ref={delRef}>
          <i className="bi bi-trash3" id='delete'></i>
        </div>
        <div className={classes.edit_btn} onClick={() =>{console.log('edit'); setIsOpen(true)}} ref={editRef} id="edit_btn">
          <i className="bi bi-pencil" id='edit'></i>
        </div>
        {n.title && <p className={classes.noteTitle}>{n.title}</p>}
        <p
          dangerouslySetInnerHTML={{ __html: n.text }}
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
export async function deleteNote(url, token) {
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
