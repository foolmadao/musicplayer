(function($,root){
    function audioControl(){
        this.audio = new Audio();
        this.status = "pause"; 
    }
    audioControl.prototype = {
        play:function(){
            this.audio.play();
            this.status = "play";
        },
        pause:function(){
            this.audio.pause();
            this.status = "pause";
        },
        getAudio:function(src){
            this.audio.src = ".." + src;
            this.audio.load()
            this.status = "pause";  
            $(".play-btn").removeClass("pause");
        },
        playTo:function(time){
            this.audio.currentTime = time;
            this.audio.play();
        }
    }
    root.audioControl = audioControl;
})(window.Zepto, window.player||(window.player = {}))