# deb_dw_rebrand

This is based on the assets folder of our i2b2 v 1.7.09c

## To see how it looks...

<div>
<a href="javascript:(function()%7Bfunction%20testRemoteBranding(s%2Ce)%7Bvar%20t%3Ddocument.head%7C%7Cdocument.getElementsByTagName(%22head%22)%5B0%5D%2Ci%3Dnew%20XMLHttpRequest%3Bi.open(%22GET%22%2Ce%2Bs)%2Ci.onreadystatechange%3Dfunction()%7Bif(4%3D%3D%3Di.readyState)if(200%3D%3D%3Di.status)%7Bvar%20s%3Ddocument.createElement(%22style%22)%3Bs.type%3D%22text%2Fcss%22%2Cs.styleSheet%3Fs.styleSheet.cssText%3Di.responseText%3As.appendChild(document.createTextNode(i.responseText))%2Ct.appendChild(s)%7Delse%20console.log(%22Error%22%2Ci.statusText)%7D%2Ci.send()%7DcssFiles%3D%5B%22js-i2b2%2Fui.styles%2Fui.styles.css%22%2C%22js-i2b2%2Fcells%2FCRC%2Fassets%2Fquery_report.css%22%2C%22assets%2Fi2b2.css%22%2C%22assets%2Fi2b2-NEW.css%22%2C%22js-i2b2%2Fcells%2FPM%2Fassets%2FmodProjects.css%22%2C%22assets%2Fnew-treeview.css%22%2C%22assets%2Fmod-treeview.css%22%2C%22assets%2Ftree.css%22%2C%22js-i2b2%2Fcells%2FPLUGINMGR%2Fassets%2FvwViewer.css%22%2C%22assets%2Fmsg_sniffer.css%22%2C%22assets%2Fmsg_snifferIE6.css%22%5D%2CimpCss%3D%7B%22vwViewer.css%22%3A%22js-i2b2%2Fcells%2FPLUGINMGR%2Fassets%2F%22%2C%22vwHistory.css%22%3A%22js-i2b2%2Fcells%2FCRC%2Fassets%2F%22%2C%22vwQryTool.css%22%3A%22js-i2b2%2Fcells%2FCRC%2Fassets%2F%22%2C%22vwStatus.css%22%3A%22js-i2b2%2Fcells%2FCRC%2Fassets%2F%22%2C%22vwWork.css%22%3A%22js-i2b2%2Fcells%2FWORK%2Fassets%2F%22%2C%22ontMain.css%22%3A%22js-i2b2%2Fcells%2FONT%2Fassets%2F%22%7D%2Cremurl%3D%22https%3A%2F%2Fraw.githubusercontent.com%2FUTHSCSA-CIRD%2Fdeb_dw_rebrand%2Fv0.0.1RC_01%2Fwebclient.test%2F%22%2C%24j.each(cssFiles%2Cfunction(s)%7BtestRemoteBranding(cssFiles%5Bs%5D%2Cremurl)%7D)%2C%24j.each(impCss%2Cfunction(s%2Ce)%7BtestRemoteBranding(e%2Bs%2Cremurl)%7D)%2C%24j(%22%23topBarTitle%22).prop(%22src%22%2Cremurl%2B%22assets%2Fimages%2Ftitle.gif%22)%2C%24j(%22.formDiv%22).children(%22div.label%22)%5B2%5D.innerText%3D%22Server%3A%22%2C%24j(%22%23i2b2_login_modal_dialog_h%22).html(function(s%2Ce)%7Breturn%20e.gsub(%22i2b2%20%22%2C%22%22)%7D)%2C%24j.each(cssFiles%2Cfunction(s)%7B%24j(%22head%20link%5Bhref*%3D'%22%2BcssFiles%5Bs%5D%2B%22'%22).remove()%7D)%2Css%3D%24j(%22link%5Bhref*%3D'main_list.css'%5D%22).map(function()%7Breturn%20this.sheet%7D).get()%3Bfor(ii%20in%20ss)for(jj%20in%20ss%5Bii%5D.cssRules)Object.keys(impCss).indexOf(ss%5Bii%5D.cssRules%5Bjj%5D.href)%3E%3D0%26%26ss%5Bii%5D.removeRule(jj)%7D)()">bookmarklet</a>
</div>

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

