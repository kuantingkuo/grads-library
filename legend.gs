function legend(args)
************************
frame=0
mg=0.3; h=0.4
*mg: distance between legend and margin
*h : hight of a line
************************
if(args='')
help()
return
endif

pos=subwrd(args,1);num=subwrd(args,2)
n=3;n2=n+num-1;ind=1
while(n<=n2);name.ind=subwrd(args,n);ind=ind+1;n=n+1;endwhile
n2=n+num-1;ind=1
while(n<=n2);color.ind=subwrd(args,n);ind=ind+1;n=n+1;endwhile
n2=n+num-1;ind=1
while(n<=n2);style.ind=subwrd(args,n);ind=ind+1;n=n+1;endwhile

n=1
long=0
'set strsiz 'h*0.382' 'h*0.427
while(n<=num)
'q string 'name.n
temp=subwrd(result,4)
if(temp>long);long=temp;endif
if(style.n='style.'n);style.n=1;endif
n=n+1
endwhile
w=long+1

'q gxinfo'
xinfo=sublin(result,3)
yinfo=sublin(result,4)
xl=subwrd(xinfo,4)
xr=subwrd(xinfo,6)
yb=subwrd(yinfo,4)
yt=subwrd(yinfo,6)

if(pos=tl);xl=xl+mg;yt=yt-mg;xr=xl+w;yb=yt-num*h;endif
if(pos=tc);xl=(xl+xr)/2-w/2;yt=yt-mg;xr=xl+w;yb=yt-num*h;endif
if(pos=tr);xr=xr-mg;yt=yt-mg;xl=xr-w;yb=yt-num*h;endif
if(pos=l);xl=xl+mg;yt=(yt+yb)/2+h*num/2;xr=xl+w;yb=yt-num*h;endif
if(pos=c);xl=(xl+xr)/2-w/2;yt=(yt+yb)/2+h*num/2;xr=xl+w;yb=yt-num*h;endif
if(pos=r);xr=xr-mg;yt=(yt+yb)/2+h*num/2;xl=xr-w;yb=yt-num*h;endif
if(pos=bl);xl=xl+mg;yb=yb+mg;xr=xl+w;yt=yb+num*h;endif
if(pos=bc);xl=(xl+xr)/2-w/2;yb=yb+mg;xr=xl+w;yt=yb+num*h;endif
if(pos=br);xr=xr-mg;yb=yb+mg;xl=xr-w;yt=yb+num*h;endif

'set rgb 200 255 255 255 200'
'set line 200'
'draw recf 'xl' 'yb' 'xr' 'yt
if(frame);'set line 1';'draw rec 'xl' 'yb' 'xr' 'yt;endif
xr=xr-0.1
_wr=xl+long+0.1
_ll=_wr+0.1
n=1
while(n<=num)
_y.n=yt-h/2-(n-1)*h
*say '_y.'n' = '_y.n
'set line 'color.n' 'style.n' 9'
say 'set line 'color.n' 'style.n' 9'
'draw line '_ll' '_y.n' 'xr' '_y.n
'set string 1 r'
'draw string '_wr' '_y.n' 'name.n
n=n+1
endwhile

return

function help()
say '** For legend.gs **'
say 'legend pos num string.1 ... string.num color.1 ... color.num [style.1 ... style.num]'
say ''
say '** For legend.gsf **'
say 'rc = gsfallow("on")'
say 'rc = legend(pos,num,strings,colors,styles)'
say ''
say 'pos: position of legend, num: number of items'
say 'strings: ''name#1 name#2 ...'''
say 'colors: ''color#1 color#2 ...'''
say 'styles(optional): ''line_style#1 line_style#2 ...''(default=1)'
say '      tl        tc         tr          tl - top left'
say '       + ------- + ------- +           tc - top center'
say '       |                   |           tr - top right'
say '       |                   |           '
say '       |                   |           l - left'
say '       +l        +c       r+           c - center            '
say '       |                   |           r - right'
say '       |                   |'
say '       |                   |           bl - bottom left'
say '       + ------- + ------- +           bc - bottom center'
say '      bl         bc        br          br - bottom right'
return
