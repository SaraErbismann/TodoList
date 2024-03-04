import { useRef, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";


export default function TodoTable({todos, handleDelete}) {

    const gridRef = useRef();

    const [colDefs, setColDefs] = useState([
        {field: 'description', sortable: true, filter: true},
        {field: 'priority', sortable: true, filter: true, 
        cellStyle: params =>  params.value.toLowerCase() == 'high' ? {color: 'red'} : {color: 'black'}},
        {field: 'date', sortable: true, filter: true}
    ]);

    return(
        <>
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
            <button onClick={handleDelete}>Delete</button>
        </div>
        </>
    );
}