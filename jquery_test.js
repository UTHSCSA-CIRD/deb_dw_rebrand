/* jQuery client side preview script */

/* Where to look for rebranded pictures etc */
testurl = "https://raw.githubusercontent.com/UTHSCSA-CIRD/deb_dw_rebrand/v0.0.1RC/";

/* Replace the tissue sample logo with UT Health logo */
$j('DIV#i2b2_login_modal_dialog .login-dialog').css('background-image',"url(\""+testurl+"js-i2b2/cells/PM/assets/login_bg.jpg\")");

/* Remove the string "i2b2 " from login header */
$j('#i2b2_login_modal_dialog_h').html(function(_,content){return content.gsub('i2b2 ','')});

/* Replace the header background of the login box */
$j('#i2b2_login_modal_dialog_h,.hd')[0].style.setProperty('background-image','url('+testurl+'assets/images/top_hive.gif)','important');

/* Replace the title on the top right */
$j('#topBarTitle').prop('src',testurl+'assets/images/title.gif');

/* Remove i2b2 from login box menu */
$j('.formDiv').children('div.label')[2].innerText = 'Server:';

/* DEB themed background */
$j('body').css('background-image','url('+testurl+'assets/images/background.gif)');

/* After logging into i2b2 ... */

/* Recolor the frames to DEB theme */
$j('div').filter(function(){
    var color = $j(this).css("background-color").toLowerCase().gsub(' ','');
    return color === "#bbccee" || color === "rgb(187,204,238)" ;
    }).css('background','rgb(175,191,191)');

/* Recolor the dark parts of the frames to DEB theme 
$j('.qryPanelTitle, #runBox, #newBox, .tabBox.active div').css('background-color','rgb(68,119,136)'); */

$j('*').filter(function(){
    var color = $j(this).css("background-color").toLowerCase().gsub(' ','');
    return color  === "#6677aa"||color=='rgb(102,119,170)';
    }).css('background-color','rgb(116,119,136)');

/* Recolor query panel buttons and queryName
$j('#queryName, .queryPanelButton, .pluginRecordBox').css('background-color','rgb(223,239,239)'); */
$j('*').filter(function(){
    var color = $j(this).css("background-color").toLowerCase().gsub(' ','');
    return color  === "#cbd8ef"||color=='rgb(203,216,239)'}).css('background-color','rgb(223,239,239)');

/* Recolor inactive panels  and anything else that same color*/
$j('*').filter(function(){
    var color = $j(this).css("background-color").toLowerCase().gsub(' ','');
    return color  === "#dbe8ff"||color=='rgb(219,232,255)'}).css('background-color','rgb(224,237,240)');
$j.each($j('.queryPanelDisabled'),function(xx,yy) {yy.style.setProperty('background-color','rgb(224,237,240)','important')});

/* Recolor the analysis tool backgrounds and tabs*/
$j('.USETABS, #anaPluginList').css('background-color','rgb(175,191,191)');
$j('li').not('.selected').children('.yui-nav a').css('background-color','rgb(222,239,239)');
$j('li.selected').children('.yui-nav a').css('background-color','rgb(222,235,239)');