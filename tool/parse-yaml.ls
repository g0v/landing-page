require! <[fs fs-extra js-yaml marked]>

option = breaks: true, renderer: new marked.Renderer!
marked.set-options option
convert = (obj) ->
  if typeof(obj) == \object => (for k,v of obj => obj[k] = convert(v))
  else if typeof(obj) == \string and /\n/.exec(obj) => obj = marked(obj.replace(/\n/g,'\r\n')).replace(\n/g,'')
  return obj

fs-extra.ensure-dir-sync '../src/pug/data'
fs-extra.ensure-dir-sync '../static/assets/data'

data = {}
fs.readdir-sync '../data' .filter(->/\.yaml$/.exec(it)).map((it) -> it.replace('\.yaml','')).map (n)->
  ret = js-yaml.safe-load fs.read-file-sync "../data/#n.yaml"
  ret = convert ret
  fs.write-file-sync "../static/assets/data/#n.json", JSON.stringify(ret)
  fs.write-file-sync "../src/pug/data/#n.pug", """
  //- module
  -
    var data = {#n: #{JSON.stringify(ret)} };
  """
  data[n] = ret

fs.write-file-sync "../src/pug/data/all.pug", """
//- module
-
  var data = #{JSON.stringify(data)};
"""

fs.write-file-sync "../static/assets/data/all.js", """
var data = #{JSON.stringify(data)};
"""
