// ** React Imports
import { useState } from 'react';
import { Fragment } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Modals

const BoxCardSelect = ({ image, name, tokenId, skill, cardAddress, id, uploader, setCard, index }) => {
  // Declare isSelected as a state variable at the component level
  const [isSelected, setIsSelected] = useState(false);

  const cardData = () => {
    if (isSelected) {
      // If the card is already selected, deselect it
      setIsSelected(false);


      setCard({
        assetContract: '',
        tokenId: '',
        name: '',
        id: '',
      }, index);
    } else {
      // If the card is not selected, select it
      setIsSelected(true);

      // Call the setCard function with card data to indicate selection
      setCard({
        assetContract: cardAddress,
        tokenId,
        name,
        id,
      }, index);
    }
  };

  return (
    <Fragment>
      <Card
        onClick={cardData}
        sx={{ opacity: isSelected ? 0.2 : 1 }}
      >
        <CardMedia sx={{ height: '17.5rem' }} image={image} />
        <CardContent sx={{ padding: (theme) => `${theme.spacing(3, 5.25, 3)} !important` }}>
          <Typography variant='body2' sx={{ marginBottom: 2 }}>
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default BoxCardSelect;



