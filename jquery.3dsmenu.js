(function(){
    var pluginName = 'dsmenu';
    var options = {
        animation : true,
        animationDuration : 'slow',
        margin : [3, 3],
        row : {
            initial : 3,
            max : 6,
            min : 1
        },
        resizable : true,
        scroll : true,
        sortable : true,
    };
    var row = options.row.initial;
    var $container;
    var methods = {
        init : function(custom){
            if(!custom) custom = {};
            options = $.extend(true, options, custom);
            row = options.row.initial;
            $container = $(this);
            var $cells = $container.find('li').css({
                width    : '30px',
                height   : '30px',
                position : 'absolute',
                display  : 'block',
                right    : 0,
                bottom   : 0
            });
            $(this).dsmenu('setRow', options.row.initial);
        },
        setRow : function(newRow, animation){
            row = newRow;
            var $ul = $(this);
            var $cells = $(this).find('li');
            $cells.each(function(i){
                $cell = $(this);
                var c = Math.floor(i / row);
                var r = i % row;
                var h = ($container.height() - options.margin[0] * (row +1))/row;
                var w = h;
                $cell.width(w);
                $cell.height(h);
                $cell.position({
                    of : $ul,
                    at : 'left top',
                    my : 'left top',
                    offset : (options.margin[0] + (w + options.margin[0]) * c) + " " + (options.margin[1] + (h + options.margin[1]) * r),
                    using : undefined,
                    collision : "flip flip"
                });
            });
        },
        disable : function(){
        },
        row : function(){
            return row;
        },
        expand : function(){
            if(row < options.row.max){
                var newRow = row + 1;
                $(this).dsmenu('setRow', newRow);
            }
        },
        contract : function(){
            if(row > Math.max(0, options.row.min)){
                var newRow = row - 1;
                $(this).dsmenu('setRow', newRow);
            }
        }
    };

    $.fn[pluginName] = function(method) {
        if (method) {
            return methods[method]
            .apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.' + plugname );
            return this;
        }
    };


})(jQuery);
