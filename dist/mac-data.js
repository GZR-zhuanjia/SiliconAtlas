// Announcement dates and maximum shipping configurations, from Apple.
(function () {
  'use strict';
  const n = (title, slug) => [title, 'https://www.apple.com/newsroom/' + slug + '/'];
  const s = (title, id, region = 'en-us') => [title, 'https://support.apple.com/' + region + '/' + id];
  const m1 = n('Apple 发布 M1', '2020/11/apple-unleashes-m1');
  const m1Pro = n('Apple 发布 M1 Pro 和 M1 Max', '2021/10/introducing-m1-pro-and-m1-max-the-most-powerful-chips-apple-has-ever-built');
  const m1Ultra = n('Apple 发布 M1 Ultra', '2022/03/apple-unveils-m1-ultra-the-worlds-most-powerful-chip-for-a-personal-computer');
  const m2 = n('Apple 发布 M2', '2022/06/apple-unveils-m2-with-breakthrough-performance-and-capabilities');
  const m2Pro = n('Apple 发布 M2 Pro 和 M2 Max', '2023/01/apple-unveils-m2-pro-and-m2-max-next-generation-chips-for-next-level-workflows');
  const m2Ultra = n('Apple 发布 M2 Ultra', '2023/06/apple-introduces-m2-ultra');
  const m3 = n('Apple 发布 M3、M3 Pro 和 M3 Max', '2023/10/apple-unveils-m3-m3-pro-and-m3-max-the-most-advanced-chips-for-a-personal-computer');
  const m3Ultra = n('Apple 发布 M3 Ultra', '2025/03/apple-reveals-m3-ultra-taking-apple-silicon-to-a-new-extreme');
  const m4 = n('Apple 发布 M4', '2024/05/apple-introduces-m4-chip');
  const m4Mac = n('Apple 发布 M4 Pro 和 M4 Max', '2024/10/apple-introduces-m4-pro-and-m4-max');
  const m4Mini = n('Apple 公布搭载 M4 Pro 的 Mac mini', '2024/10/apples-new-mac-mini-is-more-mighty-more-mini-and-built-for-apple-intelligence');
  const m5 = n('Apple 发布 M5', '2025/10/apple-unleashes-m5-the-next-big-leap-in-ai-performance-for-apple-silicon');
  const m5Pro = n('Apple 发布 M5 Pro 和 M5 Max', '2026/03/apple-debuts-m5-pro-and-m5-max-to-supercharge-the-most-demanding-pro-workflows');
  const m6 = n('Apple 发布 M6 和 M5 Ultra', '2026/08/apple-introduces-m6-and-m5-ultra-for-a-big-leap-in-performance-and-ai-compute');
  const studio22 = s('Mac Studio（2022）技术规格', 111900);
  const studio23 = s('Mac Studio（2023）技术规格', 111835, 'en-gb');
  const studio25 = s('Mac Studio（2025）技术规格', 122211, 'en-gb');
  const studio26 = s('Mac Studio（M5 Max 或 M5 Ultra）技术规格', 128107);
  const mbpM3 = s('MacBook Pro（M3 Pro 或 M3 Max）技术规格', 117736, 'en-mide');
  const mbpM4 = s('MacBook Pro（M4 Pro 或 M4 Max）技术规格', 121553);
  const mbpM5 = s('MacBook Pro（M5 Pro 或 M5 Max）技术规格', 126319, 'en-ca');
  const miniM6 = s('Mac mini（M6 或 M5 Pro）技术规格', 128108);
  const mbpM6 = n('Apple 公布搭载 M6 的 14 英寸 MacBook Pro', '2026/10/apple-introduces-the-new-14-inch-macbook-pro-with-m6');
  const pro = ['MacBook Pro（14 英寸）', 'MacBook Pro（16 英寸）'];
  const proRes = 'H.264、HEVC、ProRes、ProRes RAW 硬件加速';
  const av1 = proRes + '；支持 AV1 解码';
  const maxEngine = '2 个视频编码引擎、2 个 ProRes 编解码引擎';
  const ultraEngine = '4 个视频编码引擎、4 个 ProRes 编解码引擎';
  const proResMax = proRes + '；' + maxEngine;
  const proResUltra = proRes + '；' + ultraEngine;
  const av1Max = av1 + '；' + maxEngine;
  const av1Ultra = av1 + '；' + ultraEngine;
  const appleSource = ([title, url]) => ({title, url});
  const create = ({
    id, name, date, tag, description, devices, source, sources,
    process, cpu, gpu, neural, memory, bandwidth, transistors, media, extra
  }) => ({
    id, name, series: 'M', year: Number(date.slice(0, 4)), date, tag, description, devices,
    source: source[1], sourceTitle: source[0],
    ...(sources ? {sources: sources.map(appleSource)} : {}),
    specs: {
      process, cpu: cpu[1], gpu: gpu[1], neural: neural[1],
      memory: '最高 ' + memory + ' GB',
      bandwidth: bandwidth === null ? null : bandwidth >= 1000 ? bandwidth / 1000 + ' TB/s' : bandwidth + ' GB/s',
      transistors: transistors === null ? null : (Math.round(transistors * 10)) + ' 亿',
      media, ...(extra ? {extra} : {})
    },
    metrics: {cpu: cpu[0], gpu: gpu[0], neural: neural[0], memory, bandwidth, transistors}
  });

  window.macChips = [
    {
      id: 'm1', name: 'M1', date: '2020-11-10', tag: 'Mac 转向 Apple 芯片',
      description: 'Apple 首款专为 Mac 设计的芯片，将 CPU、GPU 和统一内存架构集成到同一系统级芯片。',
      devices: ['MacBook Air', 'MacBook Pro（13 英寸）', 'Mac mini', 'iMac（24 英寸）', 'iPad Pro', 'iPad Air'],
      source: m1, sources: [
        s('MacBook Air（M1，2020）技术规格', 111883),
        ['Apple 比较搭载 M1 和 M2 的 MacBook Air', 'https://www.apple.com/macbook-air/compare/?modelList=MacBook-Air-M1,MacBook-Air-M2,MacBook-Air-M2-15']
      ],
      process: '5 纳米', cpu: [8, '8 核（4 性能 + 4 能效）'], gpu: [8, '最高 8 核'],
      neural: [16, '16 核（最高 11 TOPS）'], memory: 16, bandwidth: null, transistors: 16,
      media: 'H.264、HEVC 硬件加速'
    },
    {
      id: 'm1-pro', name: 'M1 Pro', date: '2021-10-18', tag: '专业笔记本',
      description: '将 M1 架构扩展到专业笔记本，加入专用 ProRes 引擎，并将统一内存上限提高至 32 GB。',
      devices: pro, source: m1Pro,
      process: '5 纳米', cpu: [10, '最高 10 核（8 性能 + 2 能效）'], gpu: [16, '最高 16 核'],
      neural: [16, '16 核'], memory: 32, bandwidth: 200, transistors: 33.7, media: proRes
    },
    {
      id: 'm1-max', name: 'M1 Max', date: '2021-10-18', tag: '高端图形',
      description: '在 M1 Pro 的基础上，将最高 GPU 核数和统一内存带宽翻倍。',
      devices: [...pro, 'Mac Studio'], source: m1Pro, sources: [studio22],
      process: '5 纳米', cpu: [10, '10 核（8 性能 + 2 能效）'], gpu: [32, '最高 32 核'],
      neural: [16, '16 核'], memory: 64, bandwidth: 400, transistors: 57, media: proResMax
    },
    {
      id: 'm1-ultra', name: 'M1 Ultra', date: '2022-03-08', tag: '桌面工作站',
      description: '首度采用 UltraFusion 将两颗 M1 Max 芯粒连成一颗芯片，为初代 Mac Studio 提供最高 128 GB 统一内存。',
      devices: ['Mac Studio'], source: m1Ultra, sources: [studio22],
      process: '5 纳米', cpu: [20, '20 核（16 性能 + 4 能效）'], gpu: [64, '最高 64 核'],
      neural: [32, '32 核（最高 22 TOPS）'], memory: 128, bandwidth: 800, transistors: 114, media: proResUltra,
      extra: 'UltraFusion 双芯粒封装'
    },
    {
      id: 'm2', name: 'M2', date: '2022-06-06', tag: '主流通用',
      description: '在基础款 M 系列上加入 ProRes 硬件加速，并将统一内存上限提升至 24 GB。',
      devices: ['MacBook Air', 'MacBook Pro（13 英寸）', 'Mac mini', 'iPad Pro', 'iPad Air', 'Apple Vision Pro'],
      source: m2, sources: [s('MacBook Air（M2，2022）技术规格', 111867)],
      process: '第二代 5 纳米', cpu: [8, '8 核（4 性能 + 4 能效）'], gpu: [10, '最高 10 核'],
      neural: [16, '16 核（最高 15.8 TOPS）'], memory: 24, bandwidth: 100, transistors: 20, media: proRes
    },
    {
      id: 'm2-pro', name: 'M2 Pro', date: '2023-01-17', tag: '专业通用',
      description: '将专业版 CPU 提高到最多 12 核，并首次将 Pro 级芯片带到 Mac mini。',
      devices: [...pro, 'Mac mini'], source: m2Pro,
      process: '第二代 5 纳米', cpu: [12, '最高 12 核（8 性能 + 4 能效）'], gpu: [19, '最高 19 核'],
      neural: [16, '16 核（最高 15.8 TOPS）'], memory: 32, bandwidth: 200, transistors: 40, media: proRes
    },
    {
      id: 'm2-max', name: 'M2 Max', date: '2023-01-17', tag: '高端图形',
      description: '在与 M2 Pro 相同的 12 核 CPU 基础上，将 GPU 扩展到最多 38 核，统一内存最高 96 GB。',
      devices: [...pro, 'Mac Studio'], source: m2Pro, sources: [studio23],
      process: '第二代 5 纳米', cpu: [12, '12 核（8 性能 + 4 能效）'], gpu: [38, '最高 38 核'],
      neural: [16, '16 核（最高 15.8 TOPS）'], memory: 96, bandwidth: 400, transistors: 67, media: proResMax
    },
    {
      id: 'm2-ultra', name: 'M2 Ultra', date: '2023-06-05', tag: '桌面工作站',
      description: '通过 UltraFusion 连接两颗 M2 Max，并让 Mac Pro 首次采用 Apple 芯片。',
      devices: ['Mac Studio', 'Mac Pro'], source: m2Ultra, sources: [studio23],
      process: '第二代 5 纳米', cpu: [24, '24 核（16 性能 + 8 能效）'], gpu: [76, '最高 76 核'],
      neural: [32, '32 核（最高 31.6 TOPS）'], memory: 192, bandwidth: 800, transistors: 134, media: proResUltra,
      extra: 'UltraFusion 双芯粒封装'
    },
    {
      id: 'm3', name: 'M3', date: '2023-10-30', tag: '主流通用',
      description: 'M 系列首次采用 3 纳米制程，并引入支持动态缓存、网格着色和硬件光线追踪的 GPU。',
      devices: ['MacBook Air', 'MacBook Pro（14 英寸）', 'iMac（24 英寸）', 'iPad Air'],
      source: m3, sources: [
        s('MacBook Pro（M3）技术规格', 117735, 'en-gb'),
        n('Apple 公布搭载 M3 的 iPad Air', '2025/03/apple-introduces-ipad-air-with-powerful-m3-chip-and-new-magic-keyboard')
      ],
      process: '3 纳米', cpu: [8, '8 核（4 性能 + 4 能效）'], gpu: [10, '最高 10 核'],
      neural: [16, '16 核'], memory: 24, bandwidth: 100, transistors: 25, media: av1,
      extra: '动态缓存、硬件光线追踪和网格着色'
    },
    {
      id: 'm3-pro', name: 'M3 Pro', date: '2023-10-30', tag: '专业笔记本',
      description: '在 3 纳米架构上提供最多 12 核 CPU 和 18 核 GPU，并将统一内存上限提高至 36 GB。',
      devices: pro, source: m3, sources: [mbpM3],
      process: '3 纳米', cpu: [12, '最高 12 核（6 性能 + 6 能效）'], gpu: [18, '最高 18 核'],
      neural: [16, '16 核'], memory: 36, bandwidth: 150, transistors: 37, media: av1
    },
    {
      id: 'm3-max', name: 'M3 Max', date: '2023-10-30', tag: '高端图形',
      description: '将 GPU 扩展到最多 40 核，首次在 MacBook Pro 上提供最高 128 GB 统一内存。',
      devices: pro, source: m3, sources: [mbpM3],
      process: '3 纳米', cpu: [16, '最高 16 核（12 性能 + 4 能效）'], gpu: [40, '最高 40 核'],
      neural: [16, '16 核'], memory: 128, bandwidth: 400, transistors: 92, media: av1Max
    },
    {
      id: 'm3-ultra', name: 'M3 Ultra', date: '2025-03-05', tag: '桌面工作站',
      description: '连接两颗 M3 Max 芯粒，提供最多 80 核 GPU 和最高 512 GB 统一内存。',
      devices: ['Mac Studio'], source: m3Ultra, sources: [studio25],
      process: '3 纳米', cpu: [32, '最高 32 核（24 性能 + 8 能效）'], gpu: [80, '最高 80 核'],
      neural: [32, '32 核'], memory: 512, bandwidth: 819, transistors: 184, media: av1Ultra,
      extra: 'UltraFusion 双芯粒封装、Thunderbolt 5'
    },
    {
      id: 'm4', name: 'M4', date: '2024-05-07', tag: '主流通用',
      description: '首发于 iPad Pro，采用第二代 3 纳米制程，并配备最高 38 TOPS 的神经网络引擎。',
      devices: ['iPad Pro', 'MacBook Air', 'MacBook Pro（14 英寸）', 'Mac mini', 'iMac（24 英寸）', 'iPad Air'],
      source: m4, sources: [m4Mac, n('Apple 公布搭载 M4 的 iPad Air', '2026/03/apple-introduces-the-new-ipad-air-powered-by-m4')],
      process: '第二代 3 纳米', cpu: [10, '最高 10 核（4 性能 + 6 能效）'], gpu: [10, '最高 10 核'],
      neural: [16, '16 核（最高 38 TOPS）'], memory: 32, bandwidth: 120, transistors: 28, media: av1,
      extra: 'iPad Pro 版支持串联 OLED 显示屏'
    },
    {
      id: 'm4-pro', name: 'M4 Pro', date: '2024-10-29', tag: '专业通用',
      description: '随 Mac mini 首次亮相，为专业 Mac 提供最多 14 核 CPU，并带来 Thunderbolt 5。',
      devices: [...pro, 'Mac mini'], source: m4Mini, sources: [m4Mac, mbpM4],
      process: '第二代 3 纳米', cpu: [14, '最高 14 核（10 性能 + 4 能效）'], gpu: [20, '最高 20 核'],
      neural: [16, '16 核'], memory: 64, bandwidth: 273, transistors: null, media: av1,
      extra: 'Thunderbolt 5'
    },
    {
      id: 'm4-max', name: 'M4 Max', date: '2024-10-30', tag: '高端图形',
      description: '提供最多 40 核 GPU、最高 546 GB/s 统一内存带宽，以及双视频编码引擎。',
      devices: [...pro, 'Mac Studio'], source: m4Mac, sources: [mbpM4, studio25],
      process: '第二代 3 纳米', cpu: [16, '最高 16 核（12 性能 + 4 能效）'], gpu: [40, '最高 40 核'],
      neural: [16, '16 核'], memory: 128, bandwidth: 546, transistors: null, media: av1Max,
      extra: 'Thunderbolt 5'
    },
    {
      id: 'm5', name: 'M5', date: '2025-10-15', tag: '主流通用',
      description: '在每个 GPU 核心中加入神经网络加速器，将统一内存带宽提升至 153 GB/s。',
      devices: ['MacBook Air', 'MacBook Pro（14 英寸）', 'iPad Pro', 'Apple Vision Pro'],
      source: m5, sources: [
        n('Apple 公布搭载 M5 的 MacBook Air', '2026/03/apple-introduces-the-new-macbook-air-with-m5'),
        ['MacBook Pro 技术规格', 'https://www.apple.com/macbook-pro/specs/']
      ],
      process: '第三代 3 纳米', cpu: [10, '最高 10 核（4 性能 + 6 能效）'], gpu: [10, '10 核'],
      neural: [16, '16 核'], memory: 32, bandwidth: 153, transistors: null, media: av1,
      extra: '每个 GPU 核心内置神经网络加速器'
    },
    {
      id: 'm5-pro', name: 'M5 Pro', date: '2026-03-03', tag: '专业通用',
      description: '采用双芯粒 Fusion 架构，提供最多 18 核 CPU 和 20 核 GPU。',
      devices: [...pro, 'Mac mini'], source: m5Pro, sources: [mbpM5, miniM6],
      process: '第三代 3 纳米', cpu: [18, '最高 18 核（6 超级 + 12 性能）'], gpu: [20, '最高 20 核'],
      neural: [16, '16 核'], memory: 64, bandwidth: 307, transistors: null, media: av1,
      extra: 'Fusion 双芯粒封装；每个 GPU 核心内置神经网络加速器'
    },
    {
      id: 'm5-max', name: 'M5 Max', date: '2026-03-03', tag: '高端图形',
      description: '在双芯粒 Fusion 架构上提供最多 40 核 GPU 和最高 614 GB/s 统一内存带宽。',
      devices: [...pro, 'Mac Studio'], source: m5Pro, sources: [mbpM5, studio26],
      process: '第三代 3 纳米', cpu: [18, '18 核（6 超级 + 12 性能）'], gpu: [40, '最高 40 核'],
      neural: [16, '16 核'], memory: 128, bandwidth: 614, transistors: null, media: av1Max,
      extra: 'Fusion 双芯粒封装；每个 GPU 核心内置神经网络加速器'
    },
    {
      id: 'm5-ultra', name: 'M5 Ultra', date: '2026-08-25', tag: '桌面工作站',
      description: '以 UltraFusion 连接两颗 M5 Max，形成 Apple 首个四芯粒架构，统一内存带宽达 1.2 TB/s。',
      devices: ['Mac Studio'], source: m6, sources: [
        studio26, n('Apple 公布搭载 M5 Ultra 的 Mac Studio', '2026/08/apple-introduces-new-mac-studio-with-m5-max-and-m5-ultra')
      ],
      process: '第三代 3 纳米', cpu: [36, '最高 36 核（12 超级 + 24 性能）'], gpu: [80, '最高 80 核'],
      neural: [32, '32 核'], memory: 512, bandwidth: 1200, transistors: null, media: av1Ultra,
      extra: 'UltraFusion 四芯粒封装；芯粒间带宽超过 4.4 TB/s'
    },
    {
      id: 'm6', name: 'M6', date: '2026-08-25', tag: '主流通用',
      description: 'Apple 首款 2 纳米芯片，拥有 12 核 CPU、12 核 GPU 和两组 16 核神经网络引擎。',
      devices: ['Mac mini', 'MacBook Pro（14 英寸）'], source: m6, sources: [miniM6, mbpM6],
      process: '2 纳米', cpu: [12, '12 核（2 超级 + 4 性能 + 6 能效）'], gpu: [12, '12 核'],
      neural: [32, '双 16 核（共 32 核）'], memory: 32, bandwidth: 170, transistors: null, media: av1,
      extra: '每个 GPU 核心内置神经网络加速器'
    }
  ].map(create);
})();

