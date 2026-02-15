**************************************************************************************
* Calculate saturation vapor pressure esw[Pa] and esi[Pa] by temperature[C]
* based on the P3 microphysics scheme (polysvp1 function).
* Reference: Flatau et al. (1992) for high T, Goff-Gratch for low T.
**************************************************************************************
function t2es_P3(t)
    if(t='')
        help()
        exit
    endif
    check(t)

* Convert Celsius to Kelvin for Goff-Gratch calculations
    'tk = 't' + 273.15'

* -----------------------------------------------------------
* 1. Liquid Water Saturation Vapor Pressure (esw)
* -----------------------------------------------------------
* Flatau et al. for T >= 202.0 K (T_celsius >= -71.15 C)
    'eswf = (6.11239921 + 't'*(0.443987641 + 't'*(0.142986287e-1 + 't'*(0.264847430e-3 + 't'*(0.302950461e-5 + 't'*(0.206739458e-7 + 't'*(0.640689451e-10 + 't'*(-0.952447341e-13 - 0.976195544e-15*'t')))))))) * 100'
* Modified Goff-Gratch for T < 202.0 K
    'eswg = pow(10, -7.90298*(373.16/tk - 1) + 5.02808*log10(373.16/tk) - 1.3816e-7*(pow(10, 11.344*(1 - tk/373.16)) - 1) + 8.1328e-3*(pow(10, -3.49149*(373.16/tk - 1)) - 1) + log10(1013.246)) * 100'
* Combine using maskout with a precise boundary
    'esw = const(maskout(eswf, tk - 202.0), 0, -u) + const(maskout(eswg, (202.0 - 1e-5) - tk), 0, -u)'

* -----------------------------------------------------------
* 2. Ice Saturation Vapor Pressure (esi)
* -----------------------------------------------------------
* Flatau et al. for T >= 195.8 K (T_celsius >= -77.35 C)
    'esif = (6.11147274 + 't'*(0.503160820 + 't'*(0.188439774e-1 + 't'*(0.420895665e-3 + 't'*(0.615021634e-5 + 't'*(0.602588177e-7 + 't'*(0.385852041e-9 + 't'*(0.146898966e-11 + 0.252751365e-14*'t')))))))) * 100'
* Goff-Gratch for T < 195.8 K
    'esig = pow(10, -9.09718*(273.16/tk - 1) - 3.56654*log10(273.16/tk) + 0.876793*(1 - tk/273.16) + log10(6.1071)) * 100'
* Combine using maskout with a precise boundary
    'esi = const(maskout(esif, tk - 195.8), 0, -u) + const(maskout(esig, (195.8 - 1e-5) - tk), 0, -u)'

* -----------------------------------------------------------
* 3. Default Output (es)
* -----------------------------------------------------------
* esw for T >= 0, esi for T < 0
    'es = const(maskout(esw, 't'), 0, -u) + const(maskout(esi, -1e-5 - 't'), 0, -u)'

    say 'defined saturation vapor pressure as esw[Pa], esi[Pa], and es[Pa] (P3 Scheme)'
return

function help()
    say 'USEAGE: t2es_P3 <temperature[C]>'
    say '        esw[Pa], esi[Pa] and es[Pa] will be defined.'
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

