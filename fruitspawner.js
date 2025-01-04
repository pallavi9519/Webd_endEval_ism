var myCanvas = document.getElementById("myCanvas");
var c = myCanvas.getContext("2d");

var maxspawnpx = 500;
var minspawnpx = 140;

//global variables for menu
var menu = 0;
var globalpoints = 0;
var lifes = 3;
var restart = false;
var heart = new Image();
heart.src = "Images/heart.png";

//mouse variables
var mouseX;
var mouseY;
var clickX;
var clickY;
var mouseispressed=false;

//eventlistner and functions callbacks
myCanvas.addEventListener("mousemove", getPos);
myCanvas.addEventListener("mouseup", getClickup);
myCanvas.addEventListener("mousedown", getClickdown);


//mouseEvent.offsetX = mouseEvent.x - mycanvas.offsetLeft 

function getPos(mouseEvent){
   if(mouseEvent.pageX || mouseEvent.pageY == 0){
      mouseX = mouseEvent.pageX - this.offsetLeft;
      mouseY = mouseEvent.pageY - this.offsetTop;
  }else if(mouseEvent.offsetX || mouseEvent.offsetY == 0){
      mouseX = mouseEvent.offsetX;
      mouseY = mouseEvent.offsetY;
  }
}

function getClickup(mouseEvent){
  var x = mouseEvent.offsetX;
  var y = mouseEvent.offsetY;

  clickX = x;
  clickY = y;
  mouseispressed=false;
}

function getClickdown(mouseEvent){
   mouseispressed=true; 
}

//menu background
var backjap = new Image();
backjap.src = "Images/backgrd.png";

var menufruitsback = new Image();
menufruitsback.src = "Images/menu.png";

var backmenu = new Image();
backmenu.src = "Images/backmenu.png"

var applemenu = new Image();
applemenu.src = "Images/apple.png";

//arrays for apples near buttons
var MenuApplesX = [];
var MenuApplesY = [];
var MenuApplesDim = 35;

var appleVisible = false;

//start,credits,back
var buttonsX = [165, 235, 178];
var buttonsY = [140, 200, 260];
var buttonsWidth = [315, 175, 280];
var buttonsHeight = [30, 30, 25];

var startImage = new Image();
startImage.src = "Images/start.png";
var creditsImage = new Image();
creditsImage.src = "Images/credits.png";

apples = [];
pears = [];
cherries = [];
bombs = [];
var pluslife;

//fruits images
var appleimg = new Image();
appleimg.src = "Images/apple.png";
var slicedappleimg = new Image();
slicedappleimg.src = "Images/slicedapple.png";
var pearimg = new Image();
pearimg.src = "Images/pear.png";
var slicedpearimg = new Image();
slicedpearimg.src = "Images/slicedpear.png";
var cherryimg = new Image();
cherryimg.src = "Images/cherry.png";
var slicedcherryimg = new Image();
slicedcherryimg.src = "Images/slicedcherry.png";
var bombimg = new Image();
bombimg.src = "Images/bomb.png";
var slicedbombimg = new Image();
slicedbombimg.src = "Images/exp2.png";

//sound effects
const sliceSound = new Audio("sound/splatter.mp3");
const boomSound = new Audio("sound/boom.mp3");
const menuSound = new Audio("sound/menu.mp3");
const startSound = new Audio("sound/start.mp3");
const throwSound = new Audio("sound/throw.mp3");
const overSound = new Audio("sound/over.mp3");
var overSoundPlayed=false;

