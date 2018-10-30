# deb_dw_rebrand

This is based on the assets folder of our i2b2 v 1.7.09c

To deploy, clone this repo and then move all its contents to your webclient directory, for example assuming you checked this out into /tmp
and your i2b2 webclient is installed in /var/www/html-FOO/webclient you would do this:

    cp --backup /var/www/html-FOO/webclient/assets /var/www/html-FOO/webclient/backup_assets
    mv /tmp/deb_dw_rebrand/* /tmp/deb_dw_rebrand/.* /var/www/html-FOO/webclient/assets # ignore the . and .. warnings

To roll back your changes you could git co the original commit to this repo or delete assets and recursively copy `backup_assets` in its place.By copying over all the files (`.*`) above you make the `assets` directory a git repo, so you could pull future updates directly into it by
doing 

    git pull

Coming soon: instructions on testing the rebranding on your Firefox or Chrome web browser without altering your i2b2


