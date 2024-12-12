document.addEventListener 'DOMContentLoaded', ->
  fetch 'https://dashboard.g0v.tw/'
    .then (response) -> response.json!
    .then (data) ->
      document.getElementById('loading-text').style.display = 'none'
      # console.log data
      date = new Date data.create_at
      document.querySelector('#update-time span').textContent = date.toLocaleString!

      titles = Object.keys data.data
      titles.forEach (title) ->
        _data = data.data[title]
        subtitles = Object.keys _data
        subtitles.forEach (subtitle) ->
          # console.log "#{title}-#{subtitle}: #{_data[subtitle]}"
          element = document.querySelector "##{title}-#{subtitle} .card-text span"
          element?.textContent = _data[subtitle]
    .catch (error) ->
      console.error 'Error fetching data:', error
