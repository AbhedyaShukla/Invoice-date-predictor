


import React, { useState } from 'react';
// import theme, { pxToVh } from '../utils/theme';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { InputBase, TextField, OutlinedInput, Button } from '@material-ui/core';
import Paper from "@material-ui/core/Paper";
import { pxToRem, pxToVh, pxToVw } from "../utils/theme";
import EditOutlined from "@material-ui/icons/EditOutlined";
// import EditOutlined from "@material-ui/icons/import EditOutlined from "@material-ui/icons/EditOutlined";";
import openEditDialog from "@material-ui/icons/EditOutlined";
import AddOutlined from "@material-ui/icons/AddOutlined";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Search from "../assets/search-24px (3).svg";
import Box from '@material-ui/core/Box';
import AddModal from './Add';
import DeleteModal from './Delete';
import EditModal from './Edit';
import ViewCorrespondence from './VC'
import SearchDisplay from './SearchDisplay';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
    drawerPaper: { background: "blue" },
    root: {
      flexGrow: "1vw",
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      color: theme.palette.text.secondary,
      marginLeft:2,
      marginRight:2,
    },
    PredictButton: {
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
    VC:{
        backgroundColor:'#273D49CC',
        color:'#97A1A9',
        border: "0.1rem solid #14AFF1",
        marginRight:pxToRem(245)
      },
    Add: {
        color: "#ffffff",
        width: pxToRem(99),
        height: pxToRem(45),
        border: "0.1rem solid #14AFF1",
        borderRadius: pxToRem(10),
        opacity: 1,
        marginLeft: pxToRem(320),

    },
    Delete: {
        color: "#ffffff",
        width: pxToRem(120),
        height: pxToRem(45),
        border: "0.1rem solid #14AFF1",
        borderRadius: pxToRem(10),
        opacity: 1,
        marginRight: pxToRem(100),

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
    search:{
        border:'0.1em #356680 solid',
        width:pxToRem(300),
        position: 'relative',
        color:'#97A1A9',
        borderRadius: pxToRem(10),
    },
    searchImg:{
      display: 'flex',
      position: 'absolute',
      alignContent:'right',
      justifyContent: "right",
      marginLeft:"9rem",
      marginTop: "0.4rem"
  },
      inputRoot: {
        color: 'inherit',
      },
      SearchBar: {
        marginRight: "0.5rem",
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#97A1A9",
            height: pxToRem(50),
            color: "white",
        },

        "& .MuiOutlinedInput-adornedStart": {
            paddingLeft: pxToRem(14),
            marginTop: "-0.6rem",
        },

        "& .MuiInputBase-root": {

            color: "#97A1A9",
            alignItems: "center",
            marginTop: "-0.6rem",

        },
        "& .MuiOutlinedInput-root": {

            borderRadius: "0.4rem",
        },
        "& .MuiOutlinedInput-input": {

            padding: "0rem",
            paddingTop: "0.4rem",
        },
        "& .MuiFormControl-marginNormal": {
            marginTop: "0.8rem",
            marginBottom: "0rem",

        },
        
    }

  }));


const Buttons1 = () => {
    // console.log('theme', theme);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDialogName, setOpenDialog] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openAddDialog = () => {
        setOpenDialog('Add');
        handleClose();
    };

    const openDeleteDialog = () => {
        setOpenDialog('Delete');
        handleClose();
    };

    const openEditDialog = () => {
        setOpenDialog('Edit');
        handleClose();
    };

    const openCorrespondenceDialog = () => {
        setOpenDialog('Correspondence');
        handleClose();
    };

    const closeDialog = () => {
        setOpenDialog(null);
    };

    let [searchText, setSearchText] = React.useState("");

    const openSearchDialog = () => {
      loadData();
      
  };
  
  let [responseData, setResponseData] = React.useState([]); 
  
  
            
  let url = `http://localhost:8080/1828001/Search?docID=${searchText}`;


        const loadData = () => {
          axios
            .get(url)
            .then((response) => {
              setResponseData([...responseData, ...response.data]);
              setOpenDialog('Search');
               handleClose();
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        };
    // var docId = document.getElementById('search').value;
    return (
<div classname={classes.root}>
    <Grid container spacing={0}>
        <Grid item xs={1} >
        <Button variant="contained" className={classes.PredictButton}>Predict</Button>
        </Grid>
        <Grid item xs={4}>
        <Button variant="outlined" className={classes.VC}
                    onClick={openCorrespondenceDialog}>View Correspondence</Button>
        {/* <ViewCorrespondenceModal /> */}
        </Grid>
        <Grid item xs={2}>
        <Button variant="outlined" className={classes.Add}
                        startIcon={<AddOutlined />} onClick={openAddDialog}>Add</Button>
        {/* <Add /> */}
        </Grid>
        <Grid item xs={2}>
        <Button variant="outlined" className={classes.Edit}
                        startIcon={<EditOutlined />} onClick={openEditDialog}>Edit</Button>
        {/* <Edit /> */}

        </Grid>
        <Grid item xs={1}>
        <Button variant="outlined" className={classes.Delete}
                        startIcon={<DeleteOutlined />} onClick={openDeleteDialog}
                    >Delete</Button>
        {/* <ResponsiveDialog /> */}
        </Grid>
        <Grid item xs={2}>
        
            <TextField
                        type="search"
                        variant="outlined"
                        margin="normal"
                        id="search"
                        defaultValue="Search by Doc ID"
                        className={classes.SearchBar}
                        onChange={(e) =>
                          setSearchText(e.target.value )}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment className = {classes.searchImg}>
                                    <SearchIcon onClick = {openSearchDialog}/>
                                </InputAdornment>
                            )
                        }}
                    />
        </Grid> 
    </Grid>
    <AddModal open={openDialogName === 'Add'} onClose={closeDialog} />
            <DeleteModal open={openDialogName === 'Delete'} onClose={closeDialog} />
            <EditModal open={openDialogName === 'Edit'} onClose={closeDialog} />
            <ViewCorrespondence open={openDialogName === 'Correspondence'} onClose={closeDialog} />
            <SearchDisplay open={openDialogName === 'Search'} onClose={closeDialog}  data={responseData}/>
</div>
  
    );
  };

  export default Buttons1;