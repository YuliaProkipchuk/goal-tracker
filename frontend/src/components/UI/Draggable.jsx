/* eslint-disable react/prop-types */
import {useDraggable} from '@dnd-kit/core';

export default function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={props.className}>
      {props.children}
    </div>
  );
}