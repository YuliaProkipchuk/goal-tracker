/* eslint-disable react/prop-types */
import {useDroppable} from '@dnd-kit/core';

export default function Droppable(props) {
  const {setNodeRef} = useDroppable({
    id: props.id,
  });
  
  
  return (
    <div ref={setNodeRef} style={{minHeight:'200px'}}>
      {props.children}
    </div>
  );
}