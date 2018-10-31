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



/*
 var remurl = 'https://raw.githubusercontent.com/UTHSCSA-CIRD/deb_dw_rebrand/v0.0.1RC/assets/';
 var cssfile = 'i2b2-NEW.css';
*/

$j('head link')[6].remove();
$j('head link')[6].remove();
cssFiles = ['assets/i2b2.css','assets/i2b2-NEW.css'];
function testRemoteBranding(cssfile,remurl='https://raw.githubusercontent.com/UTHSCSA-CIRD/deb_dw_rebrand/v0.0.1RC/'){
  /* remove the local css link */
  $j("head link[href*='"+cssfile+"'").remove();
  /* get a handle to the document head */
  var head = document.head || document.getElementsByTagName('head')[0];
  /* set up handle for AJAX request */
  var xhttp = new XMLHttpRequest();
  /* read the remote css replacement file */
  xhttp.open('GET', remurl+cssfile);
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
	var style = document.createElement('style');
	style.type = 'text/css';
	/* prepend fully qualified remote URL to each image */
	cssQualified = xhttp.responseText.gsub('images/',remurl+'assets/images/');
	/* Append as inline css to replace the sheet removed above*/
	if (style.styleSheet) {
	  style.styleSheet.cssText = cssQualified;
	} else {
	  style.appendChild(document.createTextNode(cssQualified));
	}
	head.appendChild(style);
	return cssQualified;
      } else {
	console.log("Error", xhttp.statusText);
      }
    }
  }
  xhttp.send();
}
for(ii in cssFiles) testRemoteBranding(cssFiles[ii]);
