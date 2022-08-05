import './App.css'
import logo from './pic/Ruckus_logo.png'
import api from './components/posts'
import React, { useState, useEffect } from "react"
// import AdminPage from './components/AdminPage'
import AffectedPackage from './components/AffectedPackage'
// import CVEPage from './components/CVEPage'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider';


export default function App() {
  const [cves, setCve] = useState([])
  const [value, setValue] = useState("")
  const [searchColumns, setSearchColumns] = useState(["cve_name"])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchCve = async () =>{
      try{
        // const response = await api.get('/jsonarray')
        const response = await api.get('/get')
        // json-server --watch data.json --port 3300
        setCve(response.data)
      } catch (err) {
        if(err.response){
        // Not in the 200 response range
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          console.log(`Error: ${err.message}`)
        }
      }
    }
    fetchCve()
  }, [])


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
      <img src={logo} alt="Logo" />
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
      <Divider />
      <div className='App' > 
        <input type="text" value={value} placeholder="Search" onChange={(e) => setValue(e.target.value)}/>
        <br />
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
      <Divider />
      {/* <AdminPage data = {search(cves)}/> */}
      <AffectedPackage data = {search(cves)}/>
      {/* <CVEPage data = {search(cves)}/> */}
    </Container>
  )
}