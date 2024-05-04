smoothScroll();
/*
fonturl = do
  root:
    \https://plotdb.github.io/xl-fontset/alpha
    # optional
    # \https://font.local/alpha/
  content: 
    \源石黑體-Light
    # optional
    # \源石黑體-Regular
    # \粗黑體
    # \源樣明體-Regular
  heading: 
    \王漢宗超明
    # optional
    # \王漢宗超明

(font) <- xfl.load "#{fonturl.root}/#{fonturl.content}/", _
<- font.sync document.body.innerText, _

(font) <- xfl.load "#{fonturl.root}/#{fonturl.heading}/", _
texts = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6'))
  .map -> it.innerText
  .join('')
<- font.sync texts, _
*/
Array.from(document.querySelectorAll('#intl-btn-group button')).map(function(btn){
  return btn.addEventListener('click', function(evt){
    var lng, newPath;
    lng = evt.target.getAttribute('data-target');
    newPath = window.location.pathname.replace(/^\/intl\/[^/]+/, "/intl/" + lng);
    return window.location.href = window.location.origin + "" + newPath;
  });
});
document.addEventListener('DOMContentLoaded', function(){
  var url, style;
  url = window.location.href;
  if (url.includes('intl/ja')) {
    style = document.createElement('style');
    document.head.appendChild(style);
    return style.sheet.insertRule("html, body, .typeset { font-family: 'Noto Sans JP', 'Noto Sans TC', Roboto, Helvetica, Arial, sans-serif; }", 0);
  }
});