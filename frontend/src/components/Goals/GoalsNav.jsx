import { useEffect, useRef, useState } from "react";
import Modal from "../NewGoal/Modal";
import classes from "./GoalsNav.module.css";
import { Link, useSubmit } from "react-router-dom";
import SearchBar from "../UI/SearchBar";
export default function GoalsNav({ todoId, onBlur}) {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(todoId)
  const [searchTerm, setSearchTerm] = useState('')
  const timer = useRef();
  const submit = useSubmit()
  useEffect(()=>{
    timer.current = setTimeout(()=>{
      console.log('stopped typing')
      console.log(searchTerm);
      // if(searchTerm.trim()!==''){
        let searchParams = new URLSearchParams();
        searchParams.append("q", searchTerm);
        submit(searchParams);
      // }
      
    },1000);
    return ()=>clearTimeout(timer.current)
  },[searchTerm])
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      {isOpen && <Modal closeModal={closeModal} openModal={isOpen} />}
      <div className={classes["goals-menu"]}>
        <div className={classes.options}>
          <Link to={`todo/${todoId}`}>To Do</Link>
          <span onClick={() => setIsOpen(true)}>Add Goal</span>
          {/* <span>Delete Goals</span> */} 
        </div>

        <SearchBar className={classes.size} onChange={(e)=>{setSearchTerm(e.target.value)}} onBlur={onBlur}/>
      </div>
    </>
  );
}
