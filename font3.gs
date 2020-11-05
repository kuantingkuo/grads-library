'c'
'q gxinfo'
x=sublin(result,3)
y=sublin(result,4)
xl=subwrd(x,4)
xr=subwrd(x,6)
yb=subwrd(y,4)
yt=subwrd(y,6)
yint=(yt-yb)/9
i=1
y.0=yt
while(i<=8)
im=i-1
y.i=y.im-yint
i=i+1
endwhile
'set font 3'
'set string 1 l 8'
'set strsiz 0.5'
'draw string 'xl' 'y.1' 1234567890-='
'draw string 'xl' 'y.2' qwertyuiop[]\'
'draw string 'xl' 'y.3' asdfghjkl;'''
'draw string 'xl' 'y.4' zxcvbnm,./'
'draw string 'xl' 'y.5' !@#$%^&*()_+'
'draw string 'xl' 'y.6' QWERTYUIOP{}|'
'draw string 'xl' 'y.7' ASDFGHJKL:"'
'draw string 'xl' 'y.8' ZXCVBNM<>?'
