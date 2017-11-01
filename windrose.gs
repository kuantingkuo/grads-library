* GrADS Script to Draw a Wind Rose Diagram
*
* Written by Warren Tennant (tennant at weathersa.co.za) - 11 February 2004
* Modified by Kuan-Ting Kuo (r0229006@ntu.edu.tw) - 12 September 2016
*
* USAGE: First, set dimensions to your analyzing region, time period, ensemble members.
*        windrose <grads-expr for u-comp> <grads-expr for v-comp> 
*        <threshold 1> <color 1> .... <threshold n> <color n>
* EXAMPLE: windrose u.1 v.2 1 9 2 4 3 5 4 7 5 2
*
* Include qdims.gsf
*         (https://raw.githubusercontent.com/kodamail/gscript/master/qdims.gsf)
***************************************************************************************
function windrose (args)
**************************
* User-defined Variables *
**************************

* Auto select categories of frequency (1: auto select; 0: user defined)
autofreq = 0
** User-defined frequency on the diagram. (Only use when autofreq = 0)
** maxf must be devided by intf
maxf = 30
intf = 10

* central angle of each fan shape (default:21.6; range: 0<fangle<22.5)
fangle = 21.6

* rotation angle by the original X-Y coordinate (degree)
rotation = 45
if(rotation!=0);say 'Rotation Angle = 'rotation' degrees';endif

***************************************************************************************
rc = gsfallow("on")
* Read input arguments
u=subwrd(args,1)
v=subwrd(args,2)

cat=0
b.cat=0
while(b.cat != '')
cat=cat+1
b.cat=subwrd(args,2*cat+1)
c.cat=subwrd(args,2*cat+2)
endwhile
mxcat=cat-1
* Maximum User-defined categories
mucat=mxcat

say 'Categories = 'mucat
* Test for arguments
if(u=''|v=''|u='-h'|u='--help');help();exit; endif

* Get dimensions 
x1 = qdims( xmin ) ; x2 = qdims( xmax )
y1 = qdims( ymin ) ; y2 = qdims( ymax )
z1 = qdims( zmin ) ; z2 = qdims( zmax )
t1 = qdims( tmin ) ; t2 = qdims( tmax )
e1 = qdims( emin ) ; e2 = qdims( emax )

'q gxinfo'
mproj=sublin(result,6)
mproj=subwrd(mproj,3)

* Set some constants
'set y 1 2'
dlat=subwrd(result,5)-subwrd(result,4)
lim_lat=-90+dlat
* Root Two plus/minus one
r2=math_sqrt(2.)
r2m1=r2-1
r2p1=r2+1

* Initialize frequencies
cat=0
while(cat<=mxcat)
 n.cat=0
 nne.cat=0
 ne.cat=0
 ene.cat=0
 e.cat=0
 ese.cat=0
 se.cat=0
 sse.cat=0
 s.cat=0
 ssw.cat=0
 sw.cat=0
 wsw.cat=0
 w.cat=0
 wnw.cat=0
 nw.cat=0
 nnw.cat=0
 cat=cat+1
endwhile

* Loop input domain
nsum=0
e=e1
while(e<=e2)
'set e 'e
tim=t1
while(tim<=t2)
 'set t 'tim
* Get u and v value
 z=z1
 while(z<=z2)
 'set z 'z
 y=y1
 while(y<=y2)
 'set y 'y
 x=x1
 while(x<=x2)
 'set x 'x
 'd 'u
 var=sublin(result,1)
 uu=subwrd(var,4)
* if(uu=-9.99e+08);x=x+1;continue;endif
 'd 'v
 var=sublin(result,1)
 vv=subwrd(var,4)
* if(vv=-9.99e+08);x=x+1;continue;endif

* Find wind magnitude
 'd mag('u','v')'
 var=sublin(result,1)
 speed=subwrd(var,4)
 if(speed<b.1);x=x+1;continue;endif
 cat=mxcat
 while(b.cat>speed)
  cat=cat-1
 endwhile
 icat=cat

* Find cardinal wind direction
 deg=math_atan2(uu,vv)/3.14159265359*180+180+rotation
 if(deg>360);deg=deg-360;endif
 Ndir=math_nint(deg/22.5)
 if(Ndir=0 | Ndir=16); n.icat=n.icat+1; endif
 if(Ndir=1); nne.icat=nne.icat+1; endif
 if(Ndir=2); ne.icat=ne.icat+1; endif
 if(Ndir=3); ene.icat=ene.icat+1; endif
 if(Ndir=4); e.icat=e.icat+1; endif
 if(Ndir=5); ese.icat=ese.icat+1; endif
 if(Ndir=6); se.icat=se.icat+1; endif
 if(Ndir=7); sse.icat=sse.icat+1; endif
 if(Ndir=8); s.icat=s.icat+1; endif
 if(Ndir=9); ssw.icat=ssw.icat+1; endif
 if(Ndir=10); sw.icat=sw.icat+1; endif
 if(Ndir=11); wsw.icat=wsw.icat+1; endif
 if(Ndir=12); w.icat=w.icat+1; endif
 if(Ndir=13); wnw.icat=wnw.icat+1; endif
 if(Ndir=14); nw.icat=nw.icat+1; endif
 if(Ndir=15); nnw.icat=nnw.icat+1; endif
 
 nsum=nsum+1
 x=x+1
 endwhile
 y=y+1
 endwhile
 z=z+1
 endwhile
 tim=tim+1
endwhile
e=e+1
endwhile
* Calculate frequencies as percentages
cat=1
while(cat<=mxcat)
 catm=cat-1
 n.cat=100*n.cat/nsum+n.catm
 nne.cat=100*nne.cat/nsum+nne.catm
 ne.cat=100*ne.cat/nsum+ne.catm
 ene.cat=100*ene.cat/nsum+ene.catm
 e.cat=100*e.cat/nsum+e.catm
 ese.cat=100*ese.cat/nsum+ese.catm
 se.cat=100*se.cat/nsum+se.catm
 sse.cat=100*sse.cat/nsum+sse.catm
 s.cat=100*s.cat/nsum+s.catm
 ssw.cat=100*ssw.cat/nsum+ssw.catm
 sw.cat=100*sw.cat/nsum+sw.catm
 wsw.cat=100*wsw.cat/nsum+wsw.catm
 w.cat=100*w.cat/nsum+w.catm
 wnw.cat=100*wnw.cat/nsum+wnw.catm
 nw.cat=100*nw.cat/nsum+nw.catm
 nnw.cat=100*nnw.cat/nsum+nnw.catm

 cat=cat+1
endwhile
cat=cat-1
* Find the maximum frequency to scale graphic
if(autofreq)
 maxf=0
 if(n.cat>maxf); maxf=n.cat; endif
 if(nne.cat>maxf); maxf=nne.cat; endif
 if(ne.cat>maxf); maxf=ne.cat; endif
 if(ene.cat>maxf); maxf=ene.cat; endif
 if(e.cat>maxf); maxf=e.cat; endif
 if(ese.cat>maxf); maxf=ese.cat; endif
 if(se.cat>maxf); maxf=se.cat; endif
 if(sse.cat>maxf); maxf=sse.cat; endif
 if(s.cat>maxf); maxf=s.cat; endif
 if(ssw.cat>maxf); maxf=ssw.cat; endif
 if(sw.cat>maxf); maxf=sw.cat; endif
 if(wsw.cat>maxf); maxf=wsw.cat; endif
 if(w.cat>maxf); maxf=w.cat; endif
 if(wnw.cat>maxf); maxf=wnw.cat; endif
 if(nw.cat>maxf); maxf=nw.cat; endif
 if(nnw.cat>maxf); maxf=nnw.cat; endif
 intf=math_int(maxf/5)+1
 maxf=intf*5
 ncircle=5
else
 if(math_mod(maxf,intf)!=0)
   say "Error: maxf cannot be divided by inf"
   exit
 endif
 ncircle=maxf/intf
endif
* Find the wind direction of the minimum frequency
angle.minf=0
minf=100
if(n.cat<minf); minf=n.cat; angle.minf=0; endif
if(nne.cat<minf); minf=nne.cat; angle.minf=22.5; endif
if(ne.cat<minf); minf=ne.cat; angle.minf=45; endif
if(ene.cat<minf); minf=ene.cat; angle.minf=67.5; endif
if(e.cat<minf); minf=e.cat; angle.minf=90; endif
if(ese.cat<minf); minf=ese.cat; angle.minf=112.5; endif
if(se.cat<minf); minf=se.cat; angle.minf=135; endif
if(sse.cat<minf); minf=sse.cat; angle.minf=157.5; endif
if(s.cat<minf); minf=s.cat; angle.minf=180; endif
if(ssw.cat<minf); minf=ssw.cat; angle.minf=202.5; endif
if(sw.cat<minf); minf=sw.cat; angle.minf=225; endif
if(wsw.cat<minf); minf=wsw.cat; angle.minf=247.5; endif
if(w.cat<minf); minf=w.cat; angle.minf=270; endif
if(wnw.cat<minf); minf=wnw.cat; angle.minf=292.5; endif
if(nw.cat<minf); minf=nw.cat; angle.minf=315; endif
if(nnw.cat<minf); minf=nnw.cat; angle.minf=337.5; endif
* Draw frame
'c'
'set grads off'
'set mproj sps'
'set mpdraw off'
'set lat -90 0'
'set lon 0 360'
'set mpvals -180 180 -90 0'
'set gxout contour'
'set grid off'
'set frame off'
'set clab off'
'set ccolor 1'
'set cthick 6'
'set cstyle 1'
'set clevs -1e-10'
'd lat'

* Get Virtual Page info
'q gxinfo'
var2=sublin(result,2)
var3=sublin(result,3)
var4=sublin(result,4)
xmax=subwrd(var2,4);ymax=subwrd(var2,6)
xl=subwrd(var3,4);xr=subwrd(var3,6);xo=(xl+xr)/2
yb=subwrd(var4,4);yt=subwrd(var4,6);yo=(yb+yt)/2
rds=xr-xo
* Draw WINDROSE
'set gxout contour'
'all=const(lon,1,-a)'

ddeg=fangle/2
cat=mxcat
while(cat>0)
 catm=cat-1
*N
 dir='N'
 rds1=n.cat/maxf*rds
 rds2=n.catm/maxf*rds
 'q xy2w 'xo' 'yo+rds1
 lat1=subwrd(result,6)
 'q xy2w 'xo' 'yo+rds2
 lat2=subwrd(result,6)
if(math_nint(lat1/dlat)  != math_nint(lat2/dlat))
a=(lim_lat+lat2)/2;b=math_abs(lat2-lim_lat)/2
 'set ccolor 'c.cat
* 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-0)),'lat1'-lat),lat-'lat2')'
 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-0)),'lat1'-lat),abs(lat-'a')-'b')'
 'set ccolor 'c.cat
