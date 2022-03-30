var RSS_URL, newsDom;
RSS_URL = "https://cors.g0v.ronny.tw/g0vrss.php";
newsDom = document.getElementById("g0vnews");
fetch(RSS_URL).then(function(response){
  return response.text();
}).then(function(str){
  return new window.DOMParser().parseFromString(str, "text/xml");
}).then(function(data){
  var items, i$, i, el, pubDate, pp;
  items = data.querySelectorAll("item");
  for (i$ = 0; i$ <= 2; ++i$) {
    i = i$;
    el = items[i];
    pubDate = new Date(el.querySelector("pubDate").childNodes[0].nodeValue);
    pp = "<p><a>[" + pubDate.toDateString() + "]</a> <a href=\"" + el.querySelector("link").childNodes[0].nodeValue + "\" target=\"_blank\">" + el.querySelector("title").childNodes[0].nodeValue + "</a></p>";
    newsDom.insertAdjacentHTML('beforeend', pp);
  }
});