//class for fruits
class Apples {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      var sidemove= Math.random()*1.1;
      var dx = Math.random() < 0.5 ? -sidemove : sidemove;;
      //Math.random() * (max - min) + min
      var dy = - (Math.random() * (2.5) + 5);
      var gravity = 0;
      this.mytimer = Math.random() * 4000 + 5000;
      var sliced = false;
      var addpoints = false;
      var to_rad = Math.PI/180;
      var alpha=0;
      this.draw = function () {
         if (sliced==false) c.drawImage(appleimg, this.x, this.y, 57, 57);
         if (sliced==true) {c.drawImage(slicedappleimg, this.x, this.y, 57, 57);
         };
      };
      this.update = function () {
         if(mouseX > this.x && mouseX < this.x + 57 && mouseY > this.y && mouseY < this.y + 57 && mouseispressed==true){
            sliced=true;
            sliceSound.currentTime = 0;
            sliceSound.play();
            sliceSound.volume = 0.1;
         }
         if (sliced==true && addpoints==false) {
            globalpoints+=100;
            addpoints=true;
         }
         if (sliced==false && this.y > 380 && addpoints==false){
            lifes-=1;
            addpoints=true;
         }
         this.x += dx;
         gravity += 0.1;
         this.y += dy + gravity;
         c.save(); 
         c.translate(this.x+(57/2),this.y+(57/2)); 
         c.rotate(alpha * to_rad); 
         c.translate(-(this.x+(57/2)),-(this.y+(57/2))); 
         this.draw(); 
         c.restore(); 
         alpha+=dx;
      };
   }
   
   get timer() {
      return this.mytimer;
   }
}

class Pears {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      var sidemove= Math.random()*1.2;
      var dx = Math.random() < 0.5 ? -sidemove : sidemove;;
      var dy = - (Math.random() * (2.5) + 5);
      var gravity = 0;
      this.mytimer = Math.random() * 4000 + 5000;
      var sliced = false;
      var addpoints = false;
      var to_rad = Math.PI/180;
      var alpha=0;
      this.draw = function () {
         if (sliced==false) c.drawImage(pearimg, this.x, this.y, 55, 55);
         if (sliced==true) c.drawImage(slicedpearimg, this.x, this.y, 55, 55);
      };
      this.update = function () {
         if(mouseX > this.x && mouseX < this.x + 57 && mouseY > this.y && mouseY < this.y + 57 && mouseispressed==true){
            sliced=true;
            sliceSound.currentTime = 0;
            sliceSound.play();
            sliceSound.volume = 0.1;
         }
         if (sliced==true && addpoints==false) {
            globalpoints+=100;
            addpoints=true;
           
         }
         if (sliced==false && this.y > 380 && addpoints==false){
            lifes-=1;
            addpoints=true;
         }
         this.x += dx;
         gravity += 0.1;
         this.y += dy + gravity;
         c.save();
         c.translate(this.x+(55/2),this.y+(55/2));
         c.rotate(alpha * to_rad);
         c.translate(-(this.x+(55/2)),-(this.y+(55/2)));
         this.draw();
         c.restore();
         alpha+=dx;
      };
   }

   get timer() {
      return this.mytimer;
   }
}

class Cherry {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      var sidemove= Math.random()*1.3;
      var dx = Math.random() < 0.5 ? -sidemove : sidemove;;
      var dy = - (Math.random() * (2.5) + 5);
      var gravity = 0;
      this.mytimer = Math.random() * 4000 + 5000;
      var sliced = false;
      var addpoints = false;
      var to_rad = Math.PI/180;
      var alpha=0;
      this.draw = function () {
         if (sliced==false) c.drawImage(cherryimg, this.x, this.y, 53, 53);
         if (sliced==true) c.drawImage(slicedcherryimg, this.x, this.y, 53, 53);
      };
      this.update = function () {
         if(mouseX > this.x && mouseX < this.x + 57 && mouseY > this.y && mouseY < this.y + 57 && mouseispressed==true){
            sliced=true;
            sliceSound.currentTime = 0;
            sliceSound.play();
            sliceSound.volume = 0.1;
         }
         if (sliced==true && addpoints==false) {
            globalpoints+=100;
            addpoints=true;
           
         }
         if (sliced==false && this.y > 380 && addpoints==false){
            lifes-=1;
            addpoints=true;
         }
         this.x += dx;
         gravity += 0.1;
         this.y += dy + gravity;
         c.save();
         c.translate(this.x+(53/2),this.y+(53/2));
         c.rotate(alpha * to_rad);
         c.translate(-(this.x+(53/2)),-(this.y+(53/2)));
         this.draw();
         c.restore();
         alpha+=dx;
      };
   }

   get timer() {
      return this.mytimer;
   }
}

