import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Hero3DProps {
  onLoaded?: () => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({ onLoaded }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        if (onLoaded) onLoaded();
        return;
      }
    } catch {
      setWebglSupported(false);
      if (onLoaded) onLoaded();
      return;
    }

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070709, 0.045);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const limeLight = new THREE.PointLight(0xccff00, 3.5, 15);
    limeLight.position.set(3, 2, 4);
    scene.add(limeLight);

    const orangeLight = new THREE.PointLight(0xff5500, 3.0, 15);
    orangeLight.position.set(-3, -2, 3);
    scene.add(orangeLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(0, 5, 5);
    scene.add(keyLight);

    // Dynamic Media Textures on Canvas
    // Canvas 1: Center 9:16 Video Canvas
    const canvas1 = document.createElement('canvas');
    canvas1.width = 540;
    canvas1.height = 960;
    const ctx1 = canvas1.getContext('2d');
    const texture1 = new THREE.CanvasTexture(canvas1);
    texture1.minFilter = THREE.LinearFilter;
    texture1.magFilter = THREE.LinearFilter;

    // Preload an image onto the canvas texture
    const img1 = new Image();
    img1.src = '/assets/images/creator_portrait.jpg';
    let img1Loaded = false;
    img1.onload = () => { img1Loaded = true; };

    // Canvas 2: Secondary Food/Macro Texture
    const canvas2 = document.createElement('canvas');
    canvas2.width = 540;
    canvas2.height = 960;
    const ctx2 = canvas2.getContext('2d');
    const texture2 = new THREE.CanvasTexture(canvas2);
    const img2 = new Image();
    img2.src = '/assets/images/blaban_dessert.jpg';
    let img2Loaded = false;
    img2.onload = () => { img2Loaded = true; };

    // Canvas 3: Tech/Product Texture
    const canvas3 = document.createElement('canvas');
    canvas3.width = 540;
    canvas3.height = 960;
    const ctx3 = canvas3.getContext('2d');
    const texture3 = new THREE.CanvasTexture(canvas3);
    const img3 = new Image();
    img3.src = '/assets/images/elaraby_tech.jpg';
    let img3Loaded = false;
    img3.onload = () => { img3Loaded = true; };

    // Group for all floating objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Center Floating Video Screen (Aspect 9:16)
    const centerScreenGeo = new THREE.PlaneGeometry(1.5, 2.67);
    const centerScreenMat = new THREE.MeshStandardMaterial({
      map: texture1,
      roughness: 0.2,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
    const centerScreen = new THREE.Mesh(centerScreenGeo, centerScreenMat);
    centerScreen.position.set(0, 0, 0);
    mainGroup.add(centerScreen);

    // Center screen metallic bezel frame
    const frameGeo = new THREE.BoxGeometry(1.56, 2.73, 0.04);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x181920,
      metalness: 0.9,
      roughness: 0.2,
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.set(0, 0, -0.025);
    mainGroup.add(frameMesh);

    // Screen 2: Left Floating Video Screen
    const leftScreenGeo = new THREE.PlaneGeometry(1.1, 1.95);
    const leftScreenMat = new THREE.MeshStandardMaterial({
      map: texture2,
      roughness: 0.3,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
    const leftScreen = new THREE.Mesh(leftScreenGeo, leftScreenMat);
    leftScreen.position.set(-2.4, 0.4, -1.2);
    leftScreen.rotation.set(0.1, 0.35, -0.08);
    mainGroup.add(leftScreen);

    // Screen 3: Right Floating Video Screen
    const rightScreenGeo = new THREE.PlaneGeometry(1.15, 2.04);
    const rightScreenMat = new THREE.MeshStandardMaterial({
      map: texture3,
      roughness: 0.3,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
    const rightScreen = new THREE.Mesh(rightScreenGeo, rightScreenMat);
    rightScreen.position.set(2.4, -0.3, -1.0);
    rightScreen.rotation.set(-0.08, -0.32, 0.05);
    mainGroup.add(rightScreen);

    // 2. Camera Aperture Focus Ring (Chrome Ring)
    const ringGeo = new THREE.TorusGeometry(1.8, 0.035, 16, 64);
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xccff00,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x223300,
    });
    const apertureRing = new THREE.Mesh(ringGeo, chromeMat);
    apertureRing.position.set(0, 0, -0.6);
    mainGroup.add(apertureRing);

    // 3. Second Geometric Ring with Orange Highlight
    const ringGeo2 = new THREE.TorusGeometry(2.4, 0.02, 16, 64);
    const orangeMat = new THREE.MeshStandardMaterial({
      color: 0xff5500,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x331100,
    });
    const outerRing = new THREE.Mesh(ringGeo2, orangeMat);
    outerRing.position.set(0, 0, -1.4);
    outerRing.rotation.x = Math.PI / 4;
    mainGroup.add(outerRing);

    // 4. Floating Chrome Polyhedron Prism
    const prismGeo = new THREE.OctahedronGeometry(0.35, 0);
    const silverMat = new THREE.MeshStandardMaterial({
      color: 0xe0e5ff,
      metalness: 0.95,
      roughness: 0.05,
    });
    const prismMesh = new THREE.Mesh(prismGeo, silverMat);
    prismMesh.position.set(-1.8, -1.4, 0.5);
    mainGroup.add(prismMesh);

    // 5. Floating Lens Element Disc
    const discGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.03, 32);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      metalness: 0.1,
      roughness: 0.1,
      transparent: true,
      opacity: 0.35,
      transmission: 0.9,
    });
    const discMesh = new THREE.Mesh(discGeo, glassMat);
    discMesh.position.set(2.0, 1.5, 0.2);
    discMesh.rotation.x = Math.PI / 3;
    mainGroup.add(discMesh);

    // 6. Floating Dust/Star Particles
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xccff00); // lime
    const color2 = new THREE.Color(0xffffff); // white
    const color3 = new THREE.Color(0xff5500); // orange

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 14;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const randC = Math.random();
      const chosenColor = randC > 0.7 ? color1 : randC > 0.4 ? color3 : color2;
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse & Inertia state
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x;
      mouse.targetY = y;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Scroll depth interaction
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Canvas Texture Render Loop (simulating active video recording / reel HUD)
    let frameCount = 0;
    const renderCanvasTextures = (time: number) => {
      // 1. Center Screen Canvas
      if (ctx1) {
        ctx1.fillStyle = '#0a0b0e';
        ctx1.fillRect(0, 0, 540, 960);
        if (img1Loaded) {
          ctx1.drawImage(img1, 0, 0, 540, 960);
        }
        // Gradient vignette overlay
        const grad = ctx1.createLinearGradient(0, 0, 0, 960);
        grad.addColorStop(0, 'rgba(0,0,0,0.6)');
        grad.addColorStop(0.5, 'rgba(0,0,0,0.1)');
        grad.addColorStop(1, 'rgba(0,0,0,0.85)');
        ctx1.fillStyle = grad;
        ctx1.fillRect(0, 0, 540, 960);

        // Recording HUD Elements
        ctx1.fillStyle = '#ccff00';
        ctx1.font = 'bold 24px "JetBrains Mono", monospace';
        ctx1.fillText('REC • 4K 60FPS', 40, 70);

        // Blinking red dot
        if (Math.sin(time * 4) > 0) {
          ctx1.fillStyle = '#ff2200';
          ctx1.beginPath();
          ctx1.arc(24, 62, 8, 0, Math.PI * 2);
          ctx1.fill();
        }

        // Live Audio meter
        ctx1.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx1.fillRect(40, 90, 160, 6);
        const meterW = 60 + Math.sin(time * 8) * 40 + Math.cos(time * 14) * 30;
        ctx1.fillStyle = '#ccff00';
        ctx1.fillRect(40, 90, Math.max(10, meterW), 6);

        // Dynamic timecode
        const seconds = Math.floor(time) % 60;
        const millis = Math.floor((time % 1) * 60);
        ctx1.fillStyle = '#f5f5f5';
        ctx1.font = '22px "JetBrains Mono", monospace';
        ctx1.fillText(`TC 00:01:${seconds < 10 ? '0' : ''}${seconds}:${millis < 10 ? '0' : ''}${millis}`, 320, 70);

        // Center crosshair
        ctx1.strokeStyle = 'rgba(204, 255, 0, 0.4)';
        ctx1.lineWidth = 1.5;
        ctx1.beginPath();
        ctx1.moveTo(270 - 20, 480);
        ctx1.lineTo(270 + 20, 480);
        ctx1.moveTo(270, 480 - 20);
        ctx1.lineTo(270, 480 + 20);
        ctx1.stroke();

        // Bottom creator label
        ctx1.fillStyle = '#ffffff';
        ctx1.font = 'bold 36px "Syne", sans-serif';
        ctx1.fillText('MOHANAD AHMED', 40, 870);
        ctx1.fillStyle = '#ccff00';
        ctx1.font = '20px "Space Grotesk", sans-serif';
        ctx1.fillText('@mohanad.ahmed • 100K+', 40, 905);

        texture1.needsUpdate = true;
      }

      // 2. Left Screen Canvas
      if (ctx2) {
        ctx2.fillStyle = '#08080a';
        ctx2.fillRect(0, 0, 540, 960);
        if (img2Loaded) {
          ctx2.drawImage(img2, 0, 0, 540, 960);
        }
        ctx2.fillStyle = 'rgba(7, 7, 9, 0.4)';
        ctx2.fillRect(0, 0, 540, 960);
        ctx2.fillStyle = '#ccff00';
        ctx2.font = 'bold 30px "Space Grotesk", sans-serif';
        ctx2.fillText('B.LABAN VIRAL REEL', 40, 890);
        texture2.needsUpdate = true;
      }

      // 3. Right Screen Canvas
      if (ctx3) {
        ctx3.fillStyle = '#08080a';
        ctx3.fillRect(0, 0, 540, 960);
        if (img3Loaded) {
          ctx3.drawImage(img3, 0, 0, 540, 960);
        }
        ctx3.fillStyle = 'rgba(7, 7, 9, 0.4)';
        ctx3.fillRect(0, 0, 540, 960);
        ctx3.fillStyle = '#ff5500';
        ctx3.font = 'bold 30px "Space Grotesk", sans-serif';
        ctx3.fillText('ELARABY GROUP', 40, 890);
        texture3.needsUpdate = true;
      }
    };

    // Main Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      frameCount++;

      // Update canvas textures every 2 frames for performance
      if (frameCount % 2 === 0) {
        renderCanvasTextures(elapsedTime);
      }

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Camera parallax
      camera.position.x = mouse.x * 0.8;
      camera.position.y = mouse.y * 0.6;
      camera.lookAt(0, 0, 0);

      // Scroll depth push
      const scrollFactor = Math.min(scrollY / 1000, 2);
      mainGroup.position.z = -scrollFactor * 1.5;
      mainGroup.rotation.y = mouse.x * 0.25;
      mainGroup.rotation.x = -mouse.y * 0.18;

      // Floating oscillation
      centerScreen.position.y = Math.sin(elapsedTime * 1.2) * 0.08;
      leftScreen.position.y = 0.4 + Math.sin(elapsedTime * 1.0 + 1) * 0.12;
      rightScreen.position.y = -0.3 + Math.cos(elapsedTime * 1.1 + 2) * 0.1;

      // Aperture ring rotation
      apertureRing.rotation.z = elapsedTime * 0.35;
      outerRing.rotation.y = elapsedTime * -0.2;
      outerRing.rotation.z = elapsedTime * 0.15;

      // Geometric crystals
      prismMesh.rotation.x = elapsedTime * 0.6;
      prismMesh.rotation.y = elapsedTime * 0.8;
      discMesh.rotation.z = elapsedTime * -0.4;

      // Particle subtle drift
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.05;

      // Move point lights slightly with mouse
      limeLight.position.x = 3 + mouse.x * 2;
      limeLight.position.y = 2 + mouse.y * 2;
      orangeLight.position.x = -3 - mouse.x * 2;

      renderer.render(scene, camera);
    };

    animate();
    if (onLoaded) onLoaded();

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      centerScreenGeo.dispose();
      centerScreenMat.dispose();
      texture1.dispose();
      texture2.dispose();
      texture3.dispose();
    };
  }, [onLoaded]);

  if (!webglSupported) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at center, #151620 0%, #070709 80%)',
        }}
      >
        <div style={{ position: 'relative', width: '300px', height: '530px', borderRadius: '24px', overflow: 'hidden', border: '2px solid #ccff00', boxShadow: '0 0 40px rgba(204,255,0,0.3)' }}>
          <img
            src="/assets/images/creator_portrait.jpg"
            alt="Mohanad Ahmed"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};
