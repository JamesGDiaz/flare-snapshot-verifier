#!/usr/bin/env sh

# abort on errors
set -e

# pull changes
git pull

# build
npm run build

# update nginx
sudo nginx -s reload

cd -