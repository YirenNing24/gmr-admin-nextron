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


// ** Userstore and API
import userStore from '../zustand/UserStore';
import { listCard } from '../../renderer/server/listcard';
import { contracts } from '../../renderer/server/contracts';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AddIndex = ({ cardAddress, tokenId, isOpen, onClose, id }) => {
    // ** States
    const [contractAddress, setContractAddress] = useState([])
    const [loading, setLoading] = useState(true);

    // ** Hooks
    const { register, handleSubmit, formState: { errors } } = useForm()
    const user = userStore();


    const onSubmit = async (data) => {
        console.log(data)
      
    }

  return (
    <Fragment>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
      >
        <DialogTitle sx={{textAlign: 'center'}}>{"Add new index?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid item xs={12} sm={12} sx={{marginTop: '5px'}}>
              <TextField sx={{marginBottom: '10px'}} fullWidth label='Index name' value={cardAddress} placeholder='index name'
                {...register('indexName', { required: 'Index name is required' })}/>

            <TextField sx={{marginBottom: '10px'}} fullWidth label='Primary key' value={cardAddress} placeholder='primary key'
                {...register('primaryKey', { required: 'Primary key is required' })}/>

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

export default AddIndex