const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const URL = 'https://nbkristieee.in';
const ARTIFACT_DIR = 'C:\\Users\\vamsi\\.gemini\\antigravity-ide\\brain\\78aa3d03-7c05-4600-8ade-801902769c8b';

async function generate() {
  console.log(`Generating QR Codes for: ${URL}`);

  // 1. Standard high-res black & white PNG (1024x1024)
  const pngOpts = {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 1024,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  };

  // 2. Vector SVG
  const svgOpts = {
    errorCorrectionLevel: 'H',
    type: 'svg',
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  };

  // 3. Cyber Gold / Metaverse theme PNG
  const cyberOpts = {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 1024,
    margin: 2,
    color: {
      dark: '#f0c96a', // Nexusverse Gold
      light: '#0a1230' // Nexusverse Dark Blue
    }
  };

  await QRCode.toFile(path.join(__dirname, 'nexusverse-qr.png'), URL, pngOpts);
  await QRCode.toFile(path.join(__dirname, 'nexusverse-qr.svg'), URL, svgOpts);
  await QRCode.toFile(path.join(__dirname, 'nexusverse-qr-cyber.png'), URL, cyberOpts);

  // Copy to assets folders
  const destDirs = [
    path.join(__dirname, 'assets'),
    path.join(__dirname, 'nexusverse', 'assets'),
    ARTIFACT_DIR
  ];

  for (const dir of destDirs) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(path.join(__dirname, 'nexusverse-qr.png'), path.join(dir, 'nexusverse-qr.png'));
    fs.copyFileSync(path.join(__dirname, 'nexusverse-qr.svg'), path.join(dir, 'nexusverse-qr.svg'));
    fs.copyFileSync(path.join(__dirname, 'nexusverse-qr-cyber.png'), path.join(dir, 'nexusverse-qr-cyber.png'));
  }

  console.log('Successfully generated QR codes in PNG and SVG formats!');
}

generate().catch(err => {
  console.error('Error generating QR code:', err);
  process.exit(1);
});
