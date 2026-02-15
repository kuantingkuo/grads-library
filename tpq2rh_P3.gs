**************************************************************************************
* Calculate relative humidity rh[%] by temperature t[C], pressure p[Pa] and
* specific humidity q[kg/kg] based on the P3 microphysics scheme formulation.
* P3 computes RH by calculating the saturation mixing ratio (qvs) rather than
* actual vapor pressure (e).
**************************************************************************************
function tpq2rh_P3(args)
    t = subwrd(args,1)
    p = subwrd(args,2)
    q = subwrd(args,3)
    if(t=''|p=''|q='')
        help()
        exit
    endif

* Call the P3 t2es script to get esw and esi
    't2es_P3 't

* -----------------------------------------------------------
* Calculate Saturation Mixing Ratio and RH for Liquid Water
* -----------------------------------------------------------
    'diffw = 'p' - esw'
* Prevent division by zero or negative pressure diffs (match P3 Fortran 1.e-3)
    'diffw = const(maskout(diffw, diffw - 1e-3), 1e-3, -u)'
    'qvs = 0.622 * esw / diffw'
    'rhw = ('q' / qvs) * 100'

* -----------------------------------------------------------
* Calculate Saturation Mixing Ratio and RH for Ice
* -----------------------------------------------------------
    'diffi = 'p' - esi'
* Prevent division by zero or negative pressure diffs (match P3 Fortran 1.e-3)
    'diffi = const(maskout(diffi, diffi - 1e-3), 1e-3, -u)'
    'qvi = 0.622 * esi / diffi'
    'rhi = ('q' / qvi) * 100'

* -----------------------------------------------------------
* Default RH Output
* -----------------------------------------------------------
* RH wrt water for T >= 0, RH wrt ice for T < 0
    'rh = const(maskout(rhw, 't'), 0, -u) + const(maskout(rhi, -1e-5 - 't'), 0, -u)'

    say 'defined relative humidity as rhw[%] (liquid), rhi[%] (ice), and rh[%] (default)'
return

function help()
    say 'USEAGE: tpq2rh_P3 (temperature[C]) (pressure[Pa]) (specific humidity[kg/kg])'
    say '        rh[%], rhw[%], rhi[%], qvs and qvi will be defined.'
return

