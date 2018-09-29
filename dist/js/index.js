var $ = window.Zepto;

var index = 0;
var songlist;

function bindEvent(){
    $(".prev-btn").click(function(){
        index = controlManger.prev()
        player.render(songlist[index]);
        player.process.stop();
        player.process.changeSong();
        audio.getAudio(songlist[index].audio);
        player.process.renderAlltime(songlist[index].duration);
    })
    $(".next-btn").click(function(){
        index = controlManger.next()
        player.render(songlist[index]);
        player.process.stop();
        player.process.changeSong();
        audio.getAudio(songlist[index].audio);
        player.process.renderAlltime(songlist[index].duration);
    })
    $('.play-btn').click(function(){
        if(audio.status == "play"){
            audio.pause()
            player.process.stop();
            $(".play-btn").removeClass("pause")
        }else{
            audio.play()
            player.process.start();
            $(".play-btn").addClass("pause")
        }
    })

}

function bindTouch(){
    var slider = $(".slider-pointer");
    var offset = $(".pro-bottom").offset();
    var left = offset.left;
    var width = offset.width;
    slider.on("touchstart",function(){
        audio.pause()
        player.process.stop();
    }).on("touchmove",function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if(per > 0 && per <=1){
            player.process.update(per);
        }
         
    }).on("touchend",function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if(per > 0 && per <=1){
            var curTime = per * songlist[index].duration;
            audio.playTo(curTime);
        }
        player.process.touchEnd(per)
        player.process.start()
        $(".play-btn").addClass("pause")
        audio.status = "play"
    })
}

function getData(url){
    $.ajax({
        type:"GET",
        url:url,
        success:function(data){
            songlist = data;
            player.render(data[0]);
            player.process.renderAlltime(songlist[index].duration);
            controlManger = new player.controlManger(data.length);
            audio = new player.audioControl();
            audio.getAudio(data[0].audio); 
            bindEvent();
            bindTouch();
        },
        error:function(){
            console.log("error")
        }
    })
}

getData("../mock/data.json")