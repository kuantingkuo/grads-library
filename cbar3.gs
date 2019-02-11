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
  cwid = 0.2

  'set strsiz 0.1 0.12'
  if(args='')
    larg=0.75
  else
    'q string 'args
    larg = subwrd(result,4)
    if(larg<0.75);larg=0.75;endif
  endif

  if (xd >= 0.4+larg & yhi-ylo > cwid*cnum)
    xl = xhi + 0.1
    xr = xl + cwid
    xwid = 0.15
    ywid = (yhi-ylo)/cnum
    ymid = ysiz/2
    yb = ylo-0.001
    'set string 1 l 3'
    vert = 1
  else
    if(ylo >= 1.22)
      yt = ylo - 0.85
      yb = yt - cwid
    else
      yb = 0.2
      yt = yb + cwid
    endif
    xmid = (xlo+xhi-0.7)/2
    xwid = (xsiz-xmid-larg)*2/cnum
    xl = xmid - xwid*cnum/2
    'set string 1 tc 3'
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
    if (num<1)
      if (vert)
       'draw polyf 'xr' 'yt' 'xl' 'yt' '%(xl+xr)/2%' 'yb' 'xr' 'yt
       "set line 1 1 1"
       'draw line '%(xl+xr)/2%' 'yb' 'xl' 'yt
       'draw line '%(xl+xr)/2%' 'yb' 'xr' 'yt
      else
       'draw polyf 'xr' 'yt' 'xr' 'yb' 'xl' '%(yb+yt)/2%' 'xr' 'yt
       "set line 1 1 1"
       'draw line 'xl' '%(yb+yt)/2%' 'xr' 'yt
       'draw line 'xl' '%(yb+yt)/2%' 'xr' 'yb
      endif
    else
      if (num>cnum-2)
        if (vert)
         'draw polyf 'xr' 'yb' 'xl' 'yb' '%(xl+xr)/2%' 'yt' 'xr' 'yb
         "set line 1 1 1"
         'draw line '%(xl+xr)/2%' 'yt' 'xl' 'yb
         'draw line '%(xl+xr)/2%' 'yt' 'xr' 'yb
         'draw line 'xl' 'yb' 'xr' 'yb
        else
         'draw polyf 'xl' 'yt' 'xl' 'yb' 'xr' '%(yb+yt)/2%' 'xl' 'yt
         "set line 1 1 1"
         'draw line 'xr' '%(yb+yt)/2%' 'xl' 'yt
         'draw line 'xr' '%(yb+yt)/2%' 'xl' 'yb
         'draw line 'xl' 'yb' 'xl' 'yt
        endif
      else
        'draw recf 'xl' 'yb' 'xr' 'yt
        "set line 1 1 1"
        'draw rec  'xl' 'yb' 'xr' 'yt
      endif
    endif
    if (num<cnum-1)
      if (vert) 
        'draw string '%(xr+0.05)%' 'yt' 'hi
      else
        'draw string 'xr' '%(yb-0.05)%' 'hi
      endif
    endif
    if (num=cnum-1 & args!='')
      if (vert)
        'set string 1 bl 1'
        'draw string '%(xr+0.05)%' 'yt' 'args
      else
        'set string 1 tl 1'
        'draw string 'xr' '%(yb-0.05)%' 'args
      endif
    endif
    num = num + 1
    if (vert); yb = yt;
    else; xl = xr; endif;
  endwhile
