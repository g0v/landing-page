window.addEventListener 'load', ->
  xhr = new XMLHttpRequest!
  xhr.open 'GET', 'https://dashboard.g0v.tw/', true
  xhr.onreadystatechange = ->
    if xhr.readyState == 4 and xhr.status == 200
      data = JSON.parse xhr.responseText
      document.getElementById('loading-text').style.display = 'none'
      date = new Date data.create_at
      document.getElementById('update-time').querySelector('span').textContent = date.toLocaleString!
      titles = Object.keys data.data
      titles.forEach (_title) ->
        _data = data.data[_title]
        subtitles = Object.keys _data
        subtitles.forEach (_subtitle) ->
          document.getElementById(_title + '-' + _subtitle).querySelector('.card-text span').textContent = _data[_subtitle]
  xhr.send!