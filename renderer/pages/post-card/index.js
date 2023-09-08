// ** React Imports
import React, { useState, useEffect } from 'react';

// ** MUI Imports
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { Button } from '@mui/material';
import EditionCardOwned from '../../../renderer/views/cards/EditionCardOwned';
import EditionCardPosted from '../../../renderer/views/cards/EditionCardPosted';

// ** API and Store imports
import { updateCardList, cardListAll, cardListPosted, cardListSold } from '../../server/stocks';
import userStore from '../../../renderer/zustand/UserStore';


const PostCard = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [cardAll, setCardAll] = useState([]);
  const [cardPosted, setCardPosted] = useState([]);
  const [alignment, setAlignment] = useState('Owned');

  const user = userStore();
  const editionAddress = user?.contracts?.cardAddress;

  const cardListUpdate = async () => {
    try {
      setIsUpdating(true);
      await updateCardList(editionAddress);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChange = async (event, newAlignment) => {
    setAlignment(newAlignment);

    if (newAlignment === 'Owned') {
      const allCards = await cardListAll();
      setCardAll(allCards);
    } else if (newAlignment === 'Posted') {
      const postedCards = await cardListPosted();
      setCardPosted(postedCards);
    } else if (newAlignment === 'Sold') {
      const soldCards = await cardListSold();
      setCardAll(soldCards);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const allCards = await cardListAll();
      setCardAll(allCards);
    };

    fetchData();
  }, []);


  console.log(cardPosted)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography sx={{ paddingBottom: 4, marginBottom: 4 }} variant='h5'>
          Edition Cards
          <Button
            variant='text'
            sx={{ width: '150px', height: '30px', marginLeft: 4 }}
            onClick={cardListUpdate}
            disabled={isUpdating}
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
            <ToggleButton value="Owned">Owned</ToggleButton>
            <ToggleButton value="Posted">Posted</ToggleButton>
            <ToggleButton value="Sold">Sold</ToggleButton>
          </ToggleButtonGroup>
        </Typography>
        <Grid container spacing={6} sx={{ overflowY: 'auto', maxHeight: '95vh' }}>
          {alignment === 'Owned' && cardAll.map((card) => (
            <Grid item xs={12} sm={5} md={2} sx={{ paddingRight: '1px' }}>
              <EditionCardOwned
                image={card?.image}
                name={card?.name}
                tokenId={card?.id}
                description={card?.description}
                skill={card?.skill}
                cardAddress={card?.cardAddress}
                id={card?.id}
                uploader={card?.uploader}
              />
            </Grid>
          ))}
          {alignment === 'Posted' && cardPosted.map((card) => (
            <Grid item xs={12} sm={5} md={2} sx={{ paddingRight: '1px' }}>
              <EditionCardPosted
                image={card?.image}
                name={card?.name}
                tokenId={card?.id}
                description={card?.description}
                skill={card?.skill}
                cardAddress={card?.cardAddress}
                id={card?.id}
                lister={card?.lister}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PostCard;
