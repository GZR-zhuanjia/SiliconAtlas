(() => {
  const studio = 'https://www.apple.com/mac-studio/';
  const macbook = 'https://www.apple.com/macbook-pro/liquid-retina-xdr-display/';
  const studioUltra = [
    ['m5-ultra', 'M5 Ultra', 'Mac Studio（2026）'],
    ['m3-ultra', 'M3 Ultra', 'Mac Studio（2025）'],
    ['m1-ultra', 'M1 Ultra', 'Mac Studio（2022）'],
  ];
  const studioMax = [
    ['m5-max', 'M5 Max', 'Mac Studio（2026）'],
    ['m4-max', 'M4 Max', 'Mac Studio（2025）'],
    ['m1-max', 'M1 Max', 'Mac Studio（2022）'],
  ];
  const notebook = [
    ['m6', 'M6', '14 英寸 MacBook Pro'],
    ['m5', 'M5', '14 英寸 MacBook Pro'],
    ['m1', 'M1', '13 英寸 MacBook Pro'],
  ];
  const notebookPro = [
    ['m5-pro', 'M5 Pro', '14 英寸 MacBook Pro'],
    ['m4-pro', 'M4 Pro', '14 英寸 MacBook Pro'],
    ['m1-pro', 'M1 Pro', '14 英寸 MacBook Pro'],
  ];
  const phones = [
    ['a20-pro', 'A20 Pro', 'iPhone 18 Pro · Apple 公布的最高值'],
    ['a19-pro', 'A19 Pro', 'iPhone 17 Pro'],
  ];
  const test = (devices, id, label, description, values) => ({
    id, label, description,
    rows: devices.map(([chip, name, note], i) => ({chip, label: name, value: values[i], note})),
  });

  // Values reproduce the relative figures Apple publishes for each workload.
  // Each test has its own baseline. A shorter duration is expressed as a speed ratio.
  window.appleTests = [
    {
      id: 'studio-ultra', chip: 'm5-ultra', title: 'Mac Studio · Ultra',
      source: studio, sourceTitle: 'Apple · Mac Studio 性能',
      note: 'Apple 于 2026 年 7 月测试。每项以 M1 Ultra 版 Mac Studio 为 1×；结果取决于所测整机、软件和项目。',
      tests: [
        test(studioUltra, 'studio-ultra-xcode', 'Xcode 编译', '比较在 Xcode 中构建项目的速度。', [2.4, 1.8, 1]),
        test(studioUltra, 'studio-ultra-redshift', 'Redshift 3D 渲染', '比较在 Maxon Redshift 中渲染场景的速度。', [4.7, 2.8, 1]),
        test(studioUltra, 'studio-ultra-llm', 'LM Studio 首个 token', '比较本地大语言模型处理提示词后生成首个 token 的速度。', [9.8, 2.4, 1]),
        test(studioUltra, 'studio-ultra-nuke', 'Nuke CopyCat 训练', '比较 Foundry Nuke 中 CopyCat 机器学习训练的速度。', [15.4, 4.6, 1]),
        test(studioUltra, 'studio-ultra-basecalling', 'MinKNOW 碱基识别', '比较 Oxford Nanopore MinKNOW 从测序信号识别 DNA 碱基的速度。', [3.3, 1.6, 1]),
      ],
    },
    {
      id: 'macbook-m6', chip: 'm6', title: 'MacBook Pro · M6',
      source: macbook, sourceTitle: 'Apple · MacBook Pro 性能',
      note: 'Apple 于 2026 年 9 月测试。每项以 13 英寸 M1 版 MacBook Pro 为 1×；M6 和 M5 均为 14 英寸机型。',
      tests: [
        test(notebook, 'm6-xcode', 'Xcode 编译', '比较在 Xcode 中构建项目的速度。', [2.5, 2, 1]),
        test(notebook, 'm6-blender', 'Blender 光线追踪渲染', '比较在 Blender 中使用光线追踪渲染的速度。', [11.7, 9.2, 1]),
        test(notebook, 'm6-llm', '本地大模型首个 token', '比较本地大语言模型处理提示词后生成首个 token 的速度。', [13, 10.3, 1]),
        test(notebook, 'm6-affinity', 'Affinity 图像处理', '比较在 Affinity 中处理图像的速度。', [3.3, 2.8, 1]),
        test(notebook, 'm6-logic', 'Logic Pro 音轨导出', '比较在 Logic Pro 中将音轨渲染成音频的速度。', [2.9, 1.7, 1]),
        test(notebook, 'm6-topaz', 'Topaz Video AI 视频增强', '比较在 Topaz Video 中使用 AI 增强视频的速度。', [7.1, 4.9, 1]),
      ],
    },
    {
      id: 'iphone-a20-pro', chip: 'a20-pro', title: 'iPhone · A20 Pro',
      source: 'https://www.apple.com/iphone-18-pro/', sourceTitle: 'Apple · iPhone 18 Pro 性能',
      note: 'Apple 公布 iPhone 18 Pro 的图形性能最高快 40%。以 iPhone 17 Pro 为 1× 换算成 1.4×；Apple 未公开具体图形场景，且结果包含整机散热设计的影响。',
      tests: [
        test(phones, 'a20-pro-graphics', '图形性能（最高值）', 'Apple 对两款 iPhone Pro 整机的图形性能比较。', [1.4, 1]),
      ],
    },
    {
      id: 'studio-max', chip: 'm5-max', title: 'Mac Studio · Max',
      source: studio, sourceTitle: 'Apple · Mac Studio 性能',
      note: 'Apple 于 2026 年 7 月测试。每项以 M1 Max 版 Mac Studio 为 1×；结果取决于所测整机、软件和项目。',
      tests: [
        test(studioMax, 'studio-max-xcode', 'Xcode 编译', '比较在 Xcode 中构建项目的速度。', [2.5, 2.1, 1]),
        test(studioMax, 'studio-max-redshift', 'Redshift 3D 渲染', '比较在 Maxon Redshift 中渲染场景的速度。', [4.9, 3.5, 1]),
        test(studioMax, 'studio-max-llm', 'LM Studio 首个 token', '比较本地大语言模型处理提示词后生成首个 token 的速度。', [10.7, 2.8, 1]),
        test(studioMax, 'studio-max-magic-mask', 'DaVinci Resolve 智能遮罩', '比较在 DaVinci Resolve Studio 中运行 Magic Mask 的速度。', [5.3, 1.8, 1]),
        test(studioMax, 'studio-max-nuke', 'Nuke CopyCat 训练', '比较 Foundry Nuke 中 CopyCat 机器学习训练的速度。', [14.1, 4.9, 1]),
      ],
    },
    {
      id: 'macbook-m5-pro', chip: 'm5-pro', title: 'MacBook Pro · M5 Pro',
      source: macbook, sourceTitle: 'Apple · MacBook Pro 性能',
      note: '三款均为 Apple 产品页比较的 14 英寸机型，每项以 M1 Pro 为 1×；与 16 英寸机型的单独测试条件不同。',
      tests: [
        test(notebookPro, 'm5-pro-xcode', 'Xcode 编译', '比较在 Xcode 中构建项目的速度。', [2.1, 1.8, 1]),
        test(notebookPro, 'm5-pro-redshift', 'Redshift 3D 渲染', '比较在 Maxon Redshift 中渲染场景的速度。', [5.1, 3.6, 1]),
        test(notebookPro, 'm5-pro-llm', '本地大模型首个 token', '比较本地大语言模型处理提示词后生成首个 token 的速度。', [10.9, 2.7, 1]),
        test(notebookPro, 'm5-pro-text-image', 'AI 文生图', '比较从文本提示词生成图像的速度。', [7.6, 2, 1]),
      ],
    },
  ];
})();
