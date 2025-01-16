**************************************************************************************
* calculate saturation vapor pressure es[Pa] by temperature[C]
* reference:
*    Huang, J., 2018: A Simple Accurate Formula for Calculating Saturation Vapor 
*    Pressure of Water and Ice. J. Appl. Meteorol. Climatol., 57, 1265–1272, 
*    doi:10.1175/JAMC-D-17-0334.1.
**************************************************************************************
function t2es(t)
    if(t='')
        help()
        exit
    endif
    check(t)
*    'es = if('t'>0, exp(34.494 - 4924.99/('t'+237.1)) / pow('t'+105,1.57), exp(43.494 - 6545.8/('t'+278)) / pow('t'+868,2))'
    'esw=exp(34.494 - 4924.99/('t'+237.1)) / pow('t'+105,1.57)'
    'esi=exp(43.494 - 6545.8/('t'+278)) / pow('t'+868,2))'
    'ratio=('t'+40)/40'
    'esm=esw*ratio + esi*(1.-ratio)'
    'es=const(maskout(esi,'t'<=-40),0,-u)+const(maskout(esm,('t'>-40)&('t'<0)),0,-u)+const(maskout(esw,'t'>=0),0,-u)'
    say 'define saturation vapor pressure as es[Pa]'
return 

function help()
    say 'USEAGE: t2es <temperature[C]>'
    say '        es[Pa] will be defined.'
return

function check(t)
    rc=gsfallow('on')
    x1=qdims('xmin')
    x2=qdims('xmax')
    y1=qdims('ymin')
    y2=qdims('ymax')
    z1=qdims('zmin')
    z2=qdims('zmax')
    t1=qdims('tmin')
    t2=qdims('tmax')
    'set x 1'
    'set y 1'
    'set z 1'
    'set t 1'
    'd 't
    val=subwrd(result,4)
    if(val>100)
        help()
        rc=sys("echo -e $'\e[33mWARNING!\e[0m The unit of temperature might be wrong!'")
        say rc
    endif
    'set x 'x1' 'x2
    'set y 'y1' 'y2
    'set z 'z1' 'z2
    'set t 't1' 't2

return
