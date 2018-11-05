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

<a href="javascript:(function()%7Bfunction%2520testRemoteBranding(s%252Ce)%257Bvar%2520t%253Ddocument.head%257C%257Cdocument.getElementsByTagName(%2522head%2522)%255B0%255D%252Ci%253Dnew%2520XMLHttpRequest%253Bi.open(%2522GET%2522%252Ce%252Bs)%252Ci.onreadystatechange%253Dfunction()%257Bif(4%253D%253D%253Di.readyState)if(200%253D%253D%253Di.status)%257Bvar%2520s%253Ddocument.createElement(%2522style%2522)%253Bs.type%253D%2522text%252Fcss%2522%252Cs.styleSheet%253Fs.styleSheet.cssText%253Di.responseText%253As.appendChild(document.createTextNode(i.responseText))%252Ct.appendChild(s)%257Delse%2520console.log(%2522Error%2522%252Ci.statusText)%257D%252Ci.send()%257DcssFiles%253D%255B%2522js-i2b2%252Fui.styles%252Fui.styles.css%2522%252C%2522js-i2b2%252Fcells%252FCRC%252Fassets%252Fquery_report.css%2522%252C%2522assets%252Fi2b2.css%2522%252C%2522assets%252Fi2b2-NEW.css%2522%252C%2522js-i2b2%252Fcells%252FPM%252Fassets%252FmodProjects.css%2522%252C%2522js-i2b2%252Fcells%252FPLUGINMGR%252Fassets%252FvwViewer.css%2522%252C%2522assets%252Fmsg_sniffer.css%2522%252C%2522assets%252Fmsg_snifferIE6.css%2522%255D%252CimpCss%253D%257B%2522vwViewer.css%2522%253A%2522js-i2b2%252Fcells%252FPLUGINMGR%252Fassets%252F%2522%252C%2522vwList.css%2522%253A%2522js-i2b2%252Fcells%252FPLUGINMGR%252Fassets%252F%2522%252C%2522vwHistory.css%2522%253A%2522js-i2b2%252Fcells%252FCRC%252Fassets%252F%2522%252C%2522vwQryTool.css%2522%253A%2522js-i2b2%252Fcells%252FCRC%252Fassets%252F%2522%252C%2522vwStatus.css%2522%253A%2522js-i2b2%252Fcells%252FCRC%252Fassets%252F%2522%252C%2522modLabValues.css%2522%253A%2522js-i2b2%252Fcells%252FCRC%252Fassets%252F%2522%252C%2522vwWork.css%2522%253A%2522js-i2b2%252Fcells%252FWORK%252Fassets%252F%2522%252C%2522ontMain.css%2522%253A%2522js-i2b2%252Fcells%252FONT%252Fassets%252F%2522%257D%252Cremurl%253D%2522https%253A%252F%252Fraw.githubusercontent.com%252FUTHSCSA-CIRD%252Fdeb_dw_rebrand%252Fv0.0.1RC_01%252Fwebclient.test%252F%2522%253Bvar%2520button%253Ddocument.createElement(%2522Button%2522)%253Bbutton.innerHTML%253D%2522Rebrand!%2522%252Cbutton.style%253D%2522top%253A0%253Bright%253A0%253Bposition%253Afixed%253B%2522%252Cbutton.onclick%253Dfunction()%257B%2524j.each(cssFiles%252Cfunction(s)%257BtestRemoteBranding(cssFiles%255Bs%255D%252Cremurl)%257D)%252C%2524j.each(impCss%252Cfunction(s%252Ce)%257BtestRemoteBranding(e%252Bs%252Cremurl)%257D)%252C%2524j(%2522%2523topBarTitle%2522).prop(%2522src%2522%252Cremurl%252B%2522assets%252Fimages%252Ftitle.gif%2522)%252C%2524j(%2522.formDiv%2522).children(%2522div.label%2522)%255B2%255D.innerText%253D%2522Server%253A%2522%252C%2524j(%2522%2523i2b2_login_modal_dialog_h%2522).html(function(s%252Ce)%257Breturn%2520e.gsub(%2522i2b2%2520%2522%252C%2522%2522)%257D)%257D%252Cdocument.body.appendChild(button)%253B%7D)()">bookmarklet</a>

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

**If you need to edit colors, do it in `global.less`.**

**If want to make changes other than colors and images, please talk to somebody who understands `lessc`.**
It would probably be a good idea to abstract whatever styling changes you need to make into `global.less` rather
than editing the files of `webclient.less` in place. That being said, changes you make to `webclient.less` will
propagate to `webclient` and `webclient.test`, so if you must edit raw source files, that's the place to do it.

At the moment I manually minify jquery_test.js via https://javascript-minifier.com/ and then URL-encode it via https://mrcoles.com/bookmarklet/ and use the output from that to replace the contents of `bookmarklet.js` which sourcing the `setup_for_editing.sh` script propagates out to the other files including the bookmarklet in [./bookmarklet_test.html].
