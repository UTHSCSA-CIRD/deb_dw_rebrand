/* jQuery client side preview script */

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
//window.location.href = "https://i2b2.uthscsa.edu/webclient/";

  //,'assets/help_viewer.css'
  //,'js-i2b2/cells/CRC/assets/main_list.css'
  //,'js-i2b2/cells/ONT/assets/main_list.css'
  //,'js-i2b2/cells/PLUGINMGR/assets/main_list.css'
  //,'js-i2b2/cells/WORK/assets/main_list.css'
  //,'js-i2b2/cells/plugins/standard/Dem1Set/assets/vwDem1Set.css'


cssFiles = [
  'js-i2b2/ui.styles/ui.styles.css'
  ,'js-i2b2/cells/CRC/assets/query_report.css'
  ,'assets/i2b2.css','assets/i2b2-NEW.css'
  ,'js-i2b2/cells/PM/assets/modProjects.css'
  ,'assets/new-treeview.css','assets/mod-treeview.css','assets/tree.css'
  ,'js-i2b2/cells/PLUGINMGR/assets/vwViewer.css'
  ,'assets/msg_sniffer.css','assets/msg_snifferIE6.css'
  ]

impCss = {
   'vwViewer.css': 'js-i2b2/cells/PLUGINMGR/assets/'
  ,'vwList.css':   'js-i2b2/cells/PLUGINMGR/assets/'
  ,'vwHistory.css': 'js-i2b2/cells/CRC/assets/'
  ,'vwQryTool.css': 'js-i2b2/cells/CRC/assets/'
  ,'vwStatus.css': 'js-i2b2/cells/CRC/assets/'
  ,'modLabValues.css': 'js-i2b2/cells/CRC/assets/'
  ,'vwWork.css': 'js-i2b2/cells/WORK/assets/'
  ,'ontMain.css': 'js-i2b2/cells/ONT/assets/'
};
  
//remurl='https://github.com/UTHSCSA-CIRD/deb_dw_rebrand/raw/f_less/webclient.test/';
remurl='https://raw.githubusercontent.com/UTHSCSA-CIRD/deb_dw_rebrand/v0.0.1RC_01/webclient.test/';

function testRemoteBranding(cssfile,remurl){
  /* remove the local css link */
  //$j("head link[href*='"+cssfile+"'").remove();
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

var button = document.createElement("Button");
button.innerHTML = "Rebrand!";
button.style = "top:0;right:0;position:fixed;"
button.onclick = function(){
  $j.each(cssFiles,function(ii) {testRemoteBranding(cssFiles[ii],remurl);}); //static css 
  $j.each(impCss,function(kk,vv){testRemoteBranding(vv+kk,remurl);}); //imported css
  $j('#topBarTitle').prop('src',remurl+'assets/images/title.gif'); //top-left title
  $j('.formDiv').children('div.label')[2].innerText = 'Server:'; //no i2b2 on box menu
  $j('#i2b2_login_modal_dialog_h').html(function(_,content){return content.gsub('i2b2 ','')}); //debrand login
}
document.body.appendChild(button);

// get rid of statically linked sheets
//$j.each(cssFiles,function(ii) {$j("head link[href*='"+cssFiles[ii]+"'").remove()});

// How to track down each of those nasty imported sheets... first we remove anything for which
// we have a replacement
//ss = $j("link[href*='main_list.css']").map(function() { return this.sheet; }).get();

//for(ii in ss){for(jj in ss[ii].cssRules){
//  if(Object.keys(impCss).indexOf(ss[ii].cssRules[jj].href)>=0){ss[ii].removeRule(jj)}}};


/* The following got rejected because of strict MIME type. So instead I have to crunch down the above
javascript:(function(){_my_script=document.createElement('SCRIPT');_my_script.type='text/javascript';_my_script.src='https://raw.githubusercontent.com/UTHSCSA-CIRD/deb_dw_rebrand/v0.0.1RC_01/jquery_test.js';document.getElementsByTagName('head')[0].appendChild(_my_script);})();
*/