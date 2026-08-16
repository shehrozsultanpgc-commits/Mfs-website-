const fs = require('fs');
const { execSync } = require('child_process');

// 1. Precise High-Res SVG for Emblem 05 (Hexa-Matrix)
const mfsBrandMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Top Face Gradient (Bright Luxury Gold) -->
    <linearGradient id="topGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5C8" />
      <stop offset="35%" stop-color="#FBE285" />
      <stop offset="100%" stop-color="#E0BD50" />
    </linearGradient>

    <!-- Left Face Gradient (Warm Mid Gold) -->
    <linearGradient id="leftGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E5C158" />
      <stop offset="50%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#9C720B" />
    </linearGradient>

    <!-- Right Face Gradient (Deep Shadow Gold) -->
    <linearGradient id="rightGold" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#A2770C" />
      <stop offset="60%" stop-color="#735206" />
      <stop offset="100%" stop-color="#4B3402" />
    </linearGradient>

    <!-- Edge Specular Highlight -->
    <linearGradient id="specularGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#FFF3C2" stop-opacity="0.3" />
    </linearGradient>
  </defs>

  <g transform="translate(0, 0)">
    <!-- OUTER ISOMETRIC HEXA-MATRIX FRAME -->
    <!-- Top Ring Face (Outer Isometric Diamond minus Inner Cutout) -->
    <path d="M 256,52 L 436.5,156.2 L 256,260.4 L 75.5,156.2 Z M 256,126.8 L 143.2,191.6 L 256,256.4 L 368.8,191.6 Z" fill="url(#topGold)" fill-rule="evenodd" />

    <!-- Left Outer Vertical Panel -->
    <polygon points="75.5,156.2 256,260.4 256,460 75.5,355.8" fill="url(#leftGold)" />
    <!-- Left Inner Cutout Vertical Panel -->
    <polygon points="143.2,191.6 256,256.4 256,381.2 143.2,316.4" fill="url(#rightGold)" opacity="0.85" />

    <!-- Right Outer Vertical Panel -->
    <polygon points="436.5,156.2 256,260.4 256,460 436.5,355.8" fill="url(#rightGold)" />
    <!-- Right Inner Cutout Vertical Panel -->
    <polygon points="368.8,191.6 256,256.4 256,381.2 368.8,316.4" fill="url(#leftGold)" opacity="0.85" />

    <!-- FLOATING SUSPENDED CORE CUBE -->
    <!-- Core Top Face -->
    <polygon points="256,182 316,216.6 256,251.2 196,216.6" fill="url(#topGold)" />
    <!-- Core Left Face -->
    <polygon points="196,216.6 256,251.2 256,320.4 196,285.8" fill="url(#leftGold)" />
    <!-- Core Right Face -->
    <polygon points="256,251.2 316,216.6 316,285.8 256,320.4" fill="url(#rightGold)" />

    <!-- CRISP SPECULAR CORNER HIGHLIGHTS -->
    <line x1="256" y1="52" x2="256" y2="126.8" stroke="url(#specularGlow)" stroke-width="2.5" stroke-linecap="round" />
    <line x1="75.5" y1="156.2" x2="143.2" y2="191.6" stroke="url(#specularGlow)" stroke-width="2" />
    <line x1="436.5" y1="156.2" x2="368.8" y2="191.6" stroke="url(#specularGlow)" stroke-width="2" />
    
    <line x1="256" y1="182" x2="256" y2="251.2" stroke="#FFFFFF" stroke-width="2" opacity="0.85" />
    <line x1="196" y1="216.6" x2="256" y2="251.2" stroke="#FFF5C8" stroke-width="1.5" />
    <line x1="316" y1="216.6" x2="256" y2="251.2" stroke="#FFF5C8" stroke-width="1.5" />
    <line x1="256" y1="251.2" x2="256" y2="320.4" stroke="#FFF5C8" stroke-width="2" />
  </g>
