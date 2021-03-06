var init, prepare;
init = function(){
  var img, ref$, w, h, camera, scene, renderer, animate;
  img = document.querySelector('#landing .content .desc img');
  ref$ = [img.width, img.height], w = ref$[0], h = ref$[1];
  camera = new THREE.PerspectiveCamera(45, w / h, 1, 10000);
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(w, h);
  img.parentNode.insertBefore(renderer.domElement, img);
  img.parentNode.removeChild(img);
  animate = function(renderFunc){
    var _animate;
    _animate = function(value){
      requestAnimationFrame(_animate);
      return renderFunc(value);
    };
    return _animate();
  };
  return {
    camera: camera,
    scene: scene,
    renderer: renderer,
    w: w,
    h: h,
    animate: animate
  };
};
prepare = function(){
  return loadSvg("assets/img/g0v-only-1.svg", function(e, svg1){
    return loadSvg("assets/img/g0v-only-2.svg", function(e, svg2){
      var svg1Path, smesh1, svg2Path, smesh2, ref$, scene, camera, renderer, w, h, animate, light, uniforms, smaterial, addMesh, start, rateX, rateY;
      svg1Path = parsePath(svg1);
      smesh1 = svgMesh(svg1Path, {
        delaunay: true,
        scale: 6,
        normalize: true
      });
      svg2Path = parsePath(svg2);
      smesh2 = svgMesh(svg2Path, {
        delaunay: true,
        scale: 6,
        normalize: true
      });
      ref$ = init(), scene = ref$.scene, camera = ref$.camera, renderer = ref$.renderer, w = ref$.w, h = ref$.h, animate = ref$.animate;
      scene.background = new THREE.Color(0xffffff);
      camera.position.set(0, 0, 2);
      camera.lookAt(0, 0, 0);
      light = new THREE.DirectionalLight(0xffffff);
      light.position.set(1, 1, 1);
      light = new THREE.AmbientLight(0xffffff);
      scene.add(light);
      uniforms = {
        time: {
          type: 'f',
          value: 0
        }
      };
      smaterial = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        uniforms: uniforms,
        vertexShader: "attribute vec4 rand;\nuniform float time;\nvarying vec4 pos;\nvarying float color;\nvoid main() {\n  pos = vec4(position.x, position.y + 1. * rand[1] * time, position.z + 1. * rand[2] * time, 1.0);\n  color = rand[3];\n  gl_Position = projectionMatrix * modelViewMatrix * pos;\n}",
        fragmentShader: "varying vec4 pos;\nuniform float time;\nvarying float color;\nvoid main() {\n  gl_FragColor = vec4(color, 0., 0., 1. - time * 20.);\n}"
      });
      addMesh = function(mesh, color, scale){
        var geom, bgeom, rand, i$, to$, i, j$, j, val, k$, k;
        scale == null && (scale = 1);
        geom = complex(mesh);
        bgeom = new THREE.BufferGeometry().fromGeometry(geom);
        rand = new Float32Array(bgeom.attributes.position.count * 4);
        for (i$ = 0, to$ = rand.length; i$ < to$; i$ += 3) {
          i = i$;
          for (j$ = 0; j$ < 4; ++j$) {
            j = j$;
            val = Math.random() * 10;
            for (k$ = 0; k$ < 3; ++k$) {
              k = k$;
              rand[i * 4 + k * 4 + j] = j === 3 ? color : val;
            }
          }
        }
        bgeom.addAttribute('rand', new THREE.BufferAttribute(rand, 4));
        mesh = new THREE.Mesh(bgeom, smaterial);
        mesh.scale.x = scale;
        mesh.scale.y = scale;
        mesh.scale.z = scale;
        mesh.position.z = color === 0
          ? 0
          : -1;
        return scene.add(mesh);
      };
      addMesh(smesh1, 0, 1.8);
      addMesh(smesh2, 1, 0.9);
      start = Date.now();
      rateX = 0;
      rateY = 0;
      animate(function(){
        uniforms.time.value = Math.pow(Math.E, -(Date.now() - start) * 0.004);
        camera.position.x = rateX;
        camera.position.y = rateY;
        camera.lookAt(0, 0, 0);
        return renderer.render(scene, camera);
      });
      return document.addEventListener('mousemove', function(e){
        rateX = -2 * (e.clientX - window.innerWidth * 0.5) / window.innerWidth;
        return rateY = 2 * (e.clientY - window.innerHeight * 0.5) / window.innerHeight;
      });
    });
  });
};
prepare();