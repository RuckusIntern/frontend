import React, { Fragment, useState} from "react"
import api from './posts'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import ReadOnlyRow from "./ReadOnlyRow"
import EditableRow from "./EditableRow"

export default function AffectedPackage({data}) {  
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [editCveId, setEditCveId] = useState(null)

  const [editFormData, setEditFormData] = useState({
    comment: "",
    solution: "",
    commentator: "",
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleEditFormChange = (event) => {
    const fieldName = event.target.getAttribute("name")
    const fieldValue = event.target.value
    const newFormData = {...editFormData}
    newFormData[fieldName] = fieldValue
    setEditFormData(newFormData)
  }

  const handleEditFormSubmit = (event) => {

    const editCve = {
      package : editCveId,
      comment: editFormData.comment,
      solution: editFormData.solution,
      commentator: editFormData.commentator,
    }

    const newCve = [...data]
    const index = data.findIndex((cve) => cve.package === editCveId)
    newCve[index] = editCve
    try{
      api.put(`update/${editCve.package}`,{
        comment: editFormData.comment,
        solution: editFormData.solution,
        commentator: editFormData.commentator,
      })
      alert(`successfully change package:${editCve.package}` )
    }catch(error){
      console.error(error)
    }
    setEditCveId(null)
  }

  const handleEditClick = (event, cve) => {
    setEditCveId(cve.package)

    const formValues = {
      comment: cve.comment,
      solution: cve.solution,
      commentator: cve.commentator,
    }

    setEditFormData(formValues)
  }


  return (
    <Paper sx={{display: 'flex', flexWrap: 'wrap', width: '100%', maxHeight: '30%' }}>
      <TableContainer compinent={Paper} sx={{display: 'flex', flexWrap: 'wrap', width: '100%', maxHeight: 500}}>
        <form onSubmit={handleEditFormSubmit}>
          <Table stickyHeader aria-label="sticky table" sx = {{ maxHeight: 20 }}>
            <TableHead>
              <TableRow >
                <TableCell align="center" style={{ minWidth: 120 }}>Package State</TableCell>
                <TableCell align="center" style={{ minWidth: 60 }}>Errata</TableCell>
                <TableCell align="center" style={{ minWidth: 170 }}>Package</TableCell>
                <TableCell align="center" style={{ minWidth: 170 }}>CVE Name</TableCell>
                <TableCell align="center" style={{ minWidth: 170 }}>Severity</TableCell>           
                <TableCell align="center" style={{ minWidth: 100 }}>CVSS Score</TableCell>
                <TableCell align="center" style={{ minWidth: 100 }}>CVSS State</TableCell>
                <TableCell align="center" style={{ minWidth: 250 }}>CVE URL</TableCell>
                <TableCell align="center" style={{ minWidth: 170 }}>Vulnerabilities Staus</TableCell>
                <TableCell align="center" style={{ minWidth: 170 }}>Vulnerabilities URL</TableCell>
                <TableCell align="center" style={{ minWidth: 170 }}>Platform</TableCell>
                <TableCell align="center" style={{ minWidth: 170 }}>Realse Image Name</TableCell>
                <TableCell align="center" style={{ minWidth: 170 }}>Package Name</TableCell>
                <TableCell align="center" style={{ minWidth: 170 }}>Package Release</TableCell>
                <TableCell align="center" style={{ minWidth: 170 }}>Package Version</TableCell>
                <TableCell align="center" style={{ minWidth: 100 }}>Comment</TableCell>
                <TableCell align="center" style={{ minWidth: 100 }}>Solution</TableCell>
                <TableCell align="center" style={{ minWidth: 100 }}>Date</TableCell>
                <TableCell align="center" style={{ minWidth: 100 }}>Commentator</TableCell>
                <TableCell align="center" style={{ minWidth: 100 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((cve) => (
              <Fragment>
                { editCveId === cve.package ? (
                <EditableRow  key="{editFormData}" editFormData={editFormData} handleEditFormChange={handleEditFormChange}/> ):(
                <ReadOnlyRow  key="{cve}" cve = {cve} handleEditClick={handleEditClick} />
              )}
              </Fragment> 
              ))}
            </TableBody>
          </Table>
        </form>
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