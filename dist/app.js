'use strict';

const find = (selector) => document.querySelector(selector);
const byDate = (a, b) => String(b.date || b.year).localeCompare(String(a.date || a.year));
const byName = (a, b) => a.name.localeCompare(b.name, 'en', {numeric: true});
const chips = [...(window.macChips || []), ...(window.aChips || []), ...(window.specialtyChips || [])].sort(byDate);
const chipById = new Map(chips.map((chip) => [chip.id, chip]));
const imagery = window.chipImages || {};
const benchmarks = window.chipBenchmarks || [];
const appleTests = window.appleTests || [];
const compare = ['m6', 'm5-max', 'm5-ultra'].filter((id) => chipById.has(id));
while (compare.length < 3) compare.push('');
const state = {family: 'all', specialty: 'all', query: '', sort: 'new', metric: 'memory', dock: false};
const catalogBatchSize = 9;
const dialog = find('#chip-detail');
const grid = find('#chip-grid');
const catalogEnd = find('#catalog-end');
let catalogMatches = [];
let catalogShown = 0;
const catalogObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) appendCatalogBatch();
  }, {rootMargin: '0px 0px 140px 0px'})
  : null;
const comparePicks = find('#compare-picks');
const compareFigure = find('#compare-figure');
const benchmarkApp = find('#benchmark-app');
const format = new Intl.NumberFormat('zh-CN', {maximumFractionDigits: 2});

const families = [
  {id: 'all', name: '全部'},
  {id: 'M', name: 'M 系列', symbol: 'M', note: 'Mac 与 iPad'},
  {id: 'A', name: 'A 系列', symbol: 'A', note: 'iPhone 与 iPad'},
  {id: 'S', name: 'S 系列', symbol: 'S', note: 'Apple Watch'},
  {id: 'other', name: '专用芯片', symbol: '＋', note: '连接、音频与空间计算'},
];
const specialtyNames = {H: '音频', W: '无线', U: '超宽带', C: '蜂窝基带', N: '无线网络', R: '空间计算', T: '安全'};
const specialtyTabs = [{id: 'all', name: '全部专用芯片'}, ...Object.entries(specialtyNames).map(([id, label]) => ({id, name: `${id} · ${label}`}))];
const metricOptions = [
  {id: 'cpu', label: 'CPU 核心', unit: '核'},
  {id: 'gpu', label: 'GPU 核心', unit: '核'},
  {id: 'neural', label: '神经网络引擎', unit: '核'},
  {id: 'memory', label: '内存容量', unit: 'GB'},
  {id: 'bandwidth', label: '内存带宽', unit: 'GB/s'},
  {id: 'transistors', label: '晶体管', unit: '十亿个'},
];
const specLabels = [
  ['process', '制程'], ['cpu', 'CPU'], ['gpu', 'GPU'], ['neural', '神经网络引擎'],
  ['memory', '内存'], ['bandwidth', '内存带宽'], ['transistors', '晶体管'], ['media', '媒体与影像'],
];
const colors = ['#0074df', '#6653ca', '#008974'];

function escape(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[character]));
}

function metricValue(chip, id) {
  const value = chip.metrics?.[id];
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : null;
}

function dataValue(value) {
  return value === null || value === undefined || value === '' ? '—' : escape(value);
}

function familyMatch(chip, family) {
  if (family === 'all') return true;
  if (family === 'other') return !['M', 'A', 'S'].includes(chip.series);
  return chip.series === family;
}

function lookupText(value) {
  return value.toLowerCase().normalize('NFKC').replace(/[\s._-]+/g, '');
}

function art(chip, priority = false) {
  const image = imagery[chip.id];
  const url = image?.cover?.url || image?.url;
  if (!url) return window.renderChipBadge(chip);
  return `<img class="art" src="${escape(url)}" alt="" ${priority ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" data-fallback="${escape(chip.id)}">`;
}

document.addEventListener('error', (event) => {
  const img = event.target;
  if (img instanceof HTMLImageElement && img.dataset.fallback) {
    img.insertAdjacentHTML('afterend', window.renderChipBadge(chipById.get(img.dataset.fallback)));
    img.remove();
  }
}, true);

const heroChips = ['m5-ultra', 'm6', 'a20-pro'].map((id) => chipById.get(id)).filter(Boolean);

