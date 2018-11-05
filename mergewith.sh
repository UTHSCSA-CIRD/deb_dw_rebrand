#!/usr/bin/env bash
# script to properly merge changes from other branches

<<<<<<< HEAD
mbranch=$1;
=======
local mbranch=$1;
>>>>>>> v0.0.1RC_01

source setup_for_editing.sh;

# overwrite the auto-modified files
<<<<<<< HEAD
for ii in ${ovrwrtfiles[*]}; do git show "$mbranch:$ii" > "$ii"; done;
=======
for ii in ${ovrwrtfiles[*]}; do show "$mbranch:$ii" > "$ii"; done;
>>>>>>> v0.0.1RC_01

git merge --no-ff $mbranch;

source setup_for_editing.sh;

mktest;
