// DOM: <video id="video-bg" class="video-bg" poster=""/>

var selectBG;
var videoBG;
var videoRetryHandler;
var isLoopPlay;
const posterBG = "/assets/images/bg_reclaim_hong_kong.jpg";

$(document).ready(function () {
  selectBG = document.getElementById("select-video-bg");
  videoBG = document.getElementById("video-bg");
  videoBG.preload = "auto";
  setLoopPlay(false);

  videoRetryHandler = setInterval(retryPlaying, 3000);

  $(videoBG).on("canplay", function () {
    setTimeout(function () {
      fetchVideoAndPlay();
    }, 500);
  });

  $(videoBG).on("ended", function () {
    shiftVideo(isLoopPlay ? 0 : 1);
  });

  $(selectBG).change(function () {
    src = $(this).val() != "" ? $(this).val() : null;
    setVideoDefault(src);
    setVideoBGSrc(src);
    reloadVideoBG();
  });
});

function toogleSoundVideoBG(isReset = false) {
  const mute = 0.0,
    full = 1.0;
  const elVolume = $(".grid-video-bg i")[2];
  const iconVolumeOff = "fa-volume-off",
    iconVolumeUp = "fa-volume-up";
  let volumeSet = full;
  if (!isReset) {
    volumeSet = videoBG.volume == mute ? full : mute;
  } //toogle
  $(elVolume)
    .toggleClass(iconVolumeOff, volumeSet == mute)
    .toggleClass(iconVolumeUp, volumeSet == full);
  videoBG.volume = volumeSet;
}

function toogleOpacity(isReset = false) {
  const cssBgColor = "background-color";
  const attrStyle = "style";
  const divPageContainer = "div.page-container";
  const divSidebar = "div.sidebar";
  const regexRGBA = /[^,]+(?=\))/;
  const alphaView = "0.3";
  const alphaBlog = "0.8";
  // eval and toggle
  if (isReset) {
    // reset
    $(divPageContainer).removeAttr(attrStyle);
    $(divSidebar).removeAttr(attrStyle);
    return;
  }
  // toggle
  if (!isPlaying()) return;
  var isBlogMode = $(divPageContainer).css(cssBgColor).search(alphaBlog) != -1;
  var alphaToggle = isBlogMode ? alphaView : alphaBlog;
  var rgbaPageContainer = $(divPageContainer)
    .css(cssBgColor)
    .replace(regexRGBA, alphaToggle);
  var rgbaSidebar = $(divSidebar)
    .css(cssBgColor)
    .replace(regexRGBA, alphaToggle);
  $(divPageContainer).css(cssBgColor, rgbaPageContainer);
  $(divSidebar).css(cssBgColor, rgbaSidebar);
}

function setVideoDefault(val) {
  if (val != null) return;
  isReset = true;
  toogleSoundVideoBG(isReset);
  toogleOpacity(isReset);
}

function setVideoBGSrc(val) {
  videoBG.src = val ? val : "";
  videoBG.setAttribute("poster", val ? posterBG : "");
}

function reloadVideoBG() {
  videoBG.load();
}

function changePlaySeq(event) {
  setLoopPlay(!isLoopPlay);
}

function setLoopPlay(flag) {
  const elPlayLoop = $(".grid-video-bg i")[1];
  const iconListPlay = "fa-list-ul";
  const iconLoopPlay = "fa-repeat";
  isLoopPlay = flag;
  $(elPlayLoop)
    .toggleClass(iconLoopPlay, isLoopPlay)
    .toggleClass(iconListPlay, !isLoopPlay);
}

function shiftVideo(offset) {
  var currentIndex = selectBG.selectedIndex;
  var lengthOptions = selectBG.length;
  var targetIndex = (currentIndex + offset) % lengthOptions;
  if (targetIndex < 0) {
    targetIndex += lengthOptions;
  } else if (targetIndex == 0) {
    targetIndex = offset < 0 ? lengthOptions + offset : offset;
  }
  $(selectBG)
    .find("option")
    .each(function (index, element) {
      if (index == targetIndex) {
        $(selectBG).val(element.value).trigger("change");
        return false; // break the foreach loop
      }
    });
}

function isPlaying() {
  return (
    selectBG.selectedIndex != 0 && !videoBG.paused && videoBG.played.length != 0
  );
}

function isLagged() {
  return selectBG.selectedIndex != 0 && videoBG.paused;
}

function retryPlaying() {
  if (isPlaying()) return;
  if (!isLagged()) return;
  console.debug("Try replaying BG video...");
  fetchVideoAndPlay();
}

function fetchVideoAndPlay() {
  fetch(videoBG.src)
    .then((response) => response.blob())
    .then((blob) => {
      return videoBG.play();
    })
    .then((_) => {
      console.debug("Video playback started!");
    })
    .catch((e) => {
      console.debug("Video playback failed.");
    });
}
