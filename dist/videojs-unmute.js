// POSSIBLE OPTIONS TO ADD?
// BUTTON LEFT RIGHT TOP BOTTOM - BUTTON COLOR WHITE OR BLACK -

// LANGAGE TRANSLATE JSON
const translate = {
  en: "UNMUTE",
  zh: "激活声音",
  hi: "ध्वनि सक्रिय करें",
  es: "ACTIVAR SONIDO",
  fr: "ACTIVER LE SON",
  ar: "تنشيط الصوت",
  bn: "নিঃশব্দ",
  ru: "ВКЛЮЧИТЬ ЗВУК",
  pt: "ATIVAR SOM",
  de: "TON AKTIVIEREN",
  id: "AKTIFKAN SUARA"
};

// GET USER BROWSER LANGAGE
let lang = window.navigator.languages ? window.navigator.languages[0] : null;
lang =
  lang ||
  window.navigator.language ||
  window.navigator.browserLanguage ||
  window.navigator.userLanguage;

// lang = "de"; // TEST

if (typeof lang === "undefined" || lang === null) lang = "us-en";

let shortLang = lang;
if (shortLang.indexOf("-") !== -1) shortLang = shortLang.split("-")[0];
if (shortLang.indexOf("_") !== -1) shortLang = shortLang.split("_")[0];

console.log(lang, shortLang);

if (typeof translate[shortLang] === "undefined") {
  console.log('Variable "shortLang" is undefined.');
  translated = "UNMUTE";
} else {
  console.log('Variable "shortLang": ' + translate[shortLang]);
  translated = translate[shortLang];
}

// for(shortLang of Object.keys(translate)){
// // console.log(shortLang);
//   alert(translate[shortLang])
// }

// Object.keys(translate).forEach(function(key) {
//   // console.log('translate : ' + key + ', Value : ' + translate[key])
// })

// if (translate.hasOwnProperty(shortLang)) {
//   console.log(true);
//   shortLang = translate[shortLang];
// } else {
//   console.log(false);
//   shortLang = en;
// }

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;const registerPlugin = videojs.registerPlugin || videojs.plugin;

// videojs.registerPlugin("unmuteButton", function () { // VIDEOJS 7

