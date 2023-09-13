// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from '../../../renderer/@core/styles/libs/react-datepicker'

// ** Components Imports
import PlayersList from '../../../renderer/views/cards/PlayersList'
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Players = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PlayersList />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default Players
