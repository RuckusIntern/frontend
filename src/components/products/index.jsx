import axios from "axios"
import React, { Fragment, useEffect, useMemo, useState } from "react"
import { useGlobalFilter, useSortBy, useTable } from "react-table"
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { visuallyHidden } from '@mui/utils'
import { GlobalFilter } from "./globalFilter"
import Button from '@mui/material/Button'
import cveData from "./data.json"
import { TextField } from "@mui/material"

export function Products(props) {
  const [cve, setCve] = useState(cveData)
  const [cvePackage, setCvePackage] = useState(cveData)
  // const [products, setProducts] = useState([])
  // const fetchProducts = async () => {
  //   const response = await axios
  //     .get("https://fakestoreapi.com/products")
  //     .catch((err) => console.log(err))

  //   if (response) {
  //     const products = response.data

  //     console.log("Products: ", products)
  //     setProducts(products)
  //   }
  // }

//   const data = useMemo(
//     () => [
//       {
//         id: 1,
//         title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//         price: 109.95,
//         description:
//           "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//         category: "men's clothing",
//         image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//         rating: {
//           rate: 3.9,
//           count: 120,
//         },
//       },
//     ],
//     []
//   )

//   const columns = useMemo(
//     () => [
//       {
//         Header: "Id",
//         accessor: "id",
//       },
//       {
//         Header: "Price",
//         accessor: "price",
//       },
//       {
//         Header: "Title",
//         accessor: "title",
//       },
//     ],
//     []
//   )

  const productsData = useMemo(() => [...cve], [cve])
  const [open, setOpen] = React.useState(false)
  const productsColumns = useMemo(
    () =>
      cve[0]
        ? Object.keys(cve[0])
            .filter((key) => key !== "errata" && key !== "package_state")
            .map((key) => {
              if (key === "cve_url" || key ==="vulnerabilities_url")
                return {
                  Header: key,
                  accessor: key,
                  Cell: e =><a href={e.value} target="_blank" rel="noreferrer"> {e.value} </a>
                }
              return { Header: key, accessor: key }
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
        Cell: ({ row }) => (
            <TextField fullWidth 
            id="outlined-multiline-static"
            label="Info"
            multiline
            rows={4}
            defaultValue="..."
            size="medium"
            style={{ minWidth: 300 }}
          />
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
    },
    useGlobalFilter,
    Comment,
    tableHooks,
    useSortBy
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance

  // useEffect(() => {
  //   fetchProducts();
  // }, [])

  const isEven = (idx) => idx % 2 === 0

  return (
    <Paper sx={{display: 'flex', flexWrap: 'wrap', width: '100%', maxHeight: '60%' }}>
      <GlobalFilter 
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <TableContainer sx={{display: 'flex', flexWrap: 'wrap', width: '100%', maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table"{...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  <TableCell />
                {headerGroup.headers.map((column) => (
                    <TableCell align="center" style={{ minWidth: 170 }} {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                    </TableCell>
                ))}
                </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            <Fragment>
              {rows.map((row, idx) => {
                prepareRow(row);
                  return (
                  <TableRow {...row.getRowProps()} className={isEven(idx) ? "bg-green-400 bg-opacity-30" : ""} sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
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
                              <TableRow>
                                <TableCell component="th" scope="row">sample</TableCell>
                                <TableCell>sample</TableCell>
                                <TableCell>sample</TableCell>
                                <TableCell>sample</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                    {row.cells.map((cell, idx) => (
                    <TableCell align="center" style={{ minWidth: 170 }} {...cell.getCellProps()}>
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
    </Paper>
  )
}