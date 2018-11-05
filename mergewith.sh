#!/usr/bin/env bash
# script to properly merge changes from other branches

mbranch="$1";

source setup_for_editing.sh;

# overwrite the auto-modified files
for ii in ${ovrwrtfiles[*]}; do echo 'git show "$mbranch:$ii" > "$ii"'; git show "$mbranch:$ii" > "$ii"; done;

git merge --no-ff $mbranch -m "Propagating changes from $mbranch";

source setup_for_editing.sh;

mktest;
