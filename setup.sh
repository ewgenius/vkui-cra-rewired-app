#/bin/bash

cd ../

if [ -d "VKUI" ]; then
  exit 0
fi

git clone https://github.com/VKCOM/VKUI.git
cd VKUI
git fetch origin fix/modal-page-header-content-grow
git checkout fix/modal-page-header-content-grow
yarn