#!/usr/bin/env bash
# script to properly merge changes from other branches

local mbranch=$1;

source setup_for_editing.sh;

for ii in ovrwrtfiles; do git show "$mbranch:$ii" > "$ii"; done;

git merge --no-ff $mbranch;

source setup_for_editing.sh;

mktest;
