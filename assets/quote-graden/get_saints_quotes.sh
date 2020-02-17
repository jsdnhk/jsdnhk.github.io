#!/usr/bin/env bash

set -euo pipefail

readonly SCRIPT_PATH=$(dirname $(realpath ${0}))
cd $SCRIPT_PATH

readonly source_url="https://quote-garden.herokuapp.com/quotes/author/"
readonly quote-graden=("Buddha" "Confucius" "Lao Tzu")
#readonly saints_folder="saints"
#[ ! -d ${saints_folder} ] && mkdir ${saints_folder}
#cd ${saints_folder}

for saint in "${saints[@]}"; do
  saint_url="${source_url}${saint// /%20}"
  saint_filename="${saint// /_}"
  saint_filename=$(echo "${saint_filename}" | tr '[:upper:]' '[:lower:]')
  echo "Output ${saint} quote data..."
  curl $saint_url | json_pp > "${saint_filename}.json"
done

echo "All the saints quotes from quote-garden are output to the folder '${SCRIPT_PATH}'"
exit 0