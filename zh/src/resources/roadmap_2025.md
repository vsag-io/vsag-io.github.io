# 路线图

当下，随着 AI 能力的持续增强和优秀开源大模型的普及，非结构化数据检索需求激增。向量算法作为非结构化数据检索技术的关键，其重要性不言而喻。VSAG 社区将会持续投入算法研发，帮助社区的合作伙伴，提升数据检索性能，提高数据检索实时性，持续降低检索服务成本。

在 2025 年，我们计划发布第一个大版本：

- VSAG 1.0 完整支持图和倒排两类索引结构，以及纯内存、内存+磁盘混合的检索方式，并提供较低的内存成本和卓越的检索性能。

以下是一些算法或功能的规划：

- 支持常见的数据类型，满足不同场景的非结构化数据检索需求
  - FP32 向量：满足主流向量检索场景使用
  - INT8、BF16、FP16 向量：适配量化的 embedding 模型，避免额外的存储开销
  - 稀疏向量：扩展文本检索方式
- 提供全面优化的核心索引类型，覆盖绝大部分检索场景
  - 图索引 HGraph：满足对高精度和低延迟的要求
  - 倒排索引 IVF：满足大 K 和批量查询的需求
- 提供丰富的量化方式，满足内存/召回率的平衡
  - RabitQ（BQ）：超高倍率的压缩，极少的内存使用
  - PQ：灵活的压缩倍率，适合低精度要求的场景
  - SQ4、SQ8：常规压缩方式，少量牺牲召回率获得内存和性能收益
- 多平台指令集适配，减少系统集成分发工作量
  - x86_64 平台：SSE，AVX，AVX2，AVX512
  - ARM 平台：Neon，SVE
  - 可选的矩阵乘法加速库：intel-mkl，openblas
- 支持资源隔离，提供细粒度的运行资源可配置
  - 内存资源：支持以索引为单位设置内存分配器，以实现类似租户级内存管理
  - CPU 资源：支持注入线程池，从而提升写入吞吐和搜索吞吐

除此之外，我们还有很多功能特性会在开源社区讨论-开发-实现，如果你对此感兴趣，请关注 VSAG 项目！
