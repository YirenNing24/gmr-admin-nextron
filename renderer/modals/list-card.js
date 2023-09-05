// ** React Imports
import { useState, forwardRef, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';

// ** MUI Imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

// ** Userstore and API
import userStore from '../zustand/UserStore';
import { listCard } from '../../renderer/server/listcard';
import { contracts } from '../../renderer/server/contracts';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ListCard = ({ cardAddress, tokenId, isOpen, onClose, id }) => {

    // ** States
    const [contractAddress, setContractAddress] = useState([])
    const [loading, setLoading] = useState(true);

    // ** Hooks
    const { register, handleSubmit, formState: { errors } } = useForm()
    const user = userStore();
    const username = user.newUser?.safeProperties.username

    let currencyName = '';
    switch (currencyContractAddress) {
      case contractAddress[0].beatsAddress:
        currencyName = 'BEATS';
        break;
      case contractAddress[0].kmrAddress:
        currencyName = 'KMR';
        break;
      case contractAddress[0].thumpinAddress:
        currencyName = 'THUMPIN';
        break;
      case 'matic':
        currencyName = 'MATIC';
        break;
      default:
        currencyName = 'Unknown';
        break;
    }
    
    const onSubmit = async (data) => {
      const { 
        assetContractAddress, tokenId, 
        currencyContractAddress, pricePerToken, 
        startTimestamp, endTimestamp, isReservedListing } = data 

      const listing = {
        currencyName,
        tokenName,
        assetContractAddress,
        tokenId,
        quantity: 1,
        currencyContractAddress,
        pricePerToken,
        startTimestamp,
        endTimestamp,
        isReservedListing,
        id,
        lister: username   
      }

      console.log(listing)
      await listCard(listing)
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const allContracts = await contracts();
          setContractAddress(allContracts);
          setLoading(false); 
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData(); 
    }, []);

      if (loading) {
        return
      }
    

  return (
    <Fragment>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
      >
        <DialogTitle sx={{textAlign: 'center'}}>{"Post card to store?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            
            <Grid item xs={12} sm={12} sx={{marginTop: '5px'}}>

              <TextField sx={{marginBottom: '10px'}} fullWidth label='Card contract address' value={cardAddress} placeholder='Card contract address'
                {...register('assetContractAddress', { required: 'Card Contract Address is required' })}/>

              <TextField sx={{marginBottom: '10px'}} fullWidth label='Token ID' value={tokenId} placeholder='Token ID' 
                {...register('tokenId', { required: 'Token ID is required' })}/>

            <TextField sx={{marginBottom: '10px'}} fullWidth label='Quantity' value={1} placeholder='1' 
                {...register('quantity', { required: 'Quantity is required' })}/>

              <FormControl fullWidth sx={{marginBottom: '10px'}} >
                <InputLabel>Token</InputLabel>
                <Select name='skill' label='Token' defaultValue={'doubleUp'}
                  {...register('currencyContractAddress', { required: 'Token is required' })}>
                    <MenuItem value={contractAddress[0].beatsAddress}> $BEATS </MenuItem>
                    <MenuItem value={contractAddress[0].kmrAddress}> $KMR </MenuItem>
                    <MenuItem value={contractAddress[0].thumpinAddress}> $THUMPIN </MenuItem>
                    <MenuItem value='matic'> $MATIC </MenuItem>
                </Select>
              </FormControl>

              <TextField sx={{marginBottom: '10px'}} fullWidth  label='Price' type='number'
                {...register('pricePerToken', { required: 'Price is required' })}/>

              <TextField sx={{marginBottom: '10px'}} type='date' fullWidth label='Sale start date' focused
                {...register('startTimestamp', { required: 'Sale start date is required' })}/>

              <TextField sx={{marginBottom: '10px'}} type='date' fullWidth label='Sale end date' focused
                {...register('endTimestamp', { required: 'Sale end date is required' })}/>

              <TextField sx={{marginBottom: '10px'}} type='bool' fullWidth label='Reserved listing' defaultValue='false'
                {...register('isReservedListing', { required: 'Reserved listing is required' })}/>
              
            </Grid>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={onClose}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit(onSubmit)}>Save</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default ListCard