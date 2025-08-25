bluehawk_result=$(npx bluehawk check .)
echo "$bluehawk_result"

regex="- ([0-9]+) errors"
if [[ $bluehawk_result =~ $regex ]]
then
  error_count="${BASH_REMATCH[1]}"
  if (( $error_count > 0 )); then
    echo "num errors: $error_count"
    exit 1
  fi
else
  echo "Did not receive the expected output from bluehawk check"
  exit 1
fi
