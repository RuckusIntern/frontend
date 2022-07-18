import React from "react";
import TextField from '@mui/material/TextField';

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column
  return (
    <TextField id="outlined-search" label="Column Search" type="search"  display="flex"
    value={filterValue || ""} onChange={(e) => {
        setFilter(e.target.value);
      }}/>
  )
}