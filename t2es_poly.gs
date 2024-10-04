function t2es_poly(t)
    if t='' | t='-h' | t='--help'
        help()
        exit
    endif
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
    'esi=if('t'>=-77.35,esi1,esi2)'
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
    'esw=if('t'>=-71.15,esw1,esw2)'
*MIX
    'es=if('t'<=-40,esi,esw)'
    'ratio=('t'+40)/40'
    'esm=esw*ratio + esi*(1.-ratio)'
    'es=if(('t'>-40)&('t'<0),esm,es)'
    say 'define saturation vapor pressure as es[Pa]'
return

function help()
    say 'USEAGE: t2es_poly <temperature[C]>'
    say '        es[Pa] will be defined.'
return
