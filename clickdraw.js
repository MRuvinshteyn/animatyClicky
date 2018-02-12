//Michael Ruvinshteyn
//SoftDev2 pd07
//K02 -- They lock us in the tower whenever we get caught
//2018-2-7

//initialize canvas
var c = document.getElementById("slate");
var ctx = c.getContext("2d");
ctx.fillStyle = "#000000";
ctx.strokeStyle = "#000000";

//variables used for animating
var doAnim = false;
var growing = true;
var cnt = 0;
var rad = 50;
var xpos = 250;
var ypos = 250;
var vx = 5;
var vy = 2.5;
var frame;
var width = 500/4;
var height = 300/4;
var logo = new Image();
logo.src = "dvd.png";

//allows the user to change the fill color
var changeColName = function(){
    var name = document.getElementById('col').value;
    var par = document.getElementById('coltext');
    par.innerHTML = name;
    //console.log(name);
    ctx.fillStyle = name;
    ctx.strokeStyle = name;
    console.log(ctx.fillStyle);
    //console.log(ctx.strokeStyle);
}

//allows the user to change the maximum radius of the circle
var changeRadius = function(){
    var newRad = document.getElementById('radMax').value;
    rad = newRad;
    //console.log(newRad);
}

//expands/contracts circle
var drawExpand = function(){
	ctx.clearRect(0, 0, 500, 500);
	ctx.beginPath();
    if(growing){
		ctx.arc(250,250,cnt,0,2*Math.PI);
		ctx.fill();
        cnt += 1;
    }
	else{
		ctx.arc(250,250,cnt,0,2*Math.PI);
		ctx.fill();
        cnt -= 1;
	}
    if (cnt <= 0){
        growing = true;
    }
    if (cnt >= rad){
        growing = false;
    }
	frame = window.requestAnimationFrame(drawExpand);
}

var animateExpand = function(e){
	if (!doAnim){
		doAnim = true;
		frame = window.requestAnimationFrame(drawExpand);
	}
}

//shifts circle like DVD logo
var drawShift = function(){
    ctx.clearRect(0, 0, 500, 500);
    //ctx.drawImage(logo,xpos-width,ypos-height,2*width,2*height); //bland version
    ctx.drawImage(logo,xpos-width,ypos-height,2*width,2*height,xpos-width,ypos,2*width,2*height); //ascended version
    xpos += vx;
    if (xpos + width >= 500 || xpos - width <= 0){
        vx = vx * -1;
    }
    ypos += vy;
    if (ypos + height >= 500 || ypos - height <= 0){
        vy = vy * -1;
    }
    frame = window.requestAnimationFrame(drawShift);
}

var animateShift = function(e){
	if (!doAnim){
		doAnim = true;
		frame = window.requestAnimationFrame(drawShift);
	}
}

var stop = function(e){
	if(doAnim){
		window.cancelAnimationFrame(frame);
		ctx.clearRect(0,0,500,500);
		doAnim = false;
	}
}

document.getElementById("colName").addEventListener("click", changeColName);
document.getElementById("stopAnim").addEventListener("click", stop);
document.getElementById("startExpand").addEventListener("click", animateExpand);
document.getElementById("startShift").addEventListener("click", animateShift);
document.getElementById("changeRad").addEventListener("click",changeRadius);

changeColName();
