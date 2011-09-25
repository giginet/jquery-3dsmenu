(function(){
    $.fn.dsmenu = function(options){
        options = $.extend(true, {
            animation : true,
            animationDuration : 'slow',
            row : {
                initial : 3,
                max : 6,
                min : 1
            },
            resizable : true,
            scroll : true,
            sortable : true,
        }, options);
        $(this).each(function(){
            $ul = $(this);
            $li = $ul.find('li').css({
                width: '75px',
                height: '75px',
                position: 'absolute',
                display: 'block',
                right: 0,
                bottom: 0
            });
            $li.position({
                of : $ul,
                at : 'left top',
                my : 'left top',
                offset : '100 100',
                using : undefined,
                collision : "flip flip"
            });
        });
    };
})(jQuery);
