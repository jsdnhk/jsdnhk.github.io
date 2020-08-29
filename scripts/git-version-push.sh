#!/usr/bin/env bash

# create and push the new tag to the git remote master branch

set -u
readonly SCRIPT_PATH=$(dirname $(realpath ${0}))
cd $SCRIPT_PATH

./branding.sh

# Input the commit message
cd ../
git status
commit_msg=""
git log --oneline -5
read -p "Enter the commit message: " commit_msg
if [ -z "${commit_msg}" ]; then
  echo "Please input the commit message" >&2
  exit 1
fi

# Input the version tag
readonly version_tag_pattern="YY.MM"
version_tag=""
read -p "Enter the version tag(${version_tag_pattern}): " version_tag
if [ -z "${version_tag}" ]; then
  echo "Please input the correct version tag" >&2
  exit 1
fi

# Commit the src. change
git pull origin master
git checkout master
git add .
git commit -m "${commit_msg}"
git push

# Delete and recreate the tag locally
tagname="${version_tag}"
git tag -d ${tagname}
git tag ${tagname}

# Delete and recreate the tag remotely
git push origin ":${tagname}"  # deletes original remote tag
git push origin "${tagname}" # creates new remote tag

# Update local repository with the updated tag
git fetch --tags