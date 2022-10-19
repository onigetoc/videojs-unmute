# videojs-unmute
Video.js plugin to mute automatically a video in autoplay mode and will add a Unmute button like Youtube when a video is set to autoplay


#### CDN for JS and CSS files: (may be temporary - include the js file after videojs javascript file)

    <link href="//cdn.jsdelivr.net/gh/onigetoc/videojs-unmute/dist/videojs-unmute.min.css" rel="stylesheet">
    <script src="//cdn.jsdelivr.net/gh/onigetoc/videojs-unmute/dist/videojs-unmute.min.js"></script>


#### Latest version

    <script src="https://cdn.jsdelivr.net/gh/onigetoc/videojs-unmute@1.1.0/dist/videojs-unmute.min.js"></script>

## Basic Usage  

Call the plugin: 

    const myPlayer = videojs("myvideoID");
    // Call the plugin
    myPlayer.unmuteButton();  
    


The button is just a suggestion since you can click anywhere on the video to unmute.

#### Visual demo
![View demo](https://github.com/onigetoc/videojs-unmute/blob/main/unmuteButon7.gif)

#### Simple demo on Codepen  
https://codepen.io/onigetoc/full/WNJLEJj

**Githack preview:** 
https://raw.githack.com/onigetoc/videojs-unmute/main/index.html

#### Description 
Video.js plugin to mute automatically a video in autoplay mode and will add a Unmute button like Youtube when a video is set to autoplay.
Cross-compatibility for Video.js 5 and 6.

#### Languages 
Translate to 11 of the most spoken languages in the world

    translate={"en":"UNMUTE","zh":"激活声音","hi":"ध्वनि सक्रिय करें","es":"ACTIVAR SONIDO","fr":"ACTIVER LE SON","ar":"تنشيط الصوت","bn":"নিঃশব্দ","ru":"ВКЛЮЧИТЬ ЗВУК","pt":"ATIVAR SOM","de":"TON AKTIVIEREN","id":"AKTIFKAN SUARA"};  

#### To do
* ~~Add language from browser language~~
* ~~include css from the js file (may work in the next hours)~~ (Problem with :before style may just use normal .css file)
* Make it work from npm

#### Help & suggestions 
If there's a request for help or to add options create a new issue.
