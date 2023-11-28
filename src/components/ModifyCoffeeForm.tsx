import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoffeeById, modifyCoffee } from '../store/coffeeSlice';
import { AppDispatch, RootState } from '../store';
import { Coffee } from '../App.type';
import { useNavigate } from 'react-router-dom';

type Props = {
  id: number;
};

const ModifyCoffeeForm: React.FC<Props> = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<Coffee>({
    id: 0,
    title: '',
    description: '',
    ingredients: [],
    image: '',
  });

  useEffect(() => {
    dispatch(fetchCoffeeById(id));
  }, [id, dispatch]);

  const { singleFetchStatus, singleFetchError } = useSelector((state: RootState) => state.coffees);

  const coffee = useSelector((state: RootState) =>
    state.coffees.coffees.find((coffee) => coffee.id === id),
  );

  useEffect(() => {
    if (coffee) {
      setFormData(coffee);
    }
  }, [coffee]);

  if (!id) return '';

  // Mostrar cargador
  if (singleFetchStatus === 'loading') return 'loading...';

  // Mostrar error
  if (singleFetchError) return singleFetchError;

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    await dispatch(modifyCoffee(formData));
    // Clean form
    setFormData({
      id: 0,
      title: '',
      description: '',
      ingredients: [],
      image: '',
    });

    navigate('/');
  };

  return (
    <div>
      <input type="text" name="title" value={formData.title} onChange={handleOnChange} />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleOnChange}
      />
      <button onClick={handleSubmit}>Modify coffee</button>
    </div>
  );
};

export default ModifyCoffeeForm;
