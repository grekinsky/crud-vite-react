import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type Props = {
  acceptLabel?: string;
  cancelLabel?: string;
  title?: string;
  onCancel?: () => void;
  onAccept?: () => void;
  open: boolean;
  children?: React.ReactNode;
};

const CoffeeDialog: React.FC<Props> = ({
  cancelLabel = 'Cancel',
  acceptLabel = 'Accept',
  title = 'Dialog',
  onCancel = () => null,
  onAccept = () => null,
  open = true,
  children,
}) => (
  <Dialog
    open={open}
    onClose={onCancel}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent id="alert-dialog-description">{children}</DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>{cancelLabel}</Button>
      <Button onClick={onAccept}>{acceptLabel}</Button>
    </DialogActions>
  </Dialog>
);

export default CoffeeDialog;
