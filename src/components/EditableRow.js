import React from "react"
import Button from '@mui/material/Button'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Input from '@mui/material/Input'


const EditableRow = ({editFormData, handleEditFormChange}) => {
    return(
        <TableRow sx={{ '& > *': { borderBottom: 'solid' } }}>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell>
                <Input type = "text" name="comment" required="required" placeholder="Enter your comment" value={editFormData.comment}  onChange={handleEditFormChange}></Input> 
            </TableCell>
            <TableCell>
                <Input type = "text" name="solution" required="required" placeholder="Enter your solution" value={editFormData.solution}  onChange={handleEditFormChange}></Input>
            </TableCell>
            <TableCell/>
            <TableCell>
                <Input type = "text" name="commentator" required="required" placeholder="Enter your name" value={editFormData.commentator}  onChange={handleEditFormChange}></Input>
            </TableCell>
            <TableCell align="center">
                <Button  variant="outlined" size="small" type="submit">Save</Button>
            </TableCell>
        </TableRow>
    )
}

export default EditableRow