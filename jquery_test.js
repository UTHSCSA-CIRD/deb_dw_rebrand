/* jQuery client side preview script */

// /* Where to look for rebranded pictures etc */
// testurl = "https://raw.githubusercontent.com/UTHSCSA-CIRD/deb_dw_rebrand/v0.0.1RC/";
// 
// /* Replace the tissue sample logo with UT Health logo */
// $j('DIV#i2b2_login_modal_dialog .login-dialog').css('background-image',"url(\""+testurl+"js-i2b2/cells/PM/assets/login_bg.jpg\")");
// 
// 
// /* Replace the header background of the login box */
// $j('#i2b2_login_modal_dialog_h,.hd')[0].style.setProperty('background-image','url('+testurl+'assets/images/top_hive.gif)','important');
// 
// /* DEB themed background */
// $j('body').css('background-image','url('+testurl+'assets/images/background.gif)');
// 
// /* After logging into i2b2 ... */
// 
// /* Recolor the frames to DEB theme */
// $j('div').filter(function(){
//     var color = $j(this).css("background-color").toLowerCase().gsub(' ','');
//     return color === "#bbccee" || color === "rgb(187,204,238)" ;
//     }).css('background','rgb(175,191,191)');
// 
// /* Recolor the dark parts of the frames to DEB theme 
// $j('.qryPanelTitle, #runBox, #newBox, .tabBox.active div').css('background-color','rgb(68,119,136)'); */
// 
// $j('*').filter(function(){
//     var color = $j(this).css("background-color").toLowerCase().gsub(' ','');
//     return color  === "#6677aa"||color=='rgb(102,119,170)';
//     }).css('background-color','rgb(116,119,136)');
// 
// /* Recolor query panel buttons and queryName
// $j('#queryName, .queryPanelButton, .pluginRecordBox').css('background-color','rgb(223,239,239)'); */
// $j('*').filter(function(){
//     var color = $j(this).css("background-color").toLowerCase().gsub(' ','');
//     return color  === "#cbd8ef"||color=='rgb(203,216,239)'}).css('background-color','rgb(223,239,239)');
// 
// /* Recolor inactive panels  and anything else that same color*/
// $j('*').filter(function(){
//     var color = $j(this).css("background-color").toLowerCase().gsub(' ','');
//     return color  === "#dbe8ff"||color=='rgb(219,232,255)'}).css('background-color','rgb(224,237,240)');
// $j.each($j('.queryPanelDisabled'),function(xx,yy) {yy.style.setProperty('background-color','rgb(224,237,240)','important')});
// 
// /* Recolor the analysis tool backgrounds and tabs*/
// $j('.USETABS, #anaPluginList').css('background-color','rgb(175,191,191)');
// $j('li').not('.selected').children('.yui-nav a').css('background-color','rgb(222,239,239)');
// $j('li.selected').children('.yui-nav a').css('background-color','rgb(222,235,239)');



/*
 var remurl = 'https://raw.githubusercontent.com/UTHSCSA-CIRD/deb_dw_rebrand/v0.0.1RC/assets/';
 var cssfile = 'i2b2-NEW.css';
*/

// cssFiles = ['assets/i2b2.css','assets/i2b2-NEW.css','js-i2b2/cells/PLUGINMGR/assets/vwViewer.css'
// 	   ,'js-i2b2/cells/PM/assets/modProjects.css','js-i2b2/cells/CRC/assets/query_report.css'
// 	   ,'js-i2b2/ui.styles/ui.styles.css'];

cssFiles = [
  'js-i2b2/ui.styles/ui.styles.css'
  ,'js-i2b2/cells/CRC/assets/query_report.css'
  ,'assets/i2b2.css','assets/i2b2-NEW.css'
  ,'js-i2b2/cells/PM/assets/modProjects.css'
  //,'assets/help_viewer.css'
  ,'assets/new-treeview.css','assets/mod-treeview.css','assets/tree.css'
  ,'js-i2b2/cells/PLUGINMGR/assets/vwViewer.css'
  ,'assets/msg_sniffer.css','assets/msg_snifferIE6.css'
  ]

//remurl='https://github.com/UTHSCSA-CIRD/deb_dw_rebrand/raw/f_less/webclient.test/';
remurl='https://raw.githubusercontent.com/UTHSCSA-CIRD/deb_dw_rebrand/v0.0.1RC_01/webclient.test/';

function testRemoteBranding(cssfile,remurl){
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
	//cssQualified = xhttp.responseText.gsub('images/',remurl+'assets/images/');
	/* Append as inline css to replace the sheet removed above*/
	if (style.styleSheet) {
	  style.styleSheet.cssText = xhttp.responseText; //cssQualified;
	} else {
	  style.appendChild(document.createTextNode(xhttp.responseText));
	}
	head.appendChild(style);
	//return cssQualified;
      } else {
	console.log("Error", xhttp.statusText);
      }
    }
  }
  xhttp.send();
}
$j.each(cssFiles,function(ii) {testRemoteBranding(cssFiles[ii],remurl)})

/* Replace the title on the top right */
$j('#topBarTitle').prop('src',remurl+'assets/images/title.gif');

/* Remove i2b2 from login box menu */
$j('.formDiv').children('div.label')[2].innerText = 'Server:';

$j('#i2b2_login_modal_dialog_h').html(function(_,content){return content.gsub('i2b2 ','')});
