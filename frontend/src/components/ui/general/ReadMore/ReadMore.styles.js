import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import * as React from "react";

const styles = (theme) => ({
  container: {
    marginBottom: theme.spacing(3),
  },
  content: {
    marginBottom: theme.spacing(2),
  },
  gallery: {
    display: "grid",
    gridGap: theme.spacing(2),
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  readMoreLink: {
    display: "flex",
    flexDirection: "column",
    color: "#0d00ff",
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
  },
  showGalleryLink: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textTransform: "uppercase",
    color: "#0d00ff",
    backgroundColor: "#f7f7f7",
    padding: theme.spacing(1.5),
    fontWeight: "bold",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
});

export const useStyles = makeStyles(styles, { name: "ReadMore" });
