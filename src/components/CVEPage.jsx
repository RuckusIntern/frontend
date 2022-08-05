import React, { Fragment, useState, useEffect } from "react"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import TablePagination from '@mui/material/TablePagination';
import { TextField } from "@mui/material"
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import { useNavigate } from "react-router-dom";
import { formatDateFull } from "./utils";
import axios from 'axios'

export default function CVEPage({data}) {  
  
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [cvePackage, setCvePackage] = useState({})
  const [cve_name, set_cve_name] = useState('')
  const [cvss_score, set_cvss_score] = useState('')
  const [cvss_status, set_cvss_status] = useState('')
  const [cve_url, set_cve_url] = useState('')
  const [severity, set_severity] = useState('')
  const [vulnerabilities_status, set_vulnerabilities_status] = useState('')
  const [vulnerabilities_url, set_vulnerabilities_url] = useState('')
  const [platform, set_platform] = useState('')
  const [release_image_name, set_release_image_name] = useState('')
  const [package_name, set_package_name] = useState('')
  const [package_version, set_package_version] = useState('')
  const [package_release, set_package_release] = useState('')
  const [comment, set_comment] = useState('')
  const [solution, set_solution] = useState('')
  const [commentator, set_commentator] = useState('')

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{display: 'flex', flexWrap: 'wrap', width: '95%', maxHeight: '30%' }}>
      <TableContainer compinent={Paper} sx={{display: 'flex', flexWrap: 'wrap', width: '100%', maxHeight: 500}}>
        <Table stickyHeader aria-label="sticky table" sx = {{ maxHeight: 20 }}>
          <TableHead>
            <TableRow >
              <TableCell align="center" style={{ minWidth: 120 }}>Package State</TableCell>
              <TableCell align="center" style={{ minWidth: 60 }}>Errata</TableCell>
              <TableCell align="center" style={{ minWidth: 170 }}>Package</TableCell>
              <TableCell align="center" style={{ minWidth: 170 }}>CVE Name</TableCell>
              <TableCell align="center" style={{ minWidth: 250 }}>CVE URL</TableCell>
              <TableCell align="center" style={{ minWidth: 100 }}>CVSS Score</TableCell>
              <TableCell align="center" style={{ minWidth: 100 }}>CVSS State</TableCell>
              <TableCell align="center" style={{ minWidth: 150 }}>Package Name Big</TableCell>
              <TableCell align="center" style={{ minWidth: 170 }}>Package Release</TableCell>
              <TableCell align="center" style={{ minWidth: 170 }}>Package Version</TableCell>
              <TableCell align="center" style={{ minWidth: 170 }}>Platform</TableCell>
              <TableCell align="center" style={{ minWidth: 170 }}>Realse Image Name</TableCell>
              <TableCell align="center" style={{ minWidth: 170 }}>Severity</TableCell>
              <TableCell align="center" style={{ minWidth: 170 }}>Vulnerabilities Staus</TableCell>
              <TableCell align="center" style={{ minWidth: 170 }}>Vulnerabilities URL</TableCell>
              <TableCell align="center" style={{ minWidth: 100 }}>Comment</TableCell>
              <TableCell align="center" style={{ minWidth: 100 }}/>
            </TableRow>
          </TableHead>
          <TableBody>
          {data
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((cve) => (
            <Fragment>
              <TableRow sx={{ '& > *': { borderBottom: 'solid' } }}>
                <TableCell align="center">
                  <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                  >
                  {open ? " ▲" : " ▼"}
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                  >
                  {open ? " ▲" : " ▼"}
                  </IconButton>
                </TableCell>
                <TableCell align="center" style={{ minWidth: 400 }}>{cve.package}</TableCell>
                <TableCell align="center">{cve.cve_name}</TableCell>
                <TableCell align="center" style={{ minWidth: 450 }}><a href={cve.cve_url} target="_blank" rel="noreferrer"> {cve.cve_url} </a></TableCell>
                <TableCell align="center">{cve.cvss_score}</TableCell>
                <TableCell align="center">{cve.cvss_status}</TableCell>
                <TableCell align="center">{cve.package_name_big}</TableCell>
                <TableCell align="center">{cve.package_release}</TableCell>
                <TableCell align="center">{cve.package_version}</TableCell>
                <TableCell align="center">{cve.platform}</TableCell>
                <TableCell align="center">{cve.release_image_name}</TableCell>
                <TableCell align="center">{cve.severity}</TableCell>
                <TableCell align="center">{cve.vulnerabilities_status}</TableCell>
                <TableCell align="center" style={{ minWidth: 450 }}><a href={cve.vulnerabilities_url} target="_blank" rel="noreferrer"> {cve.vulnerabilities_url} </a></TableCell>
                <TableCell>
                  <TextField fullWidth 
                  id="outlined-multiline-static"
                  label="Info"
                  multiline
                  rows={4}
                  defaultValue="..."
                  size="medium"
                  style={{ minWidth: 300 }}>
                  </TextField>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick={() => alert("Succuss to leave your comment on " + cve.values.package)}>
                  Edit Comment
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                      <Typography variant="h6" gutterBottom component="div">
                      Affected Package
                      </Typography>
                      <Table size="small" aria-label="package">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" style={{ minWidth: 140 }}>Package Name</TableCell>
                            <TableCell align="center" style={{ minWidth: 170 }}>CPE</TableCell>
                            <TableCell align="center" style={{ minWidth: 80 }}>Fix State</TableCell>
                            <TableCell align="center" style={{ minWidth: 80 }}>Impact</TableCell>
                            <TableCell align="center" style={{ minWidth: 170 }}>Platform Name</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                        {cve.package_state.map((c) => (
                          <TableRow>
                            <TableCell align="center" component="th" scope="row">{c.package_name}</TableCell>
                            <TableCell align="center" component="th" scope="row">{c.cpe}</TableCell>
                            <TableCell align="center" component="th" scope="row">{c.fix_state}</TableCell>
                            <TableCell align="center" component="th" scope="row">{c.impact}</TableCell>
                            <TableCell align="center" component="th" scope="row">{c.product_name}</TableCell>
                          </TableRow>
                        ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell >
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
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
                        {cve.errata.map((v) => (
                          <TableRow>
                            <TableCell align="center" component="th" scope="row">{v.advisory}</TableCell>
                            <TableCell align="center" component="th" scope="row">{v.cpe}</TableCell>
                            <TableCell align="center" component="th" scope="row">{v.package}</TableCell>
                            <TableCell align="center" component="th" scope="row">{v.product_name}</TableCell>
                            <TableCell align="center" component="th" scope="row">{v.release_date}</TableCell>
                            <TableCell align="center" component="th" scope="row"style={{ minWidth: 500 }}><a href={'https://access.redhat.com/errata/' + v.advisory} target="_blank" rel="noreferrer"> {'https://access.redhat.com/errata/' + v.advisory} </a></TableCell>
                          </TableRow>
                        ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell >
              </TableRow>
            </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}