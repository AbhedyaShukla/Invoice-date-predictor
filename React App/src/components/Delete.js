



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
import axios from 'axios';
import { ColorLensOutlined } from '@material-ui/icons';



const useStyles = makeStyles((theme) => ({
    DialogBox: {
      
        "& .MuiPaper-rounded":{
          borderRadius : "0rem",
          width:pxToRem(700),
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
      backgroundColor: "#2A3F4D",
      opacity: "1",
      color: "#ffffff",
      maxWidth: "42rem",
      maxHeight: "15rem",
    },
    DialogBoxContent: {
      backgroundColor: "#2A3F4D",
      opacity: "1",
      color: "#C0C6CA",
      maxWidth: "42rem",
      maxHeight: "15rem",
    },
    DialogBoxFoot: {
      backgroundColor: "#2A3F4D",
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
    delete: {
        color: "#ffffff",
        width: pxToRem(99),
        height: pxToRem(45),
        border: "0.1rem solid #14AFF1",
        borderRadius: pxToRem(10),
        opacity: 1,
        marginRight: pxToRem(100),
    
  

    },
    div:{
        backgroundColor:"#1A262F"
    },
  }));

export default function ResponsiveDialog({open, onClose, selected}) {
  console.log(selected);
  // localStorage.setItem("id", JSON.stringify(selected));
  let [idStrArr, setnishu] = React.useState("");
  React.useEffect(()=>{
    console.log("abc",idStrArr)
    setnishu(window.localStorage.getItem('id'))
  })

  var array=idStrArr.split(',');
  var array2= array.map((i) => Number(i));
  console.log("xyz",array2)

  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

 const deleteInvoice = (s) => {
  
    axios
      .delete("http://localhost:8080/1828001/DeleteServlet", {
        data: {
          invoice_id: array2

        },
      })
      .then((response) => {
        if (response.status === 200) {
          // props.deleteInvoiceSelected();
        }
        // handleClose();
        onClose();
      })
      .catch((err) => {
        console.log(selected)
        console.log(err);
        // handleClose();
        onClose();
      });
  };


  return (
    <div>
      {/* <Button className= {classes.delete} variant="outlined" color="primary" onClick={handleClickOpen}>
        Delete
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
        className = {classes.DialogBox}
      >
        <DialogTitle onClose={onClose} className={classes.DialogBoxTitle} id="responsive-dialog-title">{"Delete Records(?)"}
        <IconButton className={classes.closeButton} onClick={onClose} > 
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <Divider className={classes.div} ></Divider>
        <DialogContent className={classes.DialogBoxContent}>
          <DialogContentText color="">
          You'll lose your record(s) after this action. We can't recover them
          once you delete. 
          <p>Are you sure you want to{" "}
          <span style={{ color: "#FF5E5E" }}>permanently delete</span> them?</p>
          </DialogContentText>
        </DialogContent>
        <Divider className={classes.div} />
        <DialogActions  className={classes.DialogBoxFoot}>
          <Button variant="outlined" className={classes.b1_cancel} autoFocus onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" className={classes.b2_delete} onClick={()=>deleteInvoice(selected)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}