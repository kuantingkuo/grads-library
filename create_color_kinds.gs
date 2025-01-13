'reinit'
cbars='dark_grainbow dark_jet'
'q gxinfo'
xline=sublin(result,3)
yline=sublin(result,4)
x1=subwrd(xline,4)
x2=subwrd(xline,6)
dx=(x2-x1)/100
y1=subwrd(yline,4)
y2=subwrd(yline,6)
rc=gsfallow('on')
num=count_num(cbars)
j=1
while j<=num
    'c'
    'set grads off'
    cbar=subwrd(cbars,j)
    say cbar
    'color 1 99 1 -kind 'cbar
    i=1
    while i<=100
        'set line 'i+15
        'draw recf 'dx*(i-1)' 'y1' 'dx*i' 'y2
        i=i+1
    endwhile
    'gxprint color_kinds/'cbar'.png x700 y30'
    j=j+1
endwhile
