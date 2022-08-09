import React, { useState, useEffect } from "react"
import api from './posts'
import Button from '@mui/material/Button'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Table from '@mui/material/Table'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'

const ReadOnlyRow = ({ cve, handleEditClick }) => {
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [aps, setAps] = useState([])
    const [errata, setErrata] = useState([])

    useEffect(() => {
        const fetchCve = async () =>{
          try{
            // const response = await api.get('/jsonarray')
            const response = await api.get(`get/a/${cve.package}`)
            // json-server --watch data.json --port 3300
            if(response.data != null){
                setAps(response.data)
            }else{
                setAps([{"affected_package_name":"null","package":"null","package_name":"null","product_name":"null","fix_status":"null","impact":"null","cpe":"null"}])
            }
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
      })

      useEffect(() => {
        const fetchCve = async () =>{
          try{
            // const response = await api.get('/jsonarray')
            const response = await api.get(`get/e/${cve.package}`)
            // json-server --watch data.json --port 3300
            if(response.data != null){
                setErrata(response.data)
            }else{
                setErrata([{"errata_product_name":"null","release_date":"null","advisory":"null","fkpackage":"null","package":"null","product_name":"null","cpe":"null"}])
            }
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
      })

    return (
        <TableRow sx={{ '& > *': { borderBottom: 'solid' } }}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen1(!open1)}
                >
                {open1 ? " ▲" : " ▼"}
                </IconButton>
                <Collapse in={open1} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                        Affected Package
                        </Typography>
                        <Table size="small" aria-label="package">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" style={{ minWidth: 140 }}>Package</TableCell>
                                    <TableCell align="center" style={{ minWidth: 140 }}>Package Name</TableCell>
                                    <TableCell align="center" style={{ minWidth: 180 }}>CPE</TableCell>
                                    <TableCell align="center" style={{ minWidth: 80 }}>Fix Status</TableCell>
                                    <TableCell align="center" style={{ minWidth: 80 }}>Impact</TableCell>
                                    <TableCell align="center" style={{ minWidth: 180 }}>Platform Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {aps.map((c) => (
                                <TableRow>
                                    <TableCell align="center" component="th" scope="row">{c.package}</TableCell>
                                    <TableCell align="center" component="th" scope="row">{c.package_name}</TableCell>
                                    <TableCell align="center" component="th" scope="row">{c.cpe}</TableCell>
                                    <TableCell align="center" component="th" scope="row">{c.fix_status}</TableCell>
                                    <TableCell align="center" component="th" scope="row">{c.impact}</TableCell>
                                    <TableCell align="center" component="th" scope="row">{c.product_name}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell >
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen2(!open2)}
                    >
                    {open2 ? " ▲" : " ▼"}
                </IconButton>
                <Collapse in={open2} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                          Cheack Errata Table
                        </Typography>
                        <Table size="small" aria-label="package">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" style={{ minWidth: 170 }}>Advisory</TableCell>
                                    <TableCell align="center" style={{ minWidth: 170 }}>CPE</TableCell>
                                    <TableCell align="center" style={{ minWidth: 170 }}>Package</TableCell>
                                    <TableCell align="center" style={{ minWidth: 180 }}>Product Name</TableCell>
                                    <TableCell align="center" style={{ minWidth: 170 }}>Release Date</TableCell>
                                    <TableCell align="center" style={{ minWidth: 170 }}>URL</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {errata.map((e) => (
                                <TableRow>
                                    <TableCell align="center" component="th" scope="row">{e.advisory}</TableCell>
                                    <TableCell align="center" component="th" scope="row">{e.cpe}</TableCell>
                                    <TableCell align="center" component="th" scope="row">{e.package}</TableCell>
                                    <TableCell align="center" component="th" scope="row">{e.product_name}</TableCell>
                                    <TableCell align="center" component="th" scope="row">{e.release_date}</TableCell>
                                    <TableCell align="center" component="th" scope="row"style={{ minWidth: 500 }}><a href={'https://access.redhat.com/errata/' + e.advisory} target="_blank" rel="noreferrer"> {'https://access.redhat.com/errata/' + e.advisory} </a></TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell >
            <TableCell key="{cve.package}" align="center" style={{ minWidth: 400 }}>{cve.package}</TableCell>
            <TableCell key="{cve.cve_name}" align="center">{cve.cve_name}</TableCell>
            <TableCell key="{cve.severity}" align="center">{cve.severity}</TableCell>
            <TableCell key="{cve.cvss_score}" align="center">{cve.cvss_score}</TableCell>
            <TableCell key="{cve.cvss_status}" align="center">{cve.cvss_status}</TableCell>
            <TableCell key="{cve.cve_url}" align="center" style={{ minWidth: 450 }}><a href={cve.cve_url} target="_blank" rel="noreferrer"> {cve.cve_url} </a></TableCell>
            <TableCell key="{cve.vulnerabilities_status}" align="center">{cve.vulnerabilities_status}</TableCell>
            <TableCell key="{cve.vulnerabilities_url}" align="center" style={{ minWidth: 450 }}><a href={cve.vulnerabilities_url} target="_blank" rel="noreferrer"> {cve.vulnerabilities_url} </a></TableCell>
            <TableCell key="{cve.platform}" align="center">{cve.platform}</TableCell>
            <TableCell key="{cve.release_image_name}" align="center">{cve.release_image_name}</TableCell>
            <TableCell key="{cve.package_name}" align="center">{cve.package_name}</TableCell>
            <TableCell key="{cve.package_release}" align="center">{cve.package_release}</TableCell>
            <TableCell key="{cve.package_version}" align="center">{cve.package_version}</TableCell>
            <TableCell key="{cve.comment}" align="center" style={{ minWidth: 300 }}>{cve.comment}</TableCell>
            <TableCell key="{cve.solution}" align="center" style={{ minWidth: 300 }}>{cve.solution}</TableCell>
            <TableCell key="{cve.date}" align="center">{cve.date}</TableCell>
            <TableCell key="{cve.commentator}" align="center" style={{ minWidth: 300 }}>{cve.commentator} </TableCell>
            <TableCell align="center">
                <Button  variant="outlined" type="button" onClick={(event) => handleEditClick(event, cve)}>Edit</Button>
            </TableCell>
        </TableRow> 
    )
}

export default ReadOnlyRow