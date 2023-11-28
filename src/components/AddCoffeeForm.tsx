import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { addCoffee } from '../store/coffeeSlice';
import { AppDispatch } from '../store';
import { Coffee } from '../App.type';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

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
    if (!(formData.title && formData.description)) return;
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
    <>
      <Typography component="h1" variant="h5">
        Add Coffee
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
          autoFocus
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
          sx={{ my: 2 }}
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

export default AddCoffeeForm;