* 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-360)),'lat1'-lat),lat-'lat2')'
 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-360)),'lat1'-lat),abs(lat-'a')-'b')'
if(subwrd(result,1)='Cannot');say dir': lat1='lat1', lat2='lat2', cat='cat;endif
endif
*NNE
 dir='NNE'
 rds1=nne.cat/maxf*rds
 rds2=nne.catm/maxf*rds
 'q xy2w 'xo' 'yo+rds1
 lat1=subwrd(result,6)
 'q xy2w 'xo' 'yo+rds2
 lat2=subwrd(result,6)
if(math_nint(lat1/dlat)  != math_nint(lat2/dlat))
a=(lim_lat+lat2)/2;b=math_abs(lat2-lim_lat)/2
 'set ccolor 'c.cat
* 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-22.5)),'lat1'-lat),lat-'lat2')'
 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-22.5)),'lat1'-lat),abs(lat-'a')-'b')'
if(subwrd(result,1)='Cannot');say dir': lat1='lat1', lat2='lat2', cat='cat;endif
endif
*NE
 dir='NE'
 rds1=ne.cat/maxf*rds
 rds2=ne.catm/maxf*rds
 'q xy2w 'xo' 'yo+rds1
 lat1=subwrd(result,6)
 'q xy2w 'xo' 'yo+rds2
 lat2=subwrd(result,6)
