import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import { GlobalFilter } from "./globalFilter";
import Button from '@mui/material/Button';

export function Products(props) {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((err) => console.log(err));

    if (response) {
      const products = response.data;

      console.log("Products: ", products);
      setProducts(products);
    }
  };

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
//   );

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
//   );

  const productsData = useMemo(() => [...products], [products]);

  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            .filter((key) => key !== "rating")
            .map((key) => {
                if (key === "image")
                    return {
                    Header: key,
                    accessor: key,
                    Cell: ({ value }) => <img src={value} Width = {70} alt = "product pic"/>
                    }

              return { Header: key, accessor: key };
            })
        : [],
    [products]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "View",
        Header: "View",
        Cell: ({ row }) => (
          <Button variant="outlined" size="small" onClick={() => alert("Viewing: " + row.values.price)}>
            View Price
          </Button>
        ),
      },
    ]);
  };

  const tableInstance = useTable(
    {
      columns: productsColumns,
      data: productsData,
    },
    useGlobalFilter,
    tableHooks,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  useEffect(() => {
    fetchProducts();
  }, []);

  const isEven = (idx) => idx % 2 === 0;

  return (
    <Paper variant="outlined" square sx={{display: 'flex', flexWrap: 'wrap', width: '100%', height: '100%' }}>
      <GlobalFilter 
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table {...getTableProps()}>
            <TableHead>
            {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                    <TableCell align="center" size="medium" {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                    </TableCell>
                ))}
                </TableRow>
            ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
            {rows.map((row, idx) => {
                prepareRow(row);

                return (
                <TableRow
                    {...row.getRowProps()}
                    className={isEven(idx) ? "bg-green-400 bg-opacity-30" : ""}
                >
                    {row.cells.map((cell, idx) => (
                    <TableCell align="center" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                    </TableCell>
                    ))}
                </TableRow>
                );
            })}
            </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}