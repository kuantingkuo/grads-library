function pause(var)
rc=gsfallow("on")
t=qdims(tmin)
while(1)
'c'
'set t 't
t=qdims(tmin)
'd 'var
say result
say 't='t
'q time'
'draw title 'subwrd(result,3)
pull step
if(step='q'|step='quit'|step='exit');exit;endif
if(step='');t=t+1;continue;else
  rc=valnum(step)
  if(rc=0);step;pull step;endif
  if(rc=1&step>0);t=step;endif
endif
endwhile
return
