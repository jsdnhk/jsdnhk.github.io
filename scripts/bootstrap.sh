#!/usr/bin/env bash

set -eu
readonly SCRIPT_PATH=$(dirname $(realpath ${0}))
cd $SCRIPT_PATH

source $(rvm $(cat ../.ruby-version) do rvm env --path)
./branding.sh

echo "Let's get set up here..."
bundle install
echo "Boom."
