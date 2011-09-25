(function(){
    var pluginName = 'dsmenu';
    var options = {
        animation         : true,
        animationDuration : 'normal',
        margin            : [3, 3],
        row               : {
                             initial : 3,
                             max     : 6,
                             min     : 1
        },
        resizable         : true,
        scroll            : true,
        sortable          : true,
    };

    var methods = {
        init : function(custom){
            if(!custom) custom = {};
            options = $.extend(true, options, custom);
            $(this).each(function(){
                var row = options.row.initial;
                $.data(this, 'row', options.row.initial);
                var $cells = $(this).find('li').css({
                    width    : '30px',
                    height   : '30px',
                    position : 'absolute',
                    display  : 'block',
                    right    : 0,
                    bottom   : 0
                });
                $(this)[pluginName]('setRow', options.row.initial);
            });
            return this;
        },
        setRow : function(newRow, animation){
            $(this).each(function(){
                var row = newRow;
                if(row < options.row.min || row > options.row.max) return true;
                $.data(this, 'row', row);
                var $ul = $(this);
                $(this).find('li').each(function(i){
                    $cell = $(this);
                    var h = ($ul.height() - options.margin[0] * (row + 1)) / row;
                    var w = h;
                    var x = (options.margin[0] + (w + options.margin[0]) * Math.floor(i / row));
                    var y = (options.margin[1] + (h + options.margin[1]) * (i % row));
                    var duration = animation ? options.animationDuration : 0;
                    $cell.position({
                        of : $ul,
                        at : 'left top',
                        my : 'left top',
                        offset : x + ' ' + y,
                        using : function(result){
                            $cell.animate({
                                'top'    : result.top,
                                'left'   : result.left,
                                'width'  : w,
                                'height' : h
                            }, duration)
                        },
                        collision : 'flip flip'
                    });
                });
            });
            return this;
        },
        disable : function(){
            return this;
        },
        row : function(){
            return $.map($(this).get(), function(elem, i){
                return $.data(elem, 'row');
            });
            return this;
        },
        expand : function(){
            $(this).each(function(){
                var row = $.data(this, 'row');
                if(row < options.row.max){
                    var newRow = row + 1;
                    $(this)[pluginName]('setRow', newRow, options.animation);
                }
            });
            return this;
        },
        contract : function(){
            $(this).each(function(){
                var row = $.data(this, 'row');
                if(row > Math.max(0, options.row.min)){
                    var newRow = row - 1;
                    $(this)[pluginName]('setRow', newRow, options.animation);
                }
            });
            return this;
        }
    };

    $.fn[pluginName] = function(method) {
        if(method){
            return methods[method]
            .apply(this, Array.prototype.slice.call(arguments, 1));
        }else if(typeof method === 'object' || !method){
            return methods.init.apply(this, arguments);
        }else{
            $.error('Method ' +  method + ' does not exist on jQuery.' + pluginName);
            return this;
        }
    };

})(jQuery);
