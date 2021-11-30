status = "";
objects = [];

function setup(){
     canvas = createCanvas(500, 350);
     canvas.position(535,350);

     video = createCapture(VIDEO);
     video.hide();
}

function modelLoaded(){
     console.log("Model Loaded!");
     status = true;
}

function start(){
     objectDetector = ml5.objectDetector('cocossd', modelLoaded);
     document.getElementById("status").innerHTML = "Status : Detecting Objects";
     object = document.getElementById("object").value;
}

function draw(){
     image(video, 0, 0, 500, 350);
     if(status != ""){
          objectDetector.detect(video, gotResult);
          for(i = 0; i < objects.length; i++){
               fill('#FF0000');
               percent = floor(objects[i].confidence * 100); 
               text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
               noFill();
               stroke('#FF0000');
               rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
     


     if(objects[i].label == object){
          video.stop();
          objectDetector.detect(gotResult);
          document.getElementById("status").innerHTML = "Status : " + object +  " found";

     var synth = window.speechSynthesis;
     var utterThis = new SpeechSynthesisUtterance(object + "found");
     synth.speak(utterThis);
     }

     else{
          document.getElementById("status").innerHTML = object + " not found";
     }

}
     }
}

function gotResult(error, results){
     if(error){
          console.error(error);
     }

     else{
          console.log(results);
          objects = results;
     }
}