class Bomb {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      var dim=62;
      var sidemove= Math.random()*1.3;
      var dx = Math.random() < 0.5 ? -sidemove : sidemove;;
      var dy = - (Math.random() * (2.5) + 5);
      var gravity = 0;
      this.mytimer = Math.random() * 4000 + 5000;
      var sliced = false;
      var expx = 0;
      var expy = 0;
      var removedlife = false;
      var to_rad = Math.PI/180;
      var alpha=0;
      var transp = 1;
      this.draw = function () {
         if (sliced==false) {
            c.save();
            c.translate(this.x+(62/2),this.y+(62/2));
            c.rotate(alpha * to_rad);
            c.translate(-(this.x+(62/2)),-(this.y+(62/2)));
            c.drawImage(bombimg, this.x, this.y, 62, 62);
            c.restore();
            alpha+=dx;
         }

         if (sliced==true) {
            c.save();
            c.globalAlpha = transp;
            c.drawImage(slicedbombimg, expx, expy, dim, dim);
            c.restore();
            console.log(transp);
            if (transp>=0.01) {
               transp-=0.01;
               transp = transp.toPrecision(2);
            }
         }
      };
      this.update = function () {
         if(mouseX > this.x && mouseX < this.x + 57 && mouseY > this.y && mouseY < this.y + 57 && mouseispressed==true){
            sliced=true;
            //needs for keeping the explosion stopped in x,y where sliced
            expx=this.x;
            expy=this.y;
         }
         if (sliced==true && removedlife==false) {
            if (globalpoints>=100) {
               lifes-=3;
               globalpoints-=100;
               boomSound.currentTime = 0;
               boomSound.play();
               boomSound.volume = 0.1;
            }
            else{
               lifes-=3;
               globalpoints=0;
            }
            removedlife=true;
         }
         this.x += dx;
         gravity += 0.1;
         this.y += dy + gravity;
         this.draw();
      };
   }

   get timer() {
      return this.mytimer;
   }
}

class Hearts {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      var sidemove= Math.random()*1.3;
      var dx = Math.random() < 0.5 ? -sidemove : sidemove;;
      var dy = - (Math.random() * (2.5) + 5);
      var gravity = 0;
      this.mytimer = Math.random() * 4000 + 5000;
      var sliced = false;
      var addedlife = false;
      var to_rad = Math.PI/180;
      var alpha=0;
      this.draw = function () {
         if (sliced==false) c.drawImage(heart, this.x, this.y, 57, 57);
         if (sliced==true) c.drawImage(slicedbombimg, this.x, this.y, 57, 57);
   
      };
      this.update = function () {
         if(mouseX > this.x && mouseX < this.x + 57 && mouseY > this.y && mouseY < this.y + 57 && mouseispressed==true){
            sliced = true;
            
         }
         if (sliced == true && addedlife == false && lifes < 3) {
            lifes += 1;
            addedlife = true;
         }
         this.x += dx;
         gravity += 0.1;
         this.y += dy + gravity;
         c.save();
         c.translate(this.x+(57/2),this.y+(57/2));
         c.rotate(alpha * to_rad);
         c.translate(-(this.x+(57/2)),-(this.y+(57/2)));
         this.draw();
         c.restore();
         alpha+=dx;
      };
   }
   
   get timer() {
      return this.mytimer;
   }
}

  
function addfruits(){
   for(i=0; i<10; i++){
      apples[i]=new Apples(Math.random() * (maxspawnpx - minspawnpx) + minspawnpx, 325);
      pears[i]=new Pears(Math.random() * (maxspawnpx - minspawnpx) + minspawnpx, 325);
      cherries[i]=new Cherry(Math.random() * (maxspawnpx - minspawnpx) + minspawnpx, 325);
      bombs[i]=new Bomb(Math.random() * (maxspawnpx - minspawnpx) + minspawnpx, 325);
   }
   pluslife = new Hearts(Math.random() * (maxspawnpx - minspawnpx) + minspawnpx, 325);
}

