// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },

    {
      sectionTitle: 'Marketplace and Auctions'
    },
    {
      title: 'Create Card',
      icon: Login,
      path: '/create-card',
      openInNewTab: false
    },
    {
      title: 'Post Card',
      icon: AlertCircleOutline,
      path: '/post-card',
      openInNewTab: false
    },
    {
      title: 'Post Pack',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    },
    {
      title: 'Auction Card',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    },
    {
      sectionTitle: 'Player management'
    },
    {
      title: 'Beatmap Maker',
      icon: FormatLetterCase,
      path: '/beatmap-maker'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    },
    {
      sectionTitle: 'Contracts and Settings'
    },
    {
      icon: CubeOutline,
      title: 'Contracts',
      path: '/contracts'
    },
  ]
}

export default navigation
