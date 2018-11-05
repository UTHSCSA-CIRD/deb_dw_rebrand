#!/usr/bin/env bash

# The current git branch
export gitbranch=$(git rev-parse --abbrev-ref HEAD);

# The git host. You won't need to change this unless you migrate your fork 
# someplace other than GitHub. This _is_ the correct URL for GitHub even
# though it isn't the github.com you might be used to.
export gitbase="https://raw.githubusercontent.com/";

# The path to the current git repo
export gitrepo=$(git config --get "remote.origin.url"|sed s/git@github.com://);

# Name of the test directory
export testdir="webclient.test";
export lessdir="webclient.less";
export origdir="webclient.orig";
export depldir="webclient";

# The default URL for remote testing
export remurl="$gitbase$gitrepo/$gitbranch/$testdir";

# Files that mksedscr will use to create a sed script
export lessfiles=(global.less altspellings.less);

# For URL encoding
# https://stackoverflow.com/a/10660730
rawurlencode() {
  local string="${1}"
  local strlen=${#string}
  local encoded=""
  local pos c o

  for (( pos=0 ; pos<strlen ; pos++ )); do
     c=${string:$pos:1}
     case "$c" in
        [-_.~a-zA-Z0-9] ) o="${c}" ;;
        * )               printf -v o '%%%02X' "'$c"
     esac
     encoded+="${o}"
  done
  echo "${encoded}"    # You can either set a return variable (FASTER) 
  REPLY="${encoded}"   #+or echo the result (EASIER)... or both... :p
}

# url encoded version of remurl and its target
export enctarget="remurl%3D%2[27].*%2F%2[27]";
export remurlenc=$(rawurlencode remurl=\"$remurl/\");
# update the reference bookmarklet
sed -i  "s|$enctarget|$remurlenc|" bookmarklet.js;
# insert that bookmarklet into the html example
sed -i "s|<a href=\".*\">Rebrand i2b2|<a href=\"$(cat bookmarklet.js)\">Rebrand i2b2|" bookmarklet_test.html;
# and the md (though it doesn't work there at this time)
sed -i "s|<a href=\".*\">bookmarklet|<a href=\"$(cat bookmarklet.js)\">bookmarklet|" README.md;

# replace them in the minified bookmarklets
sed -i "s/$enctarget/$remurlenc/g" README.md;
sed -i "s/$enctarget/$remurlenc/g" bookmarklet_test.html

# Make sure that the test script is using the correct remurl
sed -i "/^remurl=/ s|https://.*/|$remurl/|" jquery_test.js;
# Make sure that global.less has the right branch and url
sed -i "/^@branch:/ s|\".*\";|\"$gitbranch\";|" global.less;
sed -i "/^@rooturl:/ s|['\"].*['\"];|\"$remurl/\";|" global.less;

# Creates a sed script for converting raw i2b2 css to variable-substituted less files
mksedscr (){
    echo "1 i @import \"global.less\";\n\n"> css2less.sed;
    for ii in ${lessfiles[*]}; do
    sed -e "/^@.*\/\/ \/\// ! d;
    s/^\(@[a-z_0-9]*\):.*\/\/ \/\/ \(.*\)$/s|['\"]\\\\{0,1\\\\}\2['\"]\\\\{0,1\\\\}|\1|gI/" \
    $ii >> css2less.sed;
    done;
    cat static_directives.sed >> css2less.sed;
}

# Converts original css files to less. Warning! This blows away the original files. We need to
# think of a more granular way to do this.
mkless () {
    mksedscr;
    pushd "$origdir";
    # Silently create any missing subdirectories in webclient.less and webclient.test
    find -type d -exec mkdir -p ../$lessdir/{} \; -exec mkdir -p ../$testdir/{} \;
    # convert each css file into less
    for ii in $(find -name *.css); do 
      # create the target path
      jj="../$lessdir/"$(echo $ii|sed s/css/less/); 
      sed -f ../css2less.sed $ii > $jj; 
    done;
    # copy each image file to the webclient.test directory unless it already exists (the webclient.less
    # directory doesn't need its own images)
    for ii in $(find . -name *.jpg -o -name *.png -o -name *.gif -o -name *.JPG); do 
      cp -n $ii "../$testdir/$ii";
    done;
    popd;
}

# Substitutes variables in less files making them into the test css files
mktest () {
    pushd "$lessdir";
    for ii in $(find -name *.less); do 
      jj="../$testdir/"$(echo $ii|sed s/less/css/);
      lessc --verbose --include-path="..:../$testdir" $ii $jj;
    done;
    popd;
    # Doesn't get allowed by browser/server 
    #./patch_imports.sh;
}

# Make deployable

mkdeploy () {
    mktest;
    pushd "$testdir";
    # create directories if missing
    find -type d -exec mkdir -p ../webclient/{} \;
    # copy over images
    find -name *.jpg -o -name *.png -o -name *.gif -o -name *.JPG -exec cp {} ../$depldir/{} \;
    popd;
    pushd "$lessdir";
    # process less this time using the local includes
    for ii in $(find -name *.less); do 
      jj="../webclient/"$(echo $ii|sed s/less/css/);
      lessc --verbose --include-path="..:../$depldir" $ii $jj;
    done;
    popd;
}