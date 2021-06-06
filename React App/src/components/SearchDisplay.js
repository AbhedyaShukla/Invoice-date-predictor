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
export default function Edit({ open, onClose, data}) {
  const classes = useStyles();
  const [input, setInput] = React.useState({ 
    amount: NaN,
    invoiceNo: NaN,
    notes: "",
  });
  
    
        let [responseData, setResponseData] = React.useState([]);
        let [isNext, isNextFunc] = React.useState(false);
        let [pageCount, setCount] = React.useState(1);
        let [selected, setSelected] = React.useState([]);

       

        console.log()
  return (
      
    <div>

      <Dialog
        
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
        className={classes.DialogBox}
      >
        <DialogTitle className={classes.DialogBoxTitle} id="responsive-dialog-title">{"DATA"}
          <IconButton className={classes.closeButton} onClick={onClose} >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider className={classes.div} ></Divider>
        <DialogContent className={classes.DialogBoxContent}>
          <p>name_customer:
          {
            data.length>0? ( data[0].name_customer) : ""
          }
          </p>
          <p>cust_number : 
          {
            data.length>0? ( data[0].cust_number) : ""
          }
          </p>
          <p>invoice_id:
          {
            data.length>0? ( data[0].invoice_id) : ""
          }
          </p>
          <p>total_open_amount:
          {
            data.length>0? ( data[0].total_open_amount) : ""
          }
          </p>
          <p>due_in_date:
          {
            data.length>0? ( data[0].due_in_date) : ""
          }
          </p>
        </DialogContent>

        <Divider className={classes.div} />
        <DialogActions className={classes.DialogBoxFoot}>
          <Button className={classes.b4} onClick={onClose} color="primary">
            Cancel
          </Button>
          

        </DialogActions>
      </Dialog>
    </div>
  );
}