import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function AddCar(props) {
  const [open, setOpen] = useState(false);

  const [car, setCar] = useState({
    brand: "",
    model: "",
    color: "",
    fuel: "",
    modelYear: "",
    price: "",
  });

  const handleSave = () => {
    props.saveCar(car);
    setOpen(false);
    setCar({
      brand: "",
      model: "",
      color: "",
      fuel: "",
      modelYear: "",
      price: "",
    });
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>Add car</Button>
      <Dialog open={open}>
        <DialogTitle> New Car</DialogTitle>
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
          <Button onClick={() => handleSave()}>Save</Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
