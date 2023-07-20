function Platform(x,altitude){
  this.x = x;
  this.altitude = altitude;
  this.img = loadImage("images/grass.png");
  this.onScreen = true;
  this.s = 50;
}

Platform.prototype.draw =  function(altitude){
  if(altitude - this.altitude < height/2){
  image(this.img,this.x,(altitude-this.altitude + height/2),this.s,15);
  }else{
  this.onScreen = false;
  }
};

Platform.prototype.collidesWith = function(doodler){
  var pT = this.altitude; 
  var dB = doodler.loc.y - (doodler.s/2)  ;
  if(Math.abs(pT - dB) < - doodler.vel.y && (pT < dB)){
     var pLX = this.x ; 
     var pRX = this.x + this.s;
     var dLX = doodler.loc.x;
     var dRX = doodler.loc.x + (doodler.s/2);
     var x = doodler.loc.x;

     if((dLX >= pLX && dLX <= pRX) || (dRX >= pLX && dRX <= pRX)){
       return true;
     }
    }
  return false;
};
