// ** React Imports
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';

// ** API and UserStore
import userStore from '../../zustand/UserStore';
import { createCard } from '../../server/mint';
import { contracts } from '../../server/contracts';

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

const TabCreateCard = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('https://i.pinimg.com/1200x/07/c7/0f/07c70f7c0995496b522ca19513167016.jpg')
  const [base64, setBase64Image] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [contractAddress, setContractAddress] = useState([])
  const [loading, setLoading] = useState(true);

  // ** Hooks
  const { register, handleSubmit, formState: { errors } } = useForm()
  const user = userStore();

  const editionAddress = contractAddress[0]?.cardAddress;
  const username = user.user?.safeProperties.username
  
  const onSubmit = async (data) => {
    setIsUploading(true);

    try {
      const {
        description, era, 
        experience, healboost, 
        level, name, position, 
        position2 , quantity, 
        rarity, scoreboost, skill, tier, stars, breakthrough, awakencount, boostcount } = data
  
      const metadata = {
        name, era, 
        description,scoreboost, 
        healboost, level,
        experience, rarity,
        tier, position, 
        position2, skill, stars, breakthrough, awakencount, boostcount
      }
      const supply = parseInt(quantity)
      const base64Image = base64
      const uploader = username

      await createCard(metadata, supply, base64Image, uploader, editionAddress); 
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload Card Image
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
            <TextField fullWidth name='name' label='Card name' placeholder='Leeseo Lovedive LE' 
            {...register('name', { required: 'Card Name is required' })}/>
            {errors.name && <p>{errors.name.message}</p>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth name='description' label='Description' placeholder='Leeseo is really really...'
            {...register('description', { required: 'Description is required' })}/>
            {errors.description && <p>{errors.description.message}</p>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth name='era' label='Era' placeholder='Lovedive' 
            {...register('era', { required: 'Era is required' })}/>
            {errors.era && <p>{errors.era.message}</p>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth name='position' label='Position1' placeholder='Visual' 
            {...register('position', { required: 'Position is required' })}/>
            {errors.position && <p>{errors.position.message}</p>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth name='position2' label='Position2' placeholder='Visual' 
            {...register('position2', { required: 'Position2 is required' })}/>
            {errors.position2 && <p>{errors.position2.message}</p>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField type='number' fullWidth name='scoreboost' label='Score Boost' placeholder='10'
              {...register('scoreboost', { required: 'Scoreboost is required' })}/>
              {errors.scoreboost && <p>{errors.scoreboost.message}</p>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField type='number' fullWidth name='healboost' label='Heal Boost' placeholder='10' 
              {...register('healboost', { required: 'Healboost is required' })}/>
              {errors.healboost && <p>{errors.healboost.message}</p>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField type='number' fullWidth name='boostcount' label='Boost Count' placeholder='0' 
              {...register('boostcount', { required: 'boostcount is required' })}/>
              {errors.boostcount && <p>{errors.boostcount.message}</p>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField type='number' fullWidth name='awakencount' label='Awaken Count' placeholder='0' 
              {...register('awakencount', { required: 'Awaken Count is required' })}/>
              {errors.awakencount && <p>{errors.awakencount.message}</p>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Skill</InputLabel>
              <Select name='skill' label='Skill' defaultValue='doubleUp'
                {...register('skill', { required: 'Skill is required' })}>
                <MenuItem value='doubleUp'>doubleup</MenuItem>
                <MenuItem value='heal'>heal</MenuItem>
                <MenuItem value='ghost'>ghost</MenuItem>
                <MenuItem value='attack'>attack</MenuItem>
                <MenuItem value='add'>add</MenuItem>
                <MenuItem value='none'>none</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Rarity</InputLabel>
              <Select name='rarity' label='Rarity' defaultValue='common'
                  {...register('rarity', { required: 'Rarity is required' })}>
                <MenuItem value='common'>common</MenuItem>
                <MenuItem value='uncommon'>uncommon</MenuItem>
                <MenuItem value='rare'>rare</MenuItem>
                <MenuItem value='ultraRare'>ultraRare</MenuItem>
                <MenuItem value='legendary'>legendary</MenuItem>
                <MenuItem value='limitedEdition'>limitedEdition</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Tier</InputLabel>
              <Select name='tier' label='Tier' defaultValue='trainee'
                  {...register('tier', { required: 'Tier is required' })}>
                <MenuItem value='trainee'>trainee</MenuItem>
                <MenuItem value='rookie'>rookie</MenuItem>
                <MenuItem value='expert'>expert</MenuItem>
                <MenuItem value='superstar'>superstar</MenuItem>
                <MenuItem value='legend'>legend</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Stars</InputLabel>
              <Select name='stars' label='Stars' defaultValue='1'
                  {...register('stars', { required: 'Stars is required' })}>
                <MenuItem value='1'>1</MenuItem>
                <MenuItem value='2'>2</MenuItem>
                <MenuItem value='3'>3</MenuItem>
                <MenuItem value='4'>4</MenuItem>
                <MenuItem value='5'>5</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Breakthrough</InputLabel>
              <Select name='Breakthrough' label='Breakthrough' defaultValue='false'
                  {...register('breakthrough', { required: 'Breakthrough is required' })}>
                <MenuItem value='true'>true</MenuItem>
                <MenuItem value='false'>false</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField type='number' name='level' fullWidth label='Level' placeholder='0'
              {...register('level', { required: 'Level is required' })}/>
              {errors.level && <p>{errors.level.message}</p>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth name='experience' label='Experience' placeholder='0' 
            {...register('experience', { required: 'Expeerience is required' })}/>
            {errors.position && <p>{errors.experience.message}</p>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField type='number' name='quantity' fullWidth label='Quantity' placeholder='100'
              {...register('quantity', { required: 'Quantity is required' })}/>
              {errors.quantity && <p>{errors.quantity.message}</p>}
          </Grid>

          <Grid item xs={12}>
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

export default TabCreateCard 
