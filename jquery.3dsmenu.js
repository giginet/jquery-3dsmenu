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
            $li = $ul.find('li')
            $li.position({
                of : $ul,
                at : 'left top',
                my : 'left top',
                offset : '0 0',
                using : undefined,
                collision : "flip flip"
            });
        });
    };
})(jQuery);
