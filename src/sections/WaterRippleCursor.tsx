import { useEffect, useRef } from 'react';

interface Fish {
  x0: number; // Resting position X
  y0: number; // Resting position Y
  x: number;  // Current position X
  y: number;  // Current position Y
  vx: number; // Velocity X
  vy: number; // Velocity Y
  angle: number; // Current visual rotation angle
  targetAngle: number; // Target rotation angle
  offsetAngle: number; // Angle for circle around cursor
  offsetRadius: number; // Radius for circle around cursor
  image: HTMLImageElement; // Preloaded image
  speedMultiplier: number; // Personal speed factor
  sizeScale: number; // Random scale factor
  isStaticRemaining: boolean; // True if part of the fish that stay on static screen
  isOffScreen: boolean; // True if currently asleep off-screen
}

interface Bubble {
  x0: number; // Resting position X
  y0: number; // Resting position Y
  x: number;  // Current position X
  y: number;  // Current position Y
  vx: number; // Velocity X
  vy: number; // Velocity Y
  px: number; // Proximity ratio to mouse (0 to 1)
  dx: number; // Displacement ratio from home (0 to 1)
  active: boolean; // True if displaced/active
  speedMultiplier: number; // Speed variation
  sizeScale: number; // Size variation
}

interface CursorBubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  offsetAngle: number;
  offsetRadius: number;
  size: number;
  alpha: number;
  speedMultiplier: number;
}

const WaterRippleCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, speed: 0, active: false, lastMoveTime: 0 });
  const fishRef = useRef<Fish[]>([]);
  const bubbleRef = useRef<Bubble[]>([]);
  const cursorBubblesRef = useRef<CursorBubble[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const spacing = 24; // Grid spacing density

    const fishImageUrls = [
      '/src/assets/fihlist/f1.png',
      '/src/assets/fihlist/f2.png',
      '/src/assets/fihlist/f3.png',
      '/src/assets/fihlist/f4.png',
      '/src/assets/fihlist/f5.png',
      '/src/assets/fihlist/f6.png',
      '/src/assets/fihlist/f7.png',
      '/src/assets/fihlist/f8.png',
      '/src/assets/fihlist/f9.png',
      '/src/assets/fihlist/f10.png',
      '/src/assets/fihlist/f11.png',
    ];

    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    // Helper to position a fish off-screen randomly
    const setRandomOffScreenPosition = (fish: Fish, w: number, h: number) => {
      const side = Math.floor(Math.random() * 4);
      if (side === 0) { // Left
        fish.x = -150 - Math.random() * 100;
        fish.y = Math.random() * h;
      } else if (side === 1) { // Right
        fish.x = w + 150 + Math.random() * 100;
        fish.y = Math.random() * h;
      } else if (side === 2) { // Top
        fish.x = Math.random() * w;
        fish.y = -150 - Math.random() * 100;
      } else { // Bottom
        fish.x = Math.random() * w;
        fish.y = h + 150 + Math.random() * 100;
      }
      fish.vx = 0;
      fish.vy = 0;
      fish.isOffScreen = true;
    };

    // Initialize grid elements
    const initGrid = () => {
      if (loadedImages.length === 0) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      const gridPoints: { x0: number; y0: number }[] = [];
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          gridPoints.push({
            x0: c * spacing - (spacing / 2),
            y0: r * spacing - (spacing / 2),
          });
        }
      }

      // Shuffle grid points
      for (let i = gridPoints.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gridPoints[i], gridPoints[j]] = [gridPoints[j], gridPoints[i]];
      }

      const totalPoints = gridPoints.length;
      const fishCount = Math.floor(totalPoints * 0.0168); // 1.68% of points (.7X previous density)
      const bubbleCount = Math.floor(totalPoints * 0.03); // 3% bubbles

      const fishArray: Fish[] = [];
      const bubbleArray: Bubble[] = [];

      // 16% of the fish remain on static screen
      const numStaticRemaining = Math.max(1, Math.floor(fishCount * 0.16));

      for (let i = 0; i < fishCount; i++) {
        const pt = gridPoints[i];
        const offsetAngle = Math.random() * Math.PI * 2;
        const offsetRadius = 21 + Math.random() * 175; // 0.70X concentric range
        const randomImage = loadedImages[Math.floor(Math.random() * loadedImages.length)];
        const isStaticRemaining = i < numStaticRemaining;

        const fish: Fish = {
          x0: pt.x0,
          y0: pt.y0,
          x: pt.x0,
          y: pt.y0,
          vx: 0,
          vy: 0,
          angle: Math.PI,
          targetAngle: Math.PI,
          offsetAngle,
          offsetRadius,
          image: randomImage,
          speedMultiplier: 0.6 + Math.random() * 0.8,
          sizeScale: 0.5 + Math.random() * 0.5,
          isStaticRemaining,
          isOffScreen: false,
        };

        if (!isStaticRemaining) {
          setRandomOffScreenPosition(fish, width, height);
        }

        fishArray.push(fish);
      }

      for (let i = 0; i < bubbleCount; i++) {
        const pt = gridPoints[fishCount + i];
        if (!pt) break;
        bubbleArray.push({
          x0: pt.x0,
          y0: pt.y0,
          x: pt.x0,
          y: pt.y0,
          vx: 0,
          vy: 0,
          px: 0,
          dx: 0,
          active: false,
          speedMultiplier: 0.8 + Math.random() * 0.4,
          sizeScale: 0.6 + Math.random() * 0.8,
        });
      }

      // Initialize 100 cursor-following bubbles
      const cursorBubblesArray: CursorBubble[] = [];
      for (let i = 0; i < 100; i++) {
        cursorBubblesArray.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
          offsetAngle: Math.random() * Math.PI * 2,
          offsetRadius: 21 + Math.random() * 175, // Same circle pattern
          size: 0.6 + Math.random() * 2.2, // Small bubble sizes (0.6px to 2.8px)
          alpha: 0, // Start invisible
          speedMultiplier: 0.7 + Math.random() * 0.8,
        });
      }

      fishRef.current = fishArray;
      bubbleRef.current = bubbleArray;
      cursorBubblesRef.current = cursorBubblesArray;
    };

    // Preload images
    fishImageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        loadedImages.push(img);
        if (loadedCount === fishImageUrls.length) {
          initGrid();
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === fishImageUrls.length) {
          initGrid();
        }
      };
    });

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      mouse.lastMoveTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const mouse = mouseRef.current;
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
        mouse.lastMoveTime = Date.now();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', () => {
      if (loadedCount === fishImageUrls.length) {
        initGrid();
      }
    });

    // Animation loop
    const tick = () => {
      const mouse = mouseRef.current;

      // Calculate speed
      const dx = mouse.x - mouse.lastX;
      const dy = mouse.y - mouse.lastY;
      const rawSpeed = Math.sqrt(dx * dx + dy * dy);

      mouse.speed += (rawSpeed - mouse.speed) * 0.15;

      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;

      // Clear screen
      ctx.clearRect(0, 0, width, height);

      const fishArray = fishRef.current;
      const bubbleArray = bubbleRef.current;
      const cursorBubbles = cursorBubblesRef.current;

      const timeSinceLastMove = Date.now() - mouse.lastMoveTime;
      const isMouseMoving = mouse.active && (mouse.speed > 0.5 || timeSinceLastMove < 900); // .9-second delay

      // --- Update & Render Background Grid Bubbles ---
      const bubbleLen = bubbleArray.length;
      for (let i = 0; i < bubbleLen; i++) {
        const bubble = bubbleArray[i];

        bubble.x0 += 0.8;
        if (bubble.x0 > width + spacing) {
          bubble.x0 = -spacing;
          bubble.x = -spacing;
        }

        const springK = 0.04 * bubble.speedMultiplier;
        const damping = 0.86;

        const homeDx = bubble.x0 - bubble.x;
        const homeDy = bubble.y0 - bubble.y;

        let ax = homeDx * springK;
        let ay = homeDy * springK;

        const mx = bubble.x - mouse.x;
        const my = bubble.y - mouse.y;
        const distSq = mx * mx + my * my;
        const activeRadius = 150;
        const activeRadiusSq = activeRadius * activeRadius;

        if (distSq < activeRadiusSq) {
          const dist = Math.sqrt(distSq);
          if (dist > 0) {
            const force = (1 - dist / activeRadius);
            const pushStrength = force * 6.0;
            bubble.vx += (mx / dist) * pushStrength;
            bubble.vy += (my / dist) * pushStrength;
            bubble.px = 1 - dist / activeRadius;
          } else {
            bubble.px = 0;
          }
        } else {
          bubble.px = 0;
        }

        bubble.vx = (bubble.vx + ax) * damping;
        bubble.vy = (bubble.vy + ay) * damping;

        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        const displacementSq = homeDx * homeDx + homeDy * homeDy;
        bubble.dx = Math.min(Math.sqrt(displacementSq) / 20, 1);

        const rVal = Math.round(150 + (0 - 150) * bubble.px);
        const gVal = Math.round(173 + (64 - 173) * bubble.px);
        const bVal = Math.round(214 + (140 - 214) * bubble.px);
        const alpha = 0.22 + (0.85 - 0.22) * bubble.px;
        const size = (0.8 + 1.2 * bubble.dx) * bubble.sizeScale * 3.5;

        ctx.fillStyle = `rgba(${rVal}, ${gVal}, ${bVal}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Update & Render Cursor-Following Swarm Bubbles ---
      const cursorBubbleLen = cursorBubbles.length;
      for (let i = 0; i < cursorBubbleLen; i++) {
        const b = cursorBubbles[i];

        if (isMouseMoving) {
          // Circle target around mouse
          const targetX = mouse.x + Math.cos(b.offsetAngle) * b.offsetRadius;
          const targetY = mouse.y + Math.sin(b.offsetAngle) * b.offsetRadius;

          const springK = 0.015 * b.speedMultiplier;
          const damping = 0.88;

          const ax = (targetX - b.x) * springK;
          const ay = (targetY - b.y) * springK;

          b.vx = (b.vx + ax) * damping;
          b.vy = (b.vy + ay) * damping;
          b.x += b.vx;
          b.y += b.vy;

          // Fade in bubbles
          b.alpha += (0.6 - b.alpha) * 0.03;
        } else {
          // Float up and drift away
          b.vy -= 0.08 * b.speedMultiplier; // slow upward drift
          b.vx += Math.sin(Date.now() * 0.003 + i) * 0.03; // wiggle

          b.vx *= 0.95;
          b.vy *= 0.95;
          b.x += b.vx;
          b.y += b.vy;

          // Fade out bubbles
          b.alpha += (0 - b.alpha) * 0.02;
        }

        if (b.alpha > 0.01) {
          ctx.fillStyle = `rgba(150, 173, 214, ${b.alpha})`;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- Update & Render Fish ---
      const fishLen = fishArray.length;
      for (let i = 0; i < fishLen; i++) {
        const fish = fishArray[i];

        fish.x0 += 0.8;
        if (fish.x0 > width + spacing) {
          fish.x0 = -spacing;
        }

        if (!isMouseMoving && !fish.isStaticRemaining && fish.isOffScreen) {
          continue;
        }

        let ax = 0;
        let ay = 0;

        if (isMouseMoving) {
          if (fish.isOffScreen) {
            setRandomOffScreenPosition(fish, width, height);
            fish.isOffScreen = false;

            const spawnAngle = Math.atan2(mouse.y - fish.y, mouse.x - fish.x);
            const spawnSpeed = 0.5 + Math.random() * 0.75;
            fish.vx = Math.cos(spawnAngle) * spawnSpeed;
            fish.vy = Math.sin(spawnAngle) * spawnSpeed;
          }

          const targetX = mouse.x + Math.cos(fish.offsetAngle) * fish.offsetRadius;
          const targetY = mouse.y + Math.sin(fish.offsetAngle) * fish.offsetRadius;

          const springK = 0.006 * fish.speedMultiplier;
          const damping = 0.93;

          ax = (targetX - fish.x) * springK;
          ay = (targetY - fish.y) * springK;

          fish.vx = (fish.vx + ax) * damping;
          fish.vy = (fish.vy + ay) * damping;

          const theta = Math.atan2(mouse.y - fish.y, mouse.x - fish.x);
          fish.targetAngle = theta - Math.PI;

        } else {
          if (fish.isStaticRemaining) {
            const returnK = 0.00046 * fish.speedMultiplier;
            const damping = 0.975;

            const mDistX = fish.x - mouse.x;
            const mDistY = fish.y - mouse.y;
            const mDistSq = mDistX * mDistX + mDistY * mDistY;
            if (mouse.active && mDistSq < 40000) {
              const dist = Math.sqrt(mDistSq);
              if (dist > 0) {
                const pushForce = (1 - dist / 200) * 1.5;
                ax += (mDistX / dist) * pushForce;
                ay += (mDistY / dist) * pushForce;
              }
            }

            ax += (fish.x0 - fish.x) * returnK;
            ay += (fish.y0 - fish.y) * returnK;

            fish.vx = (fish.vx + ax) * damping;
            fish.vy = (fish.vy + ay) * damping;

            const currentSpeed = Math.sqrt(fish.vx * fish.vx + fish.vy * fish.vy);
            if (currentSpeed > 0.3) {
              const swimDirection = Math.atan2(fish.vy, fish.vx);
              fish.targetAngle = swimDirection - Math.PI;
            } else {
              fish.targetAngle = 0;
            }

          } else {
            const dxMouse = fish.x - mouse.x;
            const dyMouse = fish.y - mouse.y;
            const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse) || 1;

            const targetX = mouse.x + (dxMouse / distMouse) * (Math.max(width, height) * 1.5);
            const targetY = mouse.y + (dyMouse / distMouse) * (Math.max(width, height) * 1.5);

            const swimK = 0.00053 * fish.speedMultiplier;
            const damping = 0.975;

            ax = (targetX - fish.x) * swimK;
            ay = (targetY - fish.y) * swimK;

            fish.vx = (fish.vx + ax) * damping;
            fish.vy = (fish.vy + ay) * damping;

            const swimDirection = Math.atan2(fish.vy, fish.vx);
            fish.targetAngle = swimDirection - Math.PI;

            if (fish.x < -120 || fish.x > width + 120 || fish.y < -120 || fish.y > height + 120) {
              fish.isOffScreen = true;
              fish.vx = 0;
              fish.vy = 0;
            }
          }
        }

        fish.x += fish.vx;
        fish.y += fish.vy;

        let angleDiff = fish.targetAngle - fish.angle;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        fish.angle += angleDiff * 0.12;

        const imgW = fish.image.naturalWidth || 64;
        const imgH = fish.image.naturalHeight || 32;
        const aspectRatio = imgW / imgH;

        const baseWidth = 36;
        const widthScale = baseWidth * fish.sizeScale;
        const heightScale = widthScale / aspectRatio;

        ctx.save();
        ctx.translate(fish.x, fish.y);
        ctx.rotate(fish.angle);
        ctx.drawImage(fish.image, -widthScale / 2, -heightScale / 2, widthScale, heightScale);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-40"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default WaterRippleCursor;
