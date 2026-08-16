const fs = require('fs');
const { execSync } = require('child_process');

// 1. Hexa-Matrix Brand Mark SVG (Isometric Crystalline Cube with Suspended Gemstone Core)
const hexaMatrixMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Gold Gradients for Hexa-Matrix Facets -->
    <linearGradient id="goldTop" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF0B3" />
      <stop offset="30%" stop-color="#F7E297" />
      <stop offset="70%" stop-color="#E5C158" />
      <stop offset="100%" stop-color="#D4AF37" />
    </linearGradient>
    
    <linearGradient id="goldRight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E5C158" />
      <stop offset="50%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#906D14" />
    </linearGradient>

    <linearGradient id="goldLeft" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#D4AF37" />
      <stop offset="50%" stop-color="#B8860B" />
      <stop offset="100%" stop-color="#6E510B" />
    </linearGradient>

    <linearGradient id="gemCoreTop" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="40%" stop-color="#FFF0B3" />
      <stop offset="100%" stop-color="#E5C158" />
    </linearGradient>

    <linearGradient id="gemCoreFront" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFF0B3" />
      <stop offset="60%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#B8860B" />
    </linearGradient>

    <!-- Glow & Depth Filter -->
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <g transform="translate(0,0)">
    <!-- Outer Isometric Crystalline Cube Frame (Hexa-Matrix Outer) -->
    <!-- Top Outer Facet Segment Left -->
    <polygon points="256,60 100,150 180,196 256,152" fill="url(#goldTop)" />
    <!-- Top Outer Facet Segment Right -->
    <polygon points="256,60 412,150 332,196 256,152" fill="url(#goldTop)" opacity="0.9" />

    <!-- Left Outer Facet Segment Upper -->
    <polygon points="100,150 100,330 180,284 180,196" fill="url(#goldLeft)" />
    <!-- Left Outer Facet Segment Lower -->
    <polygon points="100,330 256,420 256,332 180,284" fill="url(#goldLeft)" opacity="0.85" />

    <!-- Right Outer Facet Segment Upper -->
    <polygon points="412,150 412,330 332,284 332,196" fill="url(#goldRight)" />
    <!-- Right Outer Facet Segment Lower -->
    <polygon points="412,330 256,420 256,332 332,284" fill="url(#goldRight)" opacity="0.9" />

    <!-- Isometric Matrix Facet Cutouts / Structural Connectors -->
    <!-- Inner Top Corner Struts -->
    <polygon points="256,152 332,196 256,240 180,196" fill="#0D0D0D" opacity="0.6" />
    <!-- Top Structural Edge Highlights -->
    <line x1="256" y1="60" x2="256" y2="152" stroke="#FFF0B3" stroke-width="3" stroke-linecap="round" />
    <line x1="100" y1="150" x2="180" y2="196" stroke="#F7E297" stroke-width="2.5" />
    <line x1="412" y1="150" x2="332" y2="196" stroke="#F7E297" stroke-width="2.5" />

    <line x1="100" y1="330" x2="180" y2="284" stroke="#E5C158" stroke-width="2.5" />
    <line x1="412" y1="330" x2="332" y2="284" stroke="#E5C158" stroke-width="2.5" />
    <line x1="256" y1="420" x2="256" y2="332" stroke="#D4AF37" stroke-width="3" stroke-linecap="round" />

    <!-- Matrix Geometric Alignment Rays connecting frame to core -->
    <line x1="256" y1="152" x2="256" y2="180" stroke="#FFF0B3" stroke-width="2" stroke-dasharray="4 2" />
    <line x1="180" y1="284" x2="210" y2="260" stroke="#E5C158" stroke-width="2" stroke-dasharray="4 2" />
    <line x1="332" y1="284" x2="302" y2="260" stroke="#E5C158" stroke-width="2" stroke-dasharray="4 2" />
    <line x1="256" y1="332" x2="256" y2="310" stroke="#D4AF37" stroke-width="2" stroke-dasharray="4 2" />

    <!-- SUSPENDED GEMSTONE CORE (Floating Octahedral Matrix Crystal) -->
    <!-- Core Glow Background -->
    <circle cx="256" cy="245" r="48" fill="#D4AF37" opacity="0.15" filter="url(#goldGlow)" />

    <!-- Gemstone Top Pyramid - Left Facet -->
    <polygon points="256,170 206,240 256,252" fill="url(#gemCoreTop)" />
    <!-- Gemstone Top Pyramid - Right Facet -->
    <polygon points="256,170 306,240 256,252" fill="url(#gemCoreTop)" opacity="0.85" />
    <!-- Gemstone Top Pyramid - Back Top Facet -->
    <polygon points="256,170 206,240 256,220" fill="#FFF0B3" opacity="0.9" />
    <polygon points="256,170 306,240 256,220" fill="#F7E297" opacity="0.75" />

    <!-- Gemstone Bottom Pyramid - Left Facet -->
    <polygon points="206,240 256,320 256,252" fill="url(#gemCoreFront)" />
    <!-- Gemstone Bottom Pyramid - Right Facet -->
    <polygon points="306,240 256,320 256,252" fill="url(#gemCoreFront)" opacity="0.85" />

    <!-- Gemstone Brilliant Edge Highlights -->
    <line x1="256" y1="170" x2="256" y2="320" stroke="#FFFFFF" stroke-width="2" opacity="0.8" />
    <line x1="206" y1="240" x2="306" y2="240" stroke="#FFF0B3" stroke-width="1.5" opacity="0.9" />
    <line x1="206" y1="240" x2="256" y2="252" stroke="#FFFFFF" stroke-width="1.5" />
    <line x1="306" y1="240" x2="256" y2="252" stroke="#FFF0B3" stroke-width="1.5" />

    <!-- Sparkle Accents on Core Gemstone -->
    <circle cx="256" cy="170" r="3.5" fill="#FFFFFF" />
    <circle cx="256" cy="252" r="2.5" fill="#FFFFFF" />
  </g>
