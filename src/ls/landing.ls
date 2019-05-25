
init = ->
  img = document.querySelector '#landing .content .desc img'
  [w,h] = [img.width, img.height]
  camera = new THREE.PerspectiveCamera 45, w/h, 1, 10000
  scene = new THREE.Scene!
  renderer = new THREE.WebGLRenderer antialias: true
  renderer.setSize w, h
  img.parentNode.insertBefore renderer.domElement, img
  img.parentNode.removeChild img
  animate = (render-func) ->
    _animate = (value) ->
      requestAnimationFrame _animate
      render-func value
    _animate!
  return {camera, scene, renderer, w, h, animate}

prepare = ->
  (e, svg1) <- loadSvg "assets/img/g0v-only-1.svg"
  (e, svg2) <- loadSvg "assets/img/g0v-only-2.svg"

  svg1-path = parse-path svg1
  smesh1 = svg-mesh svg1-path, {delaunay: true, scale: 6, normalize: true}
  svg2-path = parse-path svg2
  smesh2 = svg-mesh svg2-path, {delaunay: true, scale: 6, normalize: true}
  {scene, camera, renderer, w, h, animate} = init!
  scene.background = new THREE.Color 0xffffff
  camera.position.set 0, 0, 2
  camera.lookAt 0, 0, 0
  light = new THREE.DirectionalLight 0xffffff
  light.position.set 1, 1, 1
  light = new THREE.AmbientLight 0xffffff
  scene.add light

  uniforms = do
    time: {type: \f, value: 0}
  smaterial = new THREE.ShaderMaterial {
    side: THREE.DoubleSide
    transparent: true
    uniforms: uniforms
    vertexShader: """
    attribute vec4 rand;
    uniform float time;
    varying vec4 pos;
    varying float color;
    void main() {
      pos = vec4(position.x, position.y + 1. * rand[1] * time, position.z + 1. * rand[2] * time, 1.0);
      color = rand[3];
      gl_Position = projectionMatrix * modelViewMatrix * pos;
    }
    """
    fragmentShader: """
    varying vec4 pos;
    uniform float time;
    varying float color;
    void main() {
      gl_FragColor = vec4(color, 0., 0., 1. - time * 20.);
    }
    """

  }
  add-mesh = (mesh, color, scale = 1) ->
    geom = complex mesh
    bgeom = new THREE.BufferGeometry!fromGeometry geom
    rand = new Float32Array(bgeom.attributes.position.count * 4)
    for i from 0 til rand.length by 3 => 
      for j from 0 til 4 =>
        val = Math.random! * 10
        for k from 0 til 3 =>
          rand[i * 4 + k * 4 + j] = if j == 3 => color else val

    bgeom.addAttribute 'rand', new THREE.BufferAttribute rand, 4
    mesh = new THREE.Mesh bgeom, smaterial
    mesh.scale.x = scale
    mesh.scale.y = scale
    mesh.scale.z = scale
    mesh.position.z = if color == 0 => 0 else -1
    scene.add mesh

  add-mesh smesh1, 0, 1.8
  add-mesh smesh2, 1, 0.9
  start = Date.now!
  rate-x = 0
  rate-y = 0
  animate ->
    uniforms.time.value = Math.pow(Math.E, -(Date.now! - start) * 0.004)
    camera.position.x = rate-x
    camera.position.y = rate-y
    camera.lookAt 0, 0, 0
    renderer.render scene, camera
  document.addEventListener \mousemove, (e) ->
    rate-x := -2 * (e.clientX - window.innerWidth * 0.5) / window.innerWidth
    rate-y := 2 * (e.clientY - window.innerHeight * 0.5) / window.innerHeight

prepare!

