import React from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import Box from "@mui/material/Box";
import makeStyles from "@mui/styles/makeStyles";
import { useEffect, useState } from "react";
import Announce from "../components/ui/EditionPost/Announce/Announce";
import EditionsList from "../components/ui/EditionPost/List/EditionsList";
import * as Utils from "../Utils/Utils";
import Section from "../components/ui/general/Section/Section";
import Subscription from "../components/ui/general/Subscription/Subscription";

const Editions = () => {
  const useStyles = makeStyles(() => ({
    root: {
      marginRight: "16px",
      marginLeft: "16px",
    },
    pageWrapper: {
      margin: "0 auto",
      maxWidth: 892,
    },
    topContainer: {
      marginTop: "36px",
    },
    latestEditions: {
      marginTop: "24px",
      width: "100%",
    },
    blockTitle: {
      fontSize: "42px",
      fontWeight: "900",
      marginBottom: "24px",
    },
  }));

  const [editions, setEditions] = useState({ data: [], meta: {} });

  useEffect(async () => {
    const data = await Utils.api.getAllEditions();
    if (data) {
      setEditions(data);
    }
  }, []);

  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Box className={classes.root}>
        <Box className={classes.pageWrapper}>
          <Box className={classes.topContainer}>
            <Announce edition={editions.data[0]} />
          </Box>
          <Box className={classes.latestEditions}>
            <div>
              <Box className={classes.container}>
                <Section title={"Latest Editions"}>
                  {editions.data.length > 0 && (
                    <EditionsList editions={editions.data} />
                  )}
                </Section>
              </Box>
              <Subscription />
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Editions;
