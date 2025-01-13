**************************************************************************************
* calculate saturation vapor pressure es[Pa] by temperature[C]
* reference:
*    Huang, J., 2018: A Simple Accurate Formula for Calculating Saturation Vapor 
*    Pressure of Water and Ice. J. Appl. Meteorol. Climatol., 57, 1265–1272, 
*    doi:10.1175/JAMC-D-17-0334.1.
**************************************************************************************
function t2es(t)
    if(t='')
        say 'USEAGE: t2es <temperature[C]>'
        say '        es[Pa] will be defined.'
        exit
    endif
*    'es = if('t'>0, exp(34.494 - 4924.99/('t'+237.1)) / pow('t'+105,1.57), exp(43.494 - 6545.8/('t'+278)) / pow('t'+868,2))'
    'esw=exp(34.494 - 4924.99/('t'+237.1)) / pow('t'+105,1.57)'
    'esi=exp(43.494 - 6545.8/('t'+278)) / pow('t'+868,2))'
    'ratio=('t'+40)/40'
    'esm=esw*ratio + esi*(1.-ratio)'
    'es=const(maskout(esi,'t'<=-40),0,-u)+const(maskout(esm,('t'>-40)&('t'<0)),0,-u)+const(maskout(esw,'t'>=0),0,-u)'
    say 'define saturation vapor pressure as es[Pa]'
return 
