fetch('https://api.g0v.tw/hackmd/?tag=jothon').then(function(response){
  return response.json();
}).then(function(data){
  console.log(data);
  return data.map(function(item, index){
    var summary, row;
    summary = item.summary.replace(/[*_`]/g, '');
    summary = summary.substring(0, 100);
    row = document.createElement('div');
    row.className = 'col-12 col-sm-6 col-lg-4 p-2';
    row.innerHTML = "<div class=\"card\">\n  <div class=\"card-body\">\n    <h5 class=\"card-title\">" + item.title + "</h5>\n    <p class=\"card-text\">" + summary + "</p>\n  </div>\n</div>";
    return document.getElementById('insights-rows').appendChild(row);
  });
})['catch'](function(error){});