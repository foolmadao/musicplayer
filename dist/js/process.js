//进度条模块

(function($,root){
    //渲染总时间 更新播放时间
    var curDuration;
    var frameId;
    var lastper = 0;
    var startTime;
    function renderAlltime(time){
        curDuration = time;
        time = formatTime(time)
        $(".all-time").html(time);
    }

    function start(){
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var percent = lastper + (curTime - startTime)/(curDuration*1000)
            update(percent)
            frameId = requestAnimationFrame(frame)
        }
        frame(); 
    }
    function update(per){
        var time = per * curDuration;
        time = formatTime(time);
        $(".cur-time").html(time);

        var perX = (per - 1) * 100 + "%";
        $(".pro-top").css({
            transform:'translateX('+ perX +')'
        })
    }
    function formatTime(time){
        time = Math.round(time);
        var m = Math.floor(time / 60);
        var s = time - m * 60;
        if(m < 10){
            m = "0" + m;
        }
        if(s < 10){
            s = "0" + s;
        }
        time = m + ':' + s;
        return time
    }

    function stop(){
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastper = lastper + (stopTime - startTime)/(curDuration*1000)
    }
    function touchEnd(per){
        lastper = per;
    }
    function changeSong(){
        $(".cur-time").html("00:00");
        lastper = 0;
        update(0);
    }

    root.process = {
        renderAlltime:renderAlltime,
        start:start,
        update:update,
        stop:stop,
        changeSong:changeSong,
        touchEnd:touchEnd
    }
})(window.Zepto,window.player||(window.player = {}))