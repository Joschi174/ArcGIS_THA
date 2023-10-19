import React, { useMemo } from "react";
import { useTable } from 'react-table';
import { COLUMNS } from "./WeatherTableColums";
import './table.css'   

const WeatherTable = (props) => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => props.data, [])

    const tableinstance = useTable({

        columns: columns,
        data: data
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow    
    } = tableinstance

    return (  
        <div>
        <h1>Weather</h1>
        <table {...getTableProps()} >
            <thead>
                {headerGroups.map(headerGroup =>(
                    <tr {... headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map( (column) => (
                                <th {...column.getHeaderProps()}> {column.render('Header')} </th>
                            ))}
                    </tr>
                ))}
                
            </thead>
            <tbody {... getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return(
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}> {cell.render('Cell')   } </td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
        
    );
}
 
export default WeatherTable;