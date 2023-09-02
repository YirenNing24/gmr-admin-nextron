// ** React Imports
import { useState, forwardRef } from 'react';
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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ListCard = ({ isOpen, onClose }) => {
    const [contracts, setContracts] = useState({ })

    // ** Hooks
    const { register, handleSubmit, formState: { errors } } = useForm()
    const user = userStore();
    const username = user.newUser?.safeProperties.username


    const onSubmit = async (data) => {
      console.log(data)

    }
    

  return (
    <div>

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
            <TextField sx={{marginBottom: '10px'}} fullWidth label='Card contract address'
              {...register('assetContractAddress')}/>
            <TextField sx={{marginBottom: '10px'}} fullWidth label='Token ID' 
              {...register('tokenId')}/>
          <TextField sx={{marginBottom: '10px'}} fullWidth label='Quantity' 
              {...register('quantity')}/>
            <FormControl fullWidth sx={{marginBottom: '10px'}} >
              <InputLabel>Token</InputLabel>
              <Select name='skill' label='Token' defaultValue={'doubleUp'}
                {...register('currencyContractAddress', { required: 'Skill is required' })}>
                  <MenuItem value='doubleUp'>$BEATS</MenuItem>
                  <MenuItem value='heal'>$KMR</MenuItem>
                  <MenuItem value='add'>$THUMPIN</MenuItem>
                  <MenuItem value='attack'>$XRP</MenuItem>
                  <MenuItem value='none'>$MATIC</MenuItem>
              </Select>
            </FormControl>
            <TextField sx={{marginBottom: '10px'}} fullWidth  label='Price' type='number'
              {...register('pricePerToken')}/>
            <TextField sx={{marginBottom: '10px'}} type='date' fullWidth label='Sale start date' focused
              {...register('startTimestamp')}/>
            <TextField sx={{marginBottom: '10px'}} type='date' fullWidth label='Sale end date' focused
              {...register('endTimestamp')}/>
            <TextField sx={{marginBottom: '10px'}} type='bool' fullWidth label='Reserved listing' defaultValue='false'
              {...register('isReservedListing')}/>
            
          </Grid>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={''}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit(onSubmit)}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ListCard