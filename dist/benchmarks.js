(() => {
  // Geekbench Browser's Geekbench 7 device charts, checked 2026-11-06.
  // Rows pair single-core and multi-core scores from the same device/configuration.
  const rows = (entries) => entries.map(([chip, label, device, single, multi, note, source]) => ({
    chip, label, device, values: { single, multi }, ...(note ? { note } : {}), ...(source ? { source } : {})
  }));

  const metrics = [
    { id: 'single', label: 'CPU 单核', unit: '分' },
    { id: 'multi', label: 'CPU 多核', unit: '分' }
  ];

  window.chipBenchmarks = [
    {
      id: 'mac-geekbench-7',
      title: 'Mac · Geekbench 7 CPU',
      description: 'Geekbench Browser 根据用户提交的 Geekbench 7 成绩计算各机型的平均分，每款机型至少有 5 条独立结果。以下为 2026 年 11 月 6 日查阅时的分数；分数越高越好。机身散热、系统版本及芯片配置会影响结果。同一芯片在其他机型上可能得分不同。',
      source: 'https://browser.geekbench.com/mac-benchmarks',
      sourceTitle: 'Geekbench Browser · Mac 榜单',
      metrics,
      rows: rows([
        ['m6', 'M6', 'Mac mini（2026）', 4004, 21878, '12 核 CPU、12 核 GPU'],
        ['m5-ultra', 'M5 Ultra', 'Mac Studio（2026）', 3726, 51829, '36 核 CPU、80 核 GPU'],
        ['m5-max', 'M5 Max', '16 英寸 MacBook Pro（2026）', 3721, 34987, '18 核 CPU、40 核 GPU'],
        ['m5-pro', 'M5 Pro', '16 英寸 MacBook Pro（2026）', 3692, 33571, '18 核 CPU、20 核 GPU'],
        ['m5', 'M5', '14 英寸 MacBook Pro（2025）', 3648, 17952, '10 核 CPU、10 核 GPU'],
        ['m4-max', 'M4 Max', '16 英寸 MacBook Pro（2024）', 3380, 28376, '16 核 CPU、40 核 GPU'],
        ['m4-pro', 'M4 Pro', '16 英寸 MacBook Pro（2024）', 3371, 24823, '14 核 CPU、20 核 GPU'],
        ['m4', 'M4', 'Mac mini（2024）', 3278, 15298, '10 核 CPU、10 核 GPU'],
        ['m3-ultra', 'M3 Ultra', 'Mac Studio（2025）', 2920, 39123, '32 核 CPU、80 核 GPU'],
        ['m3-max', 'M3 Max', '16 英寸 MacBook Pro（2023 年 11 月）', 2825, 24720, '16 核 CPU、40 核 GPU'],
        ['m3-pro', 'M3 Pro', '16 英寸 MacBook Pro（2023 年 11 月）', 2817, 16937, '12 核 CPU、18 核 GPU'],
        ['m3', 'M3', '14 英寸 MacBook Pro（2023 年 11 月）', 2771, 11533, '8 核 CPU、10 核 GPU'],
        ['m2-ultra', 'M2 Ultra', 'Mac Studio（2023）', 2550, 28154, '24 核 CPU、76 核 GPU'],
        ['m2-max', 'M2 Max', '16 英寸 MacBook Pro（2023）', 2493, 17041, '12 核 CPU、38 核 GPU'],
        ['m2-pro', 'M2 Pro', '16 英寸 MacBook Pro（2023）', 2422, 16397, '12 核 CPU、19 核 GPU'],
        ['m2', 'M2', 'Mac mini（2023）', 2401, 9744, '8 核 CPU、10 核 GPU'],
        ['m1-ultra', 'M1 Ultra', 'Mac Studio（2022）', 2219, 23526, '20 核 CPU'],
        ['m1-max', 'M1 Max', '16 英寸 MacBook Pro（2021）', 2215, 14158, '10 核 CPU'],
        ['m1-pro', 'M1 Pro', '14 英寸 MacBook Pro（2021）', 2200, 13913, '10 核 CPU'],
        ['m1', 'M1', 'Mac mini（2020 年末）', 2192, 8557, '8 核 CPU'],
        ['a18-pro', 'A18 Pro', 'MacBook Neo', 2930, 7275, '6 核 CPU、5 核 GPU；这是 Mac 机型的成绩。']
      ])
    },
    {
      id: 'iphone-geekbench-7',
      title: 'iPhone · Geekbench 7 CPU',
      description: '以下为 Geekbench Browser iOS 榜单上各 iPhone 机型的平均分（2026 年 11 月 6 日查阅）。每款机型至少有 5 条独立结果。分数仅反映该机型在这项 CPU 测试中的表现，系统版本、散热与功耗设定都可能影响结果。',
      source: 'https://browser.geekbench.com/ios-benchmarks',
      sourceTitle: 'Geekbench Browser · iOS 榜单',
      metrics,
      rows: rows([
        ['a20-pro', 'A20 Pro', 'iPhone 18 Pro', 3986, 11209],
        ['a19-pro', 'A19 Pro', 'iPhone 17 Pro', 3162, 8782],
        ['a19', 'A19', 'iPhone 17', 3008, 8305],
        ['a18-pro', 'A18 Pro', 'iPhone 16 Pro', 2896, 7805],
        ['a18', 'A18', 'iPhone 16', 2798, 7591],
        ['a17-pro', 'A17 Pro', 'iPhone 15 Pro', 2505, 6824],
        ['a16', 'A16 Bionic', 'iPhone 14 Pro', 2368, 6411],
        ['a15', 'A15 Bionic', 'iPhone 13 Pro', 2115, 5474],
        ['a14', 'A14 Bionic', 'iPhone 12 Pro', 1892, 4500],
        ['a13', 'A13 Bionic', 'iPhone 11 Pro Max', 1517, 3470],
        ['a12', 'A12 Bionic', 'iPhone XS', 1280, 2657]
      ])
    }
  ];
})();
