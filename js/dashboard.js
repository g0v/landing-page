document.addEventListener('DOMContentLoaded', function(){
  return fetch('https://dashboard.g0v.tw/').then(function(response){
    return response.json();
  }).then(function(data){
    var date, titles;
    document.getElementById('loading-text').style.display = 'none';
    date = new Date(data.create_at);
    document.querySelector('#update-time span').textContent = date.toLocaleString();
    titles = Object.keys(data.data);
    return titles.forEach(function(title){
      var _data, subtitles;
      _data = data.data[title];
      subtitles = Object.keys(_data);
      return subtitles.forEach(function(subtitle){
        var element;
        element = document.querySelector("#" + title + "-" + subtitle + " .card-text span");
        return element != null ? element.textContent = _data[subtitle] : void 8;
      });
    });
  })['catch'](function(error){
    return console.error('Error fetching data:', error);
  });
});