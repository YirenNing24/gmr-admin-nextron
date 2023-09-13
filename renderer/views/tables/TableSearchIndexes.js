// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

// ** Userstore and API
import { searchIndex } from '../../../renderer/server/search'



const columns = [

  { id: 'uid', label: 'UID', minWidth: 100 },
  {
    id: 'createdAt',
    label: 'Created At',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'updatedAt',
    label: 'Updated At',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'primaryKey',
    label: 'Primary Key',
    minWidth: 170,
    align: 'right',
    format: value => value.toFixed(2)
  },
  {
    id: 'numberOfDocuments',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: value => value.toFixed(2)
  }
]

const createData = (uid, createdAt, updatedAt, primaryKey, numberOfDocuments) => {
  return {uid, createdAt, updatedAt, primaryKey, numberOfDocuments }
}

const TableSearchIndexes = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allIndexes = await searchIndex()
        const formattedRows = allIndexes.map(index => createData(

          index.uid,
          new Date(index.createdAt).toLocaleString('en-US'),
          new Date(index.updatedAt).toLocaleString('en-US'),
          index.primaryKey,
          index.numberOfDocuments
        ))
        setRows(formattedRows)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return null
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow key={row.uid}>
                  {columns.map(column => {
                    const value = row[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TableSearchIndexes
