// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;const registerPlugin = videojs.registerPlugin || videojs.plugin;

// videojs.registerPlugin("unmuteButton", function () { // VIDEOJS 7
registerPlugin("unmuteButton", function () {
  // Cross-compatibility for Video.js 5 and 6.
  let player = this;

  let setVol = player.volume();
  console.log(setVol);
  // let volumeLevel = setVol
  let volumeLevel = 1;

  // +++ Wait for loadedmetadata then try to play video +++
  player.ready(function () {
    // +++ Wait for loadedmetadata then try to play video +++
    // player.on("loadedmetadata", function () {

    if (player.autoplay()) {
      player.muted(true);
      // alert(player.muted)
    } else {
      return false;
    }
 
    // Play video which returns a promise
    let promise = player.play();

    if (promise !== undefined && player.autoplay()) {

      player.on("loadedmetadata", function () {
        // loadedmetadata - FIX WHEN VIDEO DO NOT AUTOPLAY ERROR TO NOT SHOW UNMUTE BUTTON END GETTING THE PLAYER ID

        console.log(player);

        let thisplayerid = player.id();
        // let thisplayerid = player.id_;
        console.log('playerid ' + thisplayerid);

        const playerid = document.getElementById(player.id());
        let divOverlay = document.createElement("div");

        // +++ Add button's event listener +++
        divOverlay.addEventListener("click", function () {
          player.muted(false);
          player.volume(volumeLevel);
          playerid.removeChild(divOverlay);
        });

        // +++ Configure the button +++
        // div.textContent = "Unmute";
        divOverlay.classList.add("vjs-unmute-overlay");
        divOverlay.setAttribute("style", "color:white;");

        // const playerid = document.getElementById("vid1");
        // var unmutedbutton = document.querySelector('#'+playerid+'.vjs-unmute-overlay');

        //   button.setAttribute(
        //   "style",
        //   "font-size:16px; color:white; font-weight:bold; background-color:black; width:100px; height:30px; opacity: .65;"
        // );

        // +++ Add the button to the container +++
        // const playerid = document.getElementById("vid1");
        //const playerid = myPlayer.id();
        playerid.appendChild(divOverlay);

        let unmutedbutton = document.createElement("span");
        let getoverlay = document
          .getElementById("vid1")
          .getElementsByClassName("vjs-unmute-overlay")[0];
        // var unmutedbutton = document.querySelector('#foo .bar');
        unmutedbutton.textContent = "UNMUTE";
        unmutedbutton.classList.add("vjs-unmute");
        unmutedbutton.setAttribute("style", "color:white;");

        getoverlay.appendChild(unmutedbutton);

      });

      console.log("CONSOLE2: Autoplay started!");
      promise
        .then(function () {
          // alert('CONSOLE2: Autoplay started!')
          console.log("CONSOLE2: Autoplay started!");
          // Autoplay started!
        })
        .catch(function (error) {
          // alert('CONSOLE2 Autoplay was preventeded!')
          console.log("CONSOLE2 Autoplay was prevented");
          // Autoplay was prevented.
        });
    }
  });
});
