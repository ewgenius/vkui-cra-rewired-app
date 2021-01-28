#/bin/bash

cd ../

if [ -d "VKUI" ]; then
  exit 0
fi

git clone https://github.com/VKCOM/VKUI.git
cd VKUI
git fetch origin master
git checkout master
yarn