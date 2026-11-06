(() => {
  'use strict';

  const newsroom = 'https://www.apple.com/newsroom/';
  const official = (path, title) => ({ title: 'Apple · ' + title, url: newsroom + path });
  const reference = (title, url) => ({ title, url });
  const chip = (id, name, date, tag, description, devices, announcement, specs = {}, metrics = {}, links = []) => ({
    id, name, series: 'A', year: Number(date.slice(0, 4)), date, tag, description, devices,
    source: announcement.url,
    sourceTitle: announcement.title,
    sources: [announcement, ...links],
    specs: {
      process: null, cpu: null, gpu: null, neural: null, memory: null,
      bandwidth: null, transistors: null, media: null, ...specs
    },
    metrics: { cpu: null, gpu: null, neural: null, memory: null, bandwidth: null, transistors: null, ...metrics }
  });

  const earlyTeardown = reference('Tom’s Hardware · 初代至第三代 iPad 芯片规格对照',
    'https://www.tomshardware.com/reviews/ipad-3-benchmark-review%2C3156-6.html');
  const a9Review = reference('AnandTech · A9X 与 A9 架构分析',
    'https://www.anandtech.com/show/9766/the-apple-ipad-pro-review/2');
  const a8xReview = reference('AnandTech · A8X 图形架构与芯片规格',
    'https://www.anandtech.com/show/8716/apple-a8xs-gpu-gxa6850-even-better-than-i-thought');

  window.aChips = [
    chip('a20-pro', 'A20 Pro', '2026-09-09', '旗舰手机 / 平板',
      '采用 2 纳米工艺，GPU 每个核心均配有神经网络加速器，部分设备配置搭载双神经网络引擎。',
      ['iPhone 18 Pro', 'iPhone 18 Pro Max', 'iPhone Duo', 'iPad mini（A20 Pro）'],
      official('2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/', 'iPhone 18 Pro 首发公告'), {
        process: '2 nm', cpu: '最高 6 核（2 超级核 + 4 能效核）',
        gpu: '7 核，配备神经网络加速器与硬件加速光线追踪',
        neural: '最高 32 核（双 16 核神经网络引擎）',
        bandwidth: 'Apple 公布 iPhone 18 Pro 较 A19 Pro 提升 50%，未公布绝对值',
        extra: 'iPad mini 的 128 GB、256 GB 存储机型为 5 核 CPU、16 核神经网络引擎；512 GB 存储机型为 6 核 CPU、双 16 核神经网络引擎。'
      }, { cpu: 6, gpu: 7, neural: 32 }, [
        official('2026/09/apple-unveils-iphone-duo/', 'iPhone Duo 公告'),
        official('2026/10/apple-gives-ipad-mini-its-biggest-update-ever/', 'iPad mini（A20 Pro）公告'),
        reference('Apple · iPad mini 技术规格', 'https://www.apple.com/ipad-mini/specs/')
      ]),

    chip('a19-pro', 'A19 Pro', '2025-09-09', '旗舰手机',
      '在 GPU 每个核心中加入神经网络加速器，iPhone 17 Pro 系列与 iPhone Air 启用的 GPU 核心数不同。',
      ['iPhone 17 Pro', 'iPhone 17 Pro Max', 'iPhone Air'],
      official('2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/', 'iPhone 17 Pro 首发公告'), {
        process: '3 nm（TSMC N3P，第三方拆解）', cpu: '6 核（2 性能核 + 4 能效核）',
        gpu: '5–6 核，配备神经网络加速器与硬件加速光线追踪',
        neural: '16 核神经网络引擎',
        media: 'ProRes RAW、Apple Log 2、同步锁定（iPhone 17 Pro 系列）',
        extra: 'iPhone 17 Pro 系列为 6 核 GPU，iPhone Air 为 5 核 GPU。'
      }, { cpu: 6, gpu: 6, neural: 16 }, [
        official('2025/09/introducing-iphone-air-a-powerful-new-iphone-with-a-breakthrough-design/', 'iPhone Air 公告'),
        reference('TechInsights · A19 Pro N3P 芯片拆解', 'https://www.techinsights.com/blog/apple-a19-pro-soc-tsmc-n3p-floorplan-analysis')
      ]),

    chip('a19', 'A19', '2025-09-09', '主流手机',
      '采用第三代 3 纳米工艺，更新显示引擎和图像信号处理器，并在 GPU 核心中加入神经网络加速器。',
      ['iPhone 17', 'iPhone 17e'],
      official('2025/09/apple-debuts-iphone-17/', 'iPhone 17 首发公告'), {
        process: '第三代 3 nm', cpu: '6 核（2 性能核 + 4 能效核）',
        gpu: '4–5 核，配备神经网络加速器', neural: '16 核神经网络引擎',
        media: '4K 杜比视界录制（iPhone 17 系列）',
        extra: 'iPhone 17 为 5 核 GPU，iPhone 17e 为 4 核 GPU。'
      }, { cpu: 6, gpu: 5, neural: 16 }, [
        reference('Apple · iPhone 17 技术规格', 'https://support.apple.com/en-us/125089'),
        official('2026/03/apple-introduces-iphone-17e/', 'iPhone 17e 公告')
      ]),

    chip('a18-pro', 'A18 Pro', '2024-09-09', '旗舰手机 / 笔记本',
      '采用第二代 3 纳米工艺，先用于 iPhone 16 Pro 系列，后用于 MacBook Neo。',
      ['iPhone 16 Pro', 'iPhone 16 Pro Max', 'MacBook Neo'],
      official('2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/', 'iPhone 16 Pro 首发公告'), {
        process: '第二代 3 nm', cpu: '6 核（2 性能核 + 4 能效核）',
        gpu: '5–6 核，支持硬件加速光线追踪', neural: '16 核神经网络引擎',
        memory: '8 GB 统一内存（MacBook Neo）', bandwidth: '60 GB/s（MacBook Neo）',
        media: 'H.264、HEVC、ProRes 和 ProRes RAW 硬件加速；AV1 解码（MacBook Neo）',
        extra: 'iPhone 16 Pro 系列为 6 核 GPU，MacBook Neo 为 5 核 GPU。'
      }, { cpu: 6, gpu: 6, neural: 16, memory: 8, bandwidth: 60 }, [
        reference('Apple · MacBook Neo 技术规格', 'https://www.apple.com/macbook-neo/specs/')
      ]),

    chip('a18', 'A18', '2024-09-09', '主流手机',
      '为 iPhone 16 标准版带来 Apple Intelligence 与硬件加速光线追踪。',
      ['iPhone 16', 'iPhone 16 Plus', 'iPhone 16e'],
      official('2024/09/apple-introduces-iphone-16-and-iphone-16-plus/', 'iPhone 16 首发公告'), {
        process: '第二代 3 nm', cpu: '6 核（2 性能核 + 4 能效核）',
        gpu: '4–5 核，支持硬件加速光线追踪', neural: '16 核神经网络引擎',
        media: '4K 杜比视界录制（iPhone 16 系列）',
        extra: 'iPhone 16、iPhone 16 Plus 为 5 核 GPU，iPhone 16e 为 4 核 GPU。'
      }, { cpu: 6, gpu: 5, neural: 16 }, [
        official('2025/02/apple-debuts-iphone-16e-a-powerful-new-member-of-the-iphone-16-family/', 'iPhone 16e 公告')
      ]),

    chip('a17-pro', 'A17 Pro', '2023-09-12', '旗舰手机 / 平板',
      'Apple 首款 3 纳米芯片，首次在 iPhone 上引入硬件加速光线追踪与专用 AV1 解码器。',
      ['iPhone 15 Pro', 'iPhone 15 Pro Max', 'iPad mini（A17 Pro）'],
      official('2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/', 'iPhone 15 Pro 首发公告'), {
        process: '3 nm', cpu: '6 核（2 性能核 + 4 能效核）',
        gpu: '5–6 核，支持硬件加速光线追踪', neural: '16 核神经网络引擎',
        transistors: '190 亿（Apple 发布会，第三方报道）', media: '专用 AV1 解码器',
        extra: 'iPhone 15 Pro 系列为 6 核 GPU，iPad mini（A17 Pro）为 5 核 GPU。'
      }, { cpu: 6, gpu: 6, neural: 16, transistors: 19 }, [
        reference('Apple · iPad mini（A17 Pro）技术规格', 'https://support.apple.com/en-us/121456'),
        reference('9to5Mac · Apple A17 Pro 发布会数据', 'https://9to5mac.com/2023/09/12/iphone-15-pro-a17-pro-chip/')
      ]),

    chip('a16', 'A16 Bionic', '2022-09-07', '手机 / 平板',
      '引入新显示引擎支持全天候显示，随后从 iPhone Pro 系列下放至标准款 iPhone 与 iPad。',
      ['iPhone 14 Pro', 'iPhone 14 Pro Max', 'iPhone 15', 'iPhone 15 Plus', 'iPad（A16）'],
      official('2022/09/apple-debuts-iphone-14-pro-and-iphone-14-pro-max/', 'iPhone 14 Pro 首发公告'), {
        process: '4 nm（Apple 发布会，第三方报道）',
        cpu: '5–6 核（依机型）', gpu: '4–5 核（依机型）', neural: '16 核神经网络引擎',
        transistors: '160 亿（Apple 发布会，第三方报道）', media: '新图像信号处理器驱动 48 MP 主摄（iPhone 14 Pro 系列）',
        extra: 'iPhone 机型为 6 核 CPU、5 核 GPU；iPad（A16）为 5 核 CPU、4 核 GPU。'
      }, { cpu: 6, gpu: 5, neural: 16, transistors: 16 }, [
        reference('Apple · iPad（A16）技术规格', 'https://support.apple.com/en-us/122240'),
        reference('TechCrunch · Apple A16 Bionic 发布会数据', 'https://techcrunch.com/2022/09/07/apple-details-the-a16-bionic-the-processor-thatll-power-the-iphone-14-pro/')
      ]),

    chip('a15', 'A15 Bionic', '2021-09-14', '手机 / 平板 / 电视',
      '在 5 纳米工艺上将晶体管数量提高到近 150 亿，并用于 iPhone、iPad mini 和 Apple TV。',
      ['iPhone 13 系列', 'iPhone 14 / 14 Plus', 'iPhone SE（第 3 代）', 'iPad mini（第 6 代）', 'Apple TV 4K（第 3 代）'],
      official('2021/09/apple-introduces-iphone-13-and-iphone-13-mini/', 'iPhone 13 首发公告'), {
        process: '5 nm', cpu: '最高 6 核（2 性能核 + 4 能效核）',
        gpu: '最高 5 核（iPhone 13 Pro 系列）',
        neural: '16 核神经网络引擎，最高 15.8 万亿次运算/秒',
        transistors: '约 150 亿', media: 'ProRes 录制（iPhone 13 Pro 系列）',
        extra: 'iPhone 13、iPhone 13 mini 为 4 核 GPU；iPhone 13 Pro 系列为 5 核。'
      }, { cpu: 6, gpu: 5, neural: 16, transistors: 15 }, [
        official('2021/09/apple-unveils-iphone-13-pro-and-iphone-13-pro-max-more-pro-than-ever-before/', 'iPhone 13 Pro 公告')
      ]),

    chip('a14', 'A14 Bionic', '2020-09-15', '手机 / 平板',
      '首次在 iPad Air 上亮相，随后用于 iPhone 12 全系，将神经网络引擎升级到 16 核。',
      ['iPad Air（第 4 代）', 'iPhone 12 系列', 'iPad（第 10 代）'],
      official('2020/09/apple-unveils-all-new-ipad-air-with-a14-bionic-apples-most-advanced-chip/', 'iPad Air 首发公告'), {
        process: '5 nm', cpu: '6 核（2 性能核 + 4 能效核）', gpu: '4 核',
        neural: '16 核神经网络引擎，最高 11 万亿次运算/秒', transistors: '118 亿',
        media: '杜比视界 HDR 录制（iPhone 12 系列）'
      }, { cpu: 6, gpu: 4, neural: 16, transistors: 11.8 }),

    chip('a12z', 'A12Z Bionic', '2020-03-18', '专业平板',
      '配备 8 核 GPU 与更新的散热设计，为 2020 款 iPad Pro 提供 4K 剪辑与三维设计所需的图形性能。',
      ['iPad Pro 11 英寸（第 2 代）', 'iPad Pro 12.9 英寸（第 4 代）', 'Mac 开发者过渡套件（DTK）'],
      official('2020/03/apple-unveils-new-ipad-pro-with-lidar-scanner-and-trackpad-support-in-ipados/', '2020 款 iPad Pro 首发公告'), {
        process: '7 nm（与 A12X 同一裸片，第三方拆解）', cpu: '8 核',
        gpu: '8 核', neural: '配备神经网络引擎',
        media: '支持 4K 视频编辑（2020 款 iPad Pro）',
        extra: 'TechInsights 拆解显示 A12Z 与 A12X 采用同一裸片，A12Z 启用了全部 8 个 GPU 核心。'
      }, { cpu: 8, gpu: 8 }, [
        reference('TechInsights · A12Z 和 A12X 裸片对比', 'https://www.techinsights.com/blog/looking-apple-a12z-bionic-system-chip'),
        official('2020/06/apple-announces-mac-transition-to-apple-silicon/', 'Mac 转向 Apple 芯片公告')
      ]),

    chip('a13', 'A13 Bionic', '2019-09-10', '手机 / 平板',
      '在 CPU 中加入专用机器学习加速器，并为 iPhone 11 系列带来夜间模式与计算摄影功能。',
      ['iPhone 11 系列', 'iPhone SE（第 2 代）', 'iPad（第 9 代）', 'Studio Display'],
      official('2019/09/apple-introduces-dual-camera-iphone-11/', 'iPhone 11 首发公告'), {
        process: '7 nm（Apple 发布会，第三方报道）',
        cpu: '6 核（2 性能核 + 4 能效核）', gpu: '4 核',
        neural: '8 核神经网络引擎（Apple 发布会，第三方报道）',
        transistors: '85 亿（Apple 发布会，第三方报道）',
        media: '4K 视频录制（iPhone 11 系列）'
      }, { cpu: 6, gpu: 4, neural: 8, transistors: 8.5 }, [
        official('2019/09/highlights-from-apples-keynote-event/', '2019 年 9 月发布会回顾'),
        reference('TechCrunch · A13 Bionic 发布会数据', 'https://techcrunch.com/2019/09/10/apples-new-a13-chip-is-faster-according-to-charts-with-no-numbers/'),
        official('2022/03/apple-unveils-all-new-mac-studio-and-studio-display/', 'Studio Display 公告')
      ]),

    chip('a12x', 'A12X Bionic', '2018-10-30', '专业平板',
      '将 A12 世代的设计扩展为 8 核 CPU 和 7 核 GPU，服务于 2018 款全面屏 iPad Pro。',
      ['iPad Pro 11 英寸（第 1 代）', 'iPad Pro 12.9 英寸（第 3 代）'],
      official('2018/10/new-ipad-pro-with-all-screen-design-is-most-advanced-powerful-ipad-ever/', '2018 款 iPad Pro 首发公告'), {
        process: '7 nm', cpu: '8 核（4 性能核 + 4 能效核）', gpu: '7 核',
        neural: '8 核神经网络引擎（第三方）；最高 5 万亿次运算/秒（Apple）',
        transistors: '100 亿（Apple 发布会，第三方报道）'
      }, { cpu: 8, gpu: 7, neural: 8, transistors: 10 }, [
        reference('AnandTech · A12X 发布会规格', 'https://www.anandtech.com/show/13529/apple-announces-new-ipad'),
        reference('Notebookcheck · A12X 神经网络引擎规格', 'https://www.notebookcheck.net/Apple-A12X-Bionic-SoC.358491.0.html')
      ]),

    chip('a12', 'A12 Bionic', '2018-09-12', '手机 / 平板 / 电视',
      '将 iPhone 芯片工艺推进至 7 纳米，并首次向 Core ML 开放神经网络引擎。',
      ['iPhone XS / XS Max / XR', 'iPad Air（第 3 代）', 'iPad mini（第 5 代）', 'iPad（第 8 代）', 'Apple TV 4K（第 2 代）'],
      official('2018/09/iphone-xs-and-iphone-xs-max-bring-the-best-and-biggest-displays-to-iphone/', 'iPhone XS 首发公告'), {
        process: '7 nm', cpu: '6 核（2 性能核 + 4 能效核）', gpu: '4 核',
        neural: '8 核神经网络引擎，最高 5 万亿次运算/秒',
        transistors: '69 亿（第三方资料）', media: 'Apple 自研图像信号处理器与视频编码器'
      }, { cpu: 6, gpu: 4, neural: 8, transistors: 6.9 }, [
        reference('IEEE EPS · Apple 芯片工艺与晶体管对照', 'https://ewh.ieee.org/soc/cpmt/presentations/eps2204c.pdf')
      ]),

    chip('a11', 'A11 Bionic', '2017-09-12', '手机',
      '首款配备神经网络引擎的 A 系列芯片，为 iPhone X 的 Face ID 和动话表情提供算力。',
      ['iPhone 8', 'iPhone 8 Plus', 'iPhone X'],
      official('2017/09/the-future-is-here-iphone-x/', 'iPhone X 首发公告'), {
        process: '10 nm（第三方资料）', cpu: '6 核（2 性能核 + 4 能效核）',
        gpu: '3 核（Apple 自研）', neural: '2 核神经网络引擎，最高 6000 亿次运算/秒',
        transistors: '43 亿（第三方资料）'
      }, { cpu: 6, gpu: 3, neural: 2, transistors: 4.3 }, [
        reference('IEEE EPS · Apple 芯片工艺与晶体管对照', 'https://ewh.ieee.org/soc/cpmt/presentations/eps2204c.pdf')
      ]),

    chip('a10x', 'A10X Fusion', '2017-06-05', '专业平板 / 电视',
      '以 6 核 CPU 和 12 核 GPU 推动 iPad Pro 的高分辨率图形与 4K 视频编辑。',
      ['iPad Pro 10.5 英寸', 'iPad Pro 12.9 英寸（第 2 代）', 'Apple TV 4K（第 1 代）'],
      official('2017/06/ipad-pro-10-5-and-12-9-inch-models-introduces-worlds-most-advanced-display-breakthrough-performance/', '2017 款 iPad Pro 首发公告'), {
        process: '10 nm（第三方拆解）', cpu: '6 核', gpu: '12 核',
        media: '支持 4K HDR 播放（Apple TV 4K）'
      }, { cpu: 6, gpu: 12 }, [
        reference('AnandTech · TechInsights A10X 10 nm 拆解', 'https://www.anandtech.com/show/11596/techinsights-confirms-apple-a10x-soc-10nm-tsmc'),
        official('2017/09/apple-tv-4k-brings-home-the-magic-of-cinema-with-4k-and-hdr/', 'Apple TV 4K 公告')
      ]),

    chip('a10', 'A10 Fusion', '2016-09-07', '手机 / 平板',
      '在 iPhone 7 上首次使用由高性能核与高能效核组成的四核 A 系列 CPU。',
      ['iPhone 7', 'iPhone 7 Plus', 'iPad（第 6 / 7 代）', 'iPod touch（第 7 代）'],
      official('2016/09/apple-introduces-iphone-7-iphone-7-plus/', 'iPhone 7 首发公告'), {
        process: '16 nm（第三方资料）', cpu: '4 核（2 性能核 + 2 能效核）',
        gpu: '6 核（第三方资料）', transistors: '33 亿（第三方资料）',
        media: 'Apple 自研图像信号处理器'
      }, { cpu: 4, gpu: 6, transistors: 3.3 }, [
        reference('Notebookcheck · A10 Fusion 规格', 'https://www.notebookcheck.net/Apple-A10-Fusion-SoC.173824.0.html')
      ]),

    chip('a9x', 'A9X', '2015-09-09', '专业平板',
      '为首款 12.9 英寸 iPad Pro 的 560 万像素 Retina 显示屏提供图形算力。',
      ['iPad Pro 12.9 英寸（第 1 代）', 'iPad Pro 9.7 英寸'],
      official('2015/09/09Apple-Introduces-iPad-Pro-Featuring-Epic-12.9-inch-Retina-Display/', '初代 iPad Pro 首发公告'), {
        process: '16 nm（第三方分析）', cpu: '2 核（第三方分析）', gpu: '12 个图形簇（第三方分析）'
      }, { cpu: 2, gpu: 12 }, [a9Review]),

    chip('a9', 'A9', '2015-09-09', '手机 / 平板',
      '第三代 64 位 Apple A 系列芯片，集成 M9 运动协处理器。',
      ['iPhone 6s', 'iPhone 6s Plus', 'iPhone SE（第 1 代）', 'iPad（第 5 代）'],
      official('2015/09/09Apple-Introduces-iPhone-6s-iPhone-6s-Plus/', 'iPhone 6s 首发公告'), {
        process: '14 nm（Samsung）或 16 nm（TSMC），第三方拆解',
        cpu: '2 核（第三方分析）', gpu: '6 个图形簇（第三方分析）'
      }, { cpu: 2, gpu: 6 }, [
        a9Review,
        reference('Tom’s Hardware · Samsung 与 TSMC 版本 A9 对照', 'https://www.tomshardware.com/news/iphone-6s-a9-samsung-vs-tsmc%2C30306.html')
      ]),

    chip('a8x', 'A8X', '2014-10-16', '平板',
      '为 iPad Air 2 定制的第二代 64 位芯片，扩展了 CPU 和图形资源。',
      ['iPad Air 2'],
      official('2014/10/16Apple-Introduces-iPad-Air-2-The-Thinnest-Most-Powerful-iPad-Ever/', 'iPad Air 2 首发公告'), {
        process: '20 nm（第三方分析）', cpu: '3 核（第三方分析）',
        gpu: '8 个图形簇（第三方分析）', transistors: '约 30 亿（第三方分析）'
      }, { cpu: 3, gpu: 8, transistors: 3 }, [a8xReview]),

    chip('a8', 'A8', '2014-09-09', '手机 / 平板 / 电视',
      '第二代 64 位 Apple A 系列芯片，随 iPhone 6 与 iPhone 6 Plus 亮相。',
      ['iPhone 6', 'iPhone 6 Plus', 'iPad mini 4', 'iPod touch（第 6 代）', 'Apple TV HD', 'HomePod（第 1 代）'],
      official('2014/09/09Apple-Announces-iPhone-6-iPhone-6-Plus-The-Biggest-Advancements-in-iPhone-History/', 'iPhone 6 首发公告'), {
        process: '20 nm（Apple 发布会，第三方报道）', cpu: '2 核（第三方分析）',
        gpu: '4 个图形簇（第三方分析）', transistors: '20 亿（Apple 发布会，第三方报道）'
      }, { cpu: 2, gpu: 4, transistors: 2 }, [
        reference('AnandTech · A8 发布会规格', 'https://www.anandtech.com/show/8504/apple-announces-a8-soc'),
        a8xReview
      ]),

    chip('a7', 'A7', '2013-09-10', '手机 / 平板',
      '将 64 位架构首次带入 iPhone，并与独立 M7 运动协处理器配合。',
      ['iPhone 5s', 'iPad Air（第 1 代）', 'iPad mini 2', 'iPad mini 3'],
      official('2013/09/10Apple-Announces-iPhone-5s-The-Most-Forward-Thinking-Smartphone-in-the-World/', 'iPhone 5s 首发公告'), {
        process: '28 nm（第三方分析）', cpu: '2 核（第三方拆解）',
        gpu: '4 个图形簇（第三方拆解）', transistors: '超过 10 亿（Apple 发布会，第三方报道）'
      }, { cpu: 2, gpu: 4 }, [
        reference('AnandTech · A7 工艺及发布会规格', 'https://www.anandtech.com/show/7335/the-iphone-5s-review/2'),
        reference('MacRumors · Chipworks A7 芯片拆解', 'https://www.macrumors.com/2013/09/27/a-closer-look-at-apples-a7-chip-from-the-iphone-5s/')
      ]),

    chip('a6x', 'A6X', '2012-10-23', '平板',
      '第四代 iPad 的双核芯片，配备四核图形处理器以驱动 9.7 英寸 Retina 显示屏。',
      ['iPad（第 4 代）'],
      official('2012/10/23Apple-Introduces-iPad-mini/', '第四代 iPad 首发公告'), {
        process: '32 nm（第三方分析）', cpu: '2 核', gpu: '4 核'
      }, { cpu: 2, gpu: 4 }, [
        reference('Apple · 第四代 iPad 技术规格', 'https://support.apple.com/en-us/111993'),
        reference('AnandTech · 第四代 iPad 芯片分析', 'https://www.anandtech.com/show/6472/ipad-4-late-2012-review/3')
      ]),

    chip('a6', 'A6', '2012-09-12', '手机',
      '在 iPhone 5 上启用 Apple 自研的 CPU 核心，为更大的 4 英寸 Retina 显示屏提供图形算力。',
      ['iPhone 5', 'iPhone 5c'],
      official('2012/09/12Apple-Introduces-iPhone-5/', 'iPhone 5 首发公告'), {
        process: '32 nm（第三方拆解）', cpu: '2 核（第三方拆解）', gpu: '3 核（第三方拆解）'
      }, { cpu: 2, gpu: 3 }, [
        reference('AnandTech · iPhone 5 A6 图形架构', 'https://www.anandtech.com/show/6330/the-iphone-5-review/11'),
        reference('Ars Technica · A6 裸片与 GPU 核心确认', 'https://arstechnica.com/gadgets/2012/09/confirmed-apples-a6-uses-triple-core-gpu/')
      ]),

    chip('a5x', 'A5X', '2012-03-07', '平板',
      '为第三代 iPad 的首块 Retina 显示屏增加了图形资源，GPU 从 A5 的双核增至四核。',
      ['iPad（第 3 代）'],
      official('2012/03/07Apple-Launches-New-iPad/', '第三代 iPad 首发公告'), {
        process: '45 nm（第三方分析）', cpu: '2 核（第三方分析）', gpu: '4 核',
        media: '1080p 视频录制（第三代 iPad）'
      }, { cpu: 2, gpu: 4 }, [earlyTeardown]),

    chip('a5', 'A5', '2011-03-02', '手机 / 平板 / 电视',
      '与 iPad 2 一同发布，把 iPad 的 CPU 从单核提升为双核。',
      ['iPad 2', 'iPhone 4s', 'iPad mini（第 1 代）', 'iPod touch（第 5 代）', 'Apple TV（第 3 代）'],
      official('2011/03/02Apple-Launches-iPad-2/', 'iPad 2 首发公告'), {
        process: '首发 45 nm，后续部分型号 32 nm（第三方分析）',
        cpu: '2 核', gpu: '2 核（第三方分析）', media: '720p 视频录制（iPad 2）'
      }, { cpu: 2, gpu: 2 }, [
        earlyTeardown,
        reference('The Register · 32 nm 版 A5 的 iPad 2', 'https://www.theregister.com/on-prem/2012/05/04/apple-sneaks-ipad-2-with-32nm-chip-into-retail/1288875')
      ]),

    chip('a4', 'A4', '2010-01-27', '手机 / 平板 / 电视',
      '首款以 A 系列命名的 Apple 系统级芯片，最早随初代 iPad 公布。',
      ['iPad（第 1 代）', 'iPhone 4', 'iPod touch（第 4 代）', 'Apple TV（第 2 代）'],
      official('2010/01/27Apple-Launches-iPad/', '初代 iPad 首发公告'), {
        process: '45 nm（第三方分析）', cpu: '1 核（第三方分析）', gpu: '1 核（第三方分析）'
      }, { cpu: 1, gpu: 1 }, [earlyTeardown])
  ];
})();
