// ** React Imports
import { forwardRef, useState } from 'react'
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


const ContractForm = ({ beats, kmr, thumpin, card, cardMarketPlace, pack, packMarketPlace }) => {
  // ** States

  // ** Hooks
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    console.log(data)

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
              <TextField fullWidth label='$BEATS' defaultValue={"tae"}
                {...register('beatstAddress')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='$KMR' 
                {...register('kmrAddress')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='$THUMPIN'
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
              <TextField fullWidth label='Card address' placeholder='Leonard' 
                {...register('cardAddress')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Card marketplace address' placeholder='Carter' 
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
              <TextField fullWidth label='Pack address' placeholder='+1-123-456-8790' 
                {...register('packAddress')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Pack marketplace address' placeholder='+1-123-456-8790' 
                {...register('packMarketplaceAddress')}/>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined' >
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default ContractForm
