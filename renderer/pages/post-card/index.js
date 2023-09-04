// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import EditionCard from '../../../renderer/views/cards/EditionCard'
import { Button } from '@mui/material'



// ** Store and API
import { updateCardList, cardListAll } from '../../server/stocks'

const CardBasic = () => {
    const [ isUpdating, setIsUpdating ] = useState(false);
    const [ cardAll, setCardAll ] = useState([]);
  
    const cardListUpdate = async () => {
      try {
        setIsUpdating(true); // Set isUpdating to true when the button is clicked
        await updateCardList();
      } finally {
        setIsUpdating(false);
      }
    };



   
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Call cardListAll here and store the result in allCards
          const allCards = await cardListAll();
          setCardAll(allCards); // Update the cardAll state with the fetched data
        } catch (error) {
          // Handle any errors if necessary
          console.error(error);
        }
      };

      fetchData(); // Call fetchData when the component mounts
    }, []);

    console.log(cardAll.cardAddress)

  
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ paddingBottom: 4 }}>
          <Typography sx={{ paddingBottom: 4, marginBottom: 4 }} variant='h5'>
            Edition Cards
            <Button
              variant='outlined'
              sx={{ width: '150px', height: '30px', marginLeft: 4 }}
              onClick={cardListUpdate}
              disabled={isUpdating} // Disable the button when isUpdating is true
            >
              {isUpdating ? 'Updating...' : 'Update list'}
            </Button>
          </Typography>
          <Grid container spacing={6} sx={{overflowY: 'auto', maxHeight: '95vh' }}>
          {cardAll.map((card) => (
            <Grid item xs={12} sm={5} md={2} sx={{paddingRight: '1px'}}>
              <EditionCard 
                image={card?.metadata.image}
                name={card?.metadata.name}
                tokenId={card?.metadata.id}
                description={card?.metadata.description}
                skill={card?.metadata.skill}
                cardAddress={card?.metadata.cardAddress}
                id={card?.id} />

            </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  };
  
  export default CardBasic;
