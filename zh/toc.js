// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">介绍</a></li><li class="chapter-item expanded affix "><li class="part-title">用户指南</li><li class="chapter-item expanded "><a href="guide/installation.html"><strong aria-hidden="true">1.</strong> 安装</a></li><li class="chapter-item expanded "><a href="guide/knn_search.html"><strong aria-hidden="true">2.</strong> k-近邻搜索</a></li><li class="chapter-item expanded "><a href="guide/create_index.html"><strong aria-hidden="true">3.</strong> 创建索引</a></li><li class="chapter-item expanded "><a href="guide/pyvsag.html"><strong aria-hidden="true">4.</strong> pyvsag</a></li><li class="chapter-item expanded affix "><li class="part-title">开发者指南</li><li class="chapter-item expanded "><a href="development/code_structure.html"><strong aria-hidden="true">5.</strong> 代码目录结构</a></li><li class="chapter-item expanded "><a href="development/building.html"><strong aria-hidden="true">6.</strong> 编译构建</a></li><li class="chapter-item expanded "><a href="development/testing.html"><strong aria-hidden="true">7.</strong> 运行测试</a></li><li class="chapter-item expanded affix "><li class="part-title">高级功能</li><li class="chapter-item expanded "><a href="advanced/range_search.html"><strong aria-hidden="true">8.</strong> 范围搜索</a></li><li class="chapter-item expanded "><a href="advanced/optimizer.html"><strong aria-hidden="true">9.</strong> 优化器</a></li><li class="chapter-item expanded "><a href="advanced/serialization.html"><strong aria-hidden="true">10.</strong> 序列化格式</a></li><li class="chapter-item expanded "><a href="advanced/memory.html"><strong aria-hidden="true">11.</strong> 内存管理</a></li><li class="chapter-item expanded "><a href="advanced/enhance_graph.html"><strong aria-hidden="true">12.</strong> 图索引增强</a></li><li class="chapter-item expanded "><a href="advanced/hybrid_index.html"><strong aria-hidden="true">13.</strong> 内存-磁盘混合索引</a></li><li class="chapter-item expanded affix "><li class="part-title">资源</li><li class="chapter-item expanded "><a href="resources/release_notes.html"><strong aria-hidden="true">14.</strong> 版本日志</a></li><li class="chapter-item expanded "><a href="resources/roadmap_2025.html"><strong aria-hidden="true">15.</strong> 路线图</a></li><li class="chapter-item expanded "><a href="resources/community.html"><strong aria-hidden="true">16.</strong> 开源社区</a></li><li class="chapter-item expanded "><a href="resources/related_projects.html"><strong aria-hidden="true">17.</strong> 关联项目</a></li><li class="chapter-item expanded "><a href="resources/research_papers.html"><strong aria-hidden="true">18.</strong> 科研论文</a></li><li class="chapter-item expanded "><a href="resources/best_practices.html"><strong aria-hidden="true">19.</strong> 最佳实践</a></li><li class="chapter-item expanded "><a href="resources/performance.html"><strong aria-hidden="true">20.</strong> 标准环境性能参考</a></li><li class="chapter-item expanded "><a href="resources/eval.html"><strong aria-hidden="true">21.</strong> 性能评估工具</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><a href="misc/contributors.html">贡献者列表</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
