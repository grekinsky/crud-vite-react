import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { deleteCoffee, fetchCoffees } from '../store/coffeeSlice';
import { Link } from 'react-router-dom';

const CoffeeList: React.FC = () => {
  const { coffees, status } = useSelector((state: RootState) => state.coffees);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveCoffee = (id: number) => {
    dispatch(deleteCoffee(id));
  };

  useEffect(() => {
    dispatch(fetchCoffees());
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {coffees.map((coffee) => (
        <li key={coffee.id}>
          {coffee.title}{' '}
          <Link to={`/modify/${coffee.id}`}>
            <button>Modify</button>
          </Link>
          <button
            onClick={() => {
              handleRemoveCoffee(coffee.id);
            }}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CoffeeList;
