import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Slider from "@mui/material/Slider";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { Menu } from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ContentCopy from "@mui/icons-material/ContentCopy";

const AudioControls = ({ data, isPlaying, audioRef, onPlayPauseClick }) => {
  const intervalRef = useRef();

  const [trackProgress, setTrackProgress] = useState(0);
  const [volume, setVolume] = useState((audioRef.current.volume * 100) / 2);
  const [volumeSlider, openVolumeSlider] = useState(false);
  const toggleVolumeSlider = (value) => () => {
    openVolumeSlider(value);
  };
  const { duration } = audioRef.current;

  const handleProgressChange = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const handleVolumeChange = (value) => {
    if (audioRef.current) {
      audioRef.current.volume = value > 0 ? value / 100 : 0;
    }
    setVolume(value);
  };

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        //toNextTrack(); /*TODO:*/
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  function formatDuration(duration) {
    return moment
      .duration(duration, "seconds")
      .format("mm:ss", { trim: false });
  }

  useEffect(() => {
    if (isPlaying) {
      startTimer();
    } else {
      clearInterval(intervalRef.current);
    }
  }, [isPlaying]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container sx={{ display: "flex", alignItems: "center" }}>
      <Grid item>
        <IconButton
          size="small"
          aria-label="play/pause"
          onClick={() => onPlayPauseClick(!isPlaying)}
        >
          {!isPlaying ? (
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          ) : (
            <PauseIcon sx={{ height: 38, width: 38 }} />
          )}
        </IconButton>
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Typography variant="span" sx={{ fontSize: 12, mr: 2 }}>
          {audioRef.current.currentTime
            ? formatDuration(audioRef.current.currentTime)
            : "00.00"}
          / {duration ? formatDuration(duration) : "00.00"}
        </Typography>
        <Slider
          size="small"
          min={0}
          max={duration ? duration : 0}
          sx={{ flex: 1, mr: 1 }}
          value={trackProgress}
          onChange={(e) => handleProgressChange(e.target.value)}
        />
      </Grid>
      <Grid
        item
        sx={{ flex: "0 0 auto", position: "relative" }}
        onMouseEnter={toggleVolumeSlider(true)}
        onMouseLeave={toggleVolumeSlider(false)}
      >
        <VolumeUpIcon />
        {volumeSlider && (
          <Paper
            sx={{
              flex: "1 1 auto",
              height: 56,
              top: "-100%",
              zIndex: 10,
              p: "10px 0",
              position: "absolute",
            }}
          >
            <Slider
              orientation="vertical"
              size="small"
              min={0}
              max={100}
              aria-labelledby="volume-control"
              value={volume}
              defaultValue={20}
              onChange={(e) => handleVolumeChange(e.target.value)}
            />
          </Paper>
        )}
      </Grid>
      <Grid item>
        <IconButton size="small" id="menu-button" onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "menu-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Copy link</ListItemText>
          </MenuItem>
          <Divider />
          {data.attributes.ext_links.map((item) => (
            <MenuItem
              component="a"
              key={item.Name}
              href={item.link_to}
              target="_blank"
            >
              Listen on {item.Name}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    </Grid>
  );
};

export default AudioControls;
