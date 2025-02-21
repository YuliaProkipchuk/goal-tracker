/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import classes from "./Notes.module.css";
import DOMPurify from "dompurify";
import { useEditNoteMutation } from "../../features/notes/notesApiSlice";

export default function NoteModal({ note, closeModal, openModal }) {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const ref = useRef();

  const [editNote] = useEditNoteMutation();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current.close();
    }
  }, [openModal]);
  function handleClickOutside(event) {
    if (event.target === ref.current) {
      closeModal();
    }
  }

  async function handleEditNode() {
    let text = textRef.current.innerText;
    let title = titleRef.current.innerText;
    text = text.replace(/(?:\r\n|\r|\n)/g, "<br/>");
    title = title.replace(/(?:\r\n|\r|\n)/g, "<br/>");
    const cleantext = DOMPurify.sanitize(text);
    const cleantitle = DOMPurify.sanitize(title);
    const data = {
      title: cleantitle,
      body: cleantext,
      id: note._id,
    };
    try {
      await editNote({ noteId: note._id, data }).unwrap();
    } catch (error) {
      console.log(error);
    }

    closeModal();
  }
  return (
    <>
      {createPortal(
        <dialog
          ref={ref}
          onClose={closeModal}
          onCancel={closeModal}
          onClick={handleClickOutside}
          className={classes.note_modal}
        >
          <h1
            contentEditable
            dangerouslySetInnerHTML={{ __html: note.title }}
            className={classes.note_modal_info}
            ref={titleRef}
          ></h1>
          <p
            contentEditable
            dangerouslySetInnerHTML={{ __html: note.body }}
            className={classes.note_modal_info}
            ref={textRef}
          ></p>
          <div className={classes.save_note}>
            <button onClick={handleEditNode}>Save</button>
          </div>
        </dialog>,
        document.getElementById("dialog")
      )}
    </>
  );
}

