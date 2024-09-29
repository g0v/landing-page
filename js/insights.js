fetch('https://api.g0v.tw/hackmd/?tag=insights for g0v.tw').then(function(response){
  return response.json();
}).then(function(data){
  return data.map(function(item, index){
    var tags, i$, ref$, len$, tag, summary, row;
    tags = {};
    for (i$ = 0, len$ = (ref$ = item.summary.tags).length; i$ < len$; ++i$) {
      tag = ref$[i$];
      if (tag[0]) {
        tags[tag[0]] = tag[1];
      }
    }
    summary = item.summary.content.replace(/[*_`#]/g, '');
    summary = summary.substring(0, 100);
    console.log(tags);
    console.log(summary);
    row = document.createElement('div');
    row.className = 'col-12 col-sm-6 col-lg-4 p-2';
    row.innerHTML = "<div class=\"card\">\n  <div class=\"card-body\">\n    <h5 class=\"card-title\">" + item.title + "</h5>\n    " + (tags['author'] ? "<p class='text-sm text-secondary mb-3'>by " + tags['author'] + "</p>" : '') + "\n    <p class=\"card-text\">" + summary + "</p>\n    <a href=\"https://g0v.hackmd.io/" + item.id + "\" target=\"_blank\" class=\"\">Read More</a>\n  </div>\n</div>";
    return document.getElementById('insights-rows').appendChild(row);
  });
})['catch'](function(error){});