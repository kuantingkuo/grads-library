function date(args)
***** Default value *****
    timestring=''
    format='%F %H:%M'
*************************
    if (args='')
        help()
        return
    endif
    string1=subwrd(args,1)
    c1=substr(string1,1,1)
    if (c1='%')
        help()
        return
    endif
    lentot=math_strlen(args)
    len1=math_strlen(string1)
    if (lentot>len1)
        p0=len1+2
        len2=lentot-len1-1
        format=substr(args,p0,len2)
        say format
    endif
    timestring=string1
*    say 'TZ=GMT date -d 'timestring' "+'format'"'
    rc=sys('TZ=GMT date -d 'timestring' "+'format'"')
return rc

function help()
    say 'date <datetime string> [<format>]'
    say 'example:'
    say '   date 00Z07SEP2017 %Y%m%d %H:%M:%S'
    say '   >> 20170907 00:00:00'
    say '   date 00Z07SEP2017'
    say '   >> 2017-09-07 00:00'
return
