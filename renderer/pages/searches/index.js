// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from '../../../renderer/@core/styles/libs/react-datepicker'

// ** Components Imports
import SearchesForm from '../../../renderer/views/cards/SearchesForm'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Searches = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <SearchesForm />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default Searches
