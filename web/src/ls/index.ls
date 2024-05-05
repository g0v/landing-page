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

Array.from(document.querySelectorAll '#intl-btn-group button').map (btn) ->
  (evt) <- btn.addEventListener \click, _
  lng = evt.target.getAttribute \data-target
  new-path = window.location.pathname.replace(/^\/intl\/[^/]+/, "/intl/#lng")
  window.location.href = "#{window.location.origin}#{new-path}"

document.addEventListener 'DOMContentLoaded', ->
  url = window.location.href
  if url.includes 'intl/ja'
    # Overwrite the Traditional Chinese font with the Japanese one.
    style = document.createElement 'style'
    document.head.appendChild style
    style.sheet.insertRule "html, body, .typeset { font-family: 'Noto Sans JP', 'Noto Sans TC', Roboto, Helvetica, Arial, sans-serif; }", 0