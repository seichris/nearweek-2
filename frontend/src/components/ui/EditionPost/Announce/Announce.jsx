import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import ImageMedium from "../Image/Medium/ImageMedium";
import Link from "@mui/material/Link";
import { getPubDate, getTimeAgo, MOBILE_WIDTH } from "../../../../Utils/Utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import Widget from "../../general/Widget/Widget";
import ReactMarkdown from "react-markdown";
import Truncate from "react-truncate";
import PostDescription from "../../general/PostDescription/PostDescription";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";

const Announce = ({ edition }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);

  const useStyles = makeStyles(() => ({
    latestPost: {
      width: "100%",
      background: "#f7f7f7",
      borderRadius: "12px",
    },
    content: {
      padding: "24px 24px 0",
    },
    image: {
      borderRadius: "12px 12px 0 0",
      width: "100%",
    },
    postDate: {
      color: "#2013fb",
      fontWeight: "bold",
      fontSize: "14px",
    },
    postTitle: {
      fontSize: "48px",
      fontWeight: "900",
      marginTop: "12px",
      marginBottom: "12px",
    },
    postNumber: {
      color: "#2013fb",
    },
    postBody: {
      fontSize: "16px",
      lineHeight: "24px",
      marginTop: 0,
      //      width: "100%",
      //      textOverflow: "ellipsis",
      //      whiteSpace: "nowrap",
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
    },
    postFooter: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 24px",
      borderTop: "1px solid #c8c6c6",
      borderRadius: "0 0 12px 12px",
    },
    postWidgets: {
      display: "flex",
      alignItems: "center",
      color: "rgba(0, 0, 0, 0.54)",
    },
    postWidget: {
      color: "#656364",
      paddingRight: "24px",
    },
    footerDate: {
      fontSize: "12px",
      color: "#656364",
    },
  }));

  const classes = useStyles();
  return (
    <>
      {edition ? (
        <div className={classes.latestPost}>
          <div className={classes.image}>
            <ImageMedium data={edition} />
          </div>
          <div className={classes.content}>
            <div className={classes.postDate}>
              <span>
                {edition.attributes.Period &&
                  getPubDate(edition.attributes.Period)}
              </span>
            </div>
            <h2 className={classes.postTitle}>
              <Link
                color="inherit"
                href={`/editions/${edition.attributes.slug}`}
                underline="none"
              >
                {edition.attributes.Title}
                <span className={classes.postNumber}>
                  #{edition.attributes.Number}
                </span>
              </Link>
            </h2>
            <div className={classes.postBody}>
              <PostDescription body={edition.attributes.Body} />
            </div>
          </div>
          <div className={classes.postFooter}>
            <div className={classes.postWidgets}>
              <Widget icon={"Visibility"} data={edition.attributes.views} />
              {/*<Widget icon={"ThumbUp"} data={edition.attributes.likes} />*/}
            </div>
            <div className={classes.footerDate}>
              {getTimeAgo(edition.attributes.createdAt)}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Announce;
