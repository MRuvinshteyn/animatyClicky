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
var dir = 1; //binary direction -- 0 if in, 1 if out
var cnt = 0;
var frame;

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

//draws and expands/contracts circle
var draw = function(e){
	ctx.clearRect(0, 0, 500, 500);
	ctx.beginPath();
    if(dir == 1){
		ctx.arc(250,250,cnt,0,2*Math.PI);
		ctx.fill();
        cnt += 1;
    }
	else{
		ctx.arc(250,250,cnt,0,2*Math.PI);
		ctx.fill();
        cnt -= 1;
	}
	if(cnt == 0 || cnt == 50) {
        if (dir == 1){
            dir = 0;
        }
        else{
            dir = 1;
        }
    }
	frame = window.requestAnimationFrame(draw);
};

var animate = function(e){
	if(!doAnim){
		doAnim = true;
		frame = window.requestAnimationFrame(draw);
	}
};

var stop = function(e){
	if(doAnim){
		window.cancelAnimationFrame(frame);
		ctx.clearRect(0,0,500,500);
		doAnim = false;
	}
}

document.getElementById("colName").addEventListener("click", changeColName);
document.getElementById("stopAnim").addEventListener("click", stop);
document.getElementById("startAnim").addEventListener("click", animate)

changeColName();