if(math_nint(lat1/dlat)  != math_nint(lat2/dlat))
a=(lim_lat+lat2)/2;b=math_abs(lat2-lim_lat)/2
 'set ccolor 'c.cat
* 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-45)),'lat1'-lat),lat-'lat2')'
 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-45)),'lat1'-lat),abs(lat-'a')-'b')'
if(subwrd(result,1)='Cannot');say dir': lat1='lat1', lat2='lat2', cat='cat;endif
endif
*ENE
 dir='ENE'
 rds1=ene.cat/maxf*rds
 rds2=ene.catm/maxf*rds
 'q xy2w 'xo' 'yo+rds1
 lat1=subwrd(result,6)
 'q xy2w 'xo' 'yo+rds2
 lat2=subwrd(result,6)
if(math_nint(lat1/dlat)  != math_nint(lat2/dlat))
a=(lim_lat+lat2)/2;b=math_abs(lat2-lim_lat)/2
 'set ccolor 'c.cat
* 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-67.5)),'lat1'-lat),lat-'lat2')'
 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-67.5)),'lat1'-lat),abs(lat-'a')-'b')'
if(subwrd(result,1)='Cannot');say dir': lat1='lat1', lat2='lat2', cat='cat;endif
endif
*E
 dir='E'
 rds1=e.cat/maxf*rds
 rds2=e.catm/maxf*rds
 'q xy2w 'xo' 'yo+rds1
 lat1=subwrd(result,6)
 'q xy2w 'xo' 'yo+rds2
 lat2=subwrd(result,6)