function renderHero(index) {
  const chip = heroChips[index];
  if (!chip) return;
  find('#hero-image').innerHTML = art(chip, true);
  const lines = {'m5-ultra': 'Mac Studio · 最高 512 GB 统一内存', m6: 'Mac mini、MacBook Pro · 2 纳米制程', 'a20-pro': 'iPhone 18 Pro · 2 纳米制程'};
  find('#hero-label').innerHTML = `<a href="#chip/${escape(chip.id)}">${escape(chip.name)} <span aria-hidden="true">↗</span></a><p>${escape(lines[chip.id] || chip.tag)}</p>`;
  find('#hero-controls').querySelectorAll('button').forEach((button, position) => {
    button.setAttribute('aria-pressed', position === index);
  });
}

find('#hero-controls').innerHTML = heroChips.map((chip, index) =>
  `<button data-hero="${index}" type="button" aria-label="展示 ${escape(chip.name)}">${String(index + 1).padStart(2, '0')}</button>`).join('');
renderHero(0);

find('#hero-controls').addEventListener('click', (event) => {
  const button = event.target.closest('[data-hero]');
  if (button) renderHero(Number(button.dataset.hero));
});

find('#family-index').innerHTML = families.slice(1).map((family) =>
  `<button class="family-index-button" data-index-family="${family.id}" type="button">
    <span class="family-symbol" aria-hidden="true">${family.symbol}</span>
    <span><b>${family.name}</b><small>${family.note}</small></span>
    <span class="family-arrow" aria-hidden="true">↗</span>
  </button>`).join('');

const tabMarkup = (items, selected, attribute) => items.map((item) =>
  `<button type="button" data-${attribute}="${escape(item.id)}" aria-pressed="${item.id === selected}">${escape(item.label ?? item.name)}</button>`).join('');

find('#family-tabs').innerHTML = tabMarkup(families, state.family, 'family');

function setFamily(id) {
  state.family = id;
  state.specialty = 'all';
  renderSpecialtyTabs();
  find('#family-tabs').querySelectorAll('button').forEach((button) => {
    button.setAttribute('aria-pressed', button.dataset.family === id);
  });
  renderCatalog();
}

function cardFacts(chip) {
  const facts = [];
  const cpu = metricValue(chip, 'cpu');
  const gpu = metricValue(chip, 'gpu');
  if (cpu) facts.push(`最高 ${cpu} 核 CPU`);
  if (gpu) facts.push(`最高 ${gpu} 核 GPU`);
  if (facts.length < 2 && chip.specs?.process) facts.push(chip.specs.process);
  if (!facts.length) facts.push(chip.devices?.[0] || specialtyNames[chip.series] || chip.tag);
  return facts.filter(Boolean).map((fact) => `<span>${escape(fact)}</span>`).join('');
}

function compareButton(chip) {
  const selected = compare.includes(chip.id);
  return `<button type="button" data-add="${escape(chip.id)}" aria-pressed="${selected}" aria-label="${selected ? '移除' : '加入'} ${escape(chip.name)} 对比">${selected ? '✓ 已加入' : '＋ 对比'}</button>`;
}

function card(chip) {
  const href = `#chip/${escape(chip.id)}`;
  return `<article class="chip-card">
    <a class="card-art" href="${href}" aria-label="查看 ${escape(chip.name)} 详情">${art(chip)}</a>
    <div class="card-body">
      <p class="card-meta"><span>${escape(chip.year)}</span><span>${escape(chip.tag)}</span></p>
      <h3 class="card-title"><a href="${href}">${escape(chip.name)}</a></h3>
      <p class="card-desc">${escape(chip.description)}</p>
      <div class="card-specs">${cardFacts(chip)}</div>
      <div class="card-actions"><a class="text-link" href="${href}">查看规格 <span aria-hidden="true">›</span></a>${compareButton(chip)}</div>
    </div>
  </article>`;
}

function renderCatalog() {
  const query = state.query.trim().split(/\s+/).map(lookupText).filter(Boolean);
  catalogMatches = chips.filter((chip) => {
    if (!familyMatch(chip, state.family)) return false;
    if (state.family === 'other' && state.specialty !== 'all' && chip.series !== state.specialty) return false;
    const text = lookupText([chip.name, chip.id, chip.tag, chip.year, ...(chip.devices || [])].join(' '));
    return query.every((term) => text.includes(term));
  });
  if (state.sort === 'old') catalogMatches.reverse();
  if (state.sort === 'name') catalogMatches.sort(byName);
  catalogShown = 0;
  grid.innerHTML = catalogMatches.length ? '' : '<p class="empty">没有匹配的芯片。试试型号，例如 M5、A20，或设备名称，例如 Mac Studio。</p>';
  appendCatalogBatch();
}

