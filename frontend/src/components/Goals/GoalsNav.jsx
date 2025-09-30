import { useEffect, useState } from "react";
import Modal from "../NewGoal/Modal";
import classes from "./GoalsNav.module.css";
import { Link, useSubmit } from "react-router-dom";
import SearchBar from "../UI/SearchBar";
import { useDebounce } from "../../hooks/useDebounce";
export default function GoalsNav() {
   
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('')

  const submit = useSubmit()
  const debouncedValue = useDebounce(searchTerm)
  
  useEffect(()=>{
    let searchParams = new URLSearchParams();
    searchParams.append("q", debouncedValue);
    submit(searchParams)
  },[debouncedValue, submit])
 
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      {isOpen && <Modal closeModal={closeModal} openModal={isOpen} />}
      <div className={classes["goals-menu"]}>
        <div className={classes.options}>
          <Link to={`/todo`}>To Do</Link>
          <span onClick={() => setIsOpen(true)}>Add Goal</span>
        </div>

        <SearchBar className={classes.size} onChange={(e)=>{setSearchTerm(e.target.value)}} />
      </div>
    </>
  );
}