</svg>`;

fs.writeFileSync('public/mfs-brand-mark.svg', mfsBrandMarkSvg);

// 2. Full Horizontal Lockup with "MFS GROWTH" wordmark
const mfsLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 240" width="800" height="240">
  <defs>
    <linearGradient id="topGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5C8" />
      <stop offset="35%" stop-color="#FBE285" />
      <stop offset="100%" stop-color="#E0BD50" />
    </linearGradient>

    <linearGradient id="leftGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E5C158" />
      <stop offset="50%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#9C720B" />
    </linearGradient>

    <linearGradient id="rightGold" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#A2770C" />
      <stop offset="60%" stop-color="#735206" />
      <stop offset="100%" stop-color="#4B3402" />
    </linearGradient>

    <linearGradient id="specularGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#FFF3C2" stop-opacity="0.3" />
    </linearGradient>
  </defs>

  <!-- Left: Hexa-Matrix Symbol -->
  <g transform="translate(15, 12) scale(0.42)">
    <path d="M 256,52 L 436.5,156.2 L 256,260.4 L 75.5,156.2 Z M 256,126.8 L 143.2,191.6 L 256,256.4 L 368.8,191.6 Z" fill="url(#topGold)" fill-rule="evenodd" />

    <polygon points="75.5,156.2 256,260.4 256,460 75.5,355.8" fill="url(#leftGold)" />
    <polygon points="143.2,191.6 256,256.4 256,381.2 143.2,316.4" fill="url(#rightGold)" opacity="0.85" />

    <polygon points="436.5,156.2 256,260.4 256,460 436.5,355.8" fill="url(#rightGold)" />
    <polygon points="368.8,191.6 256,256.4 256,381.2 368.8,316.4" fill="url(#leftGold)" opacity="0.85" />

    <polygon points="256,182 316,216.6 256,251.2 196,216.6" fill="url(#topGold)" />
    <polygon points="196,216.6 256,251.2 256,320.4 196,285.8" fill="url(#leftGold)" />
    <polygon points="256,251.2 316,216.6 316,285.8 256,320.4" fill="url(#rightGold)" />

    <line x1="256" y1="52" x2="256" y2="126.8" stroke="url(#specularGlow)" stroke-width="2.5" stroke-linecap="round" />
    <line x1="75.5" y1="156.2" x2="143.2" y2="191.6" stroke="url(#specularGlow)" stroke-width="2" />
    <line x1="436.5" y1="156.2" x2="368.8" y2="191.6" stroke="url(#specularGlow)" stroke-width="2" />
    
    <line x1="256" y1="182" x2="256" y2="251.2" stroke="#FFFFFF" stroke-width="2" opacity="0.85" />
    <line x1="196" y1="216.6" x2="256" y2="251.2" stroke="#FFF5C8" stroke-width="1.5" />
    <line x1="316" y1="216.6" x2="256" y2="251.2" stroke="#FFF5C8" stroke-width="1.5" />
    <line x1="256" y1="251.2" x2="256" y2="320.4" stroke="#FFF5C8" stroke-width="2" />
  </g>

  <!-- Right: Premium Typography -->
  <text x="235" y="82" font-family="'Poppins', 'Montserrat', sans-serif" font-weight="600" font-size="18" fill="url(#topGold)" letter-spacing="4">MUHAMMAD SHEHROZ SULTAN</text>

  <line x1="235" y1="125" x2="265" y2="125" stroke="url(#topGold)" stroke-width="3" />
  <text x="280" y="136" font-family="'Poppins', 'Inter', sans-serif" font-weight="800" font-size="38" fill="url(#topGold)" letter-spacing="6">MFS GROWTH</text>
  <line x1="695" y1="125" x2="725" y2="125" stroke="url(#topGold)" stroke-width="3" />

  <text x="235" y="178" font-family="'Poppins', 'Inter', sans-serif" font-weight="500" font-size="18" fill="#9FA0A7" letter-spacing="8">DIGITAL AGENCY</text>
</svg>`;

fs.writeFileSync('public/mfs-logo.svg', mfsLogoSvg);

console.log('Generating ultra-high-resolution 4K transparent PNGs with ffmpeg...');

// Render Ultra High-Res 4K PNG master (3840x3840)
execSync('ffmpeg -y -i public/mfs-brand-mark.svg -s 3840x3840 public/mfs-brand-mark.png');

// Render Ultra High-Res 4K Lockup PNG (3840x1152)
execSync('ffmpeg -y -i public/mfs-logo.svg -s 3840x1152 public/mfs-logo.png');

// Render Sliced Favicon & App Icons from the pristine 4K master
execSync('ffmpeg -y -i public/mfs-brand-mark.png -s 512x512 public/android-chrome-512x512.png');
execSync('ffmpeg -y -i public/mfs-brand-mark.png -s 192x192 public/android-chrome-192x192.png');
execSync('ffmpeg -y -i public/mfs-brand-mark.png -s 180x180 public/apple-touch-icon.png');
execSync('ffmpeg -y -i public/mfs-brand-mark.png -s 32x32 public/favicon-32x32.png');
execSync('cp public/mfs-brand-mark.png public/test_logo.png');

// Multi-resolution favicon.ico
execSync('convert public/favicon-32x32.png public/android-chrome-192x192.png -define icon:auto-resize=16,32,48,64 public/favicon.ico');

// Sync to dist build if dist exists
if (fs.existsSync('dist')) {
  execSync('cp public/mfs-brand-mark.png dist/mfs-brand-mark.png');
  execSync('cp public/mfs-brand-mark.svg dist/mfs-brand-mark.svg');
  execSync('cp public/mfs-logo.png dist/mfs-logo.png');
  execSync('cp public/mfs-logo.svg dist/mfs-logo.svg');
  execSync('cp public/favicon.ico dist/favicon.ico');
  execSync('cp public/favicon-32x32.png dist/favicon-32x32.png');
  execSync('cp public/apple-touch-icon.png dist/apple-touch-icon.png');
  execSync('cp public/android-chrome-192x192.png dist/android-chrome-192x192.png');
  execSync('cp public/android-chrome-512x512.png dist/android-chrome-512x512.png');
}

console.log('Successfully completed 4K asset generation!');
