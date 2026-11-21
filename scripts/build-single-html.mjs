import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');

const MIME_MAP = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.m4a': 'audio/mp4',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
};

function toDataUri(relAssetPath) {
  const cleanRel = relAssetPath.replace(/^\.\//, '');
  const fullPath = path.join(PUBLIC_DIR, cleanRel);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing asset for single-file HTML bundle: ${fullPath}`);
  }
  const ext = path.extname(fullPath).toLowerCase();
  const mime = MIME_MAP[ext] || 'application/octet-stream';
  const base64 = fs.readFileSync(fullPath).toString('base64');
  return `data:${mime};base64,${base64}`;
}

function inlineAssetsInJs(jsContent) {
  const assetRegex = /\.\/assets\/[A-Za-z0-9_./-]+\.(?:png|jpe?g|webp|svg|m4a|mp3|wav)/g;
  const cache = new Map();
  return jsContent.replace(assetRegex, (matchedPath) => {
    if (!cache.has(matchedPath)) {
      cache.set(matchedPath, toDataUri(matchedPath));
    }
    return cache.get(matchedPath);
  });
}

function buildSingleHtml() {
  const distHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(distHtmlPath)) {
    throw new Error('dist/index.html not found. Run vite build first.');
  }

  let html = fs.readFileSync(distHtmlPath, 'utf8');

  // Inline built stylesheets
  html = html.replace(
    /<link\s+rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g,
    (_full, href) => {
      const cssRel = href.replace(/^\.\//, '').replace(/^\//, '');
      const cssPath = path.join(DIST_DIR, cssRel);
      const css = fs.readFileSync(cssPath, 'utf8').replace(/<\/style>/gi, '<\\/style>');
      return `<style>${css}</style>`;
    }
  );

  // Inline built module scripts & embed local assets as data URIs
  html = html.replace(
    /<script\s+type="module"[^>]*src="([^"]+)"[^>]*><\/script>/g,
    (_full, src) => {
      const jsRel = src.replace(/^\.\//, '').replace(/^\//, '');
      const jsPath = path.join(DIST_DIR, jsRel);
      const rawJs = fs.readFileSync(jsPath, 'utf8');
      const inlinedJs = inlineAssetsInJs(rawJs).replace(/<\/script>/gi, '<\\/script>');
      return `<script type="module">${inlinedJs}</script>`;
    }
  );

  fs.mkdirSync(DOCS_DIR, { recursive: true });
  const docsIndexPath = path.join(DOCS_DIR, 'index.html');
  const rootSinglePath = path.join(ROOT_DIR, 'mohamed-and-rawan-wedding-invitation.html');

  fs.writeFileSync(docsIndexPath, html, 'utf8');
  fs.writeFileSync(rootSinglePath, html, 'utf8');

  const sizeMb = (Buffer.byteLength(html, 'utf8') / (1024 * 1024)).toFixed(2);
  console.log(`✓ Single-file HTML generated (${sizeMb} MB):`);
  console.log(`  - docs/index.html`);
  console.log(`  - mohamed-and-rawan-wedding-invitation.html`);
}

buildSingleHtml();