registerPlugin("unmuteButton", function () {
  // Cross-compatibility for Video.js 5 and 6.
  let player = this;
  
  let isUnmuted = false;
  let hasPlayed = false;
  let hasOverlay = false;
  let allevents = false;

  let setVol = player.volume();
  console.log(setVol);
  // let volumeLevel = setVol
  let volumeLevel = 1;
  
//  
//  if (player.autoplay()) {
//    player.muted(true);
//    // alert(player.muted)
//  } else {
//    return false;
//  }

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
    let startPlayPromise = player.play();
    let thisplayerid = player.id();
    
    player.on("play", function () {
      hasPlayed = true;
      console.log("hasOverlay: "+hasPlayed)
    });

    // alert(thisplayerid)

    if (startPlayPromise !== undefined && player.autoplay()) {
      // let thisplayerid = player.id();

      startPlayPromise;
      // .then(() => {
      player.on("loadedmetadata", function () {
        // loadedmetadata - FIX WHEN VIDEO DO NOT AUTOPLAY ERROR TO NOT SHOW UNMUTE BUTTON END GETTING THE PLAYER ID

        console.log(player);

        // let thisplayerid = player.id();
        // let thisplayerid = player.id_;
        console.log("playerid " + thisplayerid);
        
        // IF hasOverlay AND AUTOPLAY WITH SOUND IT MEAN THE OVERLAY SHOULD NOT BE THERE AND DO NOT CREATE OVERLAY AGAIN AND RETURN FALSE
        if (hasOverlay)
          return false;

        const playerid = document.getElementById(player.id());
        let divOverlay = document.createElement("div");

        // +++ Add button's event listener +++
        divOverlay.addEventListener("click", function () {
          player.muted(false);
          player.volume(volumeLevel);
          playerid.removeChild(divOverlay);
          isUnmuted = true;
          hasOverlay = false;
        });
        
        console.log("isUnmuted: "+isUnmuted);
        console.log("hasOverlay: "+hasOverlay)
        // IF ISUNMUTED BUTON OVERLAY WORKED, REMOVE OVERLAY AND DO NOT CONTINUE RETURN FALSE
        if (isUnmuted) {
          
          if (hasOverlay){
            playerid.removeChild(divOverlay);
            hasOverlay = false;
          }
                               
          return false;
          // alert("true");
        } else {
          // isUnmuted = false;
          // hasPlayed = true;
          hasOverlay = true;
        }

        // var styleElem = document.head.appendChild(
        //   document.createElement("style")
        // );
        // styleElem.innerHTML = '.vjs-unmute:before {font-size: 1.3em; margin-right: 8px;line-height: 1.67;font-family: VideoJS;content: "\f104";vertical-align: middle;}';

        // +++ Configure the button +++
        // div.textContent = "Unmute";
        divOverlay.classList.add("vjs-unmute-overlay");
        divOverlay.setAttribute("style","z-index: 1");

        // const playerid = document.getElementById("videoid");
        // var unmutedbutton = document.querySelector('#'+playerid+'.vjs-unmute-overlay');

        //   button.setAttribute(
        //   "style",
        //   "font-size:16px; color:white; font-weight:bold; background-color:black; width:100px; height:30px; opacity: .65;"
        // );

        // +++ Add the button to the container +++
        // const playerid = document.getElementById("videoid");
        //const playerid = myPlayer.id();
        playerid.appendChild(divOverlay);

        let unmutedbutton = document.createElement("span");
        let getoverlay = document
          .getElementById(thisplayerid)
          .getElementsByClassName("vjs-unmute-overlay")[0];
        // var unmutedbutton = document.querySelector('#foo .bar');
        // unmutedbutton.textContent = "UNMUTE";
        unmutedbutton.textContent = translated;
        unmutedbutton.classList.add("vjs-unmute");
        unmutedbutton.setAttribute("style", "z-index: 1");

        getoverlay.appendChild(unmutedbutton);
      });
      // .catch((error) => {
      //   if (error.name === "NotAllowedError") {
      //     // showPlayButton(videoElem);
      //     // playerid.removeChild(divOverlay);
      //   } else {
      //     // Handle a load or playback error
      //   }
      // });
    }

    /*********************************************************************/

    //     if (startPlayPromise !== undefined && player.autoplay()) {

    //       let thisplayerid = player.id();

    //       player.on("loadedmetadata", function () {
    //         // loadedmetadata - FIX WHEN VIDEO DO NOT AUTOPLAY ERROR TO NOT SHOW UNMUTE BUTTON END GETTING THE PLAYER ID

    //         console.log(player);

    //         // let thisplayerid = player.id();
    //         // let thisplayerid = player.id_;
    //         console.log("playerid " + thisplayerid);

    //         const playerid = document.getElementById(player.id());
    //         let divOverlay = document.createElement("div");

    //         // +++ Add button's event listener +++
    //         divOverlay.addEventListener("click", function () {
    //           player.muted(false);
    //           player.volume(volumeLevel);
    //           playerid.removeChild(divOverlay);
    //         });

    //         // var styleElem = document.head.appendChild(
    //         //   document.createElement("style")
    //         // );
    //         // styleElem.innerHTML = '.vjs-unmute:before {font-size: 1.3em; margin-right: 8px;line-height: 1.67;font-family: VideoJS;content: "\f104";vertical-align: middle;}';

    //         // +++ Configure the button +++
    //         // div.textContent = "Unmute";
    //         divOverlay.classList.add("vjs-unmute-overlay");
    //         divOverlay.setAttribute(
    //           "style",
    //           "position: absolute;background-color: transparent; left: 0;right: 0;top: 0;bottom: 0; z-index: 1;"
    //         );

    //         // const playerid = document.getElementById("vid1");
    //         // var unmutedbutton = document.querySelector('#'+playerid+'.vjs-unmute-overlay');

    //         //   button.setAttribute(
    //         //   "style",
    //         //   "font-size:16px; color:white; font-weight:bold; background-color:black; width:100px; height:30px; opacity: .65;"
    //         // );

    //         // +++ Add the button to the container +++
    //         // const playerid = document.getElementById("vid1");
    //         //const playerid = myPlayer.id();
    //         playerid.appendChild(divOverlay);

    //         let unmutedbutton = document.createElement("span");
    //         let getoverlay = document
    //           .getElementById("vid1")
    //           .getElementsByClassName("vjs-unmute-overlay")[0];
    //         // var unmutedbutton = document.querySelector('#foo .bar');
    //         // unmutedbutton.textContent = "UNMUTE";
    //         unmutedbutton.textContent = translated;
    //         unmutedbutton.classList.add("vjs-unmute");
    //         unmutedbutton.setAttribute(
    //           "style",
    //           "left: 20px;top: 20px;border-radius: 5px;position: relative;line-height: 30px;text-align: center;cursor: pointer;font-size: 17px;color: white;font-weight: 500;background-color: rgba(0,0,0,.5); padding: 10px 13px;"
    //         );

    //         getoverlay.appendChild(unmutedbutton);
    //       });

    //       /****************************************/

    // alert(thisplayerid)

    startPlayPromise
      .then(function () {
        // alert('CONSOLE2: Autoplay started!')
        console.log("CONSOLE2: Autoplay started!");
        // Autoplay started!
      })
      .catch(function (error) {
        console.log("CONSOLE2 Autoplay was prevented!");
        // Autoplay was prevented.
      });

    //     }
  });
});

/****************************************************************/

/*******************  TEST PLUGIN 2 ********************/

// Make a plugin that alerts when the player plays

//     videojs.plugin('myPlugin', function(myPluginOptions) {
//       myPluginOptions = myPluginOptions || {};

//       var player = this;
//       var alertText = myPluginOptions.text || 'Player is playing!'

//       player.on('playing', function(){
//         console.log(alertText);
//       });
//     });

