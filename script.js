// 1. Add html indicating which player is operating
// implement es6 

var pomodoroClock = {
    
 // set variables
    started: false,
    minutes: 0,   
    seconds: 0,
    sessionLength: 25,
    sessionDOM: null,
    breakLength: 5,
    breakDOM: null,
    fillerHeight: 0,
    fillerIncrement: 0,
    interval: null,
    minutesDom: null,
    secondsDom: null,
    fillDom: null,
    runs: 1,
    startAudio: new Audio("https://jpk-image-hosting.s3.amazonaws.com/pomodoro-app/audio/start.mp3"),
    endAudio: new Audio("https://jpk-image-hosting.s3.amazonaws.com/pomodoro-app/audio/end.mp3"),
    
  // initialize variables, set event listeners, start interval counter function.
    init: function(){
        var self = this;        

        this.minutesDom = document.querySelector('#minutes');
        this.secondsDom = document.querySelector('#seconds');
        this.fillDom = document.querySelector('#filler');
        this.sessionDOM = document.querySelector('#session-time');
        this.breakDOM = document.querySelector('#break-time');
        this.interval = setInterval(function(){
            self.intervalFunction.apply(self);
        }, 1000);
        
        document.querySelector('#start').addEventListener('click',function(){
            self.startCount.apply(self);
            
        });
        document.querySelector('#stop').addEventListener('click',function(){
            self.stopCount.apply(self);
            
        });
        document.querySelectorAll('.time-adjust').forEach(function(e){
           e.addEventListener('click', function(){
               
                 if(this.id === 'sesh-plus'){
                self.sessionLength++;
                }if(this.id === 'sesh-minus'){
                self.sessionLength--; 
                }if(this.id === 'break-minus'){
                self.breakLength--;
                }if(this.id === 'break-plus'){
                self.breakLength++;
                }
                self.adjustValue.apply(self);
                }); 
        });    
     
    },

    // functions for our program 
    resetVariables: function(mins, secs, started) {
    this.minutes = mins;
    this.seconds = secs;
    this.started = started;
    this.fillerIncrement = 200 / (this.minutes * 60);
    this.fillerHeight = 0;    
    this.updateUI();   
   },
    
   startCount: function() {
       
        this.resetVariables(this.sessionLength, this.seconds, true);
        this.startAudio.play();
    },
    
    stopCount: function() {
        this.resetVariables(0, 0, false);  
        this.updateUI();
       
    },
    
    intervalFunction: function() {
        if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          this.timerDone();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateUI();
    },
    
   numberFormat: function(num) {
       if(num < 10){
           return "0" + parseInt(num, 10);
       }else
           return num;
   },
    
    timerDone: function() {
        this.runs++;
        this.endAudio.play(); 
        if(this.runs === 2 || this.runs === 4){
            this.resetVariables(this.breakLength, 0, true);
        }else if(this.runs === 3 || this.runs === 5) {
            this.resetVariables(this.sessionLength, 0, true);
        }else {
            this.resetVariables(this.breakLength, 0, false);
        }
         
      //  console.log(this.runs);
    },
    
    updateUI: function() {
        this.minutesDom.innerHTML = this.numberFormat(this.minutes); 
        this.secondsDom.innerHTML = this.numberFormat(this.seconds); 
        this.sessionDOM.innerHTML = this.sessionLength + ' min';   
        this.breakDOM.innerHTML = this.breakLength + ' min';
        this.fillerHeight += this.fillerIncrement;
        if(this.started == true){
        this.fillDom.style.height = this.fillerHeight + 'px';
        }else{
        this.fillDom.style.height = 0 + 'px';    
        }
        
    },
    
    adjustValue: function() {
     
        if(!this.sessionLength > 0){
           this.sessionLength = 1;
       }if(!this.breakLength > 0){
           this.breakLength = 1;
       }else {
           this.updateUI();
       }
       
    // console.log(this.sessionLength);
   },
    
   
};

window.onload = function(){
   
   pomodoroClock.init();
};