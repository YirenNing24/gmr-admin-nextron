//** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'


// ** Demo Components Imports
import TableSearchIndexes from '../../../renderer/views//tables/TableSearchIndexes'

// ** Modals
import CreateIndex from '../../modals/create-index'
import DeleteIndex from '../../modals/delete-index'

const SearchesForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
      };

      const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
      };
    

  return (
    <Grid container spacing={6}>
        <CreateIndex isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <DeleteIndex isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
      <Grid item xs={12}>
        <Typography variant='h5'>
            Search indexes and other search settings
            <Button size='small' type='submit' sx={{ ml: 2 }} variant='outlined' onClick={openModal}>
                ADD NEW INDEX
            </Button>
            <Button size='small' type='submit' sx={{ ml: 160 }}  onClick={openDeleteModal}>
                DELETE INDEX
            </Button>
        </Typography>
        <Typography variant='body2'>
            Admin and user search indexes settings
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Active Indexes' titleTypographyProps={{ variant: 'h6' }} />
          <TableSearchIndexes />
        </Card>
      </Grid>

    </Grid>
  )
}

export default SearchesForm
