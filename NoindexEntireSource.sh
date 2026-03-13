#!/bin/sh
while getopts p: flag
do
    case "${flag}" in
        p) project=${OPTARG};;
    esac
done
echo "Adding noindex to all files in $project..."
# Use find to recursively search for .txt files in the source directory and noindex them
find ~/"$project"/source -type f -name "*.txt" | while read -r file; do
    sed -i '' "1s%^%.. meta::\n   :robots: noindex, nosnippet \n\n%" "$file"
done