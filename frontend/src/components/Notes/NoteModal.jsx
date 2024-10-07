import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import classes from "./Notes.module.css";
import DOMPurify from "dompurify";
import { useSubmit } from "react-router-dom";

export default function NoteModal({ note, closeModal, openModal }) {
  console.log(note.text);
  const submit = useSubmit()
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const ref = useRef();

  useEffect(() => {
    console.log(ref.current);

    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current.close();
    }
  }, [openModal]);
  function handleClickOutside(event) {
    // Перевіряємо, чи клік був зроблений поза межами контенту діалогу
    if (event.target === ref.current) {
      closeModal();
    }
  }

  function editNode() {
    const formData = new FormData();
    let text = textRef.current.innerText
    let title = titleRef.current.innerText
    text=text.replace(/(?:\r\n|\r|\n)/g, '<br/>')
    title=title.replace(/(?:\r\n|\r|\n)/g, '<br/>')
    const cleantext = DOMPurify.sanitize(text);
    const cleantitle = DOMPurify.sanitize(title);
    console.log(text);
    formData.append("title", cleantitle || "");
    formData.append("text", cleantext || "");
    formData.append("actionType", "edit");
    formData.append("id", note._id);
    console.log(formData.get("title"));
    submit(formData, { method: "patch" });
    closeModal();

  }
  return (
    <>
      {createPortal(
        // <div className={classes.back}>
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
            dangerouslySetInnerHTML={{ __html: note.text }}
            className={classes.note_modal_info}
            ref={textRef}
          ></p>
          <div className={classes.save_note}>
            <button onClick={editNode}>Save</button>
          </div>
        </dialog>,
        document.getElementById("dialog")
      )}
    </>
  );
}
export async function editNote(url, data, token) {
  await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}