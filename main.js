objectDetector="";
img="";
objects=[];
status1="";

function preload(){
img=loadImage('dog_cat.jpg');
}

function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(640,420);
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "This status: detecting Objects";
}

function modelLoaded() { 
console.log("Model Loaded!")
status1 = true; 
} 

function gotResult(error, results) { 
if (error) { 
console.log(error);
} 
console.log(results);
objects = results; 
}

function draw(){
    image(video, 0, 0, 640, 420);
    if(status1 !=""){
     r=random(255);
     g=random(255);
     b=random(255);

     objectDetector.detect(video,gotResult);

        for(var i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML="status: objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects Detected are: "+ objects.length;
            

        fill(r,g,b);
        percent = floor(objects[i].confidence * 100); 
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y);

        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }
}