// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import ButtonGroup from '@mui/material/ButtonGroup'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

// ** Demo Components Imports
import EditionCard from '../../../renderer/views/cards/EditionCard'
import { Button } from '@mui/material'



// ** Store and API
import { updateCardList, cardListAll, cardListPosted, cardListSold } from '../../server/stocks'

const CardBasic = () => {
    const [ isUpdating, setIsUpdating ] = useState(false);
    const [ cardAll, setCardAll ] = useState([]);
    const [alignment, setAlignment] = useState('Unlisted');
  
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
          const allCards = await cardListAll();
          setCardAll(allCards); 
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);

    const handleChange = async (event, newAlignment) => {
      setAlignment(newAlignment);
    
      if (newAlignment === 'Unlisted') {
        const allCards = await cardListAll();
        setCardAll(allCards); 
      } else if (newAlignment === 'Posted') {
        const postedCards = await cardListPosted();
        setCardAll(postedCards); 
      } else if (newAlignment === 'Sold') {
        const soldCards = await cardListSold();
        setCardAll(soldCards);
      }
    };

    console.log(cardAll)
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ paddingBottom: 4 }}>
          <Typography sx={{ paddingBottom: 4, marginBottom: 4 }} variant='h5'>
            Edition Cards
            <Button
              variant='text'
              sx={{ width: '150px', height: '30px', marginLeft: 4 }}
              onClick={cardListUpdate}
              disabled={isUpdating} // Disable the button when isUpdating is true
            >
              {isUpdating ? 'Updating...' : 'Update list'}
            </Button>

            <ToggleButtonGroup   
                color="primary"
                exclusive={true}
                variant="outlined" 
                value={alignment}
                aria-label="Platform"
                sx={{ marginLeft: '58%' }}
                onChange={handleChange}
              >
              <ToggleButton value="Unlisted">Unlisted</ToggleButton>
              <ToggleButton value="Posted">Posted</ToggleButton>
              <ToggleButton value="Sold">Sold</ToggleButton>

            </ToggleButtonGroup>

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
                id={card?.id}
                lister={card?.lister}
                price={card?.price} />
                
            </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  };
  
  export default CardBasic;
