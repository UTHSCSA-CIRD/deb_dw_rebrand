# deb_dw_rebrand

This is based on the assets folder of our i2b2 v 1.7.09c

## To see how it looks...

<a href=javascript:(function(){function testRemoteBranding(s,e){var t=document.head||document.getElementsByTagName("head")[0],i=new XMLHttpRequest;i.open("GET",e+s),i.onreadystatechange=function(){if(4===i.readyState)if(200===i.status){var s=document.createElement("style");s.type="text/css",s.styleSheet?s.styleSheet.cssText=i.responseText:s.appendChild(document.createTextNode(i.responseText)),t.appendChild(s)}else console.log("Error",i.statusText)},i.send()}cssFiles=["js-i2b2/ui.styles/ui.styles.css","js-i2b2/cells/CRC/assets/query_report.css","assets/i2b2.css","assets/i2b2-NEW.css","js-i2b2/cells/PM/assets/modProjects.css","assets/new-treeview.css","assets/mod-treeview.css","assets/tree.css","js-i2b2/cells/PLUGINMGR/assets/vwViewer.css","assets/msg_sniffer.css","assets/msg_snifferIE6.css"],impCss={"vwViewer.css":"js-i2b2/cells/PLUGINMGR/assets/","vwHistory.css":"js-i2b2/cells/CRC/assets/","vwQryTool.css":"js-i2b2/cells/CRC/assets/","vwStatus.css":"js-i2b2/cells/CRC/assets/","vwWork.css":"js-i2b2/cells/WORK/assets/","ontMain.css":"js-i2b2/cells/ONT/assets/"},remurl="https://raw.githubusercontent.com/UTHSCSA-CIRD/deb_dw_rebrand/v0.0.1RC_01/webclient.test/",$j.each(cssFiles,function(s){testRemoteBranding(cssFiles[s],remurl)}),$j.each(impCss,function(s,e){testRemoteBranding(e+s,remurl)}),$j("#topBarTitle").prop("src",remurl+"assets/images/title.gif"),$j(".formDiv").children("div.label")[2].innerText="Server:",$j("#i2b2_login_modal_dialog_h").html(function(s,e){return e.gsub("i2b2 ","")}),$j.each(cssFiles,function(s){$j("head link[href*='"+cssFiles[s]+"'").remove()}),ss=$j("link[href*='main_list.css']").map(function(){return this.sheet}).get();for(ii in ss)for(jj in ss[ii].cssRules)Object.keys(impCss).indexOf(ss[ii].cssRules[jj].href)>=0&&ss[ii].removeRule(jj)})()>Scriptlet</a>


** Only edit the image files in the webclient.test directory.** 
Everywhere else they might get ignored or overwritten. If an image is not added to the `global.less`
you need to do so if you want it to be visible when you're testing remotely.

** If you need to edit colors, do it in global.less.**

** If want to make changes other than colors and images, please talk to somebody who understands `lessc`.**
It would probably be a good idea to abstract whatever styling changes you need to make into `global.less` rather
than editing the files of `webclient.less` in place. That being said, changes you make to `webclient.less` will
propagate to `webclient` and `webclient.test`, so if you must edit raw source files, that's the place to do it.

## To less-ify the original css files

### Generate sed scripts

The `global.less` file does double-duty as a mapping table that ultimately tells the `sed` command what to replace in the original .css files with what so that they become .less files and can be more easily and quickly mass-modified using `lessc`. This is how to create a 'lessified' version of the default css files.

    lessfiles=(global.less altspellings.less);
    echo "1 i @import \"global.less\";\n\n"> css2less.sed;
    for ii in ${lessfiles[*]}; do
    sed -e "/^@.*\/\/ \/\// ! d;
    s/^\(@[a-z_0-9]*\):.*\/\/ \/\/ \(.*\)$/s|['\"]\\\\{0,1\\\\}\2['\"]\\\\{0,1\\\\}|\1|gI/" \
    $ii >> css2less.sed;
    done;
    
### Set up or refresh the webclient.test and webclient.less directories
    
If you have a fresh copy of the unmodified i2b2 css files in the webclient.orig directory, here is how you can convert them to less files after you have the above sed script generated.
    pushd webclient.orig;
    # Silently create any missing subdirectories in webclient.less and webclient.test
    find -type d -exec mkdir -p ../webclient.less/{} \; -exec mkdir -p ../webclient.test/{} \;
    # convert each css file into less
    for ii in $(find -name *.css); do 
      # create the target path
      jj="../webclient.less/"$(echo $ii|sed s/css/less/); 
      sed -f ../css2less.sed $ii > $jj; 
    done;
    # copy each image file to the webclient.test directory unless it already exists (the webclient.less
    # directory doesn't need its own images)
    for ii in $(find . -name *.jpg -o -name *.png -o -name *.gif -o -name *.JPG); do 
      cp -n $ii ../webclient.test/$ii;
    done;
    popd;

### Convert the less files back to css (for testing)

    pushd webclient.less;
    for ii in $(find -name *.less); do 
      jj="../webclient.test/"$(echo $ii|sed s/less/css/);
      lessc --verbose --include-path=..:../webclient.test $ii $jj;
    done;
    popd;

### Prepare files for local deployment

    pushd webclient.less;
    # create directories if missing
    find -type d -exec mkdir -p ../webclient/{} \;
    # copy over images
    find -name *.jpg -o -name *.png -o -name *.gif -o -name *.JPG -exec cp {} ../webclient/{} \;
    # process less this time using the local includes
    for ii in $(find -name *.less); do 
      jj="../webclient/"$(echo $ii|sed s/less/css/);
      lessc --include-path=..:../webclient $ii $jj;
    done;
    popd;

To deploy, clone this repo and then move all its contents to your webclient directory, for example assuming you checked this out into /tmp
and your i2b2 webclient is installed in /var/www/html-FOO/webclient you would do this:

    cp --backup /var/www/html-FOO/webclient /var/www/html-FOO/webclient_backup
    cp -r /tmp/deb_dw_rebrand/. /var/www/html-FOO/webclient

To roll back your changes you could git co the original commit to this repo or delete assets and recursively copy `webclient_backup` in its place. 

By following the above syntax you make the `webclient` directory a git repo, so you could pull future updates directly into it by doing 

    git pull

To non-destructively test in your own Chrome browser without altering production i2b2 in any way, go to your i2b2 page and hit control-shift-c. A debugging panel will appear in the bottom. Click on the `Console` tab. Open the jquery_test.js file, copy-paste its contents into the console, and hit `Enter`. You will need to repeat after you log in and after certain dialogues become newly active.

