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

    // h2要素とh3要素を取得して目次を生成
    // .quiz h3 (確認問題) などの不要なh3を除外するため、
    // まず mainコンテンツ内のh2, h3をすべて取得し、特定の親要素内にあるものを除外する手もあるが、
    // ここでは単純化し、.lesson-header より後にある .section 内の h2, h3 を対象とする。
    const headings = document.querySelectorAll('.lesson-page .section h2, .lesson-page .section h3');

    if (headings.length === 0) return;

    // ヘッダー用タイトル（目次）
    const tocTitle = document.createElement('h3');
    tocTitle.textContent = '📑 目次';
    tocContainer.appendChild(tocTitle);

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

        // 階層(h2かh3か)によってクラスを振り分ける
        if (heading.tagName.toLowerCase() === 'h3') {
            link.classList.add('toc-sub-item');
        } else {
            link.classList.add('toc-main-item');
        }

        // クリックでスムーズスクロール
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(heading.id);
            if (target) {
                // 少し上にオフセットをつけてスクロールする（固定ヘッダー対策）
                const yOffset = -80;
                const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
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
    const ArrayHeadings = Array.from(headings);
    if (ArrayHeadings.length === 0) return;

    // IntersectionObserver では「画面内に入ったか」しかわからないため、単純なスクロールイベントで実装し直す
    window.addEventListener('scroll', () => {
        let currentActive = null;

        // 現在のスクロール位置（画面上部から少し下を判定基準にする）
        const scrollPosition = window.scrollY + 100;

        for (let i = 0; i < ArrayHeadings.length; i++) {
            const heading = ArrayHeadings[i];
            const offsetTop = heading.offsetTop;

            if (scrollPosition >= offsetTop) {
                currentActive = heading;
            } else {
                break; // 順番に並んでいる前提なので、条件を満たさなくなったら抜ける
            }
        }

        if (currentActive) {
            const tocLinks = document.querySelectorAll('.toc-list a');
            tocLinks.forEach(link => link.classList.remove('active'));

            const activeLink = document.querySelector(`.toc-list a[data-section="${currentActive.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });

    // 初期ロード時にも一回実行
    window.dispatchEvent(new Event('scroll'));
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
