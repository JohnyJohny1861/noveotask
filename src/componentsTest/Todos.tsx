import { FC } from 'react'
import Todo from './models/todo'
import TodoItem from './TodoItem'

export const Todos: FC<{ items: Todo[], removeTodo: (id: string) => void }> = ({items, removeTodo}) => {
    return (
        <ul>
            {items.map((item) => (
                <TodoItem key={item.id}
                    text={item.text}
                    removeTodo={removeTodo.bind(null, item.id)} 
                />
            ))}
        </ul>
    )
}
