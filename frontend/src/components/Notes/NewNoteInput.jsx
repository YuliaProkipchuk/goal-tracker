import classes from "./Notes.module.css";
import { useRef, useState } from "react";
import { Form, useSubmit } from "react-router-dom";
import DOMPurify from "dompurify";

export default function NewNoteInput() {
  const submit = useSubmit();
  const [isFocused, setIsFocused] = useState(false);
  const [title, setTitle] = useState("");
  let clN = useRef(`${classes.newNoteInput}`);
  function handleFocus() {
    setIsFocused(true);
    clN.current = `${classes.newNoteInput} ${classes.noteInputSize}`;
  }
  const formRef = useRef(null);
  const textRef = useRef(null);

  function handleBlur() {
    setTimeout(() => {
      if (
        formRef.current &&
        !formRef.current.contains(document.activeElement)
      ) {
        setIsFocused(false);
        textRef.current.innerHTML=''
        setTitle('');
        clN.current = `${classes.newNoteInput}`;
      }
    }, 0);
  }
  function createNewNote(e) {
    const formData = new FormData();
    let text = textRef.current.innerText
    text=text.replace(/(?:\r\n|\r|\n)/g, '<br/>')
    const cleanHTML = DOMPurify.sanitize(text);
    console.log(cleanHTML);
    console.log(text);
    formData.append("title", title || "");
    formData.append("text", cleanHTML);
    formData.append("actionType", "add");
    console.log(formData.get("title"));
    submit(formData, { method: "post" });
  }
  return (
    <Form
      className={classes["newNote-form"]}
      ref={formRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {isFocused && (
        <>
          <input
            type="text"
            placeholder="Title"
            className={classes.newNoteInput}
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className={classes.newNoteBtns}>
            <button type="button" onClick={createNewNote}>
              Save
            </button>
          </div>
        </>
      )}
      {/* <input type="text" placeholder='New note...' className={clN.current}/> */}
      <div
        aria-label="New note..."
        data-placeholder="New note..."
        role="textbox"
        id={classes["newNote"]}
        ref={textRef}
        className={clN.current}
        contentEditable
      ></div>
    </Form>
  );
}
export async function postNewNote(url, data, token) {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}
