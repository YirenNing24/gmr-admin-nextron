// ** React Imports
import { useState, useEffect } from 'react';

// ** MUI Imports

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import PackCardSelect from '../../renderer/views/cards/PackCardSelect';

// ** API and Store imports
import { cardListAll } from '../server/stocks';
const CreatePackCard = ({ isOpen, onClose }) => {

  // ** States
  const [cardAll, setCardAll] = useState([]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchData = async () => {
      const allCards = await cardListAll();
      setCardAll(allCards);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={onClose}
        aria-labelledby="choose-a-reward-card"
      >
        <DialogTitle id="choose-a-reward-card">
          Select a reward card
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          {cardAll.map((card) => (
            <Grid item xs={12} sm={5} md={2} sx={{ paddingRight: '1px' }}>
              <PackCardSelect
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={onClose}>
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreatePackCard