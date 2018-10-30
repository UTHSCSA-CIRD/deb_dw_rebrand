/* jQuery client side preview script */

/* Where to look for rebranded pictures etc */
testurl = "https://raw.githubusercontent.com/UTHSCSA-CIRD/deb_dw_rebrand/v0.0.1RC/";

/* Replace the tissue sample logo with UT Health logo */
$j('DIV#i2b2_login_modal_dialog .login-dialog').css('background-image',"url(\""+testurl+"js-i2b2/cells/PM/assets/login_bg.jpg\")");

/* Remove the string "i2b2 " from login header */
$j('#i2b2_login_modal_dialog_h').html(function(_,content){return content.gsub('i2b2 ','')});

/* Replace the header background of the login box */
$j('#i2b2_login_modal_dialog_h')[0].style.setProperty('background-image','url('+testurl+'assets/images/top_hive.gif)','important');

/* Replace the title on the top right */
$j('#topBarTitle').prop('src',testurl+'assets/images/title.gif');