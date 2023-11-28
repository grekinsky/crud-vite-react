import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { fetchCoffeeById, modifyCoffee } from '../store/coffeeSlice';
import { AppDispatch, RootState } from '../store';
import { Coffee } from '../App.type';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

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
    if (!(formData.title && formData.description)) return;
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
    <>
      <Typography component="h1" variant="h5">
        Edit Coffee
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }} maxWidth={'sm'}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleOnChange}
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          required
          fullWidth
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleOnChange}
          sx={{ mt: 1 }}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Image"
          name="image"
          value={formData.image}
          onChange={handleOnChange}
        />
        <Grid container spacing={2}>
          <Grid item xs>
            <Button
              type="button"
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 1 }}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs>
            <Button
              type="button"
              component={RouterLink}
              to="/"
              fullWidth
              variant="outlined"
              sx={{ mt: 1 }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ModifyCoffeeForm;
