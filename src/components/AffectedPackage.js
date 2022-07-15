import React, { Fragment, useState } from "react"
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton'
import cveData from "./data.json"

export function AffectedPackage(props) {
  const [cves, setCve] = useState(cveData)
  const [open, setOpen] = React.useState(false)
  return (
    <TableContainer compinent={Paper} sx={{display: 'flex', flexWrap: 'wrap', width: '100%', maxHeight: 500}}>
      <Table stickyHeader aria-label="sticky table" sx = {{ maxHeight: 20 }}>
        <TableHead>
          <TableRow >
            <TableCell align="center" style={{ minWidth: 170 }}>Package State
            </TableCell>
            <TableCell align="center" style={{ minWidth: 170 }}>CVE Name</TableCell>
            <TableCell align="center" style={{ minWidth: 250 }}>CVE URL</TableCell>
            <TableCell align="center" style={{ minWidth: 170 }}>CVSS Score</TableCell>
            <TableCell align="center" style={{ minWidth: 170 }}>CVSS State</TableCell>
            <TableCell align="center" style={{ minWidth: 170 }}>Package</TableCell>
            <TableCell align="center" style={{ minWidth: 170 }}>Package Name</TableCell>
            <TableCell align="center" style={{ minWidth: 170 }}>Package Release</TableCell>
            <TableCell align="center" style={{ minWidth: 170 }}>Package Version</TableCell>
            <TableCell align="center" style={{ minWidth: 170 }}>Platform</TableCell>
            <TableCell align="center" style={{ minWidth: 170 }}>Severity</TableCell>
            <TableCell align="center" style={{ minWidth: 170 }}>Vulnerabilities Staus</TableCell>
            <TableCell align="center" style={{ minWidth: 170 }}>Vulnerabilities URL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {cves.map((cve) => (
          <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'solid' } }}>
              <TableCell>
                <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
                >
                {open ? " ▲" : " ▼"}
                </IconButton>
              </TableCell>
              <TableCell align="center">{cve.cve_name}</TableCell>
              <TableCell align="center" style={{ minWidth: 500 }}><a href={cve.cve_url} target="_blank" rel="noreferrer"> {cve.cve_url} </a></TableCell>
              <TableCell align="center">{cve.cvss_score}</TableCell>
              <TableCell align="center">{cve.cvss_status}</TableCell>
              <TableCell align="center" style={{ minWidth: 500 }}>{cve.package}</TableCell>
              <TableCell align="center">{cve.package_name}</TableCell>
              <TableCell align="center">{cve.package_release}</TableCell>
              <TableCell align="center">{cve.package_version}</TableCell>
              <TableCell align="center">{cve.platform}</TableCell>
              <TableCell align="center">{cve.severity}</TableCell>
              <TableCell align="center">{cve.vulnerabilities_status}</TableCell>
              <TableCell align="center">{cve.vulnerabilities_url}</TableCell>
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
                          <TableCell>Package Name</TableCell>
                          <TableCell>CPE</TableCell>
                          <TableCell>Fix State</TableCell>
                          <TableCell>Platform Name</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {cve.package_state.map((c) => (
                        <TableRow>
                          <TableCell component="th" scope="row">{c.package_name}</TableCell>
                          <TableCell component="th" scope="row">{c.cpe}</TableCell>
                          <TableCell component="th" scope="row">{c.fix_state}</TableCell>
                          <TableCell component="th" scope="row">{c.product_name}</TableCell>
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
  )
}