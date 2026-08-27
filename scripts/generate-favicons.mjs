import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';
import { PNG } from 'pngjs';

const svgPath = path.resolve('public/mfs-brand-mark.svg');
const svgBuffer = fs.readFileSync(svgPath);

const sizes = [
  { name: 'favicon-48x48.png', width: 48 },
  { name: 'favicon-96x96.png', width: 96 },
  { name: 'apple-touch-icon.png', width: 180 },
  { name: 'favicon-192x192.png', width: 192 },
  { name: 'favicon-512x512.png', width: 512 },
  { name: 'mfs-brand-mark.png', width: 512 },
];

console.log('Generating high-res matte black raster favicons...');

for (const { name, width } of sizes) {
  const resvg = new Resvg(svgBuffer, {
    fitTo: {
      mode: 'width',
      value: width,
    },
    background: '#050507',
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  const outPath = path.resolve('public', name);
  fs.writeFileSync(outPath, pngBuffer);
  console.log(`Generated ${name} (${width}x${width})`);
}

// Generate favicon.ico directly using PNG data
// Standard ICO format with embedded PNG images (Vista+ standard, supported by all modern browsers & Google)
function createIcoFromPngs(pngBuffersWithSizes) {
  // ICO header: 6 bytes
  // 0-1: Reserved (0)
  // 2-3: Type (1 = ICO)
  // 4-5: Number of images
  const numImages = pngBuffersWithSizes.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(numImages, 4);

  // Each directory entry is 16 bytes
  const dirSize = 16 * numImages;
  let offset = 6 + dirSize;

  const dirEntries = [];
  const imageBuffers = [];

  for (const { buffer, size } of pngBuffersWithSizes) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // Width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // Image size in bytes
    entry.writeUInt32LE(offset, 12); // Image offset in file

    dirEntries.push(entry);
    imageBuffers.push(buffer);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...imageBuffers]);
}

// Render 48x48, 32x32, 16x16 PNGs for ICO packaging
const icoSizes = [48, 32, 16];
const icoPngs = icoSizes.map((size) => {
  const resvg = new Resvg(svgBuffer, {
    fitTo: { mode: 'width', value: size },
    background: '#050507',
  });
  return {
    size,
    buffer: resvg.render().asPng(),
  };
});

const icoBuffer = createIcoFromPngs(icoPngs);
fs.writeFileSync(path.resolve('public/favicon.ico'), icoBuffer);
console.log('Generated public/favicon.ico successfully!');
