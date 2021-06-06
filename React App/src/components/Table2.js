import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { CircularProgress } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { ColorLensOutlined } from '@material-ui/icons';
import Delete from './Delete';

const StyledTableCell = withStyles((theme) => ({
    root: {
      borderBottom: "none"
    },
    head: {
      backgroundColor: '#39495E',
      color: '#97A1A9',
      position: 'sticky',
      top: 0,
      fontSize: "1rem"
    },
    body: {
      fontSize: '1rem',
      color: theme.palette.common.white,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
  
      '&:nth-of-type(odd)': {
        backgroundColor: '#39495E',
      },
      '&:nth-of-type(even)': {
        backgroundColor: "#283A46",
      },
    },
  }))(TableRow);
  

const useStyles = makeStyles({

  tContainer: {
    borderRadius: "0"
  },
  Table: {
    borderColor: "black"
  },
  Checkbox: {
    color:'white', 
},
});


function TableData (props) {
  // const {selected, handleClick} = props;
  let [responseData, setResponseData] = React.useState([]);
  let [isNext, isNextFunc] = React.useState(false);
  let [pageCount, setCount] = React.useState(1);
  let [selected, setSelected] = React.useState([]);

  React.useEffect(()=>{
    window.localStorage.setItem('id',selected)
  })
  
  let url = `http://localhost:8080/1828001/servlet1?page=${pageCount}&limit=20`;

  const loadData = () => {
    axios
      .get(url)
      .then((response) => {
        setResponseData([...responseData, ...response.data]);
        isNextFunc(true);
        setCount(pageCount + 1);

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    loadData();
  }, []);


  const classes = useStyles();

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    // console.log(selected);
  };

   const isSelected = (id) => selected.indexOf(id) !== -1;



  return (
    <div className="App" style={{textAlign:"center"}}>
      
      <InfiniteScroll
        dataLength={responseData.length}
        next={loadData}
        hasMore={isNext}
        scrollableTarget="scrollableDiv"
        loader={
          <div
             style={{ height: "80%", paddingLeft: "10%", overflow: "hidden",  }}
          >
            <CircularProgress />
          </div>
        }
      >
 
      
        <TableContainer component={Paper} className={classes.tContainer}>

          <Table classsName={classes.Table}>
            
            <TableHead style = {{position: "sticky", zIndex:1}}>
              <TableRow >
              <StyledTableCell align="left" className = {classes.CheckBox}>
                <Checkbox
                    // color="default"
                    className = {classes.Checkbox}

                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                /></StyledTableCell>
                <StyledTableCell align="left">Customer Name</StyledTableCell>
                <StyledTableCell align="left">Customer #</StyledTableCell>
                <StyledTableCell align="left">Invoice #</StyledTableCell>
                <StyledTableCell align="left">Invoice Amount</StyledTableCell>
                <StyledTableCell align="left">Due Date</StyledTableCell>
                <StyledTableCell align="left">Predicted Payment Date</StyledTableCell>
                <StyledTableCell align="left">Predicted Aging Bucket</StyledTableCell>
                <StyledTableCell align="left">Notes</StyledTableCell>
                
              </TableRow>
            </TableHead>
            <TableBody >
              
              {
                responseData.map((p, index) => {
                  let check = p.notes == null ? "-" : p.notes;
                  const isItemSelected = isSelected(p.invoice_id);
                  return <StyledTableRow key={index} onClick={(event) => handleClick(event, p.invoice_id)} selected = {isItemSelected} aria-checked={isItemSelected}>
                     <StyledTableCell align="left" className = {classes.CheckBox}>
                <Checkbox
                    // color="default"
                    className = {classes.Checkbox}
                    checked = {isItemSelected}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                /></StyledTableCell>
                    <StyledTableCell component="th" scope="row">{p.name_customer}</StyledTableCell>
                    <StyledTableCell align="left">{p.cust_number}</StyledTableCell>
                    <StyledTableCell align="left">{p.invoice_id}</StyledTableCell>
                    <StyledTableCell align="left">{p.total_open_amount}</StyledTableCell>
                    <StyledTableCell align="left">{p.due_in_date}</StyledTableCell>
                    <StyledTableCell align="left">-</StyledTableCell>
                    <StyledTableCell align="left">-</StyledTableCell>
                    <StyledTableCell align="left">{check}</StyledTableCell>

                    

                  </StyledTableRow>
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
        
    </InfiniteScroll>
    <Delete selected = {selected} />
    </div>

  );
}
export default TableData;