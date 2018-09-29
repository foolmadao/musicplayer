//实现渲染操作
(function($,root){
    function renderInfo(info){
        var html = "<div class='song-name'>"+ info.song +"</div>\
        <div class='singer-name'>"+ info.singer +"</div>\
        <div class='album-name'>"+ info.album +"</div>"
        var songInfo = $(".song-info").html(html);
    }
    function renderImg(src){
        var img = new Image();
        img.src = ".." + src;
        img.onload = function(){
            root.blurImg(img, $(".wrapper"))
            $(".song-img img").attr("src",img.src)
        }
    }
    function renderIslike(islike){
        if(islike){
            $(".like-btn").addClass("liking");
        }else{
            $(".like-btn").removeClass("liking");
        }
    }
    function render(data){
        renderInfo(data);
        renderImg(data.image);
        renderIslike(data.isLike)
    }
    root.render = render;
})(window.Zepto, window.player || (window.player = {}))//通过window.player暴露函数