#!/usr/bin/env node
/**
 * 颜色 Token 同步脚本
 * 从 src/styles/color-tokens.css 读取变量，生成独立 HTML 并同步到桌面
 * 用法：node scripts/sync-color-tokens.js
 * 或：npm run sync-color（需在 package.json 添加 script）
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const CSS_PATH = path.join(PROJECT_ROOT, 'src/styles/color-tokens.css');
const COLOR_MD_PATH = path.join(PROJECT_ROOT, 'docs/color.md');
const OUTPUT_PROJECT = path.join(PROJECT_ROOT, 'color-tokens-standalone.html');
const OUTPUT_DESKTOP = path.join(process.env.HOME || '~', 'Desktop', 'color-tokens.html');

function extractBgMaskSpec(md) {
  const m = md.match(/### Bg-Mask 规范[\s\S]*?\| 颜色 \| ([^|]+) \|[\s\S]*?\| Opacity \| ([^|]+) \|[\s\S]*?\| Fill 不透明度 \| ([^|]+) \|[\s\S]*?实现：`([^`]+)`/);
  if (!m) return null;
  return { color: m[1].trim(), opacity: m[2].trim(), fillOpacity: m[3].trim(), impl: m[4].trim() };
}

/** 从 color.md 表格解析 Light/Dark 色值，返回 { light: { '--var': value }, dark: {...} } */
function extractVarsFromMd(md) {
  const vars = { light: {}, dark: {} };
  const tableRegex = /\| [^|]+ \| `?(--[\w-]+)`? \| [^|]+ \| ([^|]+) \| ([^|]+) \|/g;
  let m;
  while ((m = tableRegex.exec(md)) !== null) {
    const varName = m[1].replace(/`/g, '').trim();
    const lightVal = m[2].trim();
    const darkVal = m[3].trim();
    if (varName && lightVal && darkVal && /^#|^rgba?\(/.test(lightVal)) {
      vars.light[varName] = lightVal;
      vars.dark[varName] = darkVal;
    }
  }
  const bgMaskSpec = extractBgMaskSpec(md);
  if (bgMaskSpec) {
    vars.light['--bg-mask'] = bgMaskSpec.impl;
    vars.dark['--bg-mask'] = bgMaskSpec.impl;
  }
  return vars;
}

function extractVars(css) {
  const vars = { light: {}, dark: {} };
  let current = 'light';

  // Match :root { ... } and [data-theme='dark'] { ... }
  const rootMatch = css.match(/:root\s*\{([^}]+)\}/s);
  const darkMatch = css.match(/\[data-theme=['"]dark['"]\]\s*\{([^}]+)\}/s);

  function parseBlock(block) {
    const result = {};
    const re = /--([\w-]+)\s*:\s*([^;]+)/g;
    let m;
    const skip = ['color-cmpt', 'color-text-text', 'color-function', 'color-text-inverse', 'font-style', 'font-synthesis'];
    while ((m = re.exec(block)) !== null) {
      if (skip.some(p => m[1].startsWith(p))) continue;
      result['--' + m[1]] = m[2].replace(/\s*\/\*.*$/, '').trim();
    }
    return result;
  }

  if (rootMatch) vars.light = parseBlock(rootMatch[1]);
  if (darkMatch) vars.dark = parseBlock(darkMatch[1]);

  return vars;
}

function generateHTML(vars, bgMaskSpec) {
  const lightVars = Object.entries(vars.light).map(([k, v]) => `      ${k}: ${v};`).join('\n');
  const darkVars = Object.entries(vars.dark).map(([k, v]) => `      ${k}: ${v};`).join('\n');
  const spec = bgMaskSpec || { color: '#000000', opacity: '40%', fillOpacity: '50%', impl: 'rgba(0, 0, 0, 0.4)' };
  const specStr = JSON.stringify(spec);

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <title>Gate APP 颜色 Token · Color V5.1</title>
  <style>
    :root {
${lightVars}
    }
    [data-theme='dark'] {
${darkVars}
    }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 32px; font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Segoe UI", sans-serif; background: var(--bg-primary); color: var(--text-primary); line-height: 1.6; transition: background 0.3s, color 0.3s; min-height: 100vh; }
    .container { max-width: 960px; margin: 0 auto; }
    h1 { font-size: 28px; font-weight: 600; margin: 0 0 8px 0; }
    h2 { font-size: 20px; font-weight: 600; margin: 40px 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid var(--line-border-subtle); }
    p { margin: 0 0 12px 0; color: var(--text-secondary); font-size: 14px; }
    a { color: var(--link-default); text-decoration: none; }
    a:hover { text-decoration: underline; }
    .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid var(--line-border-subtle); }
    .theme-toggle { display: flex; gap: 8px; padding: 6px 12px; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--line-border-subtle); }
    .theme-toggle button { padding: 6px 16px; border: none; border-radius: 6px; font-size: 13px; font-family: inherit; cursor: pointer; background: transparent; color: var(--text-secondary); transition: all 0.2s; }
    .theme-toggle button:hover { background: var(--bg-tertiary); color: var(--text-primary); }
    .theme-toggle button.active { background: var(--bg-brand); color: var(--color-text-inverse-primary); }
    .color-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-bottom: 32px; }
    .color-card { background: var(--bg-secondary); border: 1px solid var(--line-border-subtle); border-radius: 8px; overflow: hidden; }
    .color-card .swatch { height: 64px; width: 100%; }
    .color-card .info { padding: 10px; font-size: 12px; }
    .color-card .name { font-weight: 500; color: var(--text-primary); margin-bottom: 4px; }
    .color-card .var { color: var(--text-tertiary); word-break: break-all; }
    .color-card .mask-spec { margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--line-border-subtle); font-size: 11px; color: var(--text-secondary); }
    .color-card .mask-spec span { display: block; margin-bottom: 2px; }
    .intro { background: var(--bg-secondary); padding: 20px; border-radius: 8px; margin-bottom: 32px; border: 1px solid var(--line-border-subtle); }
    .footer { margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--line-border-subtle); font-size: 12px; color: var(--text-tertiary); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div><h1>Gate APP 颜色 Token</h1><p style="margin:0;">Color V5.1 · 与 docs/color.md、color-tokens.css 同步</p></div>
      <div class="theme-toggle"><button id="btnLight" class="active">Light</button><button id="btnDark">Dark</button></div>
    </div>
    <div class="intro"><p>颜色设计 Token，与 <code>docs/color.md</code>、<code>src/styles/color-tokens.css</code> 同步。</p><p><strong>Figma：</strong><a href="https://www.figma.com/design/K2bAa3NONOe35GMd6GIrrb/AI-%E8%AE%AD%E7%BB%83?node-id=21-2973" target="_blank">AI 训练 · Color V5.1</a></p></div>
    <h2>1. 文本颜色</h2><div class="color-grid" id="textColors"></div>
    <h2>2. 背景颜色</h2><div class="color-grid" id="bgColors"></div>
    <h2>3. 线条颜色</h2><div class="color-grid" id="lineColors"></div>
    <h2>4. 链接颜色</h2><div class="color-grid" id="linkColors"></div>
    <h2>5. 功能色</h2><div class="color-grid" id="funcColors"></div>
    <h2>6. 图标颜色</h2><div class="color-grid" id="iconColors"></div>
    <div class="footer">Gate APP Design System · 由 scripts/sync-color-tokens.js 生成 · 更新于 ${new Date().toISOString().slice(0,19).replace('T',' ')}</div>
  </div>
  <script>
    const tokens = { text: [{var:'--text-primary',name:'Text-Primary',desc:'一级标题'},{var:'--text-secondary',name:'Text-Secondary',desc:'二级标题'},{var:'--text-tertiary',name:'Text-Tertiary',desc:'正文'},{var:'--text-tips',name:'Text-Tips',desc:'提示色'},{var:'--text-disabled',name:'Text-Disabled',desc:'禁用色'},{var:'--text-brand',name:'Text-Brand',desc:'品牌'},{var:'--text-error',name:'Text-Error',desc:'错误色'},{var:'--text-warning',name:'Text-Warning',desc:'警示色'},{var:'--text-success',name:'Text-Success',desc:'成功色'},{var:'--text-inverse-primary',name:'Text-Inverse-Primary',desc:'反白文字色'},{var:'--text-on-fill',name:'Always-white白文字',desc:'白文字'}], bg: [{var:'--bg-primary',name:'Bg-Primary',desc:'一级背景'},{var:'--bg-secondary',name:'Bg-Secondary',desc:'二级背景'},{var:'--bg-tertiary',name:'Bg-Tertiary',desc:'三级背景'},{var:'--bg-quaternary',name:'Bg-Quaternary',desc:'四级背景'},{var:'--bg-inverse-primary',name:'Bg-Inverse-primary',desc:'反向一级背景'},{var:'--bg-inverse-secondary',name:'Bg-Inverse-secondary',desc:'反向二级背景'},{var:'--bg-inverse-tertiary',name:'Bg-Inverse-tertiary',desc:'反向三级背景'},{var:'--bg-always-white',name:'Bg-Always-white',desc:'白色背景'},{var:'--bg-always-black',name:'Bg-Always-black',desc:'黑色背景'},{var:'--bg-mask',name:'Bg-Mask',desc:'蒙版/弹窗层遮罩',special:'mask',spec:${specStr}}], line: [{var:'--line-gutter',name:'Line-Gutter',desc:'分割块'},{var:'--line-border-subtle',name:'Line-Border-Subtle',desc:'描边弱'},{var:'--line-border-strong',name:'Line-Border-Strong',desc:'描边强'},{var:'--line-divider',name:'Line-Divider',desc:'分割线'},{var:'--line-short-divider',name:'Line-Short Divider',desc:'小竖线'}], link: [{var:'--link-default',name:'default',desc:'默认色'},{var:'--link-pressed',name:'pressed',desc:'按压色'},{var:'--link-disabled',name:'disabled',desc:'禁用色'}], func: [{var:'--func-green',name:'Trade-buy',desc:'交易买'},{var:'--func-green-light',name:'Trade-buy-soft',desc:'浅底色'},{var:'--func-red',name:'Trade-sell',desc:'交易卖'},{var:'--func-red-light',name:'Trade-sell-soft',desc:'浅底色'},{var:'--func-orange',name:'Hot',desc:'火'},{var:'--func-yellow',name:'Star',desc:'星星'}], icon: [{var:'--icon-primary',name:'Icon-Primary',desc:'图标主色'},{var:'--icon-secondary',name:'Icon-Secondary',desc:'功能/社媒'},{var:'--icon-tertiary',name:'Icon-Tertiary',desc:'次要图标'},{var:'--icon-quaternary',name:'Icon-Quaternary',desc:'四级图标'}] };
    function createCards(type, id) { const c = document.getElementById(id); if(!c) return; tokens[type].forEach(i => { const card = document.createElement('div'); card.className = 'color-card'; let style = 'background: var(' + i.var + ')'; if(i.special==='mask') style = 'background: linear-gradient(135deg, var(--bg-primary) 50%, var(--bg-mask) 50%)'; let specHtml = ''; if(i.spec) { if(i.spec.color) specHtml = '<div class="mask-spec"><span>颜色 ' + i.spec.color + '</span><span>Opacity ' + i.spec.opacity + '</span><span>Fill 不透明度 ' + i.spec.fillOpacity + '</span><span>实现 ' + i.spec.impl + '</span></div>'; } card.innerHTML = '<div class="swatch" style="' + style + '"></div><div class="info"><div class="name">' + i.name + ' · ' + i.desc + '</div><div class="var">var(' + i.var + ')</div>' + specHtml + '</div>'; c.appendChild(card); }); }
    ['text','bg','line','link','func','icon'].forEach(t => createCards(t, t + 'Colors'));
    document.getElementById('btnLight').onclick = () => { document.documentElement.removeAttribute('data-theme'); document.getElementById('btnLight').classList.add('active'); document.getElementById('btnDark').classList.remove('active'); };
    document.getElementById('btnDark').onclick = () => { document.documentElement.setAttribute('data-theme','dark'); document.getElementById('btnDark').classList.add('active'); document.getElementById('btnLight').classList.remove('active'); };
  </script>
</body>
</html>`;
}

function main() {
  const css = fs.readFileSync(CSS_PATH, 'utf8');
  const md = fs.readFileSync(COLOR_MD_PATH, 'utf8');
  const cssVars = extractVars(css);
  const mdVars = extractVarsFromMd(md);
  const bgMaskSpec = extractBgMaskSpec(md);
  const vars = {
    light: { ...cssVars.light, ...mdVars.light },
    dark: { ...cssVars.dark, ...mdVars.dark },
  };
  vars.light['--color-text-inverse-primary'] = '#FFFFFF';
  vars.dark['--color-text-inverse-primary'] = '#070808';
  const html = generateHTML(vars, bgMaskSpec);

  fs.writeFileSync(OUTPUT_PROJECT, html, 'utf8');
  console.log('✓ 已生成:', OUTPUT_PROJECT);

  try {
    fs.writeFileSync(OUTPUT_DESKTOP, html, 'utf8');
    console.log('✓ 已同步到桌面:', OUTPUT_DESKTOP);
  } catch (e) {
    console.warn('桌面同步失败:', e.message);
  }
}

main();
