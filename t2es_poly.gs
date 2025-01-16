function t2es_poly(t)
    if t='' | t='-h' | t='--help'
        help()
        exit
    endif
    check(t)
    'tk='t'+273.15'
    ai='6.11147274 0.503160820 0.188439774e-1 0.420895665e-3 0.615021634e-5 0.602588177e-7 0.385852041e-9 0.146898966e-11 0.252751365e-14'
    al='6.11239921 0.443987641 0.142986287e-1 0.264847430e-3 0.302950461e-5 0.206739458e-7 0.640689451e-10 -0.952447341e-13 -0.976195544e-15'
*ICE
    i=1
    while(i<=9)
        x=i-1
        a.x=subwrd(ai,i)
        i=i+1
    endwhile
    'esi1='a.0'+'t'*('a.1'+'t'*('a.2'+'t'*('a.3'+'t'*('a.4'+'t'*('a.5'+'t'*('a.6'+'t'*('a.7'+'a.8'*'t')))))))'
    'esi1=esi1*100'
    'esi2=pow(10.,-9.09718*(273.16/tk-1.)-3.56654*log10(273.16/tk)+0.876793*(1.-tk/273.16)+log10(6.1071))*100.'
*    'esi=if('t'>=-77.35,esi1,esi2)'
    'esi=const(maskout(esi1,'t'>=-77.35),0,-u)+const(maskout(esi2,'t'<-77.35),0,-u)'
*LIQUID
    i=1
    while(i<=9)
        x=i-1
        a.x=subwrd(al,i)
        i=i+1
    endwhile
    'esw1='a.0'+'t'*('a.1'+'t'*('a.2'+'t'*('a.3'+'t'*('a.4'+'t'*('a.5'+'t'*('a.6'+'t'*('a.7'+'a.8'*'t')))))))'
    'esw1=esw1*100'
    'esw2=pow(10.,(-7.90298*(373.16/tk-1.)+5.02808*log10(373.16/tk)-1.3816e-7*(pow(10,11.344*(1.-tk/373.16))-1.)+8.1328e-3*(pow(10,-3.49149*(373.16/tk-1.))-1.)+log10(1013.246)))*100.'
*    'esw=if('t'>=-71.15,esw1,esw2)'
    'esw=const(maskout(esw1,'t'>=-71.15),0,-u)+const(maskout(esw2,'t'<-71.15),0,-u)'
*MIX
*    'es=if('t'<=-40,esi,esw)'
    'ratio=('t'+40)/40'
    'esm=esw*ratio + esi*(1.-ratio)'
*    'es=if(('t'>-40)&('t'<0),esm,es)'
    'es=const(maskout(esi,'t'<=-40),0,-u)+const(maskout(esm,('t'>-40)&('t'<0)),0,-u)+const(maskout(esw,'t'>=0),0,-u)'
    say 'define saturation vapor pressure as es[Pa]'
return

function help()
    say 'USEAGE: t2es_poly <temperature[C]>'
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
