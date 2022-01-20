import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Search from "./Search/Search";
import Connect from "./Connect/Connect";

const Actions = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Search />
      <Connect />
    </div>
  );
};

export default Actions;
