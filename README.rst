Introduction
============
jQuery plugin for listing like Nintendo 3DS home menu.

Your list elements will behave like this video.

http://www.youtube.com/watch?v=R8r9E8ENmVc

Demo
============
Comming Soon!

Usage
============
require jQuery1.3.2+ and jQueryUI 1.8.16+ (include Core, Draggable and Droppable.)

::

  $(document).ready(function(){
    $('ul').dsmenu();
  });


Methods
============
init(options)
-----------
Initialize your 3dsmenu.

contract()
-----------
Decrease number of rows.


expand()
-----------
Increase number of rows.

row()
-----------
Get current number of rows.

setRow(row, [animation])
---------
Set number of rows.

If [animation] is true. 
It will change with animation.


Options
============
Comming Soon!

Issues
============
It may not work to sort cells on Safari.
