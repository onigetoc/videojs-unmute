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
//   console.log(translate[shortLang])
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

  let isMuted = false;
  let hasPlayed = false;
  let haveOverlay = false;
  let allevents = false;
  let isWrapped = false;

  //  let setVol = player.volume();
  //  console.log(setVol);
  //  // let volumeLevel = setVol
  //  let volumeLevel = 1; 


  const thisplayerid = player.id();
  const playerid = document.getElementById(thisplayerid);

  if (!isWrapped) {

    // create wrapper container
    let wrapper = document.createElement('div');
    wrapper.classList.add("vjs-wrapper");
    // insert wrapper before el in the DOM tree
    playerid.parentNode.insertBefore(wrapper, playerid);
    // move el into wrapper
    wrapper.appendChild(playerid);

    isWrapped = true;

  }

  //    alert(player.currentType())

  /******* CHECK IF AUTOPLAY *******/
  if (player.autoplay()) {
    player.muted(true);
    isMuted = true;
    //      haveOverlay = true;
  } else {
    return false;
  }



  /******************** CAN AUTOPLAY ? ***********************/
  
//  let promiseTEST = player.play();

//  player.ready(function () {
//    var promiseTEST = player.play();
//
//    if (promiseTEST !== undefined) {
//      promiseTEST.then(function () {
//        alert("Autoplay started!");
//      }).catch(function (error) {
//        alert("Autoplay was prevented!");
//      });
//    }
//  });
  
  /******************** CAN AUTOPLAY ? END ***********************/ 
  
//    startPlayPromise
//      .then(function () {
//        // alert('CONSOLE2: Autoplay started!')
//        console.log("CONSOLE2: Autoplay started!");
//        // Autoplay started!
//      })
//      .catch(function (error) {
//        console.log("CONSOLE2 Autoplay was prevented!");
//        // Autoplay was prevented.
//      });



  // +++ Wait for loadedmetadata then try to play video +++
  player.ready(function () {
    
    let promiseTEST = player.play();
    
    if (promiseTEST !== undefined) {
      
//      promiseTEST;
      
      promiseTEST.then(function () {
        console.log("Autoplay started!");
      }).catch(function (error) {
        console.log("Autoplay was prevented!");
      });
    }


    // Play video which returns a promise
    let startPlayPromise = player.play();
    //    let thisplayerid = player.id();

    player.on("play", function () {
      hasPlayed = true;
      console.log("haveOverlay: " + haveOverlay)
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

        // IF haveOverlay AND AUTOPLAY WITH SOUND IT MEAN THE OVERLAY SHOULD NOT BE THERE AND DO NOT CREATE OVERLAY AGAIN AND RETURN FALSE
        if (haveOverlay)
          return false;
        else
          haveOverlay = true;

        //        const playerid = document.getElementById(player.id());
        let divOverlay = document.createElement("div");

        // +++ Add button's event listener +++
        divOverlay.addEventListener("click", function () {
          player.muted(false);
          isMuted = false;
//          player.load();
          player.play();
          player.volume(1);
          playerid.removeChild(divOverlay);
          haveOverlay = false;
        });

        let vjsLoading = document.querySelector('.vjs-loading-spinner');
        // +++ Add button's event listener +++
        vjsLoading.addEventListener("click", function () {
          player.muted(false);
          player.volume(1);
//          player.load();
          player.play();

          if (haveOverlay);
          playerid.removeChild(divOverlay);

          isMuted = false;
          haveOverlay = false;
        });


        /******* CHECK IF IS PLAYING BUT THE OVERLAY BUTTON IS STILL THERE *******/
        player.on('playing', function () {
          //          isPlaying = true;
          if (!player.muted() && hasPlayed && haveOverlay) {
            playerid.removeChild(divOverlay);
            haveOverlay = false;
            isMuted = false;
            // alert(plhaveOverlay)
          }
        });

        /*** ONEND THE USER SHOULD DO A INTERACTION TO PLAY THE VIDEO AGAIN, IF IT WAS UNMUTED THE OVERLAY BUTTON WILL BE REMOVED ***/
        player.on('ended', function () {

          //          alert("haveOverlay: " +haveOverlay );
          console.log(isMuted);
          if (player.muted() && haveOverlay && hasPlayed) {
            console.log("on ended remove divOverlay");
            console.log(haveOverlay);
            console.log(isMuted);
            playerid.removeChild(divOverlay);
            player.muted(false);
            isMuted = false;
          }

        });

        console.log("isMuted: " + isMuted);
        console.log("haveOverlay: " + haveOverlay)
        // IF isMuted=false BUTON OVERLAY WORKED, REMOVE OVERLAY AND DO NOT CONTINUE RETURN FALSE
        if (!isMuted) {

          if (haveOverlay) {
            playerid.removeChild(divOverlay);
            haveOverlay = false;
          }

          return false;
          // alert("true");
        } else {
          // isUnmuted = false;
          // haveOverlay = true;
          //haveOverlay = true;
        }

        // var styleElem = document.head.appendChild(
        //   document.createElement("style")
        // );
        // styleElem.innerHTML = '.vjs-unmute:before {font-size: 1.3em; margin-right: 8px;line-height: 1.67;font-family: VideoJS;content: "\f104";vertical-align: middle;}';

        // +++ Configure the button +++
        // div.textContent = "Unmute";
        divOverlay.classList.add("vjs-unmute-overlay");
        divOverlay.setAttribute("style", "z-index: 1");

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

  });
});
