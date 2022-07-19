import './App.css'
import React, { useState } from "react"
import AdminPage from './components/AdminPage.jsx'
import AffectedPackage from './components/AffectedPackage'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import cveData from "./components/data.json"
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'

export default function App() {
  const [cves, setCve] = useState(cveData)
  const [value, setValue] = useState("")
  const [searchColumns, setSearchColumns] = useState(["cve_name"])
  const [open, setOpen] = useState(false)
  function search(rows) {
    //return rows.filter((row) => row.cve_name.toLowerCase().indexOf(value) > -1)
    return rows.filter((row) => 
      searchColumns.some(
        (column) => 
          row[column].toString().toLowerCase().indexOf(value.toLowerCase()) > -1
      ) 
    )
  }

  const columns = cves[0] && Object.keys(cves[0])
  // error function gives previuos state
  return (

    <Container maxWidth="xl" className="container">
      <br></br>
      <Typography variant="h4" component="div" gutterBottom>
      Vulnerability Database
        <IconButton
        aria-label="expand row"
        size="small"
        onClick={() => setOpen(!open)}
        >
          {open ? " ▲" : "Reminder : ▼"}
        </IconButton>
      </Typography>
      <Typography variant="h6" component="div" gutterBottom>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Table size="small" aria-label="package">
              <TableHead>
                <TableRow>CVE Name can be both lowercase and uppercase, ex: cve-2016-6349</TableRow>
                <TableRow>please remember to select the filter</TableRow>
              </TableHead>
            </Table>
          </Box>
        </Collapse>
      </Typography>
      <div className='App'> 
        <input type="text" value={value} placeholder="Search" onChange={(e) => setValue(e.target.value)}/>
        <br></br>
        {columns &&
          columns.map((column) => (
            <label>
              <input type="checkbox" checked={searchColumns.includes(column)}
                onChange={(e) => {
                  const checked = searchColumns.includes(column)
                  setSearchColumns(prev => checked
                      ? prev.filter(sc => sc !== column)
                      : [...prev, column]
                  )
                }}
              />
              {column}
            </label>
        ))}
      </div>
      <AdminPage data = {search(cves)}/>
      {/* <AffectedPackage data = {search(cves)}/> */}
    </Container>
  )
}