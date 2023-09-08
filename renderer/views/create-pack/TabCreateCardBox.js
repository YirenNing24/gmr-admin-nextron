// ** React Imports
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';

// ** API and UserStore
import userStore from '../../zustand/UserStore';
import { createCard } from '../../server/mint';
import { contracts } from '../../../renderer/server/contracts';

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Modals
import CreatePackCard from '../../../renderer/modals/create-pack-card';


// ** Icons Imports
const ImgStyled = styled('img')(({ theme }) => ({
  width: 240,
  height: 240,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabCreateCardBox = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('https://i.pinimg.com/1200x/07/c7/0f/07c70f7c0995496b522ca19513167016.jpg')
  const [base64, setBase64Image] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [contractAddress, setContractAddress] = useState([])
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ** Hooks
  const { register, handleSubmit, formState: { errors } } = useForm()
  const user = userStore();

  const packAddress = user?.contracts?.packAddress;
  const username = user.newUser?.safeProperties.username

  const openModal = () => {
    setIsModalOpen(true);
  };

  const onSubmit = async (data) => {
    setIsUploading(true);

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
    };

    try {
      const {
        description, era, 
        experience, healboost, 
        level, name, position, 
        position2 , quantity, 
        rarity, scoreboost, skill, tier, stars, breakthrough } = data
  
      const metadata = {
        name, era, 
        description,scoreboost, 
        healboost, level,
        experience, rarity,
        tier, position, 
        position2, skill, stars, breakthrough
      }
      const supply = parseInt(quantity)
      const base64Image = base64
      const uploader = username

      await createCard(metadata, supply, base64Image, uploader, packAddress); 
    } catch (error) {
      console.error('Error creating card:', error);
    } finally {
      setIsUploading(false);
    }
  };
 
  const onChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => {
        const base64String = reader.result.split(',')[1]; 
        setBase64Image(base64String); 
        setImgSrc(reader.result); 
      };
      reader.readAsDataURL(files[0]);
    }
  };

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

    <CardContent>
      <CreatePackCard isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload Card Box Image
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Please only use PNG format.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth name='card box name' label='Card box name' placeholder='Assorted all groups card box' 
            {...register('name', { required: 'Card box name is required' })}/>
            {errors.name && <p>{errors.name.message}</p>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth name='description' label='Description' placeholder='Leeseo is really really...'
            {...register('description', { required: 'Description is required' })}/>
            {errors.description && <p>{errors.description.message}</p>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth name='Contents' label='Contents' placeholder='Enter card box contents separated by comma' 
            {...register('contents', { required: 'Era is required' })}/>
            {errors.contents && <p>{errors.contents.message}</p>}
          </Grid>

           <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select name='type' label='Type' placeholder='Choose type'
                  {...register('type', { required: 'Type is required' })}>
                <MenuItem value='assorted'>assorted</MenuItem>
                <MenuItem value='exclusive'>exclusive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant='heading' sx={{ marginTop: 1 }}>
                Token Rewards
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
              <InputLabel>Token</InputLabel>
              <Select name='token' label='Token' placeholder='BEATS'
                  {...register('token', { required: 'Token is required' })}>
                <MenuItem value={contractAddress[0].beatsAddress}>BEATS</MenuItem>
                <MenuItem value={contractAddress[0].kmrAddress}>KMR</MenuItem>
              </Select>
            </FormControl>
          </Grid> 
          
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Quantity per reward' placeholder='10'
            {...register('quantityPerReward', { required: 'Quantity per reward is required' })}/>
            {errors.quantityPerReward && <p>{errors.quantityPerReward.message}</p>}
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Quantity' placeholder='1000'
            {...register('quantity', { required: 'Quantity is required' })}/>
            {errors.quantity && <p>{errors.quantity.message}</p>}
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Total rewards' placeholder='10000'
            {...register('totalRewards', { required: 'Total rewards is required' })}/>
            {errors.totalRewards && <p>{errors.totalRewards.message}</p>}
          </Grid>

          <Grid item xs={12} sm={12}>
            <Typography variant='heading' sx={{ marginTop: 1 }}>
                Card Reward
            </Typography>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Card' placeholder='Choose a card' onClick={openModal}
              {...register('card', { required: 'Card is required' })}/>
              {errors.card && <p>{errors.card.message}</p>}
          </Grid> 

          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Quantity per reward' placeholder='10'
            {...register('quantityPerReward', { required: 'Quantity per reward is required' })}/>
            {errors.quantityPerReward && <p>{errors.quantityPerReward.message}</p>}
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Quantity' placeholder='1000'
            {...register('quantity', { required: 'Quantity is required' })}/>
            {errors.quantity && <p>{errors.quantity.message}</p>}
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Total rewards' placeholder='10000'
            {...register('totalRewards', { required: 'Total rewards is required' })}/>
            {errors.totalRewards && <p>{errors.totalRewards.message}</p>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField type='number' fullWidth label='Rewards per card box' placeholder='5'
              {...register('rewardsPerPack', { required: 'Quantity is required' })}/>
              {errors.rewardsPerPack && <p>{errors.rewardsPerPack.message}</p>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField type='date' focused fullWidth label='Open start time' placeholder='5'
              {...register('openStartTime', { required: 'Open start time is required' })}/>
              {errors.openStartTime && <p>{errors.openStartTime.message}</p>}
          </Grid>

          <Grid item xs={12} >
            <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }} disabled={isUploading}>
              {isUploading ? 'Please Wait...' : 'Submit'}
            </Button>
            <Button type='reset' variant='outlined'>
              Reset
            </Button>
          </Grid>

        </Grid>
      </form>
    </CardContent>
  )
}

export default TabCreateCardBox 