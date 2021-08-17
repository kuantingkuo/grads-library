**************************************************************************************
* calculate relative humidity rh[%] by temperature t[C], pressure p[Pa] and 
* specific humidity q[kg/kg]
* reference:
*    Huang, J., 2018: A Simple Accurate Formula for Calculating Saturation Vapor 
*    Pressure of Water and Ice. J. Appl. Meteorol. Climatol., 57, 1265–1272, 
*    doi:10.1175/JAMC-D-17-0334.1.
**************************************************************************************
function tpq2rh(args)
    t = subwrd(args,1)
    p = subwrd(args,2)
    q = subwrd(args,3)
    't2es 't
    'e = 'p'*'q'/(0.622+(1-0.622)*'q')'
    'rh = e / es * 100'
return 
