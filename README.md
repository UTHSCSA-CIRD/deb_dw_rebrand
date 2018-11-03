# deb_dw_rebrand

This is based on the assets folder of our i2b2 v 1.7.09c

## To see how it looks...

If the bookmarklet doesn't show up, view the raw source of
this document or open your local copy of `bookmarklet_test.html` (same folder 
as this) in a browser and drag the bookmarklet to your bookmakr bar). When
you navigate to an i2b2 site, click the bookmarklet. It will put a button in
the top-right that says `Rebrand!`. When you click it you will see the 
proposed changes go into effect instantly. You will need to click it a 
second time after you log in. Everything gets reset to normal if you reload
the page.

*Again, it won't work to click the link on this page. It has to be dragge to
your browser's bookmarks bar, and your browser needs to be on an i2b2 webpage
and only then does clicking it do anything.*

<div>

<a href="javascript:(function()%7Bfunction%20testRemoteBranding(s%2Ce)%7Bvar%20t%3Ddocument.head%7C%7Cdocument.getElementsByTagName(%22head%22)%5B0%5D%2Ci%3Dnew%20XMLHttpRequest%3Bi.open(%22GET%22%2Ce%2Bs)%2Ci.onreadystatechange%3Dfunction()%7Bif(4%3D%3D%3Di.readyState)if(200%3D%3D%3Di.status)%7Bvar%20s%3Ddocument.createElement(%22style%22)%3Bs.type%3D%22text%2Fcss%22%2Cs.styleSheet%3Fs.styleSheet.cssText%3Di.responseText%3As.appendChild(document.createTextNode(i.responseText))%2Ct.appendChild(s)%7Delse%20console.log(%22Error%22%2Ci.statusText)%7D%2Ci.send()%7DcssFiles%3D%5B%22js-i2b2%2Fui.styles%2Fui.styles.css%22%2C%22js-i2b2%2Fcells%2FCRC%2Fassets%2Fquery_report.css%22%2C%22assets%2Fi2b2.css%22%2C%22assets%2Fi2b2-NEW.css%22%2C%22js-i2b2%2Fcells%2FPM%2Fassets%2FmodProjects.css%22%2C%22assets%2Fnew-treeview.css%22%2C%22assets%2Fmod-treeview.css%22%2C%22assets%2Ftree.css%22%2C%22js-i2b2%2Fcells%2FPLUGINMGR%2Fassets%2FvwViewer.css%22%2C%22assets%2Fmsg_sniffer.css%22%2C%22assets%2Fmsg_snifferIE6.css%22%5D%2CimpCss%3D%7B%22vwViewer.css%22%3A%22js-i2b2%2Fcells%2FPLUGINMGR%2Fassets%2F%22%2C%22vwList.css%22%3A%22js-i2b2%2Fcells%2FPLUGINMGR%2Fassets%2F%22%2C%22vwHistory.css%22%3A%22js-i2b2%2Fcells%2FCRC%2Fassets%2F%22%2C%22vwQryTool.css%22%3A%22js-i2b2%2Fcells%2FCRC%2Fassets%2F%22%2C%22vwStatus.css%22%3A%22js-i2b2%2Fcells%2FCRC%2Fassets%2F%22%2C%22modLabValues.css%22%3A%22js-i2b2%2Fcells%2FCRC%2Fassets%2F%22%2C%22vwWork.css%22%3A%22js-i2b2%2Fcells%2FWORK%2Fassets%2F%22%2C%22ontMain.css%22%3A%22js-i2b2%2Fcells%2FONT%2Fassets%2F%22%7D%2Cremurl%3D%22https%3A%2F%2Fraw.githubusercontent.com%2FUTHSCSA-CIRD%2Fdeb_dw_rebrand%2Fintegration%2Fwebclient.test%2F%22%3Bvar%20button%3Ddocument.createElement(%22Button%22)%3Bbutton.innerHTML%3D%22Rebrand!%22%2Cbutton.style%3D%22top%3A0%3Bright%3A0%3Bposition%3Afixed%3B%22%2Cbutton.onclick%3Dfunction()%7B%24j.each(cssFiles%2Cfunction(s)%7BtestRemoteBranding(cssFiles%5Bs%5D%2Cremurl)%7D)%2C%24j.each(impCss%2Cfunction(s%2Ce)%7BtestRemoteBranding(e%2Bs%2Cremurl)%7D)%2C%24j(%22%23topBarTitle%22).prop(%22src%22%2Cremurl%2B%22assets%2Fimages%2Ftitle.gif%22)%2C%24j(%22.formDiv%22).children(%22div.label%22)%5B2%5D.innerText%3D%22Server%3A%22%2C%24j(%22%23i2b2_login_modal_dialog_h%22).html(function(s%2Ce)%7Breturn%20e.gsub(%22i2b2%20%22%2C%22%22)%7D)%7D%2Cdocument.body.appendChild(button)%7D)()">bookmarklet</a>

</div>

**Note:** The point of this bookmarklet is to allow testing out modified css 
and graphics on a production server with zero risk to the server. However, to 
do this, a rather complicated process is followed compared to the drop-in 
replacement you will do when ready to deploy the re-branded website for real.
Therefore, not everything behaves exactly as it will on your server. For 
example the little `+` and `|` folder decorations in the left panels will 
disappear when you click `Rebrand!`. This is not expected to happen in a local
deployment.

## To work on customizing your i2b2

If you're not at CIRD, make a fork of this repo and then clone it. 

You will also need to install [less](http://lesscss.org/) as follows (only the first time):

    npm install less -g

Each time you start working in a fresh bash session you should run the 
following command:

    source ./setup_for_editing.sh

The project-specific bash commands below are only available after you have 
sourced this script.
    
### To propagate your changes

    mktest
    
This will convert all the less files back to css but with whatever changes you 
made to the variables in `global.less`. These css files will have absolute 
URLs for any images that are covered by this repo, and will be referenced by
the bookmarklet 

### To prep
    
### To less-ify the original css (overwriting previous less-ified files)

    mkless

You usually shouldn't need to do this. It's mostly for upstream updates to
i2b2 or for adding files that are not yet covered by this project 
(e.g. `js-ext`).

### To prepare for deployment.

    mkdeploy

It converts less back to css but without absolute URLs, and copies over the 
images from `webclient.test`. Before doing these things it first calls
`mkless`.

### To deploy modified UI files on local i2b2

Copy all contents of this repo to your webclient directory, for example assuming 
you checked this out into `/tmp` and your i2b2 webclient is installed in 
`/var/www/html-FOO/webclient` you would do this:

    cp --backup /var/www/html-FOO/webclient /var/www/html-FOO/webclient_backup
    cp -r /tmp/deb_dw_rebrand/. /var/www/html-FOO/webclient

To roll back your changes you could recursively copy `webclient_backup` back in its place. 


## Tips on customizing i2b2 UI

**Only edit the image files in the webclient.test directory.** 
Everywhere else they might get ignored or overwritten. If an image is not added to the `global.less`
you need to do so if you want it to be visible when you're testing remotely.

**If you need to edit colors, do it in global.less.**

**If want to make changes other than colors and images, please talk to somebody who understands `lessc`.**
It would probably be a good idea to abstract whatever styling changes you need to make into `global.less` rather
than editing the files of `webclient.less` in place. That being said, changes you make to `webclient.less` will
propagate to `webclient` and `webclient.test`, so if you must edit raw source files, that's the place to do it.

At the moment I manually minify `jquery_test.js` via https://javascript-minifier.com/ and then URL-encode it via https://mrcoles.com/bookmarklet/ in order to create the bookmarklet in [bookmarklet_test.html].
