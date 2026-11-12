import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function AdminLoginBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let renderer;
    let animationFrameId;

    try {
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      camera.position.z = 16;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Pencahayaan sesuai palet emerald, teal, dan amber
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
      scene.add(ambientLight);

      const amberLight = new THREE.PointLight(0xfbbf24, 35, 50);
      amberLight.position.set(10, 8, 10);
      scene.add(amberLight);

      const tealLight = new THREE.PointLight(0x2dd4bf, 30, 50);
      tealLight.position.set(-10, -8, 8);
      scene.add(tealLight);

      // Bentuk-bentuk geometri mengambang di latar belakang
      const geometries = [
        new THREE.IcosahedronGeometry(1.15, 0),
        new THREE.TorusGeometry(0.95, 0.3, 16, 40),
        new THREE.OctahedronGeometry(1.05, 0),
        new THREE.BoxGeometry(1.3, 1.3, 1.3),
        new THREE.DodecahedronGeometry(0.9, 0),
      ];

      const paletteColors = [0xfbbf24, 0x2dd4bf, 0x10b981, 0xfb7185, 0x38bdf8];
      const materials = paletteColors.map(
        (color, idx) =>
          new THREE.MeshStandardMaterial({
            color,
            roughness: 0.35,
            metalness: 0.15,
            wireframe: idx % 2 === 1,
            transparent: true,
            opacity: idx % 2 === 1 ? 0.55 : 0.85,
          })
      );

      const meshes = [];
      for (let i = 0; i < 16; i += 1) {
        const geo = geometries[i % geometries.length];
        const mat = materials[i % materials.length];
        const mesh = new THREE.Mesh(geo, mat);

        const spreadX = (Math.random() - 0.5) * 28;
        const spreadY = (Math.random() - 0.5) * 18;
        const spreadZ = (Math.random() - 0.5) * 12 - 2;

        mesh.position.set(spreadX, spreadY, spreadZ);
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

        const scale = 0.65 + Math.random() * 0.75;
        mesh.scale.setScalar(scale);

        scene.add(mesh);
        meshes.push({
          mesh,
          baseY: spreadY,
          speedX: (Math.random() - 0.5) * 0.008,
          speedY: (Math.random() - 0.5) * 0.01,
          floatSpeed: 0.5 + Math.random() * 0.9,
          floatOffset: Math.random() * Math.PI * 2,
          floatAmp: 0.35 + Math.random() * 0.55,
        });
      }

      // Partikel cahaya mengambang (emerald mint & amber)
      const particleCount = 320;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const c1 = new THREE.Color(0xfde68a);
      const c2 = new THREE.Color(0x5eead4);

      for (let i = 0; i < particleCount; i += 1) {
        positions[i * 3] = (Math.random() - 0.5) * 34;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 18 - 3;

        const chosen = i % 3 === 0 ? c1 : c2;
        colors[i * 3] = chosen.r;
        colors[i * 3 + 1] = chosen.g;
        colors[i * 3 + 2] = chosen.b;
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.14,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // Efek parallax halus mengikuti pointer
      const pointer = { x: 0, y: 0 };
      const handlePointerMove = (e) => {
        pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
        pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };

      const handleResize = () => {
        if (!renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('resize', handleResize);

      const startTime = performance.now();

      const animate = () => {
        const elapsed = (performance.now() - startTime) / 1000;

        meshes.forEach((item) => {
          item.mesh.rotation.x += item.speedX;
          item.mesh.rotation.y += item.speedY;
          item.mesh.position.y =
            item.baseY + Math.sin(elapsed * item.floatSpeed + item.floatOffset) * item.floatAmp;
        });

        particles.rotation.y = elapsed * 0.035;
        particles.rotation.x = Math.sin(elapsed * 0.15) * 0.08;

        camera.position.x += (pointer.x * 1.4 - camera.position.x) * 0.04;
        camera.position.y += (-pointer.y * 1.1 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
        animationFrameId = window.requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.cancelAnimationFrame(animationFrameId);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('resize', handleResize);

        geometries.forEach((geo) => geo.dispose());
        materials.forEach((mat) => mat.dispose());
        particleGeometry.dispose();
        particleMaterial.dispose();
        renderer.dispose();

        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch {
      return undefined;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900"
    />
  );
}

export default AdminLoginBackground;
