string.1='` 1 2 3 4 5 6 7 8 9 0 - ='
string.2='q w e r t y u i o p [ ] \'
string.3='a s d f g h j k l ; '''
string.4='z x c v b n m , . /'
string.5='~ ! @ # $ % ^ & * ( ) _ +'
string.6='Q W E R T Y U I O P { } |'
string.7='A S D F G H J K L : "'
string.8='Z X C V B N M < > ?'
'c'
'q gxinfo'
if(0)
    x=sublin(result,3)
    y=sublin(result,4)
    xl=subwrd(x,4)
    xr=subwrd(x,6)
    yb=subwrd(y,4)
    yt=subwrd(y,6)
else
    line=sublin(result,2)
    xl=0.1
    xr=subwrd(line,4)-0.1
    yb=0.1
    yt=subwrd(line,6)-0.1
endif
yint=(yt-yb)/9
xc=(xl+xr)/2
xlen=xr-xl
i=1
y.0=yt
while(i<=8)
    im=i-1
    y.i=y.im-yint
    i=i+1
endwhile
'set font 3'
'set string 1 c 8'
strsiz=0.5
i=1
while(i<=8)
    'set strsiz 'strsiz
    'q string 'string.i
    slen=subwrd(result,4)
    temp=strsiz
    while(slen>xlen)
        temp=temp-0.05
        'set strsiz 'temp
        'q string 'string.i
        slen=subwrd(result,4)
    endwhile
    'draw string 'xc' 'y.i' 'string.i
    i=i+1
endwhile
y=(y.4+y.5)/2
'draw line 'xl' 'y' 'xr' 'y
