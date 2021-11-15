import React from "react";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { positions } from "@material-ui/system";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    // height: 100,
    // border: "1px solid black",
    // padding: 8,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    position: "absolute",
    top: 0,
  },
}));

function AlertBox(props) {
  const classes = useStyles();

  return (
    <Box component="span" m={1} className={classes.root}>
      <Snackbar
        open={true}
        autoHideDuration={5000}
        onClose={props.handleClose}
        style={{ bottom: "85%" }}
      >
        <Alert onClose={props.handleClose} severity={props.severity}>
          {props.children}
        </Alert>
      </Snackbar>
    </Box>
    // <Alert severity="error">This is an error message!</Alert>
    // <Alert severity="warning">This is a warning message!</Alert>
    // <Alert severity="info">This is an information message!</Alert>
    // <Alert severity="success">This is a success message!</Alert>
  );
}
export default AlertBox;
