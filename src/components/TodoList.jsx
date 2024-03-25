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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import dayjs from "dayjs";
import 'dayjs/locale/fi';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`navigation-tabpanel-${index}`}
        aria-labelledby={`simple-tnav-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3, width: '100%'}}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index) {
    return {
      id: `simple-nav-${index}`,
      'aria-controls': `navigation-tabpanel-${index}`,
    };
  }



export default function TodoList () {

    //States for todo inputs and for storing todos
    const [todo, setTodo] = useState({
        description: '',
        priority: '',
        date: ''
    });
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [colDefs, setColDefs] = useState([
        {field: 'description', sortable: true, filter: true, floatingFilter: true},
        {field: 'priority', sortable: true, floatingFilter: true, filter: true, 
        cellStyle: params =>  params.value.toLowerCase() == 'high' ? {color: 'red'} : {color: 'black'}},
        {field: 'date', sortable: true, filter: true, floatingFilter: true}
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
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} >
                <Tab label="Home" {...a11yProps(0)} />
                <Tab label="To dos" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                Hello and welcome to my to do list app!
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" mt={2}>
            <TextField 
            label ="Description" 
            value={todo.description}
            onChange={e => setTodo({...todo, description: e.target.value})}
            />
           <FormControl>
            <InputLabel id="priority-select-lable">Priority</InputLabel>
            <Select 
            labelId ="priority-select-lable" 
            id="priority-select"
            value={todo.priority}
            onChange={e => setTodo({...todo, priority: e.target.value})}
            style={{ width: '150px' }}
            >
                <MenuItem value={'Low'}>Low</MenuItem>
                <MenuItem value={'Medium'}>Medium</MenuItem>
                <MenuItem value={'High'}>High</MenuItem>
            </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
            <DatePicker
            label ="Date"
            value={todo.date}
            defaultValue={dayjs()}
            onChange={(date) => setTodo({ ...todo, date: date.toISOString() })}
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
            </CustomTabPanel>
        </Box>

        
        </>
    );
}

