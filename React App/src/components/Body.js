import React from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Buttons1 from '../components/Buttons1.js'
import { InputBase, TextField, OutlinedInput, Button } from '@material-ui/core';
import Paper from "@material-ui/core/Paper";
import Table2 from '../components/Table2.js';
import Edit1 from '../components/Edit1';

const useStyles = makeStyles((theme) => ({
    drawerPaper: { background: "blue" },
    root: {
      flexGrow: "1vw",
  
    },
    pt: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
    //   color: theme.palette.text.secondary,
    backgroundColor:"#273D49CC",
    marginLeft:5,
    marginRight:5,
    height:"5vh",
    

    
    },
    pt1:{
        padding: theme.spacing.unit * 2,
        textAlign: "center",
      //   color: theme.palette.text.secondary,
      backgroundColor:"#273D49CC",
      marginLeft:5,
      marginRight:5,
      height:"70vh",
      overflow:"scroll",

    }
}));



const Body=()=>{
    const classes = useStyles();
    let [selected, setSelected] = React.useState([]);


    return(
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                
                {/* <Edit1 open={emOpen} handleClose={handleEdit} selected = {selected}></Edit1> */}
                    <Paper className={classes.pt} square ><Buttons1/></Paper>
                    
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.pt1} square id="scrollableDiv"><Table2/></Paper>
                    
                </Grid>

            </Grid>
        </div>
    );
};

export default Body;