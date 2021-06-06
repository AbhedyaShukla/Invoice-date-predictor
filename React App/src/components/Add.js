import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core';
import { pxToRem, pxToVh, pxToVw } from "../utils/theme";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import axios from 'axios';
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
  DialogBox: {

    "& .MuiPaper-rounded": {
      borderRadius: "0rem",
      width: pxToRem(900),
    }

  },

  b2_delete: {
    backgroundColor: "#14AFF1",
    opacity: "1",
    color: "#ffffff",
    width: pxToRem(101),
    height: pxToRem(45),
    borderRadius: "0.5rem",
    margin: "0rem",
    padding: "0rem",
  },
  b1_cancel: {
    color: "#ffffff",
    border: "0.1rem solid #14AFF1",
    borderRadius: "0.5rem",
    opacity: 1,
    width: pxToRem(100),
    height: pxToRem(45),
    margin: "0rem",
  },
  DialogBoxTitle: {
    backgroundColor: "#2A3E4C",
    opacity: "1",
    color: "#ffffff",
    maxWidth: "42rem",
    maxHeight: "15rem",
  },
  DialogBoxContent: {
    backgroundColor: "#2A3E4C",
    opacity: "1",
    color: "#C0C6CA",
    maxWidth: "42rem",
    maxHeight: "15rem",
  },
  DialogBoxFoot: {
    backgroundColor: "#2A3E4C",
    opacity: 1,
    color: "#C0C6CA",
    maxWidth: "50rem",
    maxHeight: "15rem",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],

  },
  Add: {
    color: "#ffffff",
    width: pxToRem(99),
    height: pxToRem(45),
    border: "0.1rem solid #14AFF1",
    borderRadius: pxToRem(10),
    opacity: 1,
    marginLeft: pxToRem(300),

  },
  div: {
    backgroundColor: "#1A262F"
  },

  b3: {
    // width: pxToRem(106),
    // height: pxToRem(45),
    color: "white",
    background: "#97A1A9 0% 0 % no - repeat padding- box",
    backgroundColor: "#14AFF1",
    borderRadius: pxToRem(10),
    opacity: "1",
    // marginTop: "0.3rem",
    marginLeft: "0.5rem",

  },
  b4: {
    // width: pxToRem(106),
    // height: pxToRem(45),
    color: "#14AFF1",
    // background: "#97A1A9 0% 0 % no - repeat padding- box",
    // backgroundColor: "#14AFF1",
    borderRadius: pxToRem(10),
    opacity: "1",
    // marginTop: "0.3rem",
    // marginLeft: "3rem",
    marginRight: "22rem"

  },
  txt: {
    color: "#C0C6CA"
  },
  xt: {
    marginLeft: "3rem",
    color: "#C0C6CA"
  },
  text: {
    marginBottom: "10rem"
  },
  tf: {
    border: '0.1em #356680 solid',
    width: pxToRem(220),
    position: 'relative',
    // color:'white',
    borderRadius: pxToRem(10),
  },
  input: {
    color: "#FFFFFF",
  }
}));

const onClear = () => {
  document.getElementById('name1').value = "";
  document.getElementById('name2').value = "";
  document.getElementById('name3').value = "";
  document.getElementById('name4').value = "";
  document.getElementById('name5').value = "";
  document.getElementById('name6').value = "";
};

