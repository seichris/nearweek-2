import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import ListItem from "./ListItem";

const NewsList = ({ news }) => {
  const useStyles = makeStyles(() => ({}));
  console.log(news);

  let newsList = [];
  if (news) {
    newsList = [...news.data];
  }

  const classes = useStyles();

  return (
    <>
      {newsList.length > 0
        ? newsList.map((article, i) => {
            return <ListItem key={i} data={article} meta={news.meta} />;
          })
        : null}
    </>
  );
};

export default NewsList;