</svg>`;

fs.writeFileSync('public/mfs-brand-mark.svg', hexaMatrixMarkSvg);
console.log('Created public/mfs-brand-mark.svg (Hexa-Matrix)');

// 2. Full Horizontal Brand Lockup SVG (Hexa-Matrix Sign + MFS GROWTH)
const fullLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 240" width="800" height="240">
  <defs>
    <linearGradient id="goldTop" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF0B3" />
      <stop offset="30%" stop-color="#F7E297" />
      <stop offset="70%" stop-color="#E5C158" />
      <stop offset="100%" stop-color="#D4AF37" />
    </linearGradient>
    
    <linearGradient id="goldRight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E5C158" />
      <stop offset="50%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#906D14" />
    </linearGradient>

    <linearGradient id="goldLeft" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#D4AF37" />
      <stop offset="50%" stop-color="#B8860B" />
      <stop offset="100%" stop-color="#6E510B" />
    </linearGradient>

    <linearGradient id="gemCoreTop" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="40%" stop-color="#FFF0B3" />
      <stop offset="100%" stop-color="#E5C158" />
    </linearGradient>

    <linearGradient id="gemCoreFront" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFF0B3" />
      <stop offset="60%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#B8860B" />
    </linearGradient>
  </defs>

  <!-- Left: Hexa-Matrix Symbol (scaled and positioned) -->
  <g transform="translate(15, 10) scale(0.43)">
    <polygon points="256,60 100,150 180,196 256,152" fill="url(#goldTop)" />
    <polygon points="256,60 412,150 332,196 256,152" fill="url(#goldTop)" opacity="0.9" />

    <polygon points="100,150 100,330 180,284 180,196" fill="url(#goldLeft)" />
    <polygon points="100,330 256,420 256,332 180,284" fill="url(#goldLeft)" opacity="0.85" />

    <polygon points="412,150 412,330 332,284 332,196" fill="url(#goldRight)" />
    <polygon points="412,330 256,420 256,332 332,284" fill="url(#goldRight)" opacity="0.9" />

    <polygon points="256,152 332,196 256,240 180,196" fill="#0D0D0D" opacity="0.6" />
    <line x1="256" y1="60" x2="256" y2="152" stroke="#FFF0B3" stroke-width="3" stroke-linecap="round" />
    <line x1="100" y1="150" x2="180" y2="196" stroke="#F7E297" stroke-width="2.5" />
    <line x1="412" y1="150" x2="332" y2="196" stroke="#F7E297" stroke-width="2.5" />
    <line x1="100" y1="330" x2="180" y2="284" stroke="#E5C158" stroke-width="2.5" />
    <line x1="412" y1="330" x2="332" y2="284" stroke="#E5C158" stroke-width="2.5" />
    <line x1="256" y1="420" x2="256" y2="332" stroke="#D4AF37" stroke-width="3" stroke-linecap="round" />

    <line x1="256" y1="152" x2="256" y2="180" stroke="#FFF0B3" stroke-width="2" stroke-dasharray="4 2" />
    <line x1="180" y1="284" x2="210" y2="260" stroke="#E5C158" stroke-width="2" stroke-dasharray="4 2" />
    <line x1="332" y1="284" x2="302" y2="260" stroke="#E5C158" stroke-width="2" stroke-dasharray="4 2" />
    <line x1="256" y1="332" x2="256" y2="310" stroke="#D4AF37" stroke-width="2" stroke-dasharray="4 2" />

    <polygon points="256,170 206,240 256,252" fill="url(#gemCoreTop)" />
    <polygon points="256,170 306,240 256,252" fill="url(#gemCoreTop)" opacity="0.85" />
    <polygon points="256,170 206,240 256,220" fill="#FFF0B3" opacity="0.9" />
    <polygon points="256,170 306,240 256,220" fill="#F7E297" opacity="0.75" />

    <polygon points="206,240 256,320 256,252" fill="url(#gemCoreFront)" />
    <polygon points="306,240 256,320 256,252" fill="url(#gemCoreFront)" opacity="0.85" />

    <line x1="256" y1="170" x2="256" y2="320" stroke="#FFFFFF" stroke-width="2" opacity="0.8" />
    <line x1="206" y1="240" x2="306" y2="240" stroke="#FFF0B3" stroke-width="1.5" opacity="0.9" />
    <line x1="206" y1="240" x2="256" y2="252" stroke="#FFFFFF" stroke-width="1.5" />
    <line x1="306" y1="240" x2="256" y2="252" stroke="#FFF0B3" stroke-width="1.5" />
    <circle cx="256" cy="170" r="3.5" fill="#FFFFFF" />
    <circle cx="256" cy="252" r="2.5" fill="#FFFFFF" />
  </g>

  <!-- Right: Typography Wordmark -->
  <text x="250" y="80" font-family="'Poppins', 'Montserrat', sans-serif" font-weight="600" font-size="20" fill="url(#gemCoreTop)" letter-spacing="4">MUHAMMAD SHEHROZ SULTAN</text>

  <line x1="250" y1="125" x2="280" y2="125" stroke="url(#goldTop)" stroke-width="3" />
  <text x="295" y="135" font-family="'Poppins', 'Inter', sans-serif" font-weight="800" font-size="38" fill="url(#goldTop)" letter-spacing="6">MFS GROWTH</text>
  <line x1="710" y1="125" x2="740" y2="125" stroke="url(#goldTop)" stroke-width="3" />

  <text x="250" y="175" font-family="'Poppins', 'Inter', sans-serif" font-weight="500" font-size="18" fill="#9FA0A7" letter-spacing="8">DIGITAL AGENCY</text>
</svg>`;

fs.writeFileSync('public/mfs-logo.svg', fullLogoSvg);
fs.writeFileSync('public/logo.svg', fullLogoSvg);
console.log('Created public/mfs-logo.svg & updated public/logo.svg (Hexa-Matrix)');

