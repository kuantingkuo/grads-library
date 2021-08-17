function distance(args)
* Distance between two points on the Earth surface
    lon2=subwrd(args,1);lat2=subwrd(args,2)
    if (lon2=''|lat2='');rc=help();return;endif
*    At=6371229
    At=6371220
    PI=3.141592654
    D2R=PI/180
    R2D=180/PI
    'Theta1=lon*'D2R;'Phi1=(90-lat)*'D2R
    Theta2=lon2*D2R;Phi2=(90-lat2)*D2R
    'Alpha=acos( cos(Phi1)*'math_cos(Phi2)' + cos(Theta1-'Theta2')*sin(Phi1)*'math_sin(Phi2)' )'
    'distance=Alpha*'At
    'undefine Theta1';'undefine Phi1';'undefine Alpha'
return

function help()
  say "Usage:"
  say "  distance <lon> <lat>"
return
