function random_mask(args)
    if (args=''|args='args')
        help()
        exit
    endif

    rc=gsfallow('on')
    var=subwrd(args,1)
    'randommask=const('var',-1,-a)'
    num=subwrd(args,2)
    xmax=qdims('xmax')
    ymax=qdims('ymax')
    xmin=qdims('xmin')
    ymin=qdims('ymin')
    xsize=xmax-xmin+1
    ysize=ymax-ymin+1
    total=xsize*ysize
    if(num>total)
        say 'Error: required number of points is more than the assigned domain'
        exit
    endif
    n=1
    while(n<=num)
        i=subwrd(sys('echo $(( RANDOM % 'xsize' + 'xmin' ))'),1)
        j=subwrd(sys('echo $(( RANDOM % 'ysize' + 'ymin' ))'),1)
        'q defval randommask 'i' 'j
        check=subwrd(result,3)
        if(check!=-1)
            continue
        endif
        'set defval randommask 'i' 'j' 1'
        n=n+1
    endwhile
    say 'randommask defined!'
return

function help()
    say 'Usage: random_mask varname number'
    say '       varname: a variable which has already set with a 2D domain'
    say '       number : the number of random points'
return
