var RSS_URL, newsDom;
RSS_URL = "https://api.g0v.tw/community99/";
newsDom = document.getElementById("community99");
fetch(RSS_URL).then(function(response){
  return response.json();
}).then(function(data){
  var items, i$, i, el, sections, ss, j$, to$, j, pp;
  items = data.notes;
  for (i$ = 0; i$ <= 2; ++i$) {
    i = i$;
    el = items[i];
    sections = el.sections;
    ss = "";
    for (j$ = 1, to$ = sections.length - 1; j$ <= to$; ++j$) {
      j = j$;
      ss += "<span class='tag'>" + sections[j] + "</span>";
    }
    pp = "<div class='mb-2'><a href=\"" + el.url + "\" target=\"_blank\">" + el.title + "</a><div>" + ss + "</div></div>";
    newsDom.insertAdjacentHTML('beforeend', pp);
  }
});