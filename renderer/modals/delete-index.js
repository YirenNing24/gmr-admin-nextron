// ** React Imports
import { useState, forwardRef, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

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
import { deleteIndex } from '../../renderer/server/search';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DeleteIndex = ({ isOpen, onClose }) => {
    // ** States
    const [isUploading, setIsUploading] = useState(false)

    // ** Hooks
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const user = userStore();


    const onSubmit = async (data) => {
        setIsUploading(true)
        const { indexName } = data
        await deleteIndex( indexName )
        
        setIsUploading(false)
        router.reload()
        onClose()
    }

  return (
    <Fragment>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
      >
        <DialogTitle sx={{textAlign: 'center'}}>{"Delete index?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid item xs={12} sm={12} sx={{marginTop: '5px'}}>
              <TextField sx={{marginBottom: '10px'}} fullWidth label='Index name' placeholder='index name'
                {...register('indexName', { required: 'Index name is required' })}/>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant='outlined'>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={isUploading}>
            {isUploading ? 'DELETING...' : 'DELETE'}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default DeleteIndex