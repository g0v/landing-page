#$('.carousel').carousel!

smoothScroll!

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

$('#intl-btn-group button').on 'click' ->
  target_href = window.location.href.split('/')
  target_href[4] = $(this).data('target')
  window.location.href = target_href.join('/')