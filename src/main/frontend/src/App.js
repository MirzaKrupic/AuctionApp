import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