if(math_nint(lat1/dlat)  != math_nint(lat2/dlat))
a=(lim_lat+lat2)/2;b=math_abs(lat2-lim_lat)/2
 'set ccolor 'c.cat
* 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-90)),'lat1'-lat),lat-'lat2')'
 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-90)),'lat1'-lat),abs(lat-'a')-'b')'
if(subwrd(result,1)='Cannot');say dir': lat1='lat1', lat2='lat2', cat='cat;endif
endif
*ESE
 dir='ESE'
 rds1=ese.cat/maxf*rds
 rds2=ese.catm/maxf*rds
 'q xy2w 'xo' 'yo+rds1
 lat1=subwrd(result,6)
 'q xy2w 'xo' 'yo+rds2
 lat2=subwrd(result,6)
if(math_nint(lat1/dlat)  != math_nint(lat2/dlat))
a=(lim_lat+lat2)/2;b=math_abs(lat2-lim_lat)/2
 'set ccolor 'c.cat
* 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-112.5)),'lat1'-lat),lat-'lat2')'
 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-112.5)),'lat1'-lat),abs(lat-'a')-'b')'
if(subwrd(result,1)='Cannot');say dir': lat1='lat1', lat2='lat2', cat='cat;endif
endif
*SE
 dir='SE'
 rds1=se.cat/maxf*rds
 rds2=se.catm/maxf*rds
 'q xy2w 'xo' 'yo+rds1
 lat1=subwrd(result,6)
 'q xy2w 'xo' 'yo+rds2
 lat2=subwrd(result,6)
if(math_nint(lat1/dlat)  != math_nint(lat2/dlat))
a=(lim_lat+lat2)/2;b=math_abs(lat2-lim_lat)/2
 'set ccolor 'c.cat
* 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-135)),'lat1'-lat),lat-'lat2')'
 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-135)),'lat1'-lat),abs(lat-'a')-'b')'
if(subwrd(result,1)='Cannot');say dir': lat1='lat1', lat2='lat2', cat='cat;endif
endif
*SSE
 dir='SSE'
 rds1=sse.cat/maxf*rds
 rds2=sse.catm/maxf*rds
 'q xy2w 'xo' 'yo+rds1
 lat1=subwrd(result,6)
 'q xy2w 'xo' 'yo+rds2
 lat2=subwrd(result,6)
if(math_nint(lat1/dlat)  != math_nint(lat2/dlat))
a=(lim_lat+lat2)/2;b=math_abs(lat2-lim_lat)/2
 'set ccolor 'c.cat
