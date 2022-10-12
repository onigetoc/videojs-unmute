# videojs-unmute
Video.js plugin to mute automatically a video in autoplay mode and will add a Unmute button like Youtube when a video is set to autoplay


CDN for JS and CSS files: (may be temporary - include the js file after videojs javascript file)

    https://cdn.jsdelivr.net/gh/onigetoc/videojs-unmute/dist/videojs-unmute.min.js  
    https://cdn.jsdelivr.net/gh/onigetoc/videojs-unmute/dist/videojs-unmute.min.css


## Basic Usage  

Call the plugin: 

    const myPlayer = videojs("myvideoID");
    // Call the plugin
    myPlayer.unmuteButton();  
    


The button is just a suggestion since you can click anywhere on the plugin.

Visual demo

![View demo](https://raw.githubusercontent.com/onigetoc/videojs-unmute/main/unmuteButon.gif)


#### description 
Video.js plugin to mute automatically a video in autoplay mode and will add a Unmute button like Youtube when a video is set to autoplay

#### To do
* Add language frome browser language
* include css from the js file (may work in the next hours)
* Make it work from npm

#### Help & suggestions 
If there's a request for help or to add options create a new issue.
