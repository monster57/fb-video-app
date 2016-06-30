var video = document.querySelector("#videoElement");
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
	if (navigator.getUserMedia) {       
	    navigator.getUserMedia({video: true, audio:true},onSuccess, onError);
	}
	function onSuccess(mediaObj){
    window.stream = mediaObj;
    var video = document.querySelector("video");
    video.src = window.URL.createObjectURL(mediaObj);
    video.play();
}

//Our error callback where we will handle any issues
function onError(errorObj){
    console.log("There was an error: " + errorObj);
}