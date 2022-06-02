import * as React from "react";
import Link from "@mui/material/Link";
import makeStyles from "@mui/styles/makeStyles";
import { useMatch } from "react-router";
import Box from "@mui/material/Box";
import Widget from "../../general/Widget/Widget";
import { getTimeAgo } from "../../../../Utils/Utils";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { placeholder } from "../../../../Utils/placeholder";
import Grid from "@mui/material/Grid";

const CardItem = ({ data }) => {
  const matchEdition = useMatch(`/content/:articleId`);
  const categories = data.attributes.categories.data;

  const isHyperlink = () => {
    let includeHyperlink = false;
    categories.forEach((item) => {
      if (item.attributes.Name === "Hyperlink") includeHyperlink = true;
    });
    return includeHyperlink;
  };

  const useStyles = makeStyles(() => ({
    teaserBlock: {
      display: "flex",
      flex: "1",
    },
    postItem: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      marginBottom: "24px",
    },
    itemContainer: {
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
    },
    postImage: {
      borderRadius: "12px 0 0 12px",
    },
    postContent: {
      minHeight: "25%",
      borderRadius: 12,
      background: "#dddddb",
      display: "grid",
      gridTemplateRows: " 205px repeat(auto-fill, 103px) 41px",
    },
    contentBody: {
      padding: "16px 16px 0 16px",
    },
    postCategory: {
      color: "#2013fb",
      fontWeight: "bold",
      fontSize: "14px",
    },
    categoryItem: {
      marginRight: "6px",
      marginLeft: "6px",
    },
    postTitle: {
      fontSize: "20px",
      marginTop: "6px",
      marginBottom: "6px",
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
    },
    postNumber: {
      color: "#2013fb",
    },
    postBody: {
      fontSize: "16px",
      lineHeight: "24px",
      marginTop: 0,
    },
    contentFooter: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px",
      borderTop: "1px solid #c8c6c6",
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

  let imageUrl = placeholder.getRandomPlaceholder("large");
  if (data.attributes.Image.data) {
    imageUrl = data.attributes.Image.data.attributes.url;
  }

  return (
    <Grid item xs={12} sm={6} md={3}>
      {data ? (
        /*<div className={classes.teaserBlock}>
          <div className={classes.postItem}>
            <div className={classes.itemContainer}>
              <div className={classes.postContent}>
                <div className={classes.postImage}>
                  {!isHyperlink() && (
                    <Thumbnail
                      data={data}
                      url={`/content/${data.attributes.slug}`}
                    />
                  )}
                  {isHyperlink() && (
                    <Thumbnail data={data} url={`${data.attributes.LinkTo}`} />
                  )}
                </div>
                <div className={classes.contentBody}>
                  {data && (
                    <Box display="inline-flex" className={classes.postCategory}>
                      {data.attributes.categories.data ? (
                        <>
                          {data.attributes.categories.data.map(
                            (item, index) => (
                              <>
                                {index > 0 &&
                                  index <
                                    data.attributes.categories.data.length &&
                                  "•"}{" "}
                                <Box
                                  className={classes.categoryItem}
                                  key={index}
                                >
                                  {item.attributes.Name}
                                </Box>
                              </>
                            )
                          )}
                        </>
                      ) : null}
                    </Box>
                  )}
                  <h3 className={classes.postTitle}>
                    {!isHyperlink() && (
                      <Link
                        color="inherit"
                        href={`/content/${data.attributes.slug}`}
                        underline="none"
                      >
                        {data.attributes.Title}
                      </Link>
                    )}
                    {isHyperlink() && (
                      <Link
                        color="inherit"
                        href={`${data.attributes.LinkTo}`}
                        underline="none"
                      >
                        {data.attributes.Title}
                      </Link>
                    )}
                  </h3>
                </div>
                <div className={classes.contentFooter}>
                  <div className={classes.postWidgets}>
                    {/!*<Widget icon={"Visibility"} data={data.attributes.Views} />*!/}
                    {/!*<Widget icon={"ThumbUp"} data={data.attributes.Likes} />*!/}
                  </div>
                  <div className={classes.footerDate}>
                    {getTimeAgo(data.attributes.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>*/
        <Card
          sx={{ maxWidth: 306, borderRadius: 2, backgroundColor: "#f2f2f2f2" }}
          elevation={0}
        >
          <CardActionArea
            href={
              !isHyperlink()
                ? `/content/${data.attributes.slug}`
                : `${data.attributes.LinkTo}`
            }
          >
            <CardMedia
              component="img"
              height="209"
              image={imageUrl}
              alt="green iguana"
            />
          </CardActionArea>
          <CardContent>
            <Box display="inline-flex" className={classes.postCategory}>
              {data.attributes.categories.data ? (
                <>
                  {data.attributes.categories.data.map((item, index) => (
                    <>
                      {index > 0 &&
                        index < data.attributes.categories.data.length &&
                        "•"}{" "}
                      <Box className={classes.categoryItem} key={index}>
                        {item.attributes.Name}
                      </Box>
                    </>
                  ))}
                </>
              ) : null}
            </Box>
            <h3 className={classes.postTitle}>
              {!isHyperlink() && (
                <Link
                  color="inherit"
                  href={`/content/${data.attributes.slug}`}
                  underline="none"
                >
                  {data.attributes.Title}
                </Link>
              )}
              {isHyperlink() && (
                <Link
                  color="inherit"
                  href={`${data.attributes.LinkTo}`}
                  underline="none"
                >
                  {data.attributes.Title}
                </Link>
              )}
            </h3>
          </CardContent>
          <CardActions
            sx={{ borderTop: "1px solid #ccc", justifyContent: "flex-end" }}
          >
            <div className={classes.footerDate}>
              {getTimeAgo(data.attributes.createdAt)}
            </div>
          </CardActions>
        </Card>
      ) : null}
    </Grid>
  );
};

export default CardItem;