function appendCatalogBatch() {
  catalogObserver?.unobserve(catalogEnd);
  const count = catalogMatches.length;
  const end = catalogObserver ? catalogShown + catalogBatchSize : count;
  const next = catalogMatches.slice(catalogShown, end);
  grid.insertAdjacentHTML('beforeend', next.map(card).join(''));
  catalogShown += next.length;
  const hasMore = catalogShown < count;
  find('#result-count').textContent = `共 ${count} 款${hasMore ? ` · 已显示 ${catalogShown} 款` : ''}`;
  catalogEnd.hidden = !hasMore;
  if (hasMore) catalogObserver.observe(catalogEnd);
}

find('#family-index').addEventListener('click', (event) => {
  const button = event.target.closest('[data-index-family]');
  if (!button) return;
  find('#search').value = '';
  state.query = '';
  setFamily(button.dataset.indexFamily);
  location.hash = 'catalog';
  find('#catalog').scrollIntoView();
});

find('#family-tabs').addEventListener('click', (event) => {
  const button = event.target.closest('[data-family]');
  if (button) setFamily(button.dataset.family);
});

function renderSpecialtyTabs() {
  const tabs = find('#specialty-tabs');
  tabs.hidden = state.family !== 'other';
  tabs.innerHTML = tabMarkup(specialtyTabs, state.specialty, 'specialty');
}

find('#specialty-tabs').addEventListener('click', (event) => {
  const button = event.target.closest('[data-specialty]');
  if (!button) return;
  state.specialty = button.dataset.specialty;
  renderSpecialtyTabs();
  find(`[data-specialty="${state.specialty}"]`).focus({preventScroll: true});
  renderCatalog();
});

find('#search').addEventListener('input', (event) => {
  state.query = event.target.value;
  renderCatalog();
});

find('#sort').addEventListener('change', (event) => {
  state.sort = event.target.value;
  renderCatalog();
});

let toastTimer;

function notify(message) {
  window.clearTimeout(toastTimer);
  find('#toast').textContent = '';
  find('#detail-toast').textContent = '';
  const toast = find(dialog.open ? '#detail-toast' : '#toast');
  toast.textContent = message;
  toastTimer = window.setTimeout(() => { toast.textContent = ''; }, 3000);
}

function renderCompareButtons() {
  document.querySelectorAll('[data-add]').forEach((button) => {
    const selected = compare.includes(button.dataset.add);
    const chip = chipById.get(button.dataset.add);
    button.setAttribute('aria-pressed', selected);
    button.setAttribute('aria-label', `${selected ? '移除' : '加入'} ${chip.name} 对比`);
    button.textContent = selected ? '✓ 已加入' : button.closest('dialog') ? '＋ 加入对比' : '＋ 对比';
  });
}

function addOrRemove(id) {
  const existing = compare.indexOf(id);
  const empty = compare.indexOf('');
  if (existing !== -1) {
    compare[existing] = '';
  } else if (empty !== -1) {
    compare[empty] = id;
  } else {
    const replaced = chipById.get(compare[2]);
    compare[2] = id;
    notify(`已将对比栏第 3 项 ${replaced.name} 换成 ${chipById.get(id).name}`);
  }
  state.dock = true;
  updateCompare();
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-add]');
  if (button) addOrRemove(button.dataset.add);
});

function createComparePicks() {
  const groups = families.slice(1).map((family) =>
    `<optgroup label="${family.name}">${chips.filter((chip) => familyMatch(chip, family.id)).map((chip) =>
      `<option value="${escape(chip.id)}">${escape(chip.name)} · ${escape(chip.year)}</option>`).join('')}</optgroup>`).join('');
  comparePicks.innerHTML = compare.map((_, index) => `<div class="pick">
    <label for="pick-${index}">芯片 ${index + 1}</label>
    <select id="pick-${index}" data-slot="${index}"><option value="">选择芯片</option>${groups}</select>
  </div>`).join('');
}

function chartBar(value, max, color) {
  return `<div class="chart-bar" aria-hidden="true" style="--bar:${100 * value / max}%${color ? `;--bar-color:${color}` : ''}"></div>`;
}

function plot(rows, unit) {
  const max = Math.max(0, ...rows.map((row) => row.value || 0));
  if (!max) return '<p class="empty">所选芯片在这一项暂无可对照数值。</p>';
  return `<div class="plot">${rows.map((row, index) => {
    const label = row.href ? `<a class="text-link" href="${escape(row.href)}">${escape(row.label)}</a>` : escape(row.label);
    const value = row.value == null ? '—' : `${format.format(row.value)} ${escape(unit || '')}`.trim();
    return `<div class="plot-row" style="--step:${Math.min(index, 7)}">
      <div class="apple-result-label"><span>${label}</span><strong>${value}</strong></div>
      ${row.value == null ? '' : chartBar(row.value, max, row.color || colors[index % colors.length])}
      ${row.sub ? `<p class="plot-note">${escape(row.sub)}</p>` : ''}
    </div>`;
  }).join('')}</div>`;
}