// USAGE EXAMPLES
// EXAMPLE 1: New player with plugin options, call plugin immediately

/******************************************************/

// var myPlayer = videojs.getPlayer("myPlayerID"),
//const myPlayer = videojs("vid1");
//// const myPlayer = videojs("vid1").unmuteButton();
//
//// volumeLevel = 1;
//
//// const myPlayer = videojs('vid1', {
////   unmuteButton: {
////     text: 'Custom text!'
////   }
//// });
//
//// myPlayer.unmuteButton({test: 'hello'}); // with options
//myPlayer.unmuteButton();

// // myPlayer.myPlugin(); // plugin option from text setting before
// myPlayer.myPlugin({
//   text: 'Alert or Console.log on playing'
// });

/******************** CHECK IF PLAYER AUTO PLAY OR PREVENTED && IF IS MUTED *********************/

// const myPlayer2 = videojs("vid2");

// myPlayer.ready(function () {
//   console.log("ready");

//   // alert(myPlayer.muted());
//   // if (myPlayer.autoplay() && !myPlayer.muted()) {
//   if (myPlayer.autoplay()) {
//     myPlayer.muted(true);
//   } else {
//     return false;
//   }
//   var promise = myPlayer.play();
//   // var promise;

//   if (promise !== undefined && myPlayer.autoplay()) {
//     const playerid = document.getElementById("vid1");

//     var divOverlay = document.createElement("div");

//     // +++ Add button's event listener +++
//     divOverlay.addEventListener("click", function () {
//       myPlayer.muted(false);
//       myPlayer.volume(volumeLevel);
//       playerid.removeChild(divOverlay);
//     });

//     // +++ Configure the button +++
//     // div.textContent = "Unmute";
//     divOverlay.classList.add("vjs-unmute-overlay");
//     divOverlay.setAttribute("style", "color:white;");

//     // const playerid = document.getElementById("vid1");
//     // var unmutedbutton = document.querySelector('#'+playerid+'.vjs-unmute-overlay');

//     //   button.setAttribute(
//     //   "style",
//     //   "font-size:16px; color:white; font-weight:bold; background-color:black; width:100px; height:30px; opacity: .65;"
//     // );

//     // +++ Add the button to the container +++
//     // const playerid = document.getElementById("vid1");
//     //const playerid = myPlayer.id();
//     playerid.appendChild(divOverlay);

//     var unmutedbutton = document.createElement("span");

//     var getoverlay = document
//       .getElementById("vid1")
//       .getElementsByClassName("vjs-unmute-overlay")[0];
//     // var unmutedbutton = document.querySelector('#foo .bar');
//     unmutedbutton.textContent = "UNMUTE";
//     unmutedbutton.classList.add("vjs-unmute");
//     unmutedbutton.setAttribute("style", "color:white;");

//     getoverlay.appendChild(unmutedbutton);

//     console.log("CONSOLE2: Autoplay started!");
//     promise
//       .then(function () {
//         // alert('CONSOLE2: Autoplay started!')
//         console.log("CONSOLE2: Autoplay started!");
//         // Autoplay started!
//       })
//       .catch(function (error) {
//         // alert('CONSOLE2 Autoplay was preventeded!')
//         console.log("CONSOLE2 Autoplay was prevented");
//         // Autoplay was prevented.
//       });
//   }
// });

/******************** BASIC CHECK IF PLAYER AUTO PLAY OR PREVENTED *********************/
// myPlayer.ready(function() {
//   var promise = myPlayer.play();

//   if (promise !== undefined) {
//     promise.then(function() {
//       console.log('Autoplay started!');
//       // Autoplay started!
//     }).catch(function(error) {
//       console.log('Autoplay was prevented');
//       // Autoplay was prevented.
//     });
//   }
// });

// // +++ Wait for loadedmetadata then try to play video +++
// myPlayer.on("loadedmetadata", function() {
//   // Play video which returns a promise
//   var promise = myPlayer.play();
//   console.log("promise", promise);

//   // +++ Use promise to see if video is playing or not +++
//   if (promise !== undefined) {
//     promise
//       .then(function() {
//         // Autoplay started!
//         // If video playing unmute and set the volume
//         myPlayer.muted(false);
//         myPlayer.volume(volumeLevel);
//       })
//       .catch(function(error) {
//         // Autoplay was prevented.
//         // // +++ If autoplay prevented mute the video, play video and display unmute button +++
//         myPlayer.muted(true);
//         myPlayer.play();

//         var button = document.createElement("button");

//         // +++ Add button's event listener +++
//         button.addEventListener("click", function() {
//           myPlayer.muted(false);
//           myPlayer.volume(volumeLevel);
//           playerContainer.removeChild(button);
//         });

//         // +++ Configure the button +++
//         button.textContent = "Unmute";
//         button.classList.add("inner");
//         button.setAttribute(
//           "style",
//           "color:black; background-color:red; width:100px; height:50px; opacity: .4;"
//         );

//         // +++ Add the button to the container +++
//         playerContainer.appendChild(button);
//       });
//   }
// });


