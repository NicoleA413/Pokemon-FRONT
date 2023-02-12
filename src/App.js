import './App.css';
import { Route, useLocation } from 'react-router-dom';
import { Home, Landing, Form, Detail, Edit } from './views';
import NavBar from './components/NavBar/NavBar';

function App() {
  const location = useLocation();

  return (
    <div className='App'>

      {location.pathname !== "/" && <NavBar />}

      <Route exact path= '/'>
        <Landing />    
      </Route>

      <Route exact path='/pokemons'>
        <Home /> 
      </Route>

      <Route exact path='/create'>
        <Form /> 
      </Route>

      <Route exact path='/pokemons/:id'>
        <Detail /> 
      </Route>

      <Route exact path='/pokemons/edit/:id'>
        <Edit /> 
      </Route>

    </div>
  );
}

export default App;
