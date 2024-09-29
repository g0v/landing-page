window.addEventListener('load', function(){
  var xhr;
  xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://dashboard.g0v.tw/', true);
  xhr.onreadystatechange = function(){
    var data, date, titles;
    if (xhr.readyState === 4 && xhr.status === 200) {
      data = JSON.parse(xhr.responseText);
      document.getElementById('loading-text').style.display = 'none';
      date = new Date(data.create_at);
      document.getElementById('update-time').querySelector('span').textContent = date.toLocaleString();
      titles = Object.keys(data.data);
      return titles.forEach(function(_title){
        var _data, subtitles;
        _data = data.data[_title];
        subtitles = Object.keys(_data);
        return subtitles.forEach(function(_subtitle){
          return document.getElementById(_title + '-' + _subtitle).querySelector('.card-text span').textContent = _data[_subtitle];
        });
      });
    }
  };
  return xhr.send();
});