function renderCompareFigure(selected) {
  if (selected.length === 0) {
    compareFigure.innerHTML = '<p class="empty">请先选择一款芯片。</p>';
    return;
  }
  const metric = metricOptions.find((item) => item.id === state.metric);
  compareFigure.innerHTML = `<div class="figure-tools">
    <div><h3 class="figure-title">${metric.label}</h3><p class="figure-subtitle">按芯片已核实的最高规格绘制</p></div>
    <div class="metric-tabs" aria-label="图表指标">${tabMarkup(metricOptions, state.metric, 'metric')}</div>
  </div>${plot(selected.map((chip) => ({label: chip.name, value: metricValue(chip, metric.id), href: `#chip/${chip.id}`, color: colors[compare.indexOf(chip.id)]})), metric.unit)}`;
}

function extraOf(chip) {
  const extra = chip.specs?.extra;
  if (typeof extra === 'string' && extra) return {'配置说明': extra};
  return extra || {};
}

function renderTable(selected) {
  const table = find('#compare-table');
  if (selected.length === 0) { table.innerHTML = ''; return; }
  const details = specLabels.map(([id, label]) => [label, ...selected.map((chip) => chip.specs?.[id])]);
  const extras = new Set(selected.flatMap((chip) => Object.keys(extraOf(chip))));
  const rows = [
    ['首次发布', ...selected.map((chip) => chip.date || chip.year)],
    ...details,
    ...[...extras].map((key) => [key, ...selected.map((chip) => extraOf(chip)[key])]),
    ['搭载设备', ...selected.map((chip) => chip.devices?.join('、'))],
  ].filter(([, ...values]) => {
    const distinct = new Set(values.map((value) => value ?? ''));
    return selected.length < 2 || !find('#diff-only').checked || distinct.size > 1;
  });
  table.innerHTML = `<table>
    <thead><tr><th scope="col">项目</th>${selected.map((chip) => `<th scope="col"><a class="text-link" href="#chip/${escape(chip.id)}">${escape(chip.name)}</a></th>`).join('')}</tr></thead>
    <tbody>${rows.map(([label, ...values]) => `<tr><th scope="row">${escape(label)}</th>${values.map((value) => `<td>${dataValue(value)}</td>`).join('')}</tr>`).join('')}</tbody>
  </table>`;
}

function updateCompare() {
  const selected = compare.map((id) => chipById.get(id)).filter(Boolean);
  comparePicks.querySelectorAll('select').forEach((select, index) => {
    [...select.options].forEach((option) => {
      option.disabled = option.value !== '' && option.value !== compare[index] && compare.includes(option.value);
    });
    select.value = compare[index];
  });
  renderCompareFigure(selected);
  renderTable(selected);
  renderCompareButtons();
  find('#dock-label').textContent = `已选 ${selected.length} 款芯片`;
  find('#compare-dock').hidden = !state.dock || !selected.length;
}

comparePicks.addEventListener('change', (event) => {
  if (!event.target.matches('[data-slot]')) return;
  compare[Number(event.target.dataset.slot)] = event.target.value;
  updateCompare();
});

compareFigure.addEventListener('click', (event) => {
  const button = event.target.closest('[data-metric]');
  if (!button) return;
  state.metric = button.dataset.metric;
  renderCompareFigure(compare.map((id) => chipById.get(id)).filter(Boolean));
  compareFigure.querySelector(`[data-metric="${state.metric}"]`)?.focus({preventScroll: true});
});

find('#diff-only').addEventListener('change', () => renderTable(compare.map((id) => chipById.get(id)).filter(Boolean)));
find('#dismiss-dock').addEventListener('click', () => {
  state.dock = false;
  find('#compare-dock').hidden = true;
});
find('#compare-dock a').addEventListener('click', () => {
  state.dock = false;
  find('#compare-dock').hidden = true;
});

let benchmarkSource = appleTests.length ? 'apple' : 'geekbench';
let officialGroup = appleTests[0]?.id;
const activeTests = new Map();
let benchGroup = benchmarks[0]?.id;
let benchMetric = benchmarks[0]?.metrics?.[0]?.id;

function sourceLink(url, title, css = '') {
  if (typeof url !== 'string' || !url.startsWith('https://')) return '';
  return `<a class="${css}" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(title || '查看来源')} <span aria-hidden="true">↗</span></a>`;
}

