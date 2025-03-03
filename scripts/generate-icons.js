
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const { promises: fsPromises } = fs;

async function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background
  const grd = ctx.createLinearGradient(0, 0, size, size);
  grd.addColorStop(0, '#2C2C2E');
  grd.addColorStop(1, '#1C1C1E');
  
  // Draw rounded rectangle
  const radius = size * 0.2; // 20% of size for corner radius
  const x = 0;
  const y = 0;
  const width = size;
  const height = size;
  
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  
  ctx.fillStyle = grd;
  ctx.fill();
  
  // Display area
  const displayWidth = size * 0.5; // 50% of size
  const displayHeight = size * 0.15; // 15% of size
  const displayX = size * 0.25; // Centered
  const displayY = size * 0.25; // 25% from top
  const displayRadius = size * 0.05; // Small border radius
  
  ctx.beginPath();
  ctx.moveTo(displayX + displayRadius, displayY);
  ctx.lineTo(displayX + displayWidth - displayRadius, displayY);
  ctx.quadraticCurveTo(displayX + displayWidth, displayY, displayX + displayWidth, displayY + displayRadius);
  ctx.lineTo(displayX + displayWidth, displayY + displayHeight - displayRadius);
  ctx.quadraticCurveTo(displayX + displayWidth, displayY + displayHeight, displayX + displayWidth - displayRadius, displayY + displayHeight);
  ctx.lineTo(displayX + displayRadius, displayY + displayHeight);
  ctx.quadraticCurveTo(displayX, displayY + displayHeight, displayX, displayY + displayHeight - displayRadius);
  ctx.lineTo(displayX, displayY + displayRadius);
  ctx.quadraticCurveTo(displayX, displayY, displayX + displayRadius, displayY);
  ctx.closePath();
  
  ctx.fillStyle = '#F5F5F7';
  ctx.fill();
  
  // Calculator buttons
  const buttonSize = size * 0.15;
  const buttonMargin = size * 0.06;
  
  // Row 1 buttons
  drawButton(ctx, size * 0.35, size * 0.5, buttonSize, '#E5E5EA'); // 7
  drawButton(ctx, size * 0.5, size * 0.5, buttonSize, '#E5E5EA'); // 8
  drawButton(ctx, size * 0.65, size * 0.5, buttonSize, '#FF9F0A'); // +
  
  // Row 2 buttons
  drawButton(ctx, size * 0.35, size * 0.7, buttonSize, '#E5E5EA'); // 4
  drawButton(ctx, size * 0.5, size * 0.7, buttonSize, '#E5E5EA'); // 5
  drawButton(ctx, size * 0.65, size * 0.7, buttonSize, '#30D158'); // =
  
  return canvas.toBuffer('image/png');
}

function drawButton(ctx, x, y, size, color) {
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

async function main() {
  const publicDir = path.resolve(__dirname, '../public');
  
  // Make sure public directory exists
  if (!fs.existsSync(publicDir)) {
    await fsPromises.mkdir(publicDir, { recursive: true });
  }
  
  // Generate icons in different sizes
  const sizes = [16, 48, 128];
  
  for (const size of sizes) {
    const buffer = await generateIcon(size);
    await fsPromises.writeFile(path.join(publicDir, `calculator-${size}.png`), buffer);
    console.log(`Generated ${size}x${size} icon`);
  }
}

main().catch(console.error);
