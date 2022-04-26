import * as React from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import { useChainTransactionStats } from "../../../../../libs/wamp/subscriptions";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { withStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Change24HCount from "../Change24HCount/Change24HCount";
import { useWampSimpleQuery } from "../../../../../libs/wamp/wamp";

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "20% 80%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
  },
  total: {
    color: "#0d00ff",
  },
};

const chartsStyle = {
  height: 480,
  marginBottom: 26,
};

const DailyTransactionsChart = (props) => {
  const { classes, show } = props;
  const transactionsCountHistoryForTwoWeeks =
    useChainTransactionStats()?.transactionsCountHistoryForTwoWeeks || [];
  const recentTransactionsCount =
    useChainTransactionStats()?.recentTransactionsCount;

  const transactionCountByDate =
    useWampSimpleQuery("transactions-count-aggregated-by-date", []) ?? [];

  const filter = {
    all: 0,
    "1w": -7,
    "1m": -30,
  };

  const transactionsByDate = React.useMemo(
    () =>
      transactionCountByDate
        .map(({ transactionsCount }) => Number(transactionsCount))
        .slice(filter[show]),
    [transactionCountByDate]
  );

  const transactionDates = React.useMemo(
    () =>
      transactionCountByDate
        .map(({ date }) => date.slice(0, 10))
        .slice(filter[show]),
    [transactionCountByDate]
  );

  const count = transactionsCountHistoryForTwoWeeks.map((t) => t.total);

  const getOption = (title, seriesName, data) => {
    return {
      title: {
        text: title,
      },
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
        backgroundColor: "#F9F9F9",
        show: true,
        color: "white",
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: transactionDates,
        },
      ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            lineStyle: {
              color: "white",
            },
          },
        },
      ],
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 100,
          filterMode: "filter",
        },
        {
          start: 0,
          end: 100,
        },
      ],
      series: [
        {
          name: seriesName,
          type: "line",
          lineStyle: {
            color: "#00C1DE",
            width: 2,
          },
          symbol: "circle",
          itemStyle: {
            color: "#25272A",
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(0, 193, 222)",
              },
              {
                offset: 1,
                color: "rgb(197, 247, 255)",
              },
            ]),
          },
          data: data,
        },
      ],
    };
  };
  return (
    <Box className={classes.grid} mt={4}>
      <Paper elevation={0} className={classes.card}>
        <Box p={4}>
          <Typography variant="h5" style={{ fontWeight: 900 }}>
            Total Transactions
          </Typography>
          <Typography>24hr Total</Typography>
          <Typography
            className={classes.total}
            variant="h3"
            style={{ fontWeight: 900 }}
          >
            {recentTransactionsCount}
          </Typography>
          <Change24HCount
            last24htotal={count.slice(-1)[0]}
            recent={recentTransactionsCount}
          />
        </Box>
      </Paper>
      <Paper elevation={0}>
        <ReactEcharts
          option={getOption("", "Txns", transactionsByDate)}
          style={chartsStyle}
        />
      </Paper>
    </Box>
  );
};

export default withStyles(styles)(DailyTransactionsChart);