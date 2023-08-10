function ini(arg)
'set display white'
'c'
'set xlopts 1 3 0.2'
'set ylopts 1 3 0.22'
'set rgb 999 140 140 140'
'set map 1 1 8'
*'set mproj off'
if(arg='-s'|arg='-square');'set parea 2.45 8.95 1.25 7.75';endif
if(arg='-l'|arg='-horizontal');'set parea 1.4 9.8 1.3 7.75';endif
if(arg='-h'|arg='-vertical');'set parea 1.5 9.4 0.8 7.75';endif
if(arg='-eq'|arg='-equal');equal_grid();endif
'set font 01'

constants()

return

function equal_grid()
x1=1.3;x2=10
y1=1.25;y2=7.75
'set mproj scaled'
rc = gsfallow("on")
if(qdims(xtype)='varying');xl=qdims(lonmax)-qdims(lonmin)
  if(qdims(ytype)='varying');yl=qdims(latmax)-qdims(latmin)
  else;yl=qdims(levmax)-qdims(levmin)
  endif
else
  xl=qdims(latmax)-qdims(latmin)
  yl=qdims(levmax)-qdims(levmin)
endif

dx=x2-x1
dy=y2-y1
mx=(x1+x2)/2
my=(y1+y2)/2
if(xl/yl>dx/dy)
  w=dx/xl*yl/2
  'set parea 'x1' 'x2' 'my-w' 'my+w
  say 'set parea 'x1' 'x2' 'my-w' 'my+w
else
  w=dy/yl*xl/2
  'set parea 'mx-w' 'mx+w' 'y1' 'y2
  say 'set parea 'mx-w' 'mx+w' 'y1' 'y2
endif
return

function constants()
_pi=3.141592653589793
return
