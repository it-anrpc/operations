import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  //form value
  const [groupID, setGroupID] = React.useState("");
  const [area, setArea] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [timeOpened, setTimeOpened] = React.useState("");
  const [timeClosed, setTimeClosed] = React.useState("");

  const handleOnChange = (value, stateSetter) => {
    stateSetter(value);
  };

  const handleSubmit = () => {
    axios({
      method: "post",
      url: "/api/shiftLog",
      data: {
        groupID: groupID,
        area: area,
        unit: unit,
        timeOpened: timeOpened,
        timeClosed: timeClosed,
      },
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (res) {
        //handle success
        if ((res.status = 200)) {
          console.log("success" + res);
        } else {
          // setError(" Error user name or password");
          return;
        }
      })
      .catch(function (res) {
        //handle error
        //setError(" Error user name or password");
        return;
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const groupsID = [
    { label: "Group-1", ID: 1 },
    { label: "Group-2", ID: 2 },
    { label: "Group-3", ID: 3 },
    { label: "Group-4", ID: 4 },
  ];

  const units = [
    { label: "331", ID: 331 },
    { label: "200", ID: 200 },
    { label: "201", ID: 201 },
    { label: "412", ID: 412 },
    { label: "300", ID: 300 },
    { label: "500", ID: 500 },
    { label: "400", ID: 400 },
    { label: "1XX", ID: "1XX" },
  ];

  const equibments = [
    { label: "tt-51", ID: "tt-51" },
    { label: "tt-60", ID: "tt-60" },
    { label: "xv-90", ID: "xv-90" },
    { label: "lt-18", ID: "lt-18" },
    { label: "pt-50", ID: "pt-50" },
    { label: "tt-30", ID: "tt-30" },
  ];

  const operators = [
    { label: "ahmed", ID: "ahmed" },
    { label: "ali", ID: "ali" },
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 m-2">
          <Button
            variant="contained"
            endIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={handleClickOpen}
          >
            NEW
          </Button>
        </div>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={groupsID}
                  sx={{ width: 250 }}
                  // getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(_, object) => {
                    handleOnChange(object.ID, setGroupID);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Group-ID" />
                  )}
                />
                <TextField
                  id="area"
                  label="Area"
                  type="search"
                  value={area}
                  onChange={(e) => {
                    handleOnChange(e.target.value, setArea);
                  }}
                  helperText="Some important text"
                />
                <Autocomplete
                  disablePortal
                  id="units"
                  options={units}
                  sx={{ width: 250 }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(_, object) => {
                    handleOnChange(object.ID, setUnit);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="UNIT" />
                  )}
                />
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Date&Time picker"
                    value={value}
                    inputFormat="d/MM/YYYY hh:mm:a"
                    disableFuture={true}
                    disableOpenPicker={true}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider> */}

                <TextField
                  id="timeOpened"
                  label="time opened"
                  type="datetime-local"
                  defaultValue={new Date().toJSON().slice(0, 16)}
                  sx={{ width: 250 }}
                  onChange={(e) => {
                    handleOnChange(e.target.value, setTimeOpened);
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  id="timeClosed"
                  label="time closed"
                  type="datetime-local"
                  defaultValue={new Date().toJSON().slice(0, 16)}
                  onChange={(e) => {
                    handleOnChange(e.target.value, setTimeClosed);
                  }}
                  sx={{ width: 250 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField id="opendBy" label="opend By" type="search" />
                <TextField id="closedBy" label="closed By" type="search" />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={equibments}
                  sx={{ width: 250 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Equibment" />
                  )}
                />
                <TextField id="description" label="description" type="search" />
                <TextField id="status" label="status" type="search" />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
