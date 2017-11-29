function ini(arg)
'set display white'
'c'
'set xlopts 1 3 0.2'
'set ylopts 1 3 0.22'
'set rgb 999 140 140 140'
'set map 1 1 8'
*'set mproj off'
if(arg='-s'|arg='-square');'set parea 2.45 8.95 1.25 7.75';endif
if(arg='-l'|arg='-horizontal');'set parea 1.3 10. 1.3 7.75';endif
if(arg='-h'|arg='-vertical');'set xlopts 1 3 0.2';endif
if(arg='-eq'|arg='equal');equal_grid();endif
'set font 05'
return

function equal_grid()
rc = gsfallow("on")
if(qdims(xtype)='varying');xl=qdims(xmax)-qdims(xmin)
  if(qdims(ytype)='varying');yl=qdims(ymax)-qdims(ymin)
  else;yl=qdims(zmax)-qdims(zmin)
  endif
else
  xl=qdims(ymax)-qdims(ymin)
  yl=qdims(zmax)-qdims(zmin)
endif

if(xl/yl>9.5/6.5)
w=9.5/xl*yl/2
'set parea 1.25 10.75 '4.5-w' '4.5+w
say 'set parea 1.25 10.75 '4.5-w' '4.5+w
else
w=6/yl*xl/2
'set parea '6-w' '6+w' 1.25 7.75'
say 'set parea '6-w' '6+w' 1.25 7.75'
endif

** Constants **
pi=3.141592653589793
**
return
