RSS_URL = "http://api.g0v.tw/community99/"

newsDom = document.getElementById("community99")
fetch(RSS_URL)
.then (response) ->
  response.json()
.then !(data) ->
  items = data.notes
  for i from 0 to 2
    el = items[i]
    sections = el.sections
    ss = ""
    for j from 1 to sections.length - 1
      ss += "<span class='tag'>#{sections[j]}</span>"
    pp = "<div class='mb-2'><a href=\"#{el.url}\" target=\"\_blank\">#{el.title}</a><div>#{ss}</div></div>"
    newsDom.insertAdjacentHTML('beforeend',pp)