var start=1000;
var p = 0;
function animate(time){
   
   //start menu
   if(menu==0){
      menuSound.loop = true; // Optional: If you want the menu sound to loop
     menuSound.volume = 0.5; // Optional: Set the volume (0.0 to 1.0)
    menuSound.play();
      c.clearRect(0, 0, myCanvas.clientWidth, myCanvas.clientHeight);
      c.drawImage(backjap,0,0, 640, 360);
      c.drawImage(menufruitsback,10, 10, 620, 340);
      c.drawImage(creditsImage, buttonsX[1], buttonsY[1]);
      c.drawImage(startImage, buttonsX[0], buttonsY[0]);
      if(mouseX > buttonsX[0] && mouseX < buttonsX[0] + buttonsWidth[0] && mouseY > buttonsY[0] && mouseY < buttonsY[0] + buttonsHeight[0]){
         appleVisible = true;
         MenuApplesX[0]= buttonsX[0] - MenuApplesDim;
         MenuApplesY[0]= buttonsY[0];
         MenuApplesX[1]= buttonsX[0] + buttonsWidth[0];
         MenuApplesY[1]= buttonsY[0];
         if(clickX > buttonsX[0] && clickX < buttonsX[0] + buttonsWidth[0] && clickY > buttonsY[0] && clickY < buttonsY[0] + buttonsHeight[0]){
            menu=1;
            p=time;
            startSound.currentTime=0;
            startSound.play();
            startSound.volume=0.3;
         }
      }
       if(mouseX > buttonsX[1] && mouseX < buttonsX[1] + buttonsWidth[1] && mouseY > buttonsY[1] && mouseY < buttonsY[1] + buttonsHeight[1]){
         appleVisible = true;
         MenuApplesX[0]= buttonsX[1] - MenuApplesDim;
         MenuApplesY[0]= buttonsY[1];
         MenuApplesX[1]= buttonsX[1] + buttonsWidth[1];
         MenuApplesY[1]= buttonsY[1];
         if(clickX > buttonsX[1] && clickX < buttonsX[1] + buttonsWidth[1] && clickY > buttonsY[1] && clickY < buttonsY[1] + buttonsHeight[1]){
            menu=2;
         }
      }
      else{
         appleVisible = false;
      }

      if (appleVisible==true) {
         c.drawImage(applemenu, MenuApplesX[0], MenuApplesY[0]-2, MenuApplesDim, MenuApplesDim);
         c.drawImage(applemenu, MenuApplesX[1], MenuApplesY[1]-2, MenuApplesDim, MenuApplesDim);
      }
   }
   
   //real game
    if(menu==1){
      myCanvas.style.cursor="url('sword.png'),auto";
      menuSound.volume = 0.1; 
      if (restart==false) {
         addfruits();
         restart=true;
      }
      time = time - p;
      c.clearRect(0, 0, myCanvas.clientWidth, myCanvas.clientHeight);
      c.drawImage(backjap,0,0, 640, 360);
      c.font = "50px Juicy";
      c.fillStyle = "white";
      c.fillText(globalpoints, 20, 45);
      timer = Math.floor(60 - (time/1000));
      if (timer<0){
         c.fillText("Timeout!", 220, 45)
         mouseispressed=false;
      }
      else {
         c.fillText(timer + "s", 280, 45);
      }
      if (timer==-5) menu=3;

      if(lifes==3){
         c.drawImage(heart,500, 15, 40, 40);
         c.drawImage(heart,540, 15, 40, 40);
         c.drawImage(heart,580, 15, 40, 40);
      }
      else if(lifes==2){
         c.drawImage(heart,500, 15, 40, 40);
         c.drawImage(heart,540, 15, 40, 40);
      }
      else if(lifes==1){
         c.drawImage(heart,500, 15, 40, 40);
      }
      else{
         menu=3;
         menuSound.pause();
         menuSound.currentTime = 0; 
         overSound.volume = 0.5; // Optional: Set the volume (0.0 to 1.0)
         overSound.play();
         this.overSoundPlayed=true;
      }

      //better while
      for(i = 0; i < apples.length; i++){
         if(time - start > apples[i].timer*(i)) apples[i].update();
         if(time - start > pears[i].timer*(i+0.5)) pears[i].update();
         if(time - start > cherries[i].timer*(i+1)) cherries[i].update();
         if(time - start > bombs[i].timer*(i+1.5)) bombs[i].update();
      }
      if(time - start > pluslife.timer) pluslife.update();
   }

   //credits
    if(menu==2){
      myCanvas.style.cursor="pointer";
      menuSound.pause();
    menuSound.currentTime = 0; 
      c.clearRect(0, 0, myCanvas.clientWidth, myCanvas.clientHeight);
      c.drawImage(backjap,0,0, 640, 360);
      c.font = "50px Juicy";
      c.fillStyle = "white";
      c.fillText("Coded by Pallavi Gupta", 45, 60);
      c.fillText("PallaviGupta", 147, 260);
      c.drawImage(backmenu,buttonsX[2],buttonsY[2]+45);
      if(mouseX > buttonsX[2] && mouseX < buttonsX[2] + buttonsWidth[2] && mouseY > buttonsY[2]+45 && mouseY < buttonsY[2]+45 + buttonsHeight[2]){
         appleVisible = true;
         MenuApplesX[0]= buttonsX[2] - MenuApplesDim;
         MenuApplesY[0]= buttonsY[2]+40;
         MenuApplesX[1]= buttonsX[2] + buttonsWidth[2];
         MenuApplesY[1]= buttonsY[2]+40;
         if(clickX > buttonsX[2] && clickX < buttonsX[2] + buttonsWidth[2] && clickY > buttonsY[2]+45 && clickY < buttonsY[2]+45 + buttonsHeight[2]){
            menu=0;
         }
      }
      else{
         appleVisible = false;
      }

      if (appleVisible==true) {
         c.drawImage(applemenu, MenuApplesX[0], MenuApplesY[0], MenuApplesDim, MenuApplesDim);
         c.drawImage(applemenu, MenuApplesX[1], MenuApplesY[1], MenuApplesDim, MenuApplesDim);
      }
      console.log(mouseY);
      if(mouseX > 150 && mouseX < 490 && mouseY > 240 && mouseY < 260){
         
         c.fillStyle = "yellow";
         c.fillText("PallaviGupta", 147, 260);
         if(clickX > 150 && clickX < 490 && clickY > 240 && clickY < 260){
            window.open("https://www.instagram.com/pallavigupta_iit_ism?igsh=eWNueGY2NjI3ZnBl");
            clickX=0;
            clickY=0;
         }
      }
   }

   //end game menu
   else if(menu==3){
      myCanvas.style.cursor="pointer";
      c.clearRect(0, 0, myCanvas.clientWidth, myCanvas.clientHeight);
      c.drawImage(backjap,0,0, 640, 360);
      c.font = "50px Juicy";
      c.fillStyle = "white";
      c.fillText("Your Score: " + globalpoints, 160, 95);
      c.fillText("Thank you for playing!",80, 185);
      c.drawImage(backmenu,buttonsX[2],buttonsY[2]+5);
      if(mouseX > buttonsX[2] && mouseX < buttonsX[2] + buttonsWidth[2] && mouseY > buttonsY[2] && mouseY < buttonsY[2] + buttonsHeight[2]){
         appleVisible = true;
         MenuApplesX[0]= buttonsX[2] - MenuApplesDim;
         MenuApplesY[0]= buttonsY[2];
         MenuApplesX[1]= buttonsX[2] + buttonsWidth[2];
         MenuApplesY[1]= buttonsY[2];
         if(clickX > buttonsX[2] && clickX < buttonsX[2] + buttonsWidth[2] && clickY > buttonsY[2] && clickY < buttonsY[2] + buttonsHeight[2]){
            globalpoints=0;
            lifes=3;
            restart=false;
            menu=0;
         }
      }
      else{
         appleVisible = false;
      }

      if (appleVisible==true) {
         c.drawImage(applemenu, MenuApplesX[0], MenuApplesY[0], MenuApplesDim, MenuApplesDim);
         c.drawImage(applemenu, MenuApplesX[1], MenuApplesY[1], MenuApplesDim, MenuApplesDim);
      }
   }  
   requestAnimationFrame(animate);
}

animate();
sliceSound.onerror = () => console.error("Slice sound failed to load");
