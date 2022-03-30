RSS_URL = "https://cors.g0v.ronny.tw/g0vrss.php"

newsDom = document.getElementById("g0vnews")
fetch(RSS_URL)
.then (response) ->
  response.text()
.then (str) ->
  new window.DOMParser().parseFromString(str, "text/xml")
.then !(data) ->
  items = data.querySelectorAll("item")
  for i from 0 to 2
    el = items[i]
    pubDate = new Date(el.querySelector("pubDate").childNodes[0].nodeValue)
    pp = "<p><a>[#{pubDate.toDateString()}]</a> <a href=\"#{el.querySelector("link").childNodes[0].nodeValue}\" target=\"\_blank\">#{el.querySelector("title").childNodes[0].nodeValue}</a></p>"
    newsDom.insertAdjacentHTML('beforeend',pp)
