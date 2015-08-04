#!/bin/bash
gulp build
mkdir out && cd $_
git init
git config user.name nelson119
git config user.email nelson119@outlook.com
git remote add origin $GH_REF
cp -r ../dist/* .
cp ../CNAME ./CNAME
git add .
git commit -m "Deployed to Github Pages : 'date'"
git push -f --quiet origin master:master
cd ..
rm -rf out || exit 0; 
