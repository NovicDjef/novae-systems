/* =========================================================
   NOVÆ SYSTEMS — Scène 3D Three.js
   Réseau neuronal de particules + cœur icosaédrique
   ========================================================= */
(function () {
  if (typeof THREE === "undefined") return;
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05060a, 0.055);

  const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100);
  camera.position.z = 14;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));

  // ---------- Particle field ----------
  const COUNT = innerWidth < 768 ? 800 : 1500;
  const positions = new Float32Array(COUNT * 3);
  const speeds = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 36;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 24;
    speeds[i] = 0.002 + Math.random() * 0.006;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  // soft round sprite
  const sprite = (function () {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(0.3, "rgba(4,83,241,.9)");
    grd.addColorStop(1, "rgba(4,83,241,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    const t = new THREE.Texture(c);
    t.needsUpdate = true;
    return t;
  })();

  const pMat = new THREE.PointsMaterial({
    size: 0.16,
    map: sprite,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: 0x3b82f6,
  });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  // ---------- Central wireframe icosahedron ----------
  const ico = new THREE.Group();
  const geo = new THREE.IcosahedronGeometry(3.4, 1);
  const wire = new THREE.LineSegments(
    new THREE.WireframeGeometry(geo),
    new THREE.LineBasicMaterial({ color: 0x0453f1, transparent: true, opacity: 0.28 })
  );
  const inner = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.1, 0),
    new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: 0.18 })
  );
  ico.add(wire, inner);
  ico.position.set(0, 0, 0);
  scene.add(ico);

  // vertices glow points on the ico
  const vGeo = new THREE.BufferGeometry();
  vGeo.setAttribute("position", geo.getAttribute("position").clone());
  const vMat = new THREE.PointsMaterial({ size: 0.34, map: sprite, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xff2bd6 });
  ico.add(new THREE.Points(vGeo, vMat));

  // ---------- Interaction ----------
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener("mousemove", (e) => {
    mouse.tx = (e.clientX / innerWidth - 0.5);
    mouse.ty = (e.clientY / innerHeight - 0.5);
  });

  let scrollY = 0;
  addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });

  addEventListener("resize", () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  // ---------- Loop ----------
  const clock = new THREE.Clock();
  function tick() {
    const t = clock.getElapsedTime();
    const pos = pGeo.attributes.position.array;
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 1] += speeds[i];
      if (pos[i * 3 + 1] > 12) pos[i * 3 + 1] = -12;
    }
    pGeo.attributes.position.needsUpdate = true;
    points.rotation.y = t * 0.02;

    ico.rotation.y += 0.0022;
    ico.rotation.x += 0.0011;
    inner.rotation.y -= 0.004;
    inner.rotation.z += 0.003;
    const s = 1 + Math.sin(t * 1.2) * 0.04;
    ico.scale.setScalar(s);

    // smooth camera parallax + scroll dolly
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    camera.position.x = mouse.x * 4;
    camera.position.y = -mouse.y * 3 + scrollY * 0.002;
    camera.lookAt(0, scrollY * 0.001, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  if (reduce) renderer.render(scene, camera);
  else tick();
})();
