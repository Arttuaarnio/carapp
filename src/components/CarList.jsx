import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import { Button, Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function CarList() {
  // tilamuuttujat autoille
  const [cars, setCars] = useState([
    { brand: "", model: "", color: "", fuel: "", modelYear: "", price: "" },
  ]);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [msg, setMsg] = useState("");

  //ag-grid
  const [colDefs, setColDefs] = useState([
    { field: "brand", flex: 1 },
    { field: "model", flex: 1 },
    { field: "color", flex: 1 },
    { field: "fuel", flex: 1 },
    { field: "modelYear", flex: 1 },
    { field: "price", flex: 1 },
    {
      cellRenderer: (params) => <EditCar params={params} updateCar={updateCar}/>,
      flex: 1,
    },
    {
      cellRenderer: (params) => (
        <Button size="small" color="error" onClick={() => deleteCar(params)}>
          Delete
        </Button>
      ),
      flex: 1,
    },
  ]);

  //poista auto funktio
  const deleteCar = (params) => {
    fetch(params.data._links.car.href, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setOpenSnackbar(true);
          setMsg("Item successfully deleted");
          getCars();
        } else {
          openSnackbar(false);
        }
      })
      .catch((err) => {});
  };

  //tallenna auto
  const saveCar = (car) => {
    fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((response) => {
        if (!response.ok) {
          setOpenSnackbar(true);
          setMsg("Something went wrong!");
        } else {
          setOpenSnackbar(true);
          setMsg("Car added succesfully!");
          getCars();
        }
      })
      .catch((err) => console.error(err.data));
  };

  //muokkaa autoa
 const updateCar = (car) => {
   fetch(car._links.car.href, {
     method: "PUT",
     headers: {
       "Content-Type": "application/json",
       Accept: "application/json",
     },
     body: JSON.stringify(car),
   })
     .then((response) => {
       if (response.ok) {
         setOpenSnackbar(true);
         setMsg("Car updated successfully!");
         getCars();
       } else {
         setOpenSnackbar(true);
         setMsg("Something went wrong!");
       }
     })
     .catch((err) => console.error(err));
 };

  useEffect(() => getCars(), []);

  // hae autot rest api:n avulla ja aseta ne tilamuuttujiin
  const getCars = () => {
    fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data", data._embedded.cars);
        setCars(data._embedded.cars);
      })
      .catch((err) => {});
  };

  return (
    <>
      <AddCar saveCar={saveCar} />

      <div className="ag-theme-material" style={{ width: 1400, height: 400 }}>
        <AgGridReact
          rowData={cars}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={5}
          paginationPageSizeSelector={false}
        ></AgGridReact>
        <Snackbar
          open={openSnackbar}
          message={msg}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
        ></Snackbar>
      </div>
    </>
  );
}
