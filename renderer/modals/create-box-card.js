// ** React Imports
import { useState, useEffect } from 'react';

// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// ** Icons Imports
import Magnify from 'mdi-material-ui/Magnify'

// ** Box card select
import BoxCardSelect from '../views/cards/BoxCardSelect';

// ** API and Store imports
import { cardListAll } from '../server/stocks';
const CreateBoxCard = ({ isOpen, onClose, cardData }) => {

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

  const setCard = (data, index) =>{
    cardData(data, index)

  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={onClose}
        aria-labelledby="choose-a-reward-card"
      >
        <DialogTitle id="choose-a-reward-card">
          Select reward card
          <TextField
            size='small'
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 }, marginLeft: 4 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Magnify fontSize='small' />
                </InputAdornment>
              )
            }}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={3} sx={{ overflowY: 'auto', maxHeight: '95vh' }}>
            {cardAll.map((card, index) => (
              <Grid item xs={12} sm={4} md={4.5} sx={{ paddingRight: '1px' }}>
                <BoxCardSelect
                  image={card?.image}
                  name={card?.name}
                  tokenId={card?.id}
                  description={card?.description}
                  skill={card?.skill}
                  cardAddress={card?.cardAddress}
                  id={card?.id}
                  uploader={card?.uploader}
                  setCard={setCard}
                  index={index}
                  
                />
              </Grid>
          ))}
          </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Cancel
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateBoxCard