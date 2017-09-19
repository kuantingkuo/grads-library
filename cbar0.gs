function colorbar (args)
  'query shades'
  shdinfo = result
  if (subwrd(shdinfo,1)='None') 
    say 'Cannot plot color bar: No shading information'
    return
  endif

  'query gxinfo'
  rec2 = sublin(result,2)
  rec3 = sublin(result,3)
  rec4 = sublin(result,4)
  xsiz = subwrd(rec2,4)
  ysiz = subwrd(rec2,6)
  yhi = subwrd(rec4,6)
  ylo = subwrd(rec4,4)
  xhi = subwrd(rec3,6)
  xlo = subwrd(rec3,4)
  xd = xsiz - xhi

  cnum = subwrd(shdinfo,5)
*say cnum
  cwid = 0.2

  if (xd-0.025-cwid-1.0 >= ylo-0.3-cwid-0.12)
    xl = xhi + 0.1
    xr = xl + cwid
    xwid = 0.15
    ywid = (yhi-ylo)/cnum
    ymid = ysiz/2
    yb = ylo-0.001
    'set string 1 l 1'
    vert = 1
  else
*    yt = ylo - 0.3
    yt=cwid+0.3
    yb = yt - cwid
    xmid = (xlo+xhi)/2
    xwid = (xhi-xlo+0.5)/cnum
    xl = xmid - xwid*cnum/2
    'set string 1 tc 5'
    vert = 0
  endif
************************
*     Plot colorbar    *
************************
  'set strsiz 0.1 0.12'
  num = 0
  while (num<cnum) 
    rec = sublin(shdinfo,num+2)
    col = subwrd(rec,1)
    hi = subwrd(rec,3)
    'set line 'col
    if (vert) 
      yt = yb + ywid
    else 
      xr = xl + xwid
    endif
    'draw recf 'xl' 'yb' 'xr' 'yt
*    "set line 1 1 1"
*    'draw rec  'xl' 'yb' 'xr' 'yt
    if (num=0|num=cnum-2)
      if (vert) 
        'draw string '%(xr+0.05)%' 'yt' 'hi
      else
        'draw string 'xr' '%(yb-0.05)%' 'hi
      endif
    endif
    num = num + 1
    if (vert); yb = yt;
    else; xl = xr; endif;
  endwhile
