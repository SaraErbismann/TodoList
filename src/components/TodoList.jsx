import { useRef, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function TodoList () {
    //States for todo inputs and for storing todos
    const [todo, setTodo] = useState({
        description: '',
        priority: '',
        date: ''
    });
    const [todos, setTodos] = useState([]);
    //
    const gridRef = useRef();

    const [colDefs, setColDefs] = useState([
        {field: 'description', sortable: true, filter: true},
        {field: 'priority', sortable: true, filter: true, 
        cellStyle: params =>  params.value.toLowerCase() == 'high' ? {color: 'red'} : {color: 'black'}},
        {field: 'date', sortable: true, filter: true}
    ]);



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
        <button onClick={handleDelete}>Delete</button>
        <div 
        className="ag-theme-material"
        style ={{height: 600}}
        >
            <AgGridReact
            ref={gridRef}
            onGridReady={params => gridRef.current = params.api}
            rowData={todos}
            columnDefs={colDefs}
            rowSelection ="single"/>
        </div>

        </>
    );
}

