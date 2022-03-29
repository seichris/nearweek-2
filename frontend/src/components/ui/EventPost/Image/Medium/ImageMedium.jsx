import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../../Utils/Utils";
import { placeholder } from "../../../../../Utils/placeholder";

const ImageMedium = ({ data }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const useStyles = makeStyles(() => ({
    img: {
      width: "100%",
      borderRadius: !isMobileMatch ? "12px 0 0 12px" : 0,
      minHeight: !isMobileMatch ? 526 : 360,
    },
  }));

  let medium = placeholder.getRandomPlaceholder("medium");
  if (data.attributes.Image.data) {
    medium = `${data.attributes.Image.data.attributes.formats.medium.url}`;
  }
  const classes = useStyles();
  return (
    <a href={`/events/${data.attributes.slug}`}>
      <div
        style={{
          backgroundImage: `url('${medium}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          width: "100%",
          height: "100%",
        }}
        className={classes.img}
      />
    </a>
  );
};
export default ImageMedium;
