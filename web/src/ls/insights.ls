fetch 'https://api.g0v.tw/hackmd/?tag=jothon'
  .then (response) -> response.json()
  .then (data) ->
    console.log data
    data.map (item, index) ->
      summary = item.summary.replace(/[*_`]/g, '')
      summary = summary.substring(0, 100)
      row = document.createElement 'div'
      row.className = 'col-12 col-sm-6 col-lg-4 p-2'
      row.innerHTML = """
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">#{item.title}</h5>
            <p class="card-text">#{summary}</p>
          </div>
        </div>
      """
      document.getElementById('insights-rows').appendChild row
  .catch (error) ->
    # Handle any errors here
