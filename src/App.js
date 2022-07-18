import './App.css'
import { AffectedPackage } from './components/AffectedPackage'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { PaginationTable } from './components/PaginationTable'


function App() {
  return (
    <Container maxWidth = "xl" className="container">
      <br></br>
      <Typography variant="h4" component="div" gutterBottom>
      Vulnerability Database
      </Typography>
      {/* <PaginationTable/> */}
      <AffectedPackage/>
    </Container>
  )
}

export default App;
