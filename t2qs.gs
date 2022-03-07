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
    'es = exp(34.494 - 4924.99/('t'+237.1)) / pow('t'+105,1.57)'
    'qs = 0.622*es / ('P' - (1-0.622)*es )'
return qs
