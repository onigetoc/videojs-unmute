# videojs-unmute
Video.js plugin to mute automatically a video in autoplay mode and will add a Unmute button like Youtube when a video is set to autoplay


CDN for JS and CSS files: (may be temporary - include the js file after videojs javascript file)

    <link href="//cdn.jsdelivr.net/gh/onigetoc/videojs-unmute/dist/videojs-unmute.min.css" rel="stylesheet">
    <script src="//cdn.jsdelivr.net/gh/onigetoc/videojs-unmute/dist/videojs-unmute.min.js"></script>


## Basic Usage  

Call the plugin: 

    const myPlayer = videojs("myvideoID");
    // Call the plugin
    myPlayer.unmuteButton();  
    


The button is just a suggestion since you can click anywhere on the plugin.

#### Demo on Codepen 
![View demo](https://raw.githubusercontent.com/onigetoc/videojs-unmute/main/unmuteButon.gif)

### Simple demo on Codepen  
https://codepen.io/onigetoc/full/WNJLEJj

#### description 
Video.js plugin to mute automatically a video in autoplay mode and will add a Unmute button like Youtube when a video is set to autoplay.
Cross-compatibility for Video.js 5 and 6.

#### To do
* Add language frome browser language
* include css from the js file (may work in the next hours)
* Make it work from npm

#### Help & suggestions 
If there's a request for help or to add options create a new issue.
