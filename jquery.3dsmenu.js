(function(){
    var pluginName = 'dsmenu';
    var options = {
        animation         : true,
        animationDuration : 'normal',
        margin            : [3, 3],
        maxSize           : false,
        row               : {
                             initial : 3,
                             max     : 6,
                             min     : 1
        },
        scroll            : true,
        sortable          : true,
    };

    var moveCell = function($cell, x, y, of, w, h, duration){
        $cell.position({
            of : of,
            at : 'left top',
            my : 'left top',
            offset : x + ' ' + y,
            using : function(result){
                $cell.animate({
                    'top'    : result.top,
                    'left'   : result.left,
                    'width'  : w,
                    'height' : h
                }, duration, function(){
                    $cell.attr({ x : x, y : y});
                })
            },
            collision : 'fit fit'
        });
    };

    var methods = {
        init : function(custom){
            if(!custom) custom = {};
            options = $.extend(true, options, custom);
            $(this).each(function(){
                var row = options.row.initial;
                console.log($(this));
                $.data(this, 'row', options.row.initial);
                $(this).css({
                    position : 'relative'
                });
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
                    var calc = ($ul.innerHeight() - options.margin[1] * (row + 1)) / row;
                    if (typeof(options.maxSize) === 'object') {
                        var h = Math.min(calc / row, options.maxSize[1]);
                        var w = Math.min(calc, options.maxSize[0]);
                    } else if(typeof(options.maxSize) === 'number'){
                        var h = Math.min(calc, options.maxSize);
                        var w = Math.min(calc, options.maxSize);
                    } else {
                        var h = calc;
                        var w = calc;
                    }
                    marginTop = ($ul.innerHeight() - (options.margin[1] * (row - 1) + h * row))/2;
                    var x = (options.margin[0] + (w + options.margin[0]) * Math.floor(i / row));
                    var y = (marginTop + (h + options.margin[1]) * (i % row));
                    var duration = animation ? options.animationDuration : 0;
                    if(options.sortable){
                        $cell.draggable({
                            cursorAt : { top : h/2 , left : w/2 },
                            delay    : 500,
                            opacity  : 0.5,
                            revert   : 'invalid',
                            revertDuration : 100,
                            zIndex   : 9999
                        });
                        $cell.droppable({
                            accept : $ul.find('li'),
                            drop : function(event, ui){
                                var duration = options.animation ? options.animationDuration : 0;
                                var $drag = ui.draggable;
                                var $drop = $(this);
                                var dragPosition = { x : $drag.attr('x'), y : $drag.attr('y') };
                                var dropPosition = { x : $drop.attr('x'), y : $drop.attr('y') };
                                moveCell($drag, dropPosition.x, dropPosition.y, $ul, w, h, duration);
                                moveCell($drop, dragPosition.x, dragPosition.y, $ul, w, h, duration);
                                $drop2 = $drop.clone().insertAfter($drop);
                                $drag2 = $drag.clone().insertAfter($drag);
                                $drag2.replaceWith($drop);
                                $drop2.replaceWith($drag);
                            }
                        });
                    }
                    moveCell($cell, x, y, $ul, w, h, duration);
                });
            });
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
