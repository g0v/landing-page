fetch 'https://api.g0v.tw/hackmd/?tag=insights%20for%20g0v.tw'
  .then (response) -> response.json()
  .then (data) ->
    console.log data
    data.map (item, index) ->
      console.log item
      summary = item.summary.content.replace(/[*_`]/g, '')
      summary = summary.substring(0, 100)
      tags = {}
      item.summary.tags.map (tag) -> tags[tag[0]] = tag[1]
      row = document.createElement 'div'
      row.className = 'col-12 col-sm-6 col-lg-4 p-2'
      row.innerHTML = """
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">#{item.title}</h5>
            #{if tags.author then """<div class="mt-2 mt-3 fs-6 text-secondary">#{tags.author}</div>""" else ''}
            <p class="card-text">#{summary}</p>
          </div>
        </div>
      """
      document.getElementById('insights-rows').appendChild row
  .catch (error) ->
    console.log error
    # Handle any errors here
