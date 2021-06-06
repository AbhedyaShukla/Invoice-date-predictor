import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import { pxToRem, pxToVh, pxToVw } from "../utils/theme";
import Divider from '@material-ui/core/Divider';
import EditOutlined from "@material-ui/icons/EditOutlined";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  DialogBox: {

    "& .MuiPaper-rounded": {
      borderRadius: "0rem",
      width: pxToRem(500),
      height: pxToRem(500)
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
    opacity: "1",
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
  Edit: {
    color: "#ffffff",
    width: pxToRem(99),
    height: pxToRem(45),
    // border: "0.1rem solid #14AFF1",
    borderRadius: pxToRem(10),
    opacity: 1,
    marginLeft: pxToRem(120),


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
    marginRight: "8rem"

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

}));
export default function Edit({ open, onClose, selected}) {
  const classes = useStyles();
  let [idStrArr, setId] = React.useState("");
  React.useEffect(()=>{
    console.log("abc",idStrArr)
    setId(window.localStorage.getItem('id'))

  })

  var array=idStrArr.split(',');
  var array2= array.map((i) => Number(i));
  console.log("xyz",array2)

  const onClear = () => {
    document.getElementById('name1').value = "";
    document.getElementById('name2').value = "";
  };

  const [input, setInput] = React.useState({ 
    amount: "",
    notes: "",
  });
  const handleEdit = (e) => {
    
    const body = {
      notes: input.notes,
      total_open_amount: input.amount,
      invoice_id: array2[0],
    };
    console.log(body);
    axios
      .post("http://localhost:8080/1828001/UpdateServlet", body)
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
    <div>

      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
        className={classes.DialogBox}
      >
        <DialogTitle className={classes.DialogBoxTitle} id="responsive-dialog-title">{"Edit Invoice"}
          <IconButton className={classes.closeButton} onClick={onClose} >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider className={classes.div} ></Divider>
        <DialogContent className={classes.DialogBoxContent}>
          <Grid container spacing={0}>
            <Grid container xs={12}>
              <Grid item xs={6}>
                <DialogContentText className={classes.txt}>Invoice Amount</DialogContentText>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className={classes.tf}
                  autoFocus
                  margin="dense"
                  id="name1"
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
          

            <Grid container xs={12}>
              <Grid item xs={6}>
                <DialogContentText className={classes.txt}>Notes </DialogContentText>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className={classes.tf}
                  autoFocus
                  margin="dense"
                  id="name2"
                  value={input.notes}
                  onChange={(e) =>
                    setInput({ ...input, notes: e.target.value })}
                  InputProps={{
                    className: classes.input
                  }}
                  variant="outlined"
                  fullWidth
                  rows={6}
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
          <Button className={classes.Add} onClick={onClose} color="primary">
            Clear
          </Button>
          <Button className={classes.b3} onClick={handleEdit} color="primary">
            Save
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}