* 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-157.5)),'lat1'-lat),lat-'lat2')'
 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-157.5)),'lat1'-lat),abs(lat-'a')-'b')'
if(subwrd(result,1)='Cannot');say dir': lat1='lat1', lat2='lat2', cat='cat;endif
endif
*S
 dir='S'
 rds1=s.cat/maxf*rds
 rds2=s.catm/maxf*rds
 'q xy2w 'xo' 'yo+rds1
 lat1=subwrd(result,6)
 'q xy2w 'xo' 'yo+rds2
 lat2=subwrd(result,6)
if(math_nint(lat1/dlat)  != math_nint(lat2/dlat))
a=(lim_lat+lat2)/2;b=math_abs(lat2-lim_lat)/2
 'set ccolor 'c.cat
* 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-180)),'lat1'-lat),lat-'lat2')'
 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-180)),'lat1'-lat),abs(lat-'a')-'b')'
if(subwrd(result,1)='Cannot');say dir': lat1='lat1', lat2='lat2', cat='cat;endif
endif
*SSW
 dir='SSW'
 rds1=ssw.cat/maxf*rds
 rds2=ssw.catm/maxf*rds
 'q xy2w 'xo' 'yo+rds1
 lat1=subwrd(result,6)
 'q xy2w 'xo' 'yo+rds2
 lat2=subwrd(result,6)
if(math_nint(lat1/dlat)  != math_nint(lat2/dlat))
a=(lim_lat+lat2)/2;b=math_abs(lat2-lim_lat)/2
 'set ccolor 'c.cat
* 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-202.5)),'lat1'-lat),lat-'lat2')'
 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-202.5)),'lat1'-lat),abs(lat-'a')-'b')'
if(subwrd(result,1)='Cannot');say dir': lat1='lat1', lat2='lat2', cat='cat;endif
endif
*SW
 dir='SW'
 rds1=sw.cat/maxf*rds
 rds2=sw.catm/maxf*rds
 'q xy2w 'xo' 'yo+rds1
 lat1=subwrd(result,6)
 'q xy2w 'xo' 'yo+rds2
 lat2=subwrd(result,6)
if(math_nint(lat1/dlat)  != math_nint(lat2/dlat))
a=(lim_lat+lat2)/2;b=math_abs(lat2-lim_lat)/2
 'set ccolor 'c.cat
* 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-225)),'lat1'-lat),lat-'lat2')'
 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-225)),'lat1'-lat),abs(lat-'a')-'b')'
if(subwrd(result,1)='Cannot');say dir': lat1='lat1', lat2='lat2', cat='cat;endif
endif
*WSW
 dir='WSW'
 rds1=wsw.cat/maxf*rds
 rds2=wsw.catm/maxf*rds
 'q xy2w 'xo' 'yo+rds1
 lat1=subwrd(result,6)
 'q xy2w 'xo' 'yo+rds2
 lat2=subwrd(result,6)
if(math_nint(lat1/dlat)  != math_nint(lat2/dlat))
a=(lim_lat+lat2)/2;b=math_abs(lat2-lim_lat)/2
 'set ccolor 'c.cat
* 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-247.5)),'lat1'-lat),lat-'lat2')'
 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-247.5)),'lat1'-lat),abs(lat-'a')-'b')'
if(subwrd(result,1)='Cannot');say dir': lat1='lat1', lat2='lat2', cat='cat;endif
endif
*W
 dir='W'
 rds1=w.cat/maxf*rds
 rds2=w.catm/maxf*rds
 'q xy2w 'xo' 'yo+rds1
 lat1=subwrd(result,6)
 'q xy2w 'xo' 'yo+rds2
 lat2=subwrd(result,6)
if(math_nint(lat1/dlat)  != math_nint(lat2/dlat))
a=(lim_lat+lat2)/2;b=math_abs(lat2-lim_lat)/2
 'set ccolor 'c.cat
* 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-270)),'lat1'-lat),lat-'lat2')'
 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-270)),'lat1'-lat),abs(lat-'a')-'b')'
