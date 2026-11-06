(() => {
  'use strict';
  const newsroom = path => 'https://www.apple.com/newsroom/' + path;
  const support = id => 'https://support.apple.com/en-us/' + id;
  const apple = path => 'https://www.apple.com/' + path;
  const src = (title, url) => ({ title, url });
  const airpods = src('Apple · AirPods 机型比较', apple('airpods/compare/'));
  const watches = src('Apple · Apple Watch 机型比较', apple('watch/compare/'));
  const uwb = src('Apple 支持 · 超宽带的设备与地区可用性', support('109512'));
  const security = src('Apple 平台安全 · Secure Enclave', support('guide/security/sec59b0b31ff/web'));
  const chip = (id, name, series, date, tag, description, devices, links, specs = {}, metrics = {}) => ({
    id, name, series, year: Number(date.slice(0, 4)), date, tag, description, devices,
    source: links[0].url, sourceTitle: links[0].title, sources: links,
    specs: { process: null, cpu: null, gpu: null, neural: null, memory: null, bandwidth: null, transistors: null, media: null, ...specs },
    metrics: { cpu: null, gpu: null, neural: null, memory: null, bandwidth: null, transistors: null, ...metrics }
  });
  const dual = '双核';
  const dual64 = '64 位双核';
  const neural4 = '4 核神经网络引擎';
  window.specialtyChips = [
    chip('s1', 'S1', 'S', '2014-09-09', '首款手表 SiP', 'Apple 为初代 Apple Watch 设计的系统级封装，把计算机架构缩进一枚模块。',
      ['Apple Watch（初代）', 'Apple Watch Sport（初代）', 'Apple Watch Edition（初代）'], [
        src('Apple Newsroom · 初代 Apple Watch 发布', newsroom('2014/09/09Apple-Unveils-Apple-Watch-Apples-Most-Personal-Device-Ever/')),
        src('Apple Newsroom · 初代 Apple Watch 上市', newsroom('2015/03/09Apple-Watch-Available-in-Nine-Countries-on-April-24/'))
      ], { extra: { '封装': 'SiP（系统级封装）', '首次上市': '2015 年 4 月 24 日' } }),
    chip('s1p', 'S1P', 'S', '2016-09-07', '初代架构更新', 'Apple Watch Series 1 的双核版本。Apple 发布稿确认双核处理器；S1P 名称见第三方设备资料。',
      ['Apple Watch Series 1'], [
        src('Apple Newsroom · Apple Watch Series 1 / Series 2 发布', newsroom('2016/09/apple-introduces-apple-watch-series-2.html')),
        src('EveryMac · Apple Watch Series 1（S1P 型号）', 'https://everymac.com/devices/by-processor/all-apple-s1p-processor-apple-devices.html')
      ], { cpu: dual, extra: { '设备性能': 'Apple 称较初代 Apple Watch 最快提升 50%' } }, { cpu: 2 }),
    chip('s2', 'S2', 'S', '2016-09-07', '双核手表 SiP', 'Apple Watch Series 2 的双核芯片；该代手表首次配备内置 GPS。',
      ['Apple Watch Series 2', 'Apple Watch Nike+（Series 2）'], [
        src('Apple Newsroom · Apple Watch Series 2 发布', newsroom('2016/09/apple-introduces-apple-watch-series-2.html')),
        watches
      ], { cpu: dual, extra: { '设备性能': 'Apple 称较初代 Apple Watch 最快提升 50%' } }, { cpu: 2 }),
    chip('s3', 'S3', 'S', '2017-09-12', '手表 SiP', '更快的双核处理器缩短了应用启动时间，并让 Siri 首次能通过手表扬声器作答。',
      ['Apple Watch Series 3（GPS / GPS + 蜂窝网络）'], [
        src('Apple Newsroom · Apple Watch Series 3 发布', newsroom('2017/09/apple-watch-series-3-features-built-in-cellular-and-more/')),
        src('Apple 支持 · Apple Watch Series 3 技术规格', support('111891'))
      ], { cpu: dual, extra: { 'Apple 官方对比': '双核处理器比上一代快 70%', '配套无线芯片': 'W2' } }, { cpu: 2 }),
    chip('s4', 'S4', 'S', '2018-09-12', '首款 64 位手表 SiP', 'Apple 自研的 64 位双核处理器，为 Series 4 的新界面和功能提供算力。',
      ['Apple Watch Series 4'], [
        src('Apple Newsroom · Apple Watch Series 4 发布', newsroom('2018/09/redesigned-apple-watch-series-4-revolutionizes-communication-fitness-and-health/')),
        src('Apple 支持 · Apple Watch Series 4 技术规格', support('111984'))
      ], { cpu: dual64, extra: { 'Apple 官方对比': '性能最高达到上一代的 2 倍', '配套无线芯片': 'W3' } }, { cpu: 2 }),
    chip('s5', 'S5', 'S', '2019-09-10', '手表与智能音箱', '用于 Apple Watch Series 5 和初代 SE；在 HomePod mini 中负责实时分析音乐并调整声音。',
      ['Apple Watch Series 5', 'Apple Watch SE（第 1 代）', 'HomePod mini'], [
        src('Apple 支持 · Apple Watch Series 5 技术规格', support('118453')),
        src('Apple Newsroom · Apple Watch Series 5 发布', newsroom('2019/09/apple-unveils-apple-watch-series-5/')),
        src('Apple 支持 · Apple Watch SE（第 1 代）', support('111862')),
        src('Apple Newsroom · HomePod mini 计算音频', newsroom('2020/10/apple-introduces-homepod-mini-a-powerful-smart-speaker-with-amazing-sound/'))
      ], { cpu: dual64, media: '实时计算音频（HomePod mini）', extra: { '设备存储': '32 GB（Apple Watch Series 5）' } }, { cpu: 2 }),
    chip('s6', 'S6', 'S', '2020-09-15', '基于 A13 的双核', '采用基于 A13 仿生架构的双核处理器。Apple 称 S6 的运行速度较上一代最高提升 20%。',
      ['Apple Watch Series 6'], [
        src('Apple Newsroom · Apple Watch Series 6 发布', newsroom('2020/09/apple-watch-series-6-delivers-breakthrough-wellness-and-fitness-capabilities/')),
        watches
      ], { cpu: dual64, extra: { 'CPU 架构来源': '基于 A13 仿生的双核处理器', '配套无线芯片': 'W3、U1' } }, { cpu: 2 }),
    chip('s7', 'S7', 'S', '2021-09-14', '手表与智能音箱', '先用于 Apple Watch Series 7，后用于第二代 HomePod，配合系统传感器和软件处理计算音频。',
      ['Apple Watch Series 7', 'HomePod（第 2 代）'], [
        src('Apple 支持 · Apple Watch Series 7 技术规格', support('111909')),
        src('Apple Newsroom · Apple Watch Series 7 发布', newsroom('2021/09/apple-reveals-apple-watch-series-7-featuring-the-largest-most-advanced-display/')),
        src('Apple Newsroom · 第二代 HomePod 的 S7', newsroom('2023/01/apple-introduces-the-new-homepod-with-breakthrough-sound-and-intelligence/'))
      ], { cpu: dual64, media: '计算音频与空间感应（HomePod 第 2 代）', extra: { '设备存储': '32 GB（Apple Watch Series 7）' } }, { cpu: 2 }),
    chip('s8', 'S8', 'S', '2022-09-07', '一代覆盖三条产品线', '64 位双核系统级封装，同期用于 Series 8、第二代 SE 和首款 Apple Watch Ultra。',
      ['Apple Watch Series 8', 'Apple Watch SE（第 2 代）', 'Apple Watch Ultra'], [
        src('Apple 支持 · Apple Watch Series 8 技术规格', support('111848')),
        src('Apple Newsroom · Apple Watch Series 8 与 SE 发布', newsroom('2022/09/apple-reveals-apple-watch-series-8-and-the-new-apple-watch-se/')),
        src('Apple 支持 · Apple Watch Ultra 技术规格', support('111852'))
      ], { cpu: dual64, extra: { '设备存储': '32 GB（Series 8、SE 第 2 代、Ultra）' } }, { cpu: 2 }),
    chip('s9', 'S9', 'S', '2023-09-12', '4 核神经网络引擎', '新的 4 核神经网络引擎支持双指互点和 Siri 端侧处理。Apple 称机器学习任务较 Series 8 最快可达 2 倍速度。',
      ['Apple Watch Series 9', 'Apple Watch Ultra 2'], [
        src('Apple Newsroom · Apple Watch Series 9 与 S9 SiP', newsroom('2023/09/apple-introduces-the-advanced-new-apple-watch-series-9/')),
        src('Apple 支持 · Apple Watch Series 9 技术规格', support('111833')),
        watches,
        src('TechCrunch · Apple 发布会报道（晶体管）', 'https://techcrunch.com/2023/09/12/the-apple-watch-series-9-features-a-new-chip-the-s9/')
      ], { cpu: dual64, neural: neural4, transistors: '56 亿（发布会报道）', extra: { '设备存储': '64 GB（Series 9、Ultra 2）' } }, { cpu: 2, neural: 4, transistors: 5.6 }),
    chip('s10', 'S10', 'S', '2024-09-09', '更薄的手表封装', '面向更薄的手表设计，4 核神经网络引擎支持双指互点、Siri 端侧处理等功能。',
      ['Apple Watch Series 10', 'Apple Watch Series 11', 'Apple Watch Ultra 3', 'Apple Watch SE 3'], [
        src('Apple Newsroom · Apple Watch Series 10 发布', newsroom('2024/09/introducing-apple-watch-series-10/')),
        src('Apple 支持 · Apple Watch Series 10 技术规格', support('121202')),
        watches
      ], { cpu: dual64, neural: neural4, extra: { '设备存储': '64 GB（Series 10）' } }, { cpu: 2, neural: 4 }),
    chip('s11', 'S11', 'S', '2026-09-09', '健康感测与端侧音频', '与新一代健康传感器协作，提高心率和心率变异性测量频率，并通过硬件隔离区域处理部分音频功能。',
      ['Apple Watch Series 12', 'Apple Watch Ultra 4'], [
        src('Apple Newsroom · Apple Watch Series 12 与 S11', newsroom('2026/09/introducing-apple-watch-series-12-with-the-all-new-health-sensing-system/')),
        src('Apple · Apple Watch Series 12 技术规格', apple('apple-watch-series-12/specs/')),
        src('Apple Newsroom · Apple Watch Ultra 4 发布', newsroom('2026/09/apple-unveils-apple-watch-ultra-4/'))
      ], { cpu: dual64, neural: neural4, media: '端侧音频智能（部分功能分阶段推出）', extra: { '音频隔离': 'Secure Exclave', '设备存储': '64 GB（Series 12）' } }, { cpu: 2, neural: 4 }),
    chip('w1', 'W1', 'W', '2016-09-07', '低功耗耳机无线芯片', 'Apple 为初代 AirPods 设计的无线芯片，管理无线音频与电池续航，并支持快速配对。',
      ['AirPods（第 1 代）', 'Beats Solo3 Wireless', 'Beats Studio3 Wireless', 'Beats Flex', 'BeatsX', 'Powerbeats3 Wireless'], [
        src('Apple Newsroom · AirPods 与 W1 首次发布', newsroom('2016/09/apple-reinvents-the-wireless-headphones-with-airpods/')),
        src('Apple 支持 · 初代 AirPods 技术规格', support('111855')),
        src('Beats · 产品比较', 'https://www.beatsbydre.com/products/compare')
      ], { media: '低功耗无线音频与传感器联动', extra: { '耳机续航': '初代 AirPods 单次充电最长聆听 5 小时' } }),
    chip('w2', 'W2', 'W', '2017-09-12', '手表无线芯片', 'Apple Watch Series 3 的 Wi-Fi 和蓝牙芯片。Apple 称这一代 Wi-Fi 更快，同时降低了无线连接功耗。',
      ['Apple Watch Series 3（GPS / GPS + 蜂窝网络）'], [
        src('Apple Newsroom · Apple Watch Series 3 与 W2', newsroom('2017/09/apple-watch-series-3-features-built-in-cellular-and-more/')),
        src('Apple 支持 · Apple Watch Series 3 技术规格', support('111891'))
      ], { extra: { 'Wi-Fi 速度': 'Apple 官方对比：较上一代快 85%', '无线能效': 'Apple 官方对比：蓝牙和 Wi-Fi 能效提高 50%', '蓝牙': '4.2（Series 3）' } }),
    chip('w3', 'W3', 'W', '2018-09-12', '手表无线芯片', '随 Apple Watch Series 4 推出，后续用于多款 Apple Watch。各款手表的蓝牙和 Wi-Fi 规格以整机为准。',
      ['Apple Watch Series 4–9', 'Apple Watch SE（第 1、2 代）', 'Apple Watch Ultra / Ultra 2'], [
        src('Apple 支持 · Apple Watch Series 4 技术规格', support('111984')),
        watches
      ], { extra: { '首发机型蓝牙': 'Bluetooth 5.0（Series 4）', '首发机型 Wi-Fi': '802.11b/g/n，2.4 GHz（Series 4）' } }),
    chip('h1', 'H1', 'H', '2019-03-20', '耳机音频芯片', '专为耳机设计的音频芯片。第二代 AirPods 借此实现免提唤醒 Siri，并缩短设备切换连接时间。',
      ['AirPods（第 2、3 代）', 'AirPods Pro（第 1 代）', 'AirPods Max（第 1 代）', 'Powerbeats Pro', 'Powerbeats', 'Beats Solo Pro', 'Beats Fit Pro', 'Powerbeats Fit'], [
        src('Apple Newsroom · 第二代 AirPods 与 H1', newsroom('2019/03/airpods-the-worlds-most-popular-wireless-headphones-are-getting-even-better/')),
        airpods,
        src('Beats · Powerbeats Fit 技术规格', 'https://www.beatsbydre.com/earbuds/powerbeats-fit')
      ], { media: '定制音频架构、免提唤醒 Siri', extra: { '首发机型设备切换': '连接速度为初代 AirPods 的 2 倍' } }),
    chip('h2', 'H2', 'H', '2022-09-07', '计算音频与降噪', '支持更强的主动降噪和通透模式。不同耳机可借助 H2 实现自适应音频、个性化空间音频等功能。',
      ['AirPods Pro（第 2、3 代）', 'AirPods 4 / AirPods 4（主动降噪款）', 'AirPods 5', 'AirPods Max 2（每侧一枚）', 'Powerbeats Pro 2'], [
        src('Apple Newsroom · 第二代 AirPods Pro 与 H2', newsroom('2022/09/apple-announces-the-next-generation-of-airpods-pro/')),
        airpods,
        src('Apple Newsroom · AirPods 5 发布', newsroom('2026/09/apple-introduces-airpods-5-with-best-in-class-open-ear-active-noise-cancellation/')),
        src('Beats · Powerbeats Pro 2', 'https://www.beatsbydre.com/earbuds/powerbeats-pro-2')
      ], { media: '主动降噪、通透模式、空间音频（随设备而异）', extra: { '首发机型降噪': 'AirPods Pro（第 2 代）最高达前代的 2 倍' } }),
    chip('u1', 'U1', 'U', '2019-09-10', '第一代超宽带', 'Apple 的第一代超宽带芯片，提供近距离空间感知，可用于定向隔空投送、精确查找等体验。',
      ['iPhone 11–14 系列（不含 SE）', 'Apple Watch Series 6–8', 'Apple Watch Ultra', 'AirTag（第 1 代）', 'AirPods Pro（第 2 代）MagSafe 充电盒', 'HomePod mini / HomePod（第 2 代）'], [
        src('Apple 中国 · iPhone 11 与 U1 发布', 'https://www.apple.com.cn/newsroom/2019/09/apple-introduces-dual-camera-iphone-11/'),
        uwb
      ], { extra: { '无线技术': '超宽带（UWB）', '可用性': '部分功能受设备组合和所在地区限制' } }),
    chip('uwb2', '第二代超宽带芯片', 'U', '2023-09-12', '第二代超宽带', 'Apple 的第二代超宽带芯片用于更远距离的精确查找。官方产品规格称其为“第二代超宽带芯片”。',
      ['iPhone 15 系列及后续搭载机型（如 iPhone Air、iPhone Duo）', 'Apple Watch Series 9 及后续搭载机型', 'Apple Watch Ultra 2 及后续搭载机型', 'AirTag（第 2 代）', 'AirPods Pro 3 MagSafe 充电盒'], [
        src('Apple Newsroom · iPhone 15 与第二代超宽带', newsroom('2023/09/apple-debuts-iphone-15-and-iphone-15-plus/')),
        uwb,
        src('Apple Newsroom · 第二代 AirTag', newsroom('2026/01/apple-introduces-new-airtag-with-expanded-range-and-improved-findability/')),
        src('Apple · iPhone Duo 技术规格', apple('iphone-duo/specs/'))
      ], { extra: { '无线技术': '超宽带（UWB）', 'Apple 官方范围对比': '两台均搭载该芯片的 iPhone，连接距离达上代的 3 倍' } }),
    chip('c1', 'C1', 'C', '2025-02-19', '首款自研蜂窝基带', 'Apple 设计的首款蜂窝调制解调器，随 iPhone 16e 推出，支持低于 6 GHz 频段的 5G。',
      ['iPhone 16e'], [
        src('Apple Newsroom · iPhone 16e 与 C1 发布', newsroom('2025/02/apple-debuts-iphone-16e-a-powerful-new-member-of-the-iphone-16-family/')),
        src('Apple · iPhone 16e 技术规格', apple('iphone-16e/specs/'))
      ], { extra: { '蜂窝标准': '5G（sub-6 GHz）、千兆级 LTE', '天线配置': '4×4 MIMO（5G、LTE）' } }),
    chip('c1x', 'C1X', 'C', '2025-09-09', '改进型蜂窝基带', '首发于 iPhone Air，后来用于 iPhone 17e 和部分 iPad 蜂窝机型。Apple 称 iPhone Air 上的 C1X 最快达 C1 的 2 倍速度。',
      ['iPhone Air', 'iPhone 17e', 'iPad Pro（M5，蜂窝网络版）', 'iPad Air（M4，蜂窝网络版）'], [
        src('Apple Newsroom · iPhone Air 与 C1X 发布', newsroom('2025/09/introducing-iphone-air-a-powerful-new-iphone-with-a-breakthrough-design/')),
        src('Apple · iPhone Air 技术规格', apple('iphone-air/specs/')),
        src('Apple Newsroom · iPhone 17e', newsroom('2026/03/apple-introduces-iphone-17e/')),
        src('Apple · iPad Pro 技术规格', apple('ipad-pro/specs/')),
        src('Apple Newsroom · iPad Air（M4）', newsroom('2026/03/apple-introduces-the-new-ipad-air-powered-by-m4/'))
      ], { extra: { '蜂窝标准': '5G（sub-6 GHz）、千兆级 LTE', '天线配置': '4×4 MIMO（iPhone Air 的 5G、LTE）' } }),
    chip('c2', 'C2', 'C', '2026-09-09', '支持毫米波的蜂窝基带', 'Apple 的新一代蜂窝调制解调器系统。美国销售的指定机型支持毫米波 5G，并借助 AI 改善蜂窝连接质量。',
      ['iPhone 18 Pro', 'iPhone 18 Pro Max', 'iPhone Duo'], [
        src('Apple Newsroom · iPhone 18 Pro 与 C2', newsroom('2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/')),
        src('Apple Newsroom · iPhone Duo 与 C2', newsroom('2026/09/apple-unveils-iphone-duo/')),
        src('Apple · iPhone Duo 技术规格', apple('iphone-duo/specs/'))
      ], { extra: { '蜂窝标准': '5G（sub-6 GHz；美国指定机型支持 mmWave）、千兆级 LTE', '毫米波频段': 'n258、n260、n261（美国版 iPhone Duo）' } }),
    chip('n1', 'N1', 'N', '2025-09-09', 'Wi-Fi / 蓝牙 / Thread', 'Apple 设计的无线网络芯片，支持 Wi-Fi 7、蓝牙 6 和 Thread，也用于改善个人热点和隔空投送。',
      ['iPhone 17 / 17 Pro / 17 Pro Max、iPhone Air', 'iPhone 18 Pro / 18 Pro Max、iPhone Duo', 'iPad Pro（M5）', 'iPad Air（M4）', 'MacBook Air（M5）', 'MacBook Pro（M5 Pro、M5 Max、M6）'], [
        src('Apple Newsroom · iPhone Air 与 N1 发布', newsroom('2025/09/introducing-iphone-air-a-powerful-new-iphone-with-a-breakthrough-design/')),
        src('Apple 支持 · Apple 设备 Wi-Fi 7 可用性', support('148165')),
        src('Apple Newsroom · MacBook Air、MacBook Pro 与 N1', newsroom('2026/03/macbook-neo-iphone-17e-ipad-air-with-m4-and-more-are-now-available/')),
        src('Apple 支持 · 14 英寸 MacBook Pro（M6）', support('148300')),
        src('Apple · iPhone Duo 技术规格', apple('iphone-duo/specs/'))
      ], { extra: { '无线局域网': 'Wi-Fi 7（802.11be）', '蓝牙': 'Bluetooth 6', '智能家居网络': 'Thread', '天线配置': '2×2 MIMO（以 iPhone Air 为例）' } }),
    chip('r1', 'R1', 'R', '2023-06-05', '实时传感处理', '与 M2 或 M5 配合，融合摄像头、传感器及麦克风信号，将现实画面低延迟送至 Apple Vision Pro 的屏幕。',
      ['Apple Vision Pro（M2）', 'Apple Vision Pro（M5）'], [
        src('Apple 支持 · Apple Vision Pro 技术规格', support('117810')),
        src('Apple Newsroom · 初代 Apple Vision Pro 与 R1', newsroom('2023/06/introducing-apple-vision-pro/')),
        src('Apple Newsroom · Apple Vision Pro（M5）', newsroom('2025/10/apple-vision-pro-upgraded-with-the-m5-chip-and-dual-knit-band/'))
      ], { bandwidth: '256 GB/s', media: '实时摄像头、传感器与音频输入处理', extra: { '光子到光子延迟': '12 毫秒', '输入设备': '12 个摄像头、5 个传感器、6 个麦克风', '首次上市': '2024 年 2 月' } }, { bandwidth: 256 }),
    chip('t1', 'T1', 'T', '2016-10-27', 'Touch ID 安全芯片', '在配备 Touch Bar 的早期 Intel MacBook Pro 上，T1 的 Secure Enclave 负责 Touch ID 指纹匹配。',
      ['MacBook Pro（2016、2017，配备 Touch Bar）'], [
        src('Apple Newsroom · MacBook Pro 首次搭载 T1', newsroom('2016/10/apple-unveils-groundbreaking-new-macbook-pro/')),
        security
      ], { extra: { '安全模块': 'Secure Enclave（安全隔区）', '使用场景': 'Touch ID 解锁、用户切换、Apple Pay 验证' } }),
    chip('t2', 'T2 安全芯片', 'T', '2017-12-14', 'Intel Mac 安全芯片', '继 T1 之后推出的独立安全芯片。整合系统管理、图像信号、音频与 SSD 控制器，并通过 Secure Enclave 支持安全启动与加密。',
      ['iMac Pro', 'iMac（27 英寸，2020）', 'MacBook Pro（Intel，2018–2020）', 'MacBook Air（Intel，2018–2020）', 'Mac mini（2018）', 'Mac Pro（2019）'], [
        src('Apple Newsroom · iMac Pro 首次搭载 T2', newsroom('2017/12/imac-pro-the-most-powerful-mac-ever-available-today/')),
        src('Apple 支持 · 搭载 T2 安全芯片的 Mac', support('103265')),
        security
      ], { media: '图像信号处理器、音频控制器', extra: { '控制器': '系统管理控制器、SSD 控制器', '硬件安全': 'Secure Enclave、专用 AES 硬件、安全启动' } })
  ];
})();
