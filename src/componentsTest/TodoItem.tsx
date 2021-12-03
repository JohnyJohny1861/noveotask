import { FC } from "react";

const TodoItem:FC<{ 
    text: string,
    removeTodo: () => void
}> = ({
    text, removeTodo
}) => {
    return ( <li onClick={removeTodo}>{text}</li> )
}

export default TodoItem;