export default function FormDialog({ open, onClose }) {
  const classes = useStyles();
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [input, setInput] = React.useState({
    name: "",
    amount: "",
    custNo: "",
    date: "",
    invoiceNo: "",
    notes: "",
  });

  const handleDate = (e) => {
    let date = e.target.value;
    setInput({ ...input, date: date });
  };

  const formateDate = (date) => {
    let newDate = new Date(date).toDateString();
    let rr = newDate.substring(4);
    let ff = rr.substring(0, 6) + "," + rr.substring(6);
    return ff;
  };

  const handleSnackBar = () => {
    setSnackBarOpen(!snackBarOpen);
  };

  const handleSave = (e) => {
    
    const body = {
      due_in_date: formateDate(input.date),
      name_customer: input.name,
      cust_number: input.custNo,
      notes: input.notes,
      total_open_amount: input.amount,
      invoice_id: input.invoiceNo,
    };
    console.log(body);
    axios
      .post("http://localhost:8080/1828001/Servlet2", body)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          
          onClose();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    
  };

  return (

    <Dialog className={classes.DialogBox} open={open} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth="lg">
      <DialogTitle className={classes.DialogBoxTitle} id="form-dialog-title">{"Add Invoice"}
        <IconButton className={classes.closeButton} onClick={onClose} >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider className={classes.div} />
      <DialogContent className={classes.DialogBoxContent}>
        <Grid container spacing={0}>
          <Grid container xs={6}>
            <Grid item xs={6}>
              <DialogContentText className={classes.txt}>Customer Name <span style={{ color: "#FF5E5E" }}>*</span></DialogContentText>
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.tf}
                autoFocus
                margin="dense"
                id="name1"
                value={input.name}
                onChange={(e) =>
                  setInput({ ...input, name: e.target.value })}
                InputProps={{
                  className: classes.input
                }}
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <DialogContentText className={classes.txt}>Customer No.<span style={{ color: "#FF5E5E" }}>*</span></DialogContentText>
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.tf}
                autoFocus
                margin="dense"
                id="name2"
                value={input.custNo}
                onChange={(e) =>
                  setInput({ ...input, custNo: e.target.value })}
                InputProps={{
                  className: classes.input
                }}

                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <DialogContentText className={classes.txt}>Invoice No.<span style={{ color: "#FF5E5E" }}>*</span></DialogContentText>
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.tf}
                autoFocus
                margin="dense"
                id="name3"
                value={input.invoiceNo}
                onChange={(e) =>
                  setInput({ ...input, invoiceNo: e.target.value })}
                InputProps={{
                  className: classes.input
                }}

                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <DialogContentText className={classes.txt}>Invoice Amount<span style={{ color: "#FF5E5E" }}>*</span></DialogContentText>
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.tf}
                autoFocus
                margin="dense"
                id="name4"
                value={input.amount}
                onChange={(e) =>
                  setInput({ ...input, amount: e.target.value })}
                InputProps={{
                  className: classes.input
                }}

                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container xs={6}>
            <Grid item xs={6}>
              <DialogContentText className={classes.xt}>Due Date<span style={{ color: "#FF5E5E" }}>*</span></DialogContentText>
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.tf}
                autoFocus
                margin="dense"
                id="name5"
                value={input.date}
                onChange={(e) =>
                  setInput({ ...input, date: e.target.value })}
                // label="Customer Name"
                type="date"
                InputProps={{
                  className: classes.input
                }}
                defaultValue="2017-05-24"
                variant="outlined"
                fullWidth
              />

            </Grid>
            <Grid item xs={6}>
              <DialogContentText className={classes.xt}>Notes</DialogContentText>
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.tf}
                autoFocus
                margin="dense"
                id="name6"
                value={input.notes}
                onChange={(e) =>
                  setInput({ ...input, notes: e.target.value })}
                // label="Customer Name"

                variant="outlined"
                fullWidth
                rows={6}
                InputProps={{
                  className: classes.input
                }}
                multiline
              />

            </Grid>




          </Grid>
        </Grid>
      </DialogContent>
      <Divider className={classes.div} />
      <DialogActions className={classes.DialogBoxFoot}>
        <Button className={classes.b4} onClick={onClose} color="primary">
          Cancel
          </Button>
        <Button className={classes.Add} onClick={onClear} color="primary">
          Clear
          </Button>
        <Button className={classes.b3} onClick={handleSave} color="primary">
          Add
          </Button>

      </DialogActions>
    </Dialog>
  );
}