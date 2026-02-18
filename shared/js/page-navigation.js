// ===== トップに戻るボタン =====
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');

    if (!backToTopButton) return;

    // スクロール位置に応じてボタンの表示/非表示を切り替え
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // ボタンクリックでトップにスムーズスクロール
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== ドロップダウンメニュー =====
function initDropdownMenu() {
    const dropdown = document.querySelector('.nav-dropdown');
    const toggle = document.querySelector('.nav-dropdown-toggle');

    if (!dropdown || !toggle) return;

    // トグルボタンクリックでメニューの開閉
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });

    // メニュー外をクリックしたら閉じる
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });

    // Escapeキーで閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.classList.remove('open');
        }
    });
}

// ===== 目次の自動生成 =====
function initTableOfContents() {
    const tocContainer = document.querySelector('.table-of-contents');

    if (!tocContainer) return;

    // h2要素を取得して目次を生成
    const headings = document.querySelectorAll('.lesson-page h2');

    if (headings.length === 0) return;

    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    headings.forEach((heading, index) => {
        // 各見出しにIDを付与(なければ)
        if (!heading.id) {
            heading.id = `section-${index + 1}`;
        }

        // 目次のリストアイテムを作成
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.setAttribute('data-section', heading.id);

        // クリックでスムーズスクロール
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(heading.id);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        li.appendChild(link);
        tocList.appendChild(li);
    });

    tocContainer.appendChild(tocList);

    // スクロール連動でアクティブなセクションをハイライト
    initTocScrollSpy(headings);
}

// ===== 目次のスクロール連動 =====
function initTocScrollSpy(headings) {
    const tocLinks = document.querySelectorAll('.toc-list a');

    if (tocLinks.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 全てのリンクからactiveクラスを削除
                tocLinks.forEach(link => link.classList.remove('active'));

                // 現在のセクションに対応するリンクにactiveクラスを追加
                const activeLink = document.querySelector(`.toc-list a[data-section="${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        rootMargin: '-100px 0px -66%',
        threshold: 0
    });

    headings.forEach(heading => {
        observer.observe(heading);
    });
}

// ===== 現在のレッスンをハイライト =====
function highlightCurrentLesson() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-dropdown-menu a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}

// ===== 初期化 =====
document.addEventListener('DOMContentLoaded', () => {
    initBackToTop();
    initDropdownMenu();
    initTableOfContents();
    highlightCurrentLesson();
});
