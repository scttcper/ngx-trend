#!/usr/bin/env bash
set -exu

# Stages a release by putting everything that should be packaged and released
# into the ./deploy folder. This script should be run from the root of the project

npm run cleanup
NGC="node node_modules/.bin/ngc"
TSC="node node_modules/.bin/tsc"

# Run Angular Compiler
rm -rf deploy
rm -rf stage
$TSC -p ./tsconfig-esm.json
# create umd
./node_modules/.bin/rollup -c rollup.js

rm -rf stage
$NGC -p ./tsconfig-aot.json

# copy root readme and license to deployment folder
cp README.md ./deploy
cp LICENSE ./deploy

# copy package.json files that are in lib folders
# find src/lib -name 'package.json' -type f -exec cp {} ./deploy \;
cp ./src/lib/package.json ./deploy
