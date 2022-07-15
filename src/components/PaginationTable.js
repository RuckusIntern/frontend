import React, { Fragment, useMemo, useState } from "react"
import { useGlobalFilter, useFilters, useSortBy, useTable, usePagination } from "react-table"
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
import { GlobalFilter } from "./globalFilter"
import Button from '@mui/material/Button'
import cveData from "./data.json"
import { TextField } from "@mui/material"
import { ColumnFilter } from "./columnFilter"

export function PaginationTable(props) {
    const [cve, setCve] = useState(cveData)

    const productsData = useMemo(() => [...cve], [cve])
    const [open, setOpen] = React.useState(false)
    const productsColumns = useMemo(
        () =>
        cve[0]
            ? Object.keys(cve[0])
                .filter((key) => key !== "errata" && key !== "package_state")
                .map((key) => {
                    if (key === "cve_url" || key ==="vulnerabilities_url"){
                        return {
                            Header: key,
                            accessor: key,
                            Filter: ColumnFilter,
                            Cell: e =><a href={e.value} target="_blank" rel="noreferrer"> {e.value} </a>
                        }
                    }
                    if (key === "package_state"){
                        return {
                            Header: key,
                            accessor: key,
                            Filter: ColumnFilter,
                            Cell: e =><a href={e.value} target="_blank" rel="noreferrer"> {e.value} </a>
                        }
                    }
                    return { Header: key, accessor: key, Filter: ColumnFilter }
                })
            : [],
        [cve]
    )

    const Comment = (word) => {
        word.visibleColumns.push((columns) => [
        ...columns,
        {
            id: "Comment",
            Header: "Comment",
            Filter: ColumnFilter,
            Cell: ({ row }) => (
                <TextField fullWidth 
                id="outlined-multiline-static"
                label="Info"
                multiline
                rows={4}
                defaultValue="..."
                size="medium"
                style={{ minWidth: 300 }}
            >
            </TextField>
            ),
        },
        ])
    }

    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
        ...columns,
        {
            id: "Edit",
            Header: "Edit",
            Cell: ({ row }) => (
            <Button variant="outlined" size="small" onClick={() => alert("Succuss to leave your comment on " + row.values.package)}>
                Edit Comment
            </Button>
            ),
        },
        ])
    }
    
    const tableInstance = useTable(
        {
        columns: productsColumns,
        data: productsData,
        initialState: { pageIndex:0 }
        },
        useFilters,
        useGlobalFilter,
        Comment,
        tableHooks,
        useSortBy,
        usePagination
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        prepareRow,
        gotoPage,
        pageCount,
        preGlobalFilteredRows,
        setGlobalFilter,
        state,
    } = tableInstance

    const {pageIndex} = state
    return (
        <Paper sx={{display: 'flex', flexWrap: 'wrap', width: '95%', maxHeight: '60%' }}>
            <GlobalFilter 
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={state.globalFilter}
            />
            <TableContainer align="center" sx={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>
                <Table stickyHeader aria-label="sticky table" sx = {{ maxHeight: 20 }}{...getTableProps()}>
                    <TableHead>
                        {headerGroups.map((headerGroup) => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                            <TableCell />
                            <TableCell />
                            {headerGroup.headers.map((column) => (
                                <TableCell align="center" style={{ minWidth: 170 }} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render("Header")}
                                {column.isSorted ? (column.isSortedDesc ? "      ▼" : "      ▲") : "      ≡"}
                                <br></br>
                                <br></br>
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </TableCell>
                            ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        <Fragment>
                        {page.map((row, idx) => {
                            prepareRow(row);
                            return (
                            <TableRow {...row.getRowProps()}>
                                <TableCell style={{ Height: 20 }}>
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => setOpen(!open)}
                                    >
                                        {open ? " ▲" : " ▼"}
                                    </IconButton>
                                </TableCell>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Affected Package
                                            </Typography>
                                            {productsData.map((data)=>(
                                            <Table size="medium" aria-label="package">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Package name</TableCell>
                                                        <TableCell>cpe</TableCell>
                                                        <TableCell>Fix State</TableCell>
                                                        <TableCell>Platform Name</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {data.package_state.map((d)=>(
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">{d.package_name}</TableCell>
                                                        <TableCell>{d.cpe}</TableCell>
                                                        <TableCell>{d.fix_state}</TableCell>
                                                        <TableCell>{d.product_name}</TableCell>
                                                    </TableRow>
                                                    ))}
                                                </TableBody>

                                            </Table>
                                            ))}
                                        </Box>
                                    </Collapse>
                                </TableCell >
                                {row.cells.map((cell, idx) => (
                                <TableCell align="center" style={{ minWidth: 170, Height: 10 }} {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                </TableCell>
                                ))}
                            </TableRow>
                            )
                        })}
                        </Fragment>
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex+1} of {pageOptions.length}
                    </strong>
                </span>
                <span>
                    | Go to page: {' '}
                    <input type='number' defaultValue={pageIndex+1} 
                    onChange = {e => {
                        const pageNumber = e.target.value? Number(e.target.value)-1 : 0
                        gotoPage(pageNumber)
                    }} style = {{ width: '50px'}}
                    />
                </span>
                <IconButton onClick={() => gotoPage(0)} disable={!canPreviousPage}>{"<<"}</IconButton>
                <IconButton onClick={() => previousPage()} disable={!canPreviousPage}> ◀</IconButton>
                <IconButton onClick={() => nextPage()} disable={!canNextPage}> ▶</IconButton>
                <IconButton onClick={() => gotoPage(pageCount-1)} disable={!canNextPage}>{">>"}</IconButton>
            </div>
        </Paper>
    )
}