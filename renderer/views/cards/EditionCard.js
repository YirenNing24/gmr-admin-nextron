// ** React Imports
import { useState } from 'react';


// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Modals
import ListCard from '../../modals/list-card'

const EditionCard = ({ image, name, tokenId, skill, cardAddress, id, lister }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(cardAddress)
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  return (
    <Card>
      <ListCard cardAddress={cardAddress} tokenId={tokenId} id={id} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <CardMedia sx={{ height: '20rem' }} image={image} />
      <CardContent sx={{ padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
        <Typography variant='body1' sx={{ marginBottom: 2 }}>
          {name}
        </Typography>
        <Typography variant='body2' sx={{ marginBottom: 2 }}>
          {skill}
        </Typography>
        <Typography variant='body2'>
          Minted by: {lister} 
        </Typography>
      </CardContent>
      <Button
        variant='contained'
        sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        onClick={openModal}
        disabled={lister !==   undefined} // Disable the button if lister has a value
      >
        List to store
      </Button>
    </Card>
  );
};

export default EditionCard
