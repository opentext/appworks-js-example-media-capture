var self = this;
var mMedia = null;

/**
 * Start a sound recording session
 */
function captureAudio() {
  // Create an instance of AWMediaCapture with success and error handlers
  var mc = new Appworks.AWMediaCapture(
    function(mediaFiles) {
      // Success
      var string = "";
      for (var i = 0; i < mediaFiles.length; i++) {
        outAudio(mediaFiles[i].fullPath);
      }
    }, function(error) {
      // Error
      out("Error: "+ error.code);
  });

  // Create some options to limit capture operation to 3 media files, no longer than 10 seconds each
  var options = { limit: 3, duration: 10 };

  // Call AWMediaCapture.captureAudio with our options to start recording sound
  mc.captureAudio(options);
}

/**
 * Capture an image
 */
function captureImage() {
  // Create an instance of AWMediaCapture with success and error handlers
  var mc = new Appworks.AWMediaCapture(
    function(mediaFiles) {
      // Success
      var string = "";
      for (var i = 0; i < mediaFiles.length; i++) {
        outImage(mediaFiles[i].fullPath);
      }
    }, function(error) {
      // Error
      out("Error: "+ error.code);
  });

  // Create some options to limit capture operation to 2 media files
  var options = { limit: 2};

  // Call AWMediaCapture.captureImage with our options to start capture images
  mc.captureImage(options);
}

/**
 * Start a video recording session
 */
function captureVideo() {
  // Create an instance of AWMediaCapture with success and error handlers
  var mc = new Appworks.AWMediaCapture(
    function(mediaFiles) {
      // Success
      for (var i = 0; i < mediaFiles.length; i++) {
        outVideo(mediaFiles[i].fullPath);
      }
    }, function(error) {
      // Error
      out("Error: "+ error.code);
  });

  // Create some options to limit capture operation to 2 media files
  var options = { limit: 2};

  // Call AWMediaCapture.captureVideo with our options to start recording video
  mc.captureVideo(options);
}

function out(message) {
  console.log(message);
  if(typeof(message) == "object") {
    getObject("result").innerHTML = JSON.stringify(message);
  } else {
    getObject("result").innerHTML = message;
  }
}

function outImage(file) {
  console.log(file);

  var string = "<img src='"+file+"' />";
  string += "<br/>" + file

  getObject("result").innerHTML = string;
}

function outAudio(file) {
  console.log(file);

  var string = "<button onclick='playAudio(\""+file+"\")'>Play Audio</button>";
  string += "<br/>";
  string += "<button onclick='stopAudio()'>Stop Audio</button>";
  string += "<br/>" + file;

  getObject("result").innerHTML = string;
}

function outVideo(file) {
  console.log(file);

  var string = "<video width='320' height='240' controls>";
  string += "<source src='"+file+"' type='video/mp4'>";
  string += "</video>";
  string += "<br/>" + file

  getObject("result").innerHTML = string;
}

function playAudio(file) {
  self.mMedia = new Appworks.AWMedia(file, audioEnded, errorHandler, statusChanged);

  function audioEnded() {
    out('audio ended');
  }

  function errorHandler(err) {
      out(err);
  }

  function statusChanged(status) {
      console.log(status);
  }

  self.mMedia.play();
}

function stopAudio() {
  if(self.mMedia != null) {
    self.mMedia.stop();
    self.mMedia.release();
  }
}

function getObject(name) {
  return document.getElementById(name);
}
