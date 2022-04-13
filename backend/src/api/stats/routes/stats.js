module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/stats/list",
      handler: "stats.list",
    },
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/stats/price",
      handler: "stats.price",
    },
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/stats/market-chart",
      handler: "stats.marketChart",
    },
  ],
};
