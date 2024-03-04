import { useRef, useState } from "react";
import TodoTable from "./TodoTable";

export default function TodoList () {
    //States for todo inputs and for storing todos
    const [todo, setTodo] = useState({
        description: '',
        priority: '',
        date: ''
    });
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();


    const handleDelete = () => {

        if(gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) => index != gridRef.current.getSelectedNodes()[0].id));
        } else {
            alert("No row selected! Select a row first.");
        }
    }

    const handleClick = () => {

        todo.description && todo.date?
        setTodos([...todos, todo]):
        alert("Type a description");

        setTodo({description: "", priority: "", date:""});
    }

    return(
        <>
        <input 
        placeholder ="Description" 
        value={todo.description}
        onChange={e => setTodo({...todo, description: e.target.value})}
        />
        <input 
        placeholder ="Priority" 
        value={todo.priority}
        onChange={e => setTodo({...todo, priority: e.target.value})}
        />
        <input
        type="date"
        value={todo.date}
        onChange={e => setTodo({...todo, date: e.target.value})}
        />
        <button onClick={handleClick}>Submit</button>
        <TodoTable todos={todos} handleDelete={handleDelete} />

        </>
    );
}