if(subwrd(result,1)='Cannot');say dir': lat1='lat1', lat2='lat2', cat='cat;endif
endif
*WNW
 dir='WNW'
 rds1=wnw.cat/maxf*rds
 rds2=wnw.catm/maxf*rds
 'q xy2w 'xo' 'yo+rds1
 lat1=subwrd(result,6)
 'q xy2w 'xo' 'yo+rds2
 lat2=subwrd(result,6)
if(math_nint(lat1/dlat)  != math_nint(lat2/dlat))
a=(lim_lat+lat2)/2;b=math_abs(lat2-lim_lat)/2
 'set ccolor 'c.cat
* 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-292.5)),'lat1'-lat),lat-'lat2')'
 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-292.5)),'lat1'-lat),abs(lat-'a')-'b')'
if(subwrd(result,1)='Cannot');say dir': lat1='lat1', lat2='lat2', cat='cat;endif
endif
*NW
 dir='NW'
 rds1=nw.cat/maxf*rds
 rds2=nw.catm/maxf*rds
 'q xy2w 'xo' 'yo+rds1
 lat1=subwrd(result,6)
 'q xy2w 'xo' 'yo+rds2
 lat2=subwrd(result,6)
if(math_nint(lat1/dlat)  != math_nint(lat2/dlat))
a=(lim_lat+lat2)/2;b=math_abs(lat2-lim_lat)/2
 'set ccolor 'c.cat
* 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-315)),'lat1'-lat),lat-'lat2')'
 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-315)),'lat1'-lat),abs(lat-'a')-'b')'
if(subwrd(result,1)='Cannot');say dir': lat1='lat1', lat2='lat2', cat='cat;endif
endif
*NNW
 dir='NNW'
 rds1=nnw.cat/maxf*rds
 rds2=nnw.catm/maxf*rds
 'q xy2w 'xo' 'yo+rds1
 lat1=subwrd(result,6)
 'q xy2w 'xo' 'yo+rds2
 lat2=subwrd(result,6)
if(math_nint(lat1/dlat)  != math_nint(lat2/dlat))
a=(lim_lat+lat2)/2;b=math_abs(lat2-lim_lat)/2
 'set ccolor 'c.cat
* 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-337.5)),'lat1'-lat),lat-'lat2')'
 'd maskout(maskout(maskout(all,'ddeg'-abs(lon-337.5)),'lat1'-lat),abs(lat-'a')-'b')'
if(subwrd(result,1)='Cannot');say dir': lat1='lat1', lat2='lat2', cat='cat;endif
endif
 cat=cat-1
endwhile

* Draw azimuth lines & labels
'set cthick 3'
'set cstyle 5'
'set ccolor 15'
'set cint 22.5'
'd lon'

'set string 1 c'
'set strsiz 0.15'
'q w2xy 0 5'
xs=subwrd(result,3);ys=subwrd(result,6)
'draw string 'xs' 'ys' N'
'q w2xy 22.5 5'
xs=subwrd(result,3);ys=subwrd(result,6)
'draw string 'xs' 'ys' NNE'
'q w2xy 45 5'
xs=subwrd(result,3);ys=subwrd(result,6)
'draw string 'xs' 'ys' NE'
'q w2xy 67.5 5'
xs=subwrd(result,3);ys=subwrd(result,6)
'draw string 'xs' 'ys' ENE'
'q w2xy 90 5'
xs=subwrd(result,3);ys=subwrd(result,6)
'draw string 'xs' 'ys' E'
'q w2xy 112.5 5'
xs=subwrd(result,3);ys=subwrd(result,6)
'draw string 'xs' 'ys' ESE'
'q w2xy 135 5'
xs=subwrd(result,3);ys=subwrd(result,6)
'draw string 'xs' 'ys' SE'
'q w2xy 157.5 5'
xs=subwrd(result,3);ys=subwrd(result,6)
'draw string 'xs' 'ys' SSE'
'q w2xy 180 5'
xs=subwrd(result,3);ys=subwrd(result,6)
'draw string 'xs' 'ys' S'
'q w2xy 202.5 5'
xs=subwrd(result,3);ys=subwrd(result,6)
'draw string 'xs' 'ys' SSW'
'q w2xy 225 5'
xs=subwrd(result,3);ys=subwrd(result,6)
'draw string 'xs' 'ys' SW'
'q w2xy 247.5 5'
xs=subwrd(result,3);ys=subwrd(result,6)
'draw string 'xs' 'ys' WSW'
'q w2xy 270 5'
xs=subwrd(result,3);ys=subwrd(result,6)
'draw string 'xs' 'ys' W'
'q w2xy 292.5 5'
xs=subwrd(result,3);ys=subwrd(result,6)
'draw string 'xs' 'ys' WNW'
'q w2xy 315 5'
xs=subwrd(result,3);ys=subwrd(result,6)
'draw string 'xs' 'ys' NW'
'q w2xy 337.5 5'
xs=subwrd(result,3);ys=subwrd(result,6)
'draw string 'xs' 'ys' NNW'