function officialChart(group, featured = group.chip) {
  const test = group.tests.find((item) => item.id === activeTests.get(group.id)) || group.tests[0];
  const max = Math.max(...test.rows.map((row) => row.value));
  const hasNotes = Boolean(group.note || test.note);
  return `<div class="apple-chart" data-official-chart="${escape(group.id)}" data-featured="${escape(featured)}">
    <div class="apple-chart-intro">
      <p class="eyebrow apple-chart-kicker">${escape(group.title)}</p>
      <h3 class="figure-title">${escape(test.label)}</h3>
      <p class="figure-subtitle">${escape(test.description)}</p>
      ${group.tests.length > 1 ? `<div class="metric-tabs apple-tests" aria-label="Apple 测试项目">${tabMarkup(group.tests, test.id, 'apple-test')}</div>` : ''}
    </div>
    <figure class="apple-comparison">
      <div class="apple-bars" data-reveal>${test.rows.map((row, index) => `
        <div class="apple-result ${row.chip === featured ? 'is-featured' : ''} ${row.value === 1 ? 'is-baseline' : ''}" style="--step:${index}">
          <div class="apple-result-label">
            <span>${escape(row.label)}</span>
            <strong>${format.format(row.value)}<small>×</small></strong>
          </div>
          ${chartBar(row.value, max)}
          ${row.note || row.value === 1 ? `<p>${escape(row.note)}${row.value === 1 ? ' · 基准' : ''}</p>` : ''}
        </div>`).join('')}</div>
      <figcaption class="apple-chart-caption">
        <p>同一项目内以标示的基准机型为 1×。倍率取自 Apple 公布的结果。</p>
        ${hasNotes ? `<p class="apple-test-notes"><strong>测试条件</strong> · ${escape(test.note || group.note)}</p>` : ''}
        ${sourceLink(group.source, group.sourceTitle, 'text-link')}
      </figcaption>
    </figure>
  </div>`;
}

function renderBench() {
  const sources = [
    ...(appleTests.length ? [{id: 'apple', label: 'Apple 官方测试'}] : []),
    ...(benchmarks.length ? [{id: 'geekbench', label: 'Geekbench 7'}] : []),
  ];
  const sourceTabs = `<div class="metric-tabs source-tabs" aria-label="测试来源">${tabMarkup(sources, benchmarkSource, 'bench-source')}</div>`;
  if (benchmarkSource === 'apple') {
    const group = appleTests.find((item) => item.id === officialGroup) || appleTests[0];
    const groups = appleTests.map((item) => ({id: item.id, label: item.shortTitle || item.title}));
    benchmarkApp.innerHTML = `<div class="benchmark-panel apple-panel">${sourceTabs}
      <div class="metric-tabs group-tabs" aria-label="Apple 测试机型">${tabMarkup(groups, group.id, 'apple-group')}</div>
      ${officialChart(group)}
    </div>`;
    return;
  }
  renderGeekbench(sourceTabs);
}

function renderGeekbench(sourceTabs) {
  const group = benchmarks.find((item) => item.id === benchGroup);
  if (!group) { benchmarkApp.innerHTML = '<p class="fineprint">目前没有可展示的同版本测试成绩。</p>'; return; }
  const metric = group.metrics.find((item) => item.id === benchMetric) || group.metrics[0];
  const rows = group.rows.map((row) => ({
    label: row.label,
    sub: row.device + (row.note ? ` · ${row.note}` : ''),
    value: row.values[metric.id],
    href: chipById.has(row.chip) ? `#chip/${row.chip}` : undefined,
    color: '#87afff',
  })).sort((a, b) => b.value - a.value);
  const groups = benchmarks.map((item) => ({
    id: item.id,
    label: item.id.startsWith('mac-') ? 'Mac' : item.id.startsWith('iphone-') ? 'iPhone' : item.title,
  }));
  benchmarkApp.innerHTML = `<div class="benchmark-panel">${sourceTabs}
    <div class="metric-tabs group-tabs" aria-label="测试设备系列">${tabMarkup(groups, group.id, 'bench-group')}</div>
    <div class="figure-tools">
      <div><h3 class="figure-title">${escape(group.title)}</h3><p class="figure-subtitle">${escape(group.description)}</p></div>
      <div class="metric-tabs" aria-label="测试指标">${tabMarkup(group.metrics, metric.id, 'bench-metric')}</div>
    </div>
    ${plot(rows, metric.unit)}
    <p class="fineprint benchmark-source">${sourceLink(group.source, group.sourceTitle, 'text-link')}</p>
  </div>`;
}

