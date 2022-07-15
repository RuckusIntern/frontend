import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <TextField id="outlined-search" label="Global Column Search" type="search" 
    value={value || ""} onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={`${count} records...`}/>
  );
}