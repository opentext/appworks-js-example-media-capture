# AppWorks Example - AWMedia and AWMediaCapture

## Contents
1. [About appworks.js](#about-appworksjs)
2. [About this example app](#about-this-example)
3. [Usage](#usage)
4. [Installation](#installation)

## About appworks.js

appworks.js is a javascript (TypeScript) library for building feature rich, hybrid enterprise apps. The OpenText AppWorks platform provides mobile and desktop clients that support apps that utilize appworks.js.

In a mobile environment the library provides access to on-device technology, and in the desktop environment some features of the underlying host OS (operating system) are exposed.

For more information, see the appworks.js repository: https://github.com/opentext/appworks-js

## About this example

The purpose of the AWMediaCapture plugin is to provide the access to the device camera and microphone to record movies, audio and capture images.
The purpose of the AWMedia plugin is to play back audio files.

## Usage

#### captureAudio

```javascript
Appworks.AWMediaCapture(errorHandler: any, errorHandler: any)
captureAudio(options?: any)
```

The captureAudio method will begin a sound recording session using the device microphone. An array of media file objects will be returned in the success handler. An error object will be returned in the error handler in the event of an error.

A JSON object of options can be provided. See The [Cordova Media Capture Plugin](https://github.com/apache/cordova-plugin-media-capture) page for more information.

Examples
```javascript
var self = this;
var mMedia = null;

var mc = new Appworks.AWMediaCapture(
  function(mediaFiles) {
    // Success
    var string = "";
    document.getElementById("result").innerHTML = "";

    for (var i = 0; i < mediaFiles.length; i++) {
      var string = "<button onclick='playAudio(\""+mediaFiles[i]+"\")'>Play Audio</button>";
      string += "<br/>";
      string += "<button onclick='stopAudio()'>Stop Audio</button>";
      string += "<br/>" + mediaFiles[i] + "<br/>";
      document.getElementById("result").innerHTML += string;
    }
  }, function(error) {
    // Error
    alert("Error: "+ error.code);
});

// Create some options to limit capture operation to 3 media files, no longer than 10 seconds each
var options = { limit: 3, duration: 10 };

// Call AWMediaCapture.captureAudio with our options to start recording sound
mc.captureAudio(options);

// ...

/**
 * A couple of methods from AWMedia to play/stop audio files
 */

 // Start playing audio
function playAudio(file) {
  self.mMedia = new Appworks.AWMedia(file, audioEnded, errorHandler, statusChanged);

  function audioEnded() {
    alert('audio ended');
  }

  function errorHandler(err) {
      alert(err);
  }

  function statusChanged(status) {
      alert(status);
  }

  self.mMedia.play();
}

// Stop audio from playing
function stopAudio() {
  if(self.mMedia != null) {
    self.mMedia.stop();
    self.mMedia.release();
  }
}
```

#### captureImage

```javascript
Appworks.AWMediaCapture(errorHandler: any, errorHandler: any)
captureImage(options?: any)
```

The captureImage method will open the device camera to capture an image. An array of media file objects will be returned in the success handler. An error object will be returned in the error handler in the event of an error.

A JSON object of options can be provided. See The [Cordova Media Capture Plugin](https://github.com/apache/cordova-plugin-media-capture) page for more information.

Examples
```javascript
var mc = new Appworks.AWMediaCapture(
  function(mediaFiles) {
    // Success
    var string = "";
    document.getElementById("result").innerHTML = "";
    for (var i = 0; i < mediaFiles.length; i++) {
      var string = "<img src='"+mediaFiles[i]+"' />";
      string += "<br/>" + mediaFiles[i] + "<br/>";
      document.getElementById("result").innerHTML += string;
    }
  }, function(error) {
    // Error
    alert("Error: "+ error.code);
});

// Create some options to limit capture operation to 2 media files
var options = { limit: 2};

// Call AWMediaCapture.captureImage with our options to start capture images
mc.captureImage(options);
```

#### captureVideo

```javascript
Appworks.AWMediaCapture(errorHandler: any, errorHandler: any)
captureVideo(options?: any)
```

The captureVideo method will open the device camera to capture video. An array of media file objects will be returned in the success handler. An error object will be returned in the error handler in the event of an error.

A JSON object of options can be provided. See The [Cordova Media Capture Plugin](https://github.com/apache/cordova-plugin-media-capture) page for more information.

Examples
```javascript
var mc = new Appworks.AWMediaCapture(
  function(mediaFiles) {
    // Success
    for (var i = 0; i < mediaFiles.length; i++) {
      var string = "<video width='320' height='240' controls>";
      string += "<source src='"+mediaFiles[i]+"' type='video/mp4'>";
      string += "</video>";
      string += "<br/>" + mediaFiles[i] + "<br/>"
      document.getElementById("result").innerHTML += string;
    }
  }, function(error) {
    // Error
    alert("Error: "+ error.code);
});

// Create some options to limit capture operation to 2 media files
var options = { limit: 2};

// Call AWMediaCapture.captureVideo with our options to start recording video
mc.captureVideo(options);
```

## Installation

This example app contains 3 important objects:
1. app.properties
2. icon.png
3. mobile.zip

#### app.properties
This files defines the app, with the following properties:
+ __displayName__: The display name of the app
+ __description__: A description of the app
+ __version__: The version of the app, e.g. 0.0.1 or 3.4.5 etc
+ __type__: This can be either app or desktop, or both (app,desktop)
+ __awgPlatformVersion__: The target appworks platform, this should be 16
+ __isAvailableOffline__: Allow this app to be used offline, can be true or false

#### icon.png
An icon that represents the app. This will appear in the gateway and on the device. 48x48px is ideal.

#### mobile.zip

This is your web content, such as html, js, css, images and any other assets.
The only essential file in your mobile.zip is index.html, which will be loaded by the appworks webview. Any other files or structure is up to the developer.

##### index.html

When your app is downloaded and installed in an appworks client, the client will place appworks.js, cordova.js and the cordova plugins in the root of your app.

In your html file, please include the following tags before any other javascript tags:

```html
<script type="text/javascript" src="cordova.js"></script>
<script type="text/javascript" src="appworks.js"></script>
```

#### Zipping and Deploying
1. Zip up the web content into a file named mobile.zip
2. Zip up the following files:
  + app.properties
  + icon.png
  + mobile.zip
3. Name this file in the format:
  + AppName_Version.zip
  + e.g. MyGreatApp_0.0.1.zip
  + __The version number in the filename must match the version number in app.properties__
4. Install the app on the gateway
  + Go to your gateway in a browser
  + sign in
  + go to app installation tab
  + drag and drop MyGreatApp_0.0.1.zip into the box.
  + Once fully deployed, enable the app.
