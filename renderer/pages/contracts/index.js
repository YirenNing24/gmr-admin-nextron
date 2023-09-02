// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from '../../../renderer/@core/styles/libs/react-datepicker'

// ** Components Imports
import ContractForm from '../../../renderer/views/cards/ContractForm'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const FormLayouts = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ContractForm />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
