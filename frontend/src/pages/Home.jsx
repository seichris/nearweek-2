import React from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import makeStyles from "@mui/styles/makeStyles";
import { useEffect, useState } from "react";
import * as Utils from "../Utils/Utils";
import Box from "@mui/material/Box";
import SectionHeader from "../components/ui/general/Section/SectionHeader/SectionHeader";
import Announce from "../components/ui/EditionPost/Announce/Announce";
import NewsList from "../components/ui/NewsPost/List/NewsList";
import EventsGrid from "../components/ui/EventPost/Grid/EventsGrid";
import EditionsList from "../components/ui/EditionPost/List/EditionsList";
import Section from "../components/ui/general/Section/Section";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../Utils/Utils";
import VideoSlider from "../components/ui/VideoPost/Slider/VideoSlider";
import Subscription from "../components/ui/general/Subscription/Subscription";
import ReactECharts from "echarts-for-react";

const Home = () => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH}`);

  const useStyles = makeStyles(() => ({
    wrapper: {},
    container: {
      margin: "0 auto",
      maxWidth: 1376,
      paddingRight: "16px",
      paddingLeft: "16px",
    },
    videoContainer: {
      display: "flex",
      flexDirection: "row",
      gap: "24px",
      width: 1140,
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
    blockNews: {
      display: "flex",
      gap: "24px",
      "@media screen and (max-width: 1280px)": {
        flexDirection: "column",
      },
    },
    blockColumn: {
      flex: 0.5,
      display: "flex",
      maxWidth: "50%",
      "@media screen and (max-width: 1280px)": {
        maxWidth: "100%",
      },
    },
  }));

  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  const getOption = async () => {
    //return await Utils.api.getStatsPrice();
    return options;
  };

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
      <main>
        <Box className={classes.wrapper}>
          <Box className={classes.container}>
            <Section title={"Top News"} link={"/news"}>
              <Box className={classes.blockNews}>
                <Box className={classes.blockColumn}>
                  <Announce edition={editions.data[0]} />
                </Box>
                <Box className={classes.blockColumn}>
                  <NewsList show={3} />
                </Box>
              </Box>
            </Section>
          </Box>
          <Box className={classes.container}>
            <Section>
              <Subscription />
            </Section>
          </Box>
          {/*          <Box className={classes.container}>
            <Section title={"Nearweek by numbers"}>
              <ReactECharts option={options} />
            </Section>
          </Box>*/}
          <Box className={classes.container}>
            <Section title={"Events"} link={"/events"}>
              <EventsGrid />
            </Section>
          </Box>
          <Box style={{ backgroundColor: "#f7f7f7" }}>
            <Box className={classes.container}>
              <Box className={classes.wrapper}>
                <SectionHeader title={"Latest Video"} link={"/video"} />
              </Box>
            </Box>
            <VideoSlider />
          </Box>
          <Box className={classes.container}>
            <Section title={"Latest Editions"} link={"/editions"}>
              {editions.data.length > 0 && (
                <EditionsList exclude={editions.data[0].id} />
              )}
            </Section>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default Home;
