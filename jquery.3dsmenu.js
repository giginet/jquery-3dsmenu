(function(){
    $.fn.dsmenu = function(options){
        options = $.extend(true, {
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
        }, options);


        $(this).each(function(){
            var $ul = $(this);
            console.log($(this));
            var ulHeight = $(this).height();
            var $cells = $ul.find('li').css({
                width    : '30px',
                height   : '30px',
                position : 'absolute',
                display  : 'block',
                right    : 0,
                bottom   : 0
            });

            var row = options.row.initial;
            var height = $(this).height();

            $(this).dsmenu.setRow = function(newRow, animation){
                row = newRow;
                $cells.each(function(i){
                    var $cell = $(this);
                    var c = Math.floor(i / row);
                    var r = i % row;
                    var h = (ulHeight - options.margin[0] * (row +1))/row;
                    var w = h;
                    console.log(ulHeight);
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
            }

            $(this).dsmenu.disable = function(){
            }

            $(this).dsmenu.row = function(){
                return row;
            }

            $(this).dsmenu.expand = function(){
                if(row < options.row.max){
                    var newRow = row + 1;
                    $(this).dsmenu.setRow(newRow);
                }
            }

            $(this).dsmenu.contract = function(){
                if(row > Math.max(0, options.row.min)){
                    var newRow = row - 1;
                    $(this).dsmenu.setRow(newRow);
                }
            }

            $(this).dsmenu.setRow(options.row.initial);

        });
    };
})(jQuery);
