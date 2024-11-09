import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function EditCar(props) {
  const [open, setOpen] = useState(false);

  const [car, setCar] = useState({
    brand: "",
    model: "",
    color: "",
    fuel: "",
    modelYear: "",
    price: "",
  });

  const handleDialogOpen = () => {
    setOpen(true);
    setCar({
      brand: props.params.data.brand,
      model: props.params.data.model,
      color: props.params.data.color,
      fuel: props.params.data.fuel,
      modelYear: props.params.data.modelYear,
      price: props.params.data.price,
    });
  };

  const handleSave = () => {
    const updatedCar = { ...props.params.data, ...car };
    props.updateCar(updatedCar);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => handleDialogOpen(true)}>Edit</Button>
      <Dialog open={open}>
        <DialogTitle>Edit Car</DialogTitle>
        <DialogContent>
          <TextField
            label="Brand"
            value={car.brand}
            variant="standard"
            onChange={(event) => setCar({ ...car, brand: event.target.value })}
            margin="dense"
            fullWidth
          />
          <TextField
            label="Model"
            value={car.model}
            variant="standard"
            onChange={(event) => setCar({ ...car, model: event.target.value })}
            margin="dense"
            fullWidth
          />
          <TextField
            label="Color"
            value={car.color}
            variant="standard"
            onChange={(event) => setCar({ ...car, color: event.target.value })}
            margin="dense"
            fullWidth
          />
          <TextField
            label="Fuel"
            value={car.fuel}
            variant="standard"
            onChange={(event) => setCar({ ...car, fuel: event.target.value })}
            margin="dense"
            fullWidth
          />
          <TextField
            label="Year"
            value={car.modelYear}
            variant="standard"
            onChange={(event) =>
              setCar({ ...car, modelYear: event.target.value })
            }
            margin="dense"
            fullWidth
          />
          <TextField
            label="Price"
            value={car.price}
            variant="standard"
            onChange={(event) => setCar({ ...car, price: event.target.value })}
            margin="dense"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>save</Button>
          <Button onClick={() => setOpen(false)}>close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
