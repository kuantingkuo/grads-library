rc=gsfallow('on')
x1=qdims('xmin')
x2=qdims('xmax')
y1=qdims('ymin')
y2=qdims('ymax')
z1=qdims('zmin')
z2=qdims('zmax')
t1=qdims('tmin')
t2=qdims('tmax')
'set t 't1
'set z 'z1
'set y 'y1
'set x 'x1
'dx=lon(x='x1+1')-lon(x='x1')'
'dy=lat(y='y1+1')-lat(y='y1')'
'x0=lon'
'y0=lat'
'set x 'x1' 'x2
'set y 'y1' 'y2
'xgrid=(lon-x0)/dx+1'
'ygrid=(lat-y0)/dy+1'
'set z 'z1' 'z2
'set t 't1' 't2
say 'xgrid, ygrid defined'
