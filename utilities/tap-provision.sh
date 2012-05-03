#!/usr/bin/env bash

mkdir tmp
cd tmp
git clone git@github.com:IMAmuseum/tap-cms.git
cd tap-cms
git checkout $1
rm -Rf .git
cd ../
tar zcvf tap-2.x-latest.tar.gz tap-cms
drush make tap-cms/drush.make
cd sites/all/modules
tar zcvf ../../../tap-full-2.x-latest.tar.gz *
cd ../../../../
mv ./tmp/tap-2.x-latest.tar.gz ./
mv ./tmp/tap-full-2.x-latest.tar.gz ./
rm -Rf tmp
echo 'Finished'
