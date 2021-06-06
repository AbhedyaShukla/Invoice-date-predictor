import React, { useState } from 'react';
import theme, { pxToVh } from '../utils/theme';
import { makeStyles, Grow } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Footer from '../components/Footer';
import { Typography } from '@material-ui/core';
import { InputBase, TextField, OutlinedInput, Button } from '@material-ui/core';

import Header from '../components/Header.js'
import Table2 from '../components/Table2.js'
import Buttons1 from '../components/Buttons1.js'
import Body from '../components/Body.js'





const CollectorDashboard = (props) => {
  // const classes = useStyles();
  return (
    <div className="hello"> 
      <Header />
       <Body />
<Footer></Footer>
    </div>
  );
};

export default CollectorDashboard;