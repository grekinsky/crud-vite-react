import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { deleteCoffee, fetchCoffees } from '../store/coffeeSlice';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';

const CoffeeList: React.FC = () => {
  const { coffees, status } = useSelector((state: RootState) => state.coffees);
  const dispatch = useDispatch<AppDispatch>();
  const [queryDeleteCoffeId, setQueryDeleteCoffeId] = React.useState(0);

  const handleConfirmClickOpen = (coffeeId: number) => {
    setQueryDeleteCoffeId(coffeeId);
  };

  const handleConfirmClose = () => {
    setQueryDeleteCoffeId(0);
  };

  const handleRemoveCoffee = () => {
    dispatch(deleteCoffee(queryDeleteCoffeId));
    setQueryDeleteCoffeId(0);
  };

  useEffect(() => {
    dispatch(fetchCoffees());
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Grid container spacing={4}>
        {coffees.map((coffee) => (
          <Grid item key={coffee.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="div"
                sx={{
                  // 16:9
                  pt: '56.25%',
                }}
                image={coffee.image}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {coffee.title}
                </Typography>
                <Typography>{coffee.description}</Typography>
              </CardContent>
              <CardActions>
                <Button component={RouterLink} to={`/modify/${coffee.id}`}>
                  Edit
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    handleConfirmClickOpen(coffee.id);
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={Boolean(queryDeleteCoffeId)}
        onClose={handleConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete this coffee?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to permanently delete a Coffee recipe, please confirm this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose}>No</Button>
          <Button
            onClick={() => {
              handleRemoveCoffee();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CoffeeList;
