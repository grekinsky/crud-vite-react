import React, { ChangeEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCoffee } from '../store/coffeeSlice';
import { AppDispatch } from '../store';
import { Coffee } from '../App.type';
import { useNavigate } from 'react-router-dom';

const AddCoffeeForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<Coffee>({
    id: 0,
    title: '',
    description: '',
    ingredients: [],
    image: '',
  });

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    await dispatch(addCoffee(formData));
    // Limpia la forma
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
      <input type="text" name="title" onChange={handleOnChange} />
      <input type="text" name="description" onChange={handleOnChange} />
      <button onClick={handleSubmit}>Add coffee</button>
    </div>
  );
};

export default AddCoffeeForm;
