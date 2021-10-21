import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HeaderAboveNav from './components/HeaderAboveNav';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <HeaderAboveNav />
      <Navigation />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
