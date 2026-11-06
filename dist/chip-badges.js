(() => {
  'use strict';

  // Apple mark from the global navigation on apple.com.
  const appleMark = 'm13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.5615 3.5615 0 0 0 .8469-2.22 1.5353 1.5353 0 0 0 -.031-.32 3.5686 3.5686 0 0 0 -2.3445 1.2084 3.4629 3.4629 0 0 0 -.8779 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0935 3.0935 0 0 0 2.1586-1.1368z';
  const finishes = {
    M: ['#222632', '#151820', '#7b9eae'],
    S: ['#555962', '#2d3138', '#a6abb2'],
    H: ['#454751', '#272931', '#9398a3'],
    W: ['#4b5865', '#2b3541', '#94a7ba'],
    U: ['#534b5b', '#312b39', '#a295ac'],
    C: ['#45586e', '#263648', '#91adc8'],
    N: ['#495d55', '#293a34', '#90aa9e'],
    R: ['#555c67', '#2e3642', '#aab8cb'],
    T: ['#4a4847', '#2b292b', '#a39d96'],
  };
  let nextFinish = 0;

  function modelName(chip) {
    if (chip.id === 'uwb2') return ['UWB', '第 2 代'];
    const code = /^[A-Z]+\d+[A-Z]*/.exec(chip.name)?.[0] || chip.series;
    const edition = /\b(Pro|Max|Ultra)\b/i.exec(chip.name)?.[0].toUpperCase();
    return [code, edition];
  }

  function branding(code, edition) {
    const textWidth = code.length < 3 ? 69 : code.length === 3 ? 96 : 108;
    const left = (320 - 47 - textWidth) / 2;
    const baseline = edition ? 177 : 181;
    return `<svg class="chip-render-logo" x="${left}" y="${baseline - 49}" width="41" height="50" viewBox=".5 12.2 13 16.1"><path d="${appleMark}"/></svg>
      <text class="chip-render-model" x="${left + 47}" y="${baseline}" textLength="${textWidth}" lengthAdjust="spacingAndGlyphs">${code}</text>
      ${edition ? `<text class="chip-render-edition" x="160" y="207">${edition}</text>` : ''}`;
  }

  function packageFinish(series) {
    const [highlight, shadow, edge] = finishes[series];
    const id = `chip-finish-${++nextFinish}`;
    return `<defs><linearGradient id="${id}" x2=".86" y2="1">
        <stop stop-color="${highlight}"/><stop offset="1" stop-color="${shadow}"/>
      </linearGradient></defs>
      <rect x="65" y="66" width="194" height="194" rx="3" fill="#090b10" opacity=".75"/>
      <rect x="63.5" y="62.5" width="194" height="194" rx="2" fill="url(#${id})" stroke="${edge}" stroke-width="1.35"/>
      <rect x="68" y="67" width="185" height="185" rx="1" fill="none" stroke="${edge}" stroke-opacity=".21"/>`;
  }

  window.renderChipBadge = (chip) => {
    const [code, edition] = modelName(chip);
    const silver = chip.series === 'A';
    return `<div class="art chip-render${silver ? ' chip-render-silver' : ''}" aria-hidden="true">
      ${silver ? '<img class="chip-render-material" src="assets/silver-chip.svg" alt="" decoding="async">' : ''}
      <svg class="chip-render-markup" viewBox="0 0 320 320" focusable="false">
        ${silver ? '' : packageFinish(chip.series)}
        ${branding(code, edition)}
      </svg>
    </div>`;
  };
})();
