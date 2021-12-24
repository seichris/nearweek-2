import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faEye,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import Thumbnail from "../../Image/Thumbnail/Thumbnail";
import makeStyles from "@mui/styles/makeStyles";
import { getPubDate } from "../../../../Utils/Utils";
import { useMatch } from "react-router";

const ListItem = ({ data }) => {
  const matchEdition = useMatch(`/editions/:editionId`);

  const useStyles = makeStyles(() => ({
    teaserBlock: {
      display: "flex",
      flexDirection: "column",
    },
    postItem: {
      display: "flex",
      flexDirection: "row",
      marginBottom: "24px",
    },
    postImage: {
      flex: 0.45,
      borderRadius: "12px 0 0 12px",
    },
    postContent: {
      flex: 0.55,
      borderRadius: "0 12px 12px 0",
      background: matchEdition ? "#fff" : "#f7f7f7",
      padding: "16px 0 0 24px",
    },
    postDate: {
      color: "#2013fb",
      fontWeight: "bold",
      fontSize: "14px",
    },
    postTitle: {
      fontSize: "28px",
      marginTop: "6px",
      marginBottom: "6px",
    },
    postNumber: {
      color: "#2013fb",
    },
    postBody: {
      fontSize: "16px",
      lineHeight: "24px",
      marginTop: 0,
    },
    postFooter: {
      paddingTop: "12px",
      paddingBottom: "12px",
      borderTop: "1px solid #c8c6c6",
    },
    postWidgets: {
      display: "flex",
      alignItems: "center",
    },
    postWidget: {
      color: "#656364",
      paddingRight: "24px",
    },
  }));

  const classes = useStyles();
  return (
    <>
      {data ? (
        <div className={classes.teaserBlock}>
          <div className={classes.postItem}>
            <div className={classes.postImage}>
              <Thumbnail data={data} url={`/editions/${data.id}`} />
            </div>
            <div className={classes.postContent}>
              <div className={classes.postDate}>
                <span>{getPubDate(data.attributes.Period)}</span>
              </div>
              <h3 className={classes.postTitle}>
                <a href={`/editions/${data.id}`}>
                  {data.attributes.Title.Name}{" "}
                  <span className={classes.postNumber}>
                    #{data.attributes.Title.Number}
                  </span>
                </a>
              </h3>
              <p className={classes.postBody}>
                {data.attributes.Resume.substring(0, 130)}
              </p>
              <div className={classes.postFooter}>
                <div className={classes.postWidgets}>
                  <span className={classes.postWidget}>
                    <FontAwesomeIcon icon={faEye} /> {data.attributes.views}
                  </span>
                  <span className={classes.postWidget}>
                    <FontAwesomeIcon icon={faThumbsUp} />{" "}
                    {data.attributes.likes}
                  </span>
                  <span className={classes.postWidget}>
                    <FontAwesomeIcon icon={faCommentAlt} /> 0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ListItem;
