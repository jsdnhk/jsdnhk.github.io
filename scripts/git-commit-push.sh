#!/usr/bin/env bash

# commit the current src change to the git repo.

set -u
readonly SCRIPT_PATH=$(dirname $(realpath ${0}))
cd $SCRIPT_PATH

./branding.sh

# Input the commit message
cd ../
git status
commit_msg=""
read -p "Enter the commit message: " commit_msg
if [ -z "${commit_msg}" ]; then
  echo "Please input the commit message" >&2
  exit 1
fi

# Commit the src. change
git add .
git commit -m "${commit_msg}"
git push