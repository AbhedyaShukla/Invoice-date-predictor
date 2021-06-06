import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
// import FredaButton from '../assets/FredaButton.png';
import companyLogo from '../assets/companyLogo.svg';
import logo1 from '../assets/logo1.svg';
import Group20399 from '../assets/Group 20399.svg';
import { red } from "@material-ui/core/colors";
// import SimpleModal from '../components/modalfreeda';
const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Header(props) {
  const { classes } = props;
  // const {name}=props.params;
  return (
    <Grid >
    <div style={{padding:15}}>
    <img src={Group20399} alt="Company logo" style={{position:'absolute'}}></img>
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <img src={logo1} alt="HRC Logo"/> 
    </div>
    <p style={{fontSize:15,color:'white'}}>Invoice List</p>
</div>
</Grid>

  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);