benchmarkApp.addEventListener('click', (event) => {
  const button = event.target.closest('[data-bench-source], [data-apple-group], [data-apple-test], [data-bench-group], [data-bench-metric]');
  if (!button) return;
  if (button.dataset.benchSource) benchmarkSource = button.dataset.benchSource;
  if (button.dataset.appleGroup) officialGroup = button.dataset.appleGroup;
  if (button.dataset.appleTest) activeTests.set(officialGroup, button.dataset.appleTest);
  if (button.dataset.benchGroup) benchGroup = button.dataset.benchGroup;
  if (button.dataset.benchMetric) benchMetric = button.dataset.benchMetric;
  const key = button.getAttributeNames().find((name) => name.startsWith('data-'));
  const selector = `[${key}="${button.getAttribute(key)}"]`;
  renderBench();
  benchmarkApp.querySelector(selector)?.focus({preventScroll: true});
});

let returnHash = '';
let returnFocus = null;

function animatedNumber(value) {
  const formatted = format.format(value);
  return `<span class="sr-only">${formatted}</span><span aria-hidden="true" data-counter="${value}">${formatted}</span>`;
}

const specIcons = {
  cpu: '<rect x="7" y="7" width="18" height="18" rx="3"/><rect x="12" y="12" width="8" height="8" rx="1"/><path d="M12 3v4m8-4v4m-8 18v4m8-4v4M3 12h4m-4 8h4m18-8h4m-4 8h4"/>',
  gpu: '<rect x="4" y="4" width="10" height="10" rx="2"/><rect x="18" y="4" width="10" height="10" rx="2"/><rect x="4" y="18" width="10" height="10" rx="2"/><rect x="18" y="18" width="10" height="10" rx="2"/>',
  neural: '<path d="M16 6 6 12l3 12h14l3-12-10-6Zm-10 6 10 4 10-4M9 24l7-8 7 8M16 6v10"/><circle cx="16" cy="16" r="2" fill="currentColor" stroke="none"/>',
  memory: '<rect x="4" y="8" width="24" height="14" rx="2"/><path d="M8 22v4m5-4v4m6-4v4m5-4v4M10 13h3v4h-3zm9 0h3v4h-3z"/>',
  bandwidth: '<path d="M4 10h24m-6-6 6 6-6 6m6 6H4m6-6-6 6 6 6"/>',
  transistors: '<rect x="5" y="5" width="22" height="22" rx="2"/><path d="M5 12h22M5 20h22M12 5v22m8-22v22"/>',
  process: '<circle cx="16" cy="16" r="12"/><path d="M6 12h20M6 20h20M12 6v20m8-20v20"/>',
  wireless: '<path d="M4 12a18 18 0 0 1 24 0M8 17a12 12 0 0 1 16 0m-12 5a6 6 0 0 1 8 0"/><circle cx="16" cy="26" r="1.6" fill="currentColor" stroke="none"/>',
  audio: '<path d="M5 18v-4m5 8V10m6 17V5m6 17V10m5 8v-4"/>',
  security: '<path d="m16 4 10 4v7c0 6-4 10-10 13-6-3-10-7-10-13V8l10-4Z"/><path d="m11.5 16 3 3 6-6"/>',
  sensor: '<circle cx="16" cy="16" r="11"/><circle cx="16" cy="16" r="5"/><path d="M16 3v4m0 18v4M3 16h4m18 0h4"/>',
  media: '<rect x="4" y="6" width="24" height="20" rx="3"/><path d="m13 11 7 5-7 5v-10Z"/>',
};
const seriesIcons = {H: 'audio', W: 'wireless', U: 'sensor', C: 'wireless', N: 'wireless', R: 'sensor', T: 'security'};

function specIcon(id) {
  return `<svg class="spec-icon" viewBox="0 0 32 32" aria-hidden="true">${specIcons[id]}</svg>`;
}

