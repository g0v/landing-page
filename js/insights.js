fetch('https://api.g0v.tw/hackmd/?tag=insights%20for%20g0v.tw').then(function(response){
  return response.json();
}).then(function(data){
  console.log(data);
  return data.map(function(item, index){
    var summary, tags, row;
    console.log(item);
    summary = item.summary.content.replace(/[*_`]/g, '');
    summary = summary.substring(0, 100);
    tags = {};
    item.summary.tags.map(function(tag){
      return tags[tag[0]] = tag[1];
    });
    row = document.createElement('div');
    row.className = 'col-12 col-sm-6 col-lg-4 p-2';
    row.innerHTML = "<div class=\"card\">\n  <div class=\"card-body\">\n    <h5 class=\"card-title\">" + item.title + "</h5>\n    " + (tags.author ? "<div class=\"mt-2 mt-3 fs-6 text-secondary\">" + tags.author + "</div>" : '') + "\n    <p class=\"card-text\">" + summary + "</p>\n  </div>\n</div>";
    return document.getElementById('insights-rows').appendChild(row);
  });
})['catch'](function(error){
  return console.log(error);
});