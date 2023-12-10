#!/bin/bash
for filename in source/includes/*.yaml; do
    #removes onprem edition yaml documents
#    yq eval-all 'select(.edition == "onprem" | not) | select(.edition[0] == "onprem" | not)' -i $filename
    #removes cloud edition lines from remaining documents
    yq 'select(.edition == "onprem" | not) | select(.edition[0] == "onprem" | not)' $filename > $filename.new
    yq '.' $filename > $filename.noblanks
    diff -B $filename.noblanks $filename.new > $filename.patch
    patch -f $filename $filename.patch
    rm -f $filename.new
    rm -f $filename.noblanks
    rm -f $filename.patch
done