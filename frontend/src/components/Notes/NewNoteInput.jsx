import classes from "./Notes.module.css";
import { useRef, useState } from "react";
import DOMPurify from "dompurify";
import { useCreateNoteMutation } from "../../features/notes/notesApiSlice";

export default function NewNoteInput() {
  const [createNote] = useCreateNoteMutation();
  const [isFocused, setIsFocused] = useState(false);
  const [title, setTitle] = useState("");

  let clN = useRef(`${classes.newNoteInput}`);
  const formRef = useRef(null);
  const textRef = useRef(null);

  function handleFocus() {
    setIsFocused(true);
    clN.current = `${classes.newNoteInput} ${classes.noteInputSize}`;
  }

  function handleBlur() {
    setTimeout(() => {
      if (
        formRef.current &&
        !formRef.current.contains(document.activeElement)
      ) {
        setIsFocused(false);
        textRef.current.innerHTML = "";
        setTitle("");
        clN.current = `${classes.newNoteInput}`;
      }
    }, 0);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let text = textRef.current.innerText;
    text = text.replace(/(?:\r\n|\r|\n)/g, "<br/>");
    const cleanHTML = DOMPurify.sanitize(text);

    const data = {
      title: title || "",
      body: cleanHTML,
    };

    try {
      await createNote(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form
      className={classes["newNote-form"]}
      ref={formRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
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
            <button type="button">Save</button>
          </div>
        </>
      )}
      <div
        aria-label="New note..."
        data-placeholder="New note..."
        role="textbox"
        id={classes["newNote"]}
        ref={textRef}
        className={clN.current}
        contentEditable
      ></div>
    </form>
  );
}
