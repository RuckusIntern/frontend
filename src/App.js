import './App.css'
import { Products } from './components/products'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'


function App() {
  return (
    <Container maxWidth = "xl" className="container">
      <br></br>
      <Typography variant="h4" component="div" gutterBottom>
      Vulnerability Database
      </Typography>
      <Products/>
    </Container>
  )
}

export default App;
