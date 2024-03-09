import { useRef, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function TodoList () {
    //States for todo inputs and for storing todos
    const [todo, setTodo] = useState({
        description: '',
        priority: '',
        date: ''
    });
    const [todos, setTodos] = useState([]);
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
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" mt={2}>
            <TextField 
            label ="Description" 
            value={todo.description}
            onChange={e => setTodo({...todo, description: e.target.value})}
            />
            <TextField 
            label ="Priority" 
            value={todo.priority}
            onChange={e => setTodo({...todo, priority: e.target.value})}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
            label ="Date"
            value={todo.date}
            onChange={e => setTodo({...todo, date: e.target.value})}
            /></LocalizationProvider>
            <Button variant="contained" onClick={handleClick}>Submit</Button>
            <Button variant="outlined" color ="error" onClick={handleDelete}>Delete</Button>
        </Stack>
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

