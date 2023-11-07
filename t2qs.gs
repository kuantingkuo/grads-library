**************************************************************************************
* calculate saturated specific humidity qs[kg/kg] by temperature[C] and pressure[Pa]
* reference:
*    Huang, J., 2018: A Simple Accurate Formula for Calculating Saturation Vapor 
*    Pressure of Water and Ice. J. Appl. Meteorol. Climatol., 57, 1265–1272, 
*    doi:10.1175/JAMC-D-17-0334.1.
**************************************************************************************
function t2qs(args)
    t=subwrd(args,1)
    P=subwrd(args,2)
    if(args=''|P='')
        say 'USEAGE: t2qs (temperature[C]) (pressure[Pa])'
        say '        es[Pa] and qs[kg/kg] will be defined.'
        exit
    endif
    't2es 't
    'qs = 0.622*es / ('P' - (1-0.622)*es )'
    say 'save saturated specific humidity as qs [kg/kg]'
return 
