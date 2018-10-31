# deb_dw_rebrand

This is based on the assets folder of our i2b2 v 1.7.09c

To deploy, clone this repo and then move all its contents to your webclient directory, for example assuming you checked this out into /tmp
and your i2b2 webclient is installed in /var/www/html-FOO/webclient you would do this:

    cp --backup /var/www/html-FOO/webclient /var/www/html-FOO/webclient_backup
    cp -r /tmp/deb_dw_rebrand/. /var/www/html-FOO/webclient

To roll back your changes you could git co the original commit to this repo or delete assets and recursively copy `webclient_backup` in its place. 

By following the above syntax you make the `webclient` directory a git repo, so you could pull future updates directly into it by doing 

    git pull

To non-destructively test in your own Chrome browser without altering production i2b2 in any way, go to your i2b2 page and hit control-shift-c. A debugging panel will appear in the bottom. Click on the `Console` tab. Open the jquery_test.js file, copy-paste its contents into the console, and hit `Enter`. You will need to repeat after you log in and after certain dialogues become newly active.

