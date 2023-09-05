// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Userstore and API Imports
import { updateContracts, contracts } from '../../../renderer/server/contracts';
import userStore from '../../../renderer/zustand/UserStore';

const ContractForm = () => {
  // ** States
  const [contractAddress, setContractAddress] = useState([])
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false)

  // ** Hooks
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { setContracts } = userStore()

  const onSubmit = async (data) => {
    setIsUploading(true);
    try {
      const {
        beatsAddress,
        cardAddress,
        cardMarketplaceAddress,
        kmrAddress,
        packAddress,
        packMarketplaceAddress,
        thumpinAddress
      } = data;

      const contracts = {
        beatsAddress,
        cardAddress,
        cardMarketplaceAddress,
        kmrAddress,
        packAddress,
        packMarketplaceAddress,
        thumpinAddress
      };

        await updateContracts(contracts); 
      } catch (error) {
        console.error('Error updating contract addresses', error);
      } finally {
        setIsUploading(false);
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allContracts = await contracts();
        setContracts(allContracts)
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
    <Card>
      <CardHeader title='Contract addresses and other chain constants' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => e.preventDefault()}>

        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. Token Contract Addresses
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='$BEATS' defaultValue={contractAddress[0].beatsAddress}
                {...register('beatsAddress')} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='$KMR' defaultValue={contractAddress[0].kmrAddress}
                {...register('kmrAddress')} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='$THUMPIN' defaultValue={contractAddress[0].thumpinAddress}
                {...register('thumpinAddress')} />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                2. Smart Contracts - Card NFT Addresses, Marketplace Addresses
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Card address' defaultValue={contractAddress[0].cardAddress}
                {...register('cardAddress')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Card marketplace address' defaultValue={contractAddress[0].cardMarketplaceAddress}
                {...register('cardMarketplaceAddress')} />
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                id='form-layouts-separator-date'
                onChange={date => setDate(date)}
              />
            </Grid> */}

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Pack address' defaultValue={contractAddress[0].packAddress}
                {...register('packAddress')} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Pack marketplace address' defaultValue={contractAddress[0].packMarketplaceAddress} 
                {...register('packMarketplaceAddress')}/>
            </Grid>
            
          </Grid>
        </CardContent>
   
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={handleSubmit(onSubmit)} disabled={isUploading}>
          {isUploading ? 'Saving...' : 'Submit'}
          </Button>

        </CardActions>
      </form>
    </Card>
  )
}

export default ContractForm
