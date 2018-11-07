require! <[express chokidar fs fs-extra path bluebird colors stylus pug LiveScript]>

cwd = path.resolve process.cwd!

file-handler = do
  dispatch: (file) ->
    ret = /\.([^.]+)$/.exec(file)
    if !ret or !(ret.1 in <[styl ls pug]>) => return
    content = fs.read-file-sync(file).toString!
    if /^\/\/- *module/.exec(content) or /^\/\* *module *\*\//.exec(content) => return
    @[ret.1] file, content
      .then ({des}) -> console.log "[BUILD] #file --> #des".green
      .catch (e) -> console.log "[BUILD] #file failed: ".red, e
  styl: (file, content) ->
    (res, rej) <- new bluebird _
    des = file.replace(/src\/styl/, 'static/css').replace(/\.styl/,'.css')
    stylus content
      .set \filename, file
      .render (e, css) ->
        if e => return rej new Error(e)
        fs-extra.ensure-dir-sync path.dirname(des)
        fs.write-file-sync des, css
        return res {des}
  ls: (file, content) ->
    <- bluebird.resolve!then
    des = file.replace(/src\/ls/, 'static/js').replace(/\.ls$/,'.js')
    fs-extra.ensure-dir-sync path.dirname des
    fs.write-file-sync( des, LiveScript.compile(content,{bare:true}) )
    return {des}
  pug: (file, content) -> 
    <- bluebird.resolve!then
    des = file.replace(/src\/pug/, 'static').replace(/\.pug/,'.html')
    fs-extra.ensure-dir-sync path.dirname des
    fs.write-file-sync des, pug.render content, {filename: file, basedir: path.join(cwd, 'src/pug')}
    return {des}

app = express!
app.set 'trust proxy', '127.0.0.1'
app.use \/, express.static('static')
server = app.listen 9999, -> console.log "listening on port #{server.address!port}"

watcher = chokidar.watch \src, ignored: (->), persistent: true
  .on \add, -> file-handler.dispatch it
  .on \change, -> file-handler.dispatch it
