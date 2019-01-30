(function(win,doc){
    var docEl= doc.documentElement,
        resize= "orientationChange" in window ? "orientationChange" : "resize",
        rem = function(){
            var clw= docEl.clientWidth;//视口大小375px
            if(!clw) return;
            //1rem 等于 50px
            docEl.style.fontSize= clw/3.75 +'px';
        }
        if(!doc.addEventListener) return;
        win.addEventListener(resize, rem, false);
        doc.addEventListener('DOMContentLoaded', rem, false);
})(window, document)
