import * as React from "react";
import Navbar from "../Navbar/Navbar";
import { useMatch } from "react-router";
import { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import {
  faChevronLeft,
  faCommentAlt,
  faEye,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import IosShareIcon from "@mui/icons-material/IosShare";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import ReactMarkdown from "react-markdown";
import * as Utils from "../../../Utils/Utils";
import EditionsList from "./List/EditionsList";
import { getPubDate, MOBILE_WIDTH } from "../../../Utils/Utils";
import useMediaQuery from "@mui/material/useMediaQuery";

library.add(faDiscord);

const EditionPost = () => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const useStyles = makeStyles((theme) => ({
    pageWrapper: {
      backgroundColor: "#f7f7f7",
    },
    contentContainer: {
      maxWidth: " 900px",
      minWidth: "200px",
      margin: "0 auto",
      position: "relative",
    },
    contentWrapper: {
      marginLeft: "16px",
      marginRight: "16px",
    },
    headerBlock: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
      minHeight: "calc(302px - 6px)",
    },
    headerBlockFooter: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "36px",
      color: "#fff",
      fontSize: "14px",
    },
    link: {
      color: "#fff",
    },
    icon: {
      marginRight: "24px",
    },
    breadcrumb: {
      color: "#ffffff99",
      marginTop: 32,
      [theme.breakpoints.down("sm")]: {
        marginTop: 16,
      },
    },
    headerContainer: {
      position: "absolute",
      top: 73,
      [theme.breakpoints.down("sm")]: {
        top: 56,
      },
      width: "100%",
      height: "302px",
      "&::before": {
        content: "''",
        display: "block",
        background: "#222222b3",
        position: "absolute",
        width: "100%",
        height: "100%",
      },
    },
    img: {
      width: "100%",
      height: "320px",
    },
    postTitle: {
      fontSize: "48px",
      color: "#fff",
      margin: "4px 0",
    },
    postDate: {
      marginRight: 24,
    },
    postWidgets: {
      display: "flex",
      alignItems: "center",
    },
    postWidget: {
      paddingRight: "24px",
    },
    actionButton: {
      padding: "12px !important",
      backgroundColor: " #cccccc85 !important",
      borderRadius: "8px !important",
      margin: "0 6px !important",
      fontSize: "12px !important",
      fontWeight: "600 !important",
      letterSpacing: "1.25px !important",
    },
    actionIcon: {
      color: "#fff",
      fontSize: "14px !important",
    },
    postActions: {
      marginTop: 36,
      marginBottom: 36,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      "& .MuiButton-root": {
        margin: "0 8px",
        fontWeight: "700 !important",
        borderRadius: "10px !important",
      },
    },
    likeBtn: {
      color: "#0d00ff  !important",
      backgroundColor: "#e1dff5 !important",
    },
    button: {
      margin: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        minWidth: "36px !important",
        minHeight: "36px !important",
        paddingLeft: "8px !important",
        paddingRight: "8px !important",
        "& .MuiButton-startIcon": {
          margin: 0,
        },
      },
    },
    buttonText: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    shareBtn: {
      backgroundColor: "#0d00ff !important",
    },
    twitterBtn: {
      backgroundColor: "#1f9bf0 !important",
    },
    telegramBtn: {
      backgroundColor: "#000000 !important",
    },
    discordBtn: {
      backgroundColor: "#36393e !important",
    },
    containerBody: {
      marginBottom: "26px",
      borderBottom: "1px solid #e1dff5",
    },
    postBody: {
      marginBottom: "8px",
    },
    readMoreLink: {
      display: "flex",
      flexDirection: "column",
      color: "#0d00ff",
      fontWeight: "bold",
      marginBottom: "24px",
    },
    blockTitle: {
      fontSize: "42px",
      fontWeight: "900",
      marginBottom: "24px",
    },
    highlightItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      backgroundColor: "#fff",
      marginBottom: "12px",
    },
    highlightTitle: {
      fontSize: "20px",
      margin: "0 24px",
      fontWeight: "bold",
      "& a": {
        color: "#0d00ff",
      },
    },
  }));
  const match = useMatch(`/editions/:editionId`);

  const [edition, setEdition] = useState(null);
  const [editions, setEditions] = useState({ data: [], meta: {} });
  const [ids, setIds] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    const { data, meta } = await Utils.api.getOneEdition(
      match.params.editionId
    );
    if (data) {
      setEdition(data);
      if (meta) {
        setIds(meta.ids);
      }
    }
  }, []);

  useEffect(async () => {
    const data = await Utils.api.getAllEditions();
    if (data) {
      setEditions(data);
    }
  }, []);

  const handleForward = (e) => {
    e.preventDefault();
    if (ids) {
      const curr = ids.indexOf(edition.id);
      if (curr !== ids.length - 1) {
        navigate(`/editions/${ids[curr + 1]}`);
        window.location.reload();
      }
    }
  };

  const handleBackward = (e) => {
    e.preventDefault();
    if (ids) {
      const curr = ids.indexOf(edition.id);
      if (curr !== 0) {
        navigate(`/editions/${ids[curr - 1]}`);
        window.location.reload();
      }
    }
  };

  const PostActions = () => {
    return (
      <Box className={classes.postActions}>
        <Box>
          <Button
            className={[classes.button, classes.shareBtn].join(" ")}
            variant="contained"
            disableElevation
            startIcon={<IosShareIcon />}
          >
            <span className={classes.buttonText}>SHARE</span>
          </Button>
          <Button
            className={[classes.button, classes.twitterBtn].join(" ")}
            variant="contained"
            disableElevation
            startIcon={<TwitterIcon />}
          >
            <span className={classes.buttonText}>TWITTER</span>
          </Button>
          <Button
            className={[classes.button, classes.telegramBtn].join(" ")}
            variant="contained"
            disableElevation
            startIcon={<TelegramIcon />}
          >
            <span className={classes.buttonText}>TELEGRAM</span>
          </Button>
          <Button
            className={[classes.button, classes.discordBtn].join(" ")}
            variant="contained"
            disableElevation
            startIcon={<FontAwesomeIcon icon={faDiscord} />}
          >
            <span className={classes.buttonText}>DISCORD</span>
          </Button>
        </Box>
        <Box>
          <Button
            className={classes.likeBtn}
            variant="contained"
            disableElevation
            startIcon={<ThumbUpIcon />}
          >
            Like
          </Button>
        </Box>
      </Box>
    );
  };

  let imageUrl = "";
  if (edition) {
    imageUrl = edition.attributes.Image.data?.attributes.url;
  }

  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <Box className={classes.containerBody}>
        <p className={classes.postBody}>
          {isReadMore ? text.slice(0, 230) + "..." : text}
        </p>
        <span
          onClick={toggleReadMore}
          className={classes.readMoreLink}
          style={{ cursor: "pointer" }}
        >
          {isReadMore ? "Read more" : "Show less"}
        </span>
      </Box>
    );
  };
  const classes = useStyles();
  return (
    <>
      <Navbar />
      {edition && (
        <>
          <Box
            display="flex"
            flexDirection="row"
            className={classes.headerContainer}
          >
            <div
              style={{
                backgroundImage: imageUrl ? `url('${imageUrl}')` : "none",
                backgroundSize: "cover",
                backgroundPosition: "50% 50%",
                width: "100%",
                height: "100%",
              }}
              className={"banner " + classes.img}
            />
          </Box>
          <Box className={classes.pageWrapper}>
            <Box className={classes.contentContainer}>
              <Box className={classes.contentWrapper}>
                <Box className={classes.headerBlock}>
                  <Box className={classes.breadcrumb}>
                    <a className={classes.link} href="/editions">
                      <FontAwesomeIcon
                        className={classes.icon}
                        icon={faChevronLeft}
                      />
                      <span>Editions / </span>
                    </a>
                    <span className={classes.current}>
                      {`${edition.attributes.Title} # ${edition.attributes.Number}`}
                    </span>
                  </Box>
                  <Box>
                    <h2 className={classes.postTitle}>
                      {" "}
                      {`${edition.attributes.Title} # ${edition.attributes.Number}`}
                    </h2>
                    <Box className={classes.headerBlockFooter}>
                      <Box display="inline-flex">
                        <Box className={classes.postDate}>
                          <span>{getPubDate(edition.attributes.Period)}</span>
                        </Box>
                        <div className={classes.postWidgets}>
                          <span className={classes.postWidget}>
                            <FontAwesomeIcon icon={faEye} />{" "}
                            {edition.attributes.views}
                          </span>
                          <span className={classes.postWidget}>
                            <FontAwesomeIcon icon={faThumbsUp} />{" "}
                            {edition.attributes.likes}
                          </span>
                          <span className={classes.postWidget}>
                            <FontAwesomeIcon icon={faCommentAlt} /> 0
                          </span>
                        </div>
                      </Box>
                      {!isMobileMatch && (
                        <Box>
                          <IconButton
                            color="primary"
                            className={classes.actionButton}
                            onClick={(e) => handleBackward(e)}
                          >
                            <ArrowBackIosIcon className={classes.actionIcon} />
                          </IconButton>
                          <Button
                            className={classes.actionButton}
                            variant="contained"
                            disableElevation
                          >
                            CURRENT
                          </Button>
                          <IconButton
                            color="primary"
                            onClick={(e) => handleForward(e)}
                            className={classes.actionButton}
                          >
                            <ArrowForwardIosIcon
                              className={classes.actionIcon}
                            />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
                <PostActions />
                <ReadMore>{edition.attributes.Body}</ReadMore>
                <Box>
                  <Box className={classes.blockTitle}>{"Highlights"}</Box>
                  <Box>
                    {edition && edition.attributes.Highlights ? (
                      <>
                        {edition.attributes.Highlights.map((item, index) => (
                          <Box className={classes.highlightItem} key={index}>
                            <ReactMarkdown className={classes.highlightTitle}>
                              {item.Link}
                            </ReactMarkdown>
                          </Box>
                        ))}
                      </>
                    ) : null}
                  </Box>
                </Box>
                <Box>
                  <Box className={classes.blockTitle}>{"DAO's"}</Box>
                  <Box>
                    {edition && edition.attributes.DAOs ? (
                      <>
                        {edition.attributes.DAOs.map((item, index) => (
                          <Box className={classes.highlightItem} key={index}>
                            <ReactMarkdown className={classes.highlightTitle}>
                              {item.Link}
                            </ReactMarkdown>
                          </Box>
                        ))}
                      </>
                    ) : null}
                  </Box>
                </Box>
                <Box>
                  <Box className={classes.blockTitle}>{"DeFI"}</Box>
                  <Box>
                    {edition && edition.attributes.DeFI ? (
                      <>
                        {edition.attributes.DeFI.map((item, index) => (
                          <Box className={classes.highlightItem} key={index}>
                            <ReactMarkdown className={classes.highlightTitle}>
                              {item.Link}
                            </ReactMarkdown>
                          </Box>
                        ))}
                      </>
                    ) : null}
                  </Box>
                </Box>
                <Box>
                  <Box className={classes.blockTitle}>{"Latest Editions"}</Box>
                </Box>
                <Box>
                  {editions.data.length > 0 && (
                    <EditionsList editions={editions.data} />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default EditionPost;