function specCards(chip) {
  const highlights = metricOptions.flatMap(({id, label, unit}) => {
    const metric = metricValue(chip, id);
    if (metric === null) return [];
    const note = chip.specs[id];
    if (id === 'bandwidth' && /TB\/s/i.test(note) && metric >= 1000) {
      return [{id, label, unit: 'TB/s', value: metric / 1000}];
    }
    return [{id, label, unit, value: metric, note: note?.startsWith('最高') || note?.length > 7 ? note : ''}];
  });
  if (chip.specs.process) {
    const full = chip.specs.process;
    const nodes = [...full.matchAll(/(\d+(?:\.\d+)?)\s*(?:nm|纳米)/gi)];
    highlights.push(nodes.length === 1
      ? {id: 'process', label: '制程', value: Number(nodes[0][1]), unit: 'nm', note: full}
      : {id: 'process', label: '制程', text: full});
  }
  if (!['A', 'M'].includes(chip.series)) {
    const extras = Object.entries(extraOf(chip)).filter(([label]) => !['首次上市', '可用性'].includes(label));
    for (const [label, full] of extras.slice(0, Math.max(0, 4 - highlights.length))) {
      const short = String(full).match(/^(?:Wi-Fi\s*\d+|Bluetooth\s*[\d.]+|5G|\d+\s*毫秒|\d+\s*GB|Secure Enclave|Secure Exclave)(?=[（、\s]|$)/)?.[0];
      highlights.push({id: seriesIcons[chip.series] || 'cpu', label, text: short || full, note: short && short !== full ? full : ''});
    }
  }
  if (highlights.length < 3 && chip.specs.media) {
    highlights.push({id: 'media', label: '媒体与音频', text: chip.specs.media});
  }
  return highlights.map(({id, label, unit, value, text, note}, index) => `<article class="spec-tile" style="--step:${index}">
    ${specIcon(id)}
    <h4>${escape(label)}</h4>
    ${value !== undefined ? `<p class="spec-value">${animatedNumber(value)} <span class="spec-unit">${escape(unit)}</span></p>` : `<p class="spec-value spec-value-text">${escape(text)}</p>`}
    ${note ? `<p class="spec-note">${escape(note)}</p>` : ''}
  </article>`).join('');
}

function detailBenchmarks(chip) {
  return benchmarks.flatMap((group) => group.rows.filter((row) => row.chip === chip.id).map((row) => {
    const cards = group.metrics.map((metric, index) => {
      const max = Math.max(...group.rows.map((result) => result.values[metric.id]));
      const value = row.values[metric.id];
      return `<div class="detail-bench-number" style="--step:${index}"><span class="detail-stat-label">${escape(metric.label)}</span><b>${animatedNumber(value)} 分</b>
        ${chartBar(value, max)}
        <small>本站同组最高 ${format.format(max)} 分</small></div>`;
    }).join('');
    return `<div class="detail-bench">
      <p class="figure-subtitle">${escape(row.device)}${row.note ? ` · ${escape(row.note)}` : ''}</p>
      <div class="detail-bench-grid" data-reveal>${cards}</div>
      <p class="fineprint">${sourceLink(group.source, group.sourceTitle, 'text-link')}</p>
    </div>`;
  })).join('');
}

function renderDetail(chip) {
  const image = imagery[chip.id];
  const officialFigure = image?.figure;
  const diePhoto = image?.cover ? image : null;
  const scores = detailBenchmarks(chip);
  const highlights = specCards(chip);
  const official = appleTests.find((group) => group.chip === chip.id)
    || appleTests.find((group) => group.tests.some((test) => test.rows.some((row) => row.chip === chip.id)));
  const specs = [
    ...specLabels.map(([id, label]) => [label, chip.specs?.[id]]),
    ...Object.entries(extraOf(chip)),
  ].filter(([, value]) => value !== null && value !== undefined && value !== '');
  const list = [
    {title: chip.sourceTitle, url: chip.source}, ...(chip.sources || []),
    {title: '芯片图像 · Apple', url: image?.source},
    {title: '架构图 · Apple', url: officialFigure?.source},
  ].filter((source, index, entries) => source.url && entries.findIndex((item) => item.url === source.url) === index);
  find('#detail-top-title').textContent = chip.name;
  find('#detail-toast').textContent = '';
  find('#detail-content').innerHTML = `
    <div class="detail-hero">
      <div class="detail-hero-inner wrap">
        <div class="detail-intro">
          <p class="eyebrow detail-kicker">${escape(chip.date || chip.year)} / ${escape(chip.tag)}</p>
          <h2 id="detail-title">${escape(chip.name)}</h2>
          <p class="detail-desc">${escape(chip.description)}</p>
          <div class="detail-actions"><button class="button outline" type="button" data-add="${escape(chip.id)}">＋ 加入对比</button><a class="text-link" href="#compare">前往规格对比 <span aria-hidden="true">›</span></a></div>
        </div>
        <div class="detail-art">${art(chip, true)}</div>
      </div>
    </div>
    <div class="detail-main wrap">
      ${highlights ? `<section class="detail-section spec-section">
        <h3>规格一览</h3>
        <div class="spec-grid" data-reveal>${highlights}</div>
      </section>` : ''}
      ${official ? `<section class="detail-section">
        <h3>Apple 官方性能对比</h3>
        <div class="detail-official">${officialChart(official, chip.id)}</div>
      </section>` : ''}
      ${diePhoto ? `<section class="detail-section"><h3>芯片封装</h3><figure class="official-figure" data-reveal><img src="${escape(diePhoto.url)}" alt="${escape(chip.name)} 的 Apple 官方芯片封装图" loading="lazy" decoding="async"><figcaption>${sourceLink(diePhoto.source, '查看 Apple 原图', 'text-link')}</figcaption></figure></section>` : ''}
      ${officialFigure ? `<section class="detail-section"><h3>Apple 官方图表</h3><figure class="official-figure" data-reveal><img src="${escape(officialFigure.url)}" alt="${escape(chip.name)} 的 Apple 官方 CPU 图表" loading="lazy" decoding="async"><figcaption>${sourceLink(officialFigure.source, '查看 Apple 原文', 'text-link')}</figcaption></figure></section>` : ''}
      ${scores ? `<section class="detail-section"><h3>Geekbench 7 CPU</h3>${scores}</section>` : ''}
      ${chip.devices?.length ? `<section class="detail-section"><h3>搭载设备</h3><ul class="device-list" data-reveal>${chip.devices.map((device, index) => `<li style="--step:${Math.min(index, 9)}">${escape(device)}</li>`).join('')}</ul></section>` : ''}
      ${specs.length ? `<section class="detail-section"><h3>完整参数</h3><table><tbody data-reveal>${specs.map(([label, value], index) => `<tr style="--step:${Math.min(index, 9)}"><th scope="row">${escape(label)}</th><td>${dataValue(value)}</td></tr>`).join('')}</tbody></table></section>` : ''}
      <section class="detail-section"><h3>资料来源</h3><ul class="sources">${list.map((source) => `<li>${sourceLink(source.url, source.title)}</li>`).join('')}</ul></section>
    </div>`;
  renderCompareButtons();
}

