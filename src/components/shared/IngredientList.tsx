import { useRef, useState } from 'react';
import { Coffee } from '../../App.type';
import { Box, Button, Chip, Stack, TextField } from '@mui/material';
import CoffeeDialog from './CoffeeDialog';

type IngredientListProps = Pick<Coffee, 'ingredients'> & {
  onChange: (value: string[]) => void;
};

const IngredientList: React.FC<IngredientListProps> = ({ ingredients, onChange }) => {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const ingredientNameRef = useRef<HTMLInputElement>(null);
  return (
    <Box my={1}>
      {ingredients.length ? (
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          {ingredients.map((ingredient) => (
            <Chip
              key={ingredient}
              label={ingredient}
              onDelete={() => {
                onChange(ingredients.filter((i) => i !== ingredient));
              }}
            />
          ))}
        </Stack>
      ) : null}
      <Button
        type="button"
        variant="contained"
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        Add Ingredient
      </Button>
      <CoffeeDialog
        open={isDialogOpen}
        title={'Add Ingredient'}
        onAccept={() => {
          if (!ingredientNameRef.current?.value) return;
          onChange([...ingredients, ingredientNameRef.current.value]);
          setOpenDialog(false);
        }}
        onCancel={() => {
          setOpenDialog(false);
        }}
      >
        <>
          <TextField
            autoFocus
            margin="dense"
            id="ingredientName"
            label="Ingredient Name"
            type="text"
            fullWidth
            variant="standard"
            inputRef={ingredientNameRef}
          />
        </>
      </CoffeeDialog>
    </Box>
  );
};

export default IngredientList;
