const { execSync } = require('child_process');

console.log('Generating PNGs with ffmpeg...');

// 1. High-res brand mark PNG (1024x1024)
execSync('ffmpeg -y -i public/mfs-brand-mark.svg -s 1024x1024 public/mfs-brand-mark.png');

// 2. Full brand lockup PNG (1024x307)
execSync('ffmpeg -y -i public/mfs-logo.svg -s 1024x307 public/mfs-logo.png');

// 3. Android Chrome 512x512
execSync('ffmpeg -y -i public/mfs-brand-mark.svg -s 512x512 public/android-chrome-512x512.png');

// 4. Android Chrome 192x192
execSync('ffmpeg -y -i public/mfs-brand-mark.svg -s 192x192 public/android-chrome-192x192.png');

// 5. Apple Touch Icon 180x180
execSync('ffmpeg -y -i public/mfs-brand-mark.svg -s 180x180 public/apple-touch-icon.png');

// 6. Favicon 32x32
execSync('ffmpeg -y -i public/mfs-brand-mark.svg -s 32x32 public/favicon-32x32.png');

// 7. Temporary test logo
execSync('cp public/mfs-brand-mark.png public/test_logo.png');

// 8. Multi-res ICO file from PNG using ImageMagick
console.log('Generating favicon.ico...');
execSync('convert public/favicon-32x32.png public/android-chrome-192x192.png -define icon:auto-resize=16,32,48,64 public/favicon.ico');

console.log('Done generating all assets!');
