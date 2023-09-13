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
import TablePlayers from '../tables/TablePlayers'

// ** Modals
import CreateIndex from '../../modals/create-index'
import DeleteIndex from '../../modals/delete-index'

const PlayersList = () => {
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
            Player account operations

        </Typography>
        <Typography variant='body2'> 
            player settings, management, and operations
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TablePlayers />
        </Card>
      </Grid>

    </Grid>
  )
}

export default PlayersList 