* Draw labels on each of the concentric circles
'set string 1 c'
'set strsiz 0.09 0.12'
'q string 100 % '
wid=subwrd(result,4)
*xsl=xo-wid/2;xsr=xo+wid/2
circle=1
while(circle<=ncircle)
 ys=rds/ncircle*circle+yo
 'q xy2w 'xo' 'ys
 lat1=subwrd(result,6)
 'q w2xy 'angle.minf' 'lat1
 xsc=subwrd(result,3);ysc=subwrd(result,6)
 xsl=xsc-wid/2;xsr=xsc+wid/2
 'set cthick 3'
 'set cstyle 1'
 'set ccolor 15'
 'set clevs 'lat1
 'd lat'

 'set rgb 100 255 255 255 150'
 'set line 100'
 'draw recf 'xsl' 'ysc-wid/4' 'xsr' 'ysc+wid/4
 'set line 1'
 'draw rec 'xsl' 'ysc-wid/4' 'xsr' 'ysc+wid/4
 'draw string 'xsc' 'ysc' 'intf*circle' %'
 circle=circle+1
endwhile

* Draw color bar
'q string Wind Speed (m s`a-1`n)'
strlen=subwrd(result,4)
'set string 1 tr'
'draw string 'xmax-0.025' 'ymax-0.025' Wind Speed (m s`a-1`n)'
xlo=xmax-strlen
xhi=xlo+0.2
ylo=ymax/2
yhi=ymax-0.2
yint=(yhi-ylo)/mxcat
'set string 1 l'
cnum=1
while(cnum<=mucat-1)
 'set line 'c.cnum
 'draw recf 'xlo' '%ylo+yint*(cnum-1)%' 'xhi' '%ylo+yint*cnum
 'set line 0 1 6'
 'draw rec 'xlo' '%ylo+yint*(cnum-1)%' 'xhi' '%ylo+yint*cnum
 'draw string '%xhi+0.1%' '%ylo+yint*(cnum-1)%' 'b.cnum
 cnum=cnum+1
endwhile
'set line 'c.cnum
'draw polyf '%(xlo+xhi)/2%' 'yhi' 'xlo' '%ylo+yint*(cnum-1)%' 'xhi' '%ylo+yint*(cnum-1)%' '%(xlo+xhi)/2%' 'yhi
'set line 0 1 6'
'draw line '%(xlo+xhi)/2%' 'yhi' 'xlo' '%ylo+yint*(cnum-1)
'draw line '%(xlo+xhi)/2%' 'yhi' 'xhi' '%ylo+yint*(cnum-1)
'draw line 'xlo' '%ylo+yint*(cnum-1)%' 'xhi' '%ylo+yint*(cnum-1)
'draw string '%xhi+0.1%' '%ylo+yint*(cnum-1)%' 'b.cnum

