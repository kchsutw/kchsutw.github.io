#!/bin/bash
mkdir out && cd $_
git init
git config user.name nelson119
git config user.email nelson119@outlook.com
git remote add origin "https://28bf3f627806cd1a9d1fa5b064b87d8907bf2829:x-oauth-basic@github.com/kchsutw/kchsutw.github.io.git"
cp -r ../dist/* .
cp ../CNAME ./CNAME
git add .
git commit -m "Deployed to Github Pages"
git push -f --quiet origin master:master
cd ..
rm -rf out || exit 0; 
