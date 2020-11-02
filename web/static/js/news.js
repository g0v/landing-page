const RSS_URL = "https://cors-anywhere.herokuapp.com/https://g0v.news/feed";

var newsDom = document.getElementById("g0vnews");

fetch(RSS_URL)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const items = data.querySelectorAll("item");
    for(var i=0; i<3; i++) {
      var el = items[i];

      var pubDate = new Date(el.querySelector("pubDate").childNodes[0].nodeValue);
      var pp = `<p><a>[${pubDate.toDateString()}]</a> <a href="${el.querySelector("link").childNodes[0].nodeValue}" target="_blank">${el.querySelector("title").childNodes[0].nodeValue}</a></p>`;
      newsDom.insertAdjacentHTML('beforeend',pp);
    }
  });