* Print frequency
spd='';cat=1
while(cat<=mxcat);spd=spd%math_format('%5.2g',b.cat)'  ';cat=cat+1;endwhile
say spd
freq='';cat=1
while(cat<=mxcat);catm=cat-1;freq=freq%math_format('%6.3f',n.cat-n.catm)' ';cat=cat+1;endwhile
say 'N  : 'freq' (%)'
freq='';cat=1
while(cat<=mxcat);catm=cat-1;freq=freq%math_format('%6.3f',nne.cat-nne.catm)' ';cat=cat+1;endwhile
say 'NNE: 'freq' (%)'
freq='';cat=1
while(cat<=mxcat);catm=cat-1;freq=freq%math_format('%6.3f',ne.cat-ne.catm)' ';cat=cat+1;endwhile
say 'NE : 'freq' (%)'
freq='';cat=1
while(cat<=mxcat);catm=cat-1;freq=freq%math_format('%6.3f',ene.cat-ene.catm)' ';cat=cat+1;endwhile
say 'ENE: 'freq' (%)'
freq='';cat=1
while(cat<=mxcat);catm=cat-1;freq=freq%math_format('%6.3f',e.cat-e.catm)' ';cat=cat+1;endwhile
say 'E  : 'freq' (%)'
freq='';cat=1
while(cat<=mxcat);catm=cat-1;freq=freq%math_format('%6.3f',ese.cat-ese.catm)' ';cat=cat+1;endwhile
say 'ESE: 'freq' (%)'
freq='';cat=1
while(cat<=mxcat);catm=cat-1;freq=freq%math_format('%6.3f',se.cat-se.catm)' ';cat=cat+1;endwhile
say 'SE : 'freq' (%)'
freq='';cat=1
while(cat<=mxcat);catm=cat-1;freq=freq%math_format('%6.3f',sse.cat-sse.catm)' ';cat=cat+1;endwhile
say 'SSE: 'freq' (%)'
freq='';cat=1
while(cat<=mxcat);catm=cat-1;freq=freq%math_format('%6.3f',s.cat-s.catm)' ';cat=cat+1;endwhile
say 'S  : 'freq' (%)'
freq='';cat=1
while(cat<=mxcat);catm=cat-1;freq=freq%math_format('%6.3f',ssw.cat-ssw.catm)' ';cat=cat+1;endwhile
say 'SSW: 'freq' (%)'
freq='';cat=1
while(cat<=mxcat);catm=cat-1;freq=freq%math_format('%6.3f',sw.cat-sw.catm)' ';cat=cat+1;endwhile
say 'SW : 'freq' (%)'
freq='';cat=1
while(cat<=mxcat);catm=cat-1;freq=freq%math_format('%6.3f',wsw.cat-wsw.catm)' ';cat=cat+1;endwhile
say 'WSW: 'freq' (%)'
freq='';cat=1
while(cat<=mxcat);catm=cat-1;freq=freq%math_format('%6.3f',w.cat-w.catm)' ';cat=cat+1;endwhile
say 'W  : 'freq' (%)'
freq='';cat=1
while(cat<=mxcat);catm=cat-1;freq=freq%math_format('%6.3f',wnw.cat-wnw.catm)' ';cat=cat+1;endwhile
say 'WNW: 'freq' (%)'
freq='';cat=1
while(cat<=mxcat);catm=cat-1;freq=freq%math_format('%6.3f',nw.cat-nw.catm)' ';cat=cat+1;endwhile
say 'NW : 'freq' (%)'
freq='';cat=1
while(cat<=mxcat);catm=cat-1;freq=freq%math_format('%6.3f',nnw.cat-nnw.catm)' ';cat=cat+1;endwhile
say 'NNW: 'freq' (%)'

* Initialize dimensions
mprojs='scaled latlon nps sps robinson mollweide orthogr'
if(mproj=0);'set mproj off';else
if(mproj=13);'set mproj lambert';else
'set mproj 'subwrd(mprojs,mproj)
endif
endif
'set x 'x1' 'x2
'set y 'y1' 'y2
'set z 'z1' 'z2
'set t 't1' 't2
'set e 'e1' 'e2

'set frame on'
'set mpdraw on'
'set grid on'
return
**********************************
function help()
say ' USAGE: First, set dimensions to your analyzing region, time period, ensemble members.'
say '        windrose <grads-expr for u-comp> <grads-expr for v-comp>'
say '        <threshold 1> <color 1> .... <threshold n> <color n>'
say ' EXAMPLE: windrose u.1 v.2 1 9 2 4 3 5 4 7 5 2'
return
