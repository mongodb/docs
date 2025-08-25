#!/bin/bash
findFiles(){
    total_count=$(find "`dirname $0`"/../source/images -type f | wc -l | tr -d ' ')
    current_count=1;
    spin='←↖↑↗→↘↓↙'
    i=0;
    while read F; do
        echo "Checking $F ($current_count of $total_count image files)" 1>&2;

        for f in $(find "`dirname $0`"/../source -type f); do 
        {
            if n=$(grep -q $F $f); then
                result=`cut -d '/' -f5- <<< "$f"`;
                echo "→→→ "Image found in $result 1>&2;
                printf $F,$result"\n" 1>&1;
            fi
        }
        i=$(( (i+1) %8 ));
        printf "\r${spin:$i:1}" 1>&2;
        done
        printf "\r✔\n" 1>&2;
        ((current_count = current_count+1));
    done < <(find "`dirname $0`"/../source/images -type f -exec basename {} \;)
}
findFiles
echo "--done--" 1>&2;
