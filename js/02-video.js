import { Player } from "@vimeo/player";
import { throttle } from "lodash";

const videoplayer = document.querySelector("iframe");
const player = new Player(videoplayer);

player.on(
  "timeupdate",
  throttle((e) => {
    localStorage.setItem("videoplayer-current-time", e.seconds);
  }, 1000)
);
player.localStorage.setItem(
  localStorage.getItem("videoplayer-current-time") || 0
);
