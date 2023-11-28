import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, useParams, Routes } from 'react-router-dom';
import store from './store';
import CoffeeList from './components/CoffeeList';
import ModifyCoffeeForm from './components/ModifyCoffeeForm';
import AddCoffeeForm from './components/AddCoffeeForm';

const ModifyCoffeeFormScreen = () => {
  const { coffeeId } = useParams<{ coffeeId: string }>();
  const parsedcoffeeId = parseInt(coffeeId ?? '0', 10);
  return <ModifyCoffeeForm id={parsedcoffeeId} />;
};

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Coffee List</Link>
            </li>
            <li>
              <Link to="/add">Add a Coffee</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/add" element={<AddCoffeeForm />} />
          <Route path="/modify/:coffeeId" element={<ModifyCoffeeFormScreen />} />
          <Route
            path="/"
            element={
              <div>
                <h1>Coffee List</h1>
                <CoffeeList />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  </Provider>
);

export default App;