const motion = matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver;

function animateCounters(group) {
  group.querySelectorAll('[data-counter]').forEach((counter, index) => {
    const value = Number(counter.dataset.counter);
    const precision = Number.isInteger(value) ? 1 : 100;
    const start = performance.now() + index * 55;
    counter.textContent = '0';

    function frame(now) {
      if (!counter.isConnected || !dialog.open) return;
      const fraction = motion.matches ? 1 : Math.min(1, Math.max(0, (now - start) / 650));
      const eased = 1 - (1 - fraction) ** 3;
      counter.textContent = format.format(Math.round(value * eased * precision) / precision);
      if (fraction < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  });
}

function watchDetail() {
  revealObserver?.disconnect();
  if (motion.matches || !('IntersectionObserver' in window)) return;
  revealObserver = new IntersectionObserver((entries, observer) => {
    for (const {target, isIntersecting} of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      target.classList.add('is-visible');
      animateCounters(target);
    }
  }, {root: dialog, rootMargin: '0px 0px -24px 0px'});
  dialog.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((group) => revealObserver.observe(group));
}

function followHash(event) {
  const id = location.hash.startsWith('#chip/') ? location.hash.slice(6) : '';
  const chip = chipById.get(id);
  if (!chip) {
    if (dialog.open) dialog.close();
    return;
  }
  if (!dialog.open) {
    const previous = event?.oldURL ? new URL(event.oldURL).hash : '';
    returnHash = previous.startsWith('#chip/') ? '' : previous;
    returnFocus = document.activeElement;
  }
  renderDetail(chip);
  dialog.scrollTop = 0;
  if (!dialog.open) dialog.showModal();
  watchDetail();
  find('.detail-close').focus({preventScroll: true});
}

function dismissDetail() {
  if (location.hash.startsWith('#chip/')) {
    history.replaceState(null, '', location.pathname + location.search + returnHash);
  }
  dialog.close();
  returnFocus?.focus({preventScroll: true});
}

find('.detail-close').addEventListener('click', dismissDetail);
dialog.addEventListener('cancel', (event) => {
  event.preventDefault();
  dismissDetail();
});
dialog.addEventListener('close', () => revealObserver?.disconnect());
dialog.querySelector('#detail-content').addEventListener('click', (event) => {
  const button = event.target.closest('[data-apple-test]');
  if (button) {
    const chart = button.closest('[data-official-chart]');
    const group = appleTests.find((entry) => entry.id === chart.dataset.officialChart);
    const test = button.dataset.appleTest;
    activeTests.set(group.id, test);
    chart.parentElement.innerHTML = officialChart(group, chart.dataset.featured);
    watchDetail();
    dialog.querySelector(`[data-apple-test="${test}"]`)?.focus({preventScroll: true});
    return;
  }
  if (!event.target.closest('a[href="#compare"]')) return;
  event.preventDefault();
  dialog.close();
  location.hash = 'compare';
  find('#compare').scrollIntoView();
  find('#compare-heading').focus({preventScroll: true});
});
window.addEventListener('hashchange', followHash);

renderCatalog();
createComparePicks();
updateCompare();
renderBench();
followHash();
