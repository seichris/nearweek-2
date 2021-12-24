import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import { useState } from "react";
import ListItem from "./ListItem";
import { useMatch } from "react-router";

const PostList = ({ editions }) => {
  const [moreLength, setMoreLength] = useState(5);
  const matchEdition = useMatch(`/editions/:editionId`);
  const matchEditions = useMatch(`/editions`);

  const useStyles = makeStyles(() => ({
    img: {
      width: "100%",
      borderRadius: "12px 12px 0 0",
      minHeight: "502px",
    },
    showMoreBlock: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      background: "#f7f7f7",
      marginBottom: "24px",
      fontWeight: "bold",
    },
    showMoreButton: {
      margin: "24px 0",
    },
  }));

  let editionsList = [];
  if (editions) {
    editionsList = [...editions.data];
    if (matchEdition) {
      editionsList = editions.data.filter(
        (item) => item.id !== Number(matchEdition.params.editionId)
      );
    }
    if (matchEditions) {
      editionsList = editions.data.slice(1);
    }
  }

  const showMoreHandler = () => {
    if (moreLength < editionsList.length) {
      const nextLength =
        editionsList.length - moreLength < 5
          ? editionsList.length - moreLength
          : 5;
      setMoreLength(moreLength + nextLength);
    }
  };

  const classes = useStyles();
  return (
    <div>
      {editionsList.length > 0
        ? editionsList.slice(0, moreLength).map((edition, i) => {
            return <ListItem key={i} data={edition} />;
          })
        : null}
      <div className={classes.showMoreBlock}>
        <span className={classes.showMoreButton}>
          <Button
            disabled={moreLength === editionsList.length}
            onClick={showMoreHandler}
          >
            Show more
          </Button>
        </span>
      </div>
    </div>
  );
};

export default PostList;