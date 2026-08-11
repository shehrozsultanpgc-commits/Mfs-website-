const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const baseWidth = 960;
const baseHeight = 540;
const outWidth = 1920;
const outHeight = 1080;
const fps = 30;
const duration = 10;
const totalFrames = fps * duration;

const framesDir = '/tmp/hero_frames';
if (fs.existsSync(framesDir)) {
  fs.rmSync(framesDir, { recursive: true, force: true });
}
fs.mkdirSync(framesDir, { recursive: true });

const header = Buffer.from(`P6\n${baseWidth} ${baseHeight}\n255\n`);
const frameSize = baseWidth * baseHeight * 3;
const frameBuffer = Buffer.alloc(frameSize);

// Particles for subtle ambient golden dust
const numParticles = 60;
const particles = [];
for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * baseWidth,
    y: Math.random() * baseHeight,
    size: 1.2 + Math.random() * 2.2,
    speedY: 0.3 + Math.random() * 0.6,
    speedX: (Math.random() - 0.5) * 0.3,
    alpha: 0.3 + Math.random() * 0.6,
  });
}

console.log(`Generating ${totalFrames} PPM frames in ${framesDir}...`);

for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
  const t = frameIndex / totalFrames; // 0 to 1 loopable
  const angle = 2 * Math.PI * t;

  // Smooth movement orbits for gold ambient glows
  const cx1 = 480 + 200 * Math.sin(angle);
  const cy1 = 220 + 90 * Math.cos(angle);

  const cx2 = 580 - 190 * Math.cos(angle + 1.2);
  const cy2 = 310 + 100 * Math.sin(angle + 0.8);

  // Update floating particle positions
  for (const p of particles) {
    p.y -= p.speedY;
    p.x += p.speedX;
    if (p.y < 0) p.y = baseHeight;
    if (p.x < 0) p.x = baseWidth;
    if (p.x > baseWidth) p.x = 0;
  }

  // Render dark gold background & glows
  let idx = 0;
  for (let y = 0; y < baseHeight; y++) {
    const dy1 = y - cy1;
    const dy2 = y - cy2;
    const dy1Sq = dy1 * dy1;
    const dy2Sq = dy2 * dy2;

    for (let x = 0; x < baseWidth; x++) {
      const dx1 = x - cx1;
      const dx2 = x - cx2;
      const g1 = Math.exp(-(dx1 * dx1 + dy1Sq) / 75000);
      const g2 = Math.exp(-(dx2 * dx2 + dy2Sq) / 95000);

      // MFS Gold `#E5C158` (229, 193, 88) on Dark `#050508` (5, 5, 8)
      frameBuffer[idx] = Math.min(255, Math.floor(5 + g1 * 215 + g2 * 170));
      frameBuffer[idx + 1] = Math.min(255, Math.floor(5 + g1 * 175 + g2 * 135));
      frameBuffer[idx + 2] = Math.min(255, Math.floor(8 + g1 * 60 + g2 * 45));
      idx += 3;
    }
  }

  // Render golden particles
  for (const p of particles) {
    const px = Math.floor(p.x);
    const py = Math.floor(p.y);
    const rad = Math.ceil(p.size);
    for (let dy = -rad; dy <= rad; dy++) {
      for (let dx = -rad; dx <= rad; dx++) {
        const nx = px + dx;
        const ny = py + dy;
        if (nx >= 0 && nx < baseWidth && ny >= 0 && ny < baseHeight) {
          if (dx * dx + dy * dy <= rad * rad) {
            const pIdx = (ny * baseWidth + nx) * 3;
            const factor = p.alpha * (1 - Math.sqrt(dx * dx + dy * dy) / (rad + 1));
            frameBuffer[pIdx] = Math.min(255, frameBuffer[pIdx] + Math.floor(229 * factor));
            frameBuffer[pIdx + 1] = Math.min(255, frameBuffer[pIdx + 1] + Math.floor(193 * factor));
            frameBuffer[pIdx + 2] = Math.min(255, frameBuffer[pIdx + 2] + Math.floor(88 * factor));
          }
        }
      }
    }
  }

  const frameFileName = path.join(framesDir, `frame_${String(frameIndex).padStart(3, '0')}.ppm`);
  const fileContent = Buffer.concat([header, frameBuffer]);
  fs.writeFileSync(frameFileName, fileContent);
}

console.log('All PPM frames written. Encoding with FFmpeg...');

execSync(`ffmpeg -y -framerate ${fps} -i ${framesDir}/frame_%03d.ppm -vf "scale=${outWidth}:${outHeight}:flags=bicubic" -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -movflags +faststart public/videos/hero-cinematic.mp4`, { stdio: 'inherit' });

fs.rmSync(framesDir, { recursive: true, force: true });
console.log('Hero video successfully generated!');
