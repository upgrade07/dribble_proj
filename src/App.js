import './App.css';
import HorizontalStepper from './components/HorizontalStepper';

function App() {
  return (
    <div className="App">
      <img className='logo' src={require('./assets/logo.jpeg')} alt='logo'></img>
      <HorizontalStepper/>
    </div>
  );
}

export default App;
