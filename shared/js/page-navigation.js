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
            const tocContainer = document.querySelector('.table-of-contents');
            const tocLinks = document.querySelectorAll('.toc-list a');
            tocLinks.forEach(link => link.classList.remove('active'));

            const activeLink = document.querySelector(`.toc-list a[data-section="${currentActive.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');

                // 目次の枠内でアクティブなリンクが見えるように自動でスクロールさせる機能
                if (tocContainer) {
                    const activeRect = activeLink.parentElement.getBoundingClientRect();
                    const containerRect = tocContainer.getBoundingClientRect();

                    // リンクがコンテナの下の方にはみ出しそう（または上に隠れそう）ならスクロール
                    if (activeRect.top < containerRect.top + 30 || activeRect.bottom > containerRect.bottom - 30) {
                        const targetScroll = activeLink.parentElement.offsetTop - (containerRect.height / 2) + (activeRect.height / 2);
                        tocContainer.scrollTo({
                            top: targetScroll,
                            behavior: 'smooth'
                        });
                    }
                }
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

// ===== レッスン完了処理 =====
function completeLesson(storageKey, nextPage) {
    const btn = event.target;

    // 既に完了済みの場合 → 完了を解除
    if (btn.dataset.completed === 'true') {
        try {
            localStorage.removeItem(storageKey);
        } catch (e) {
            console.warn('localStorage is not available:', e);
        }
        setButtonIncomplete(btn);
        return;
    }

    // 未完了 → 完了にする
    try {
        localStorage.setItem(storageKey, 'true');
    } catch (e) {
        console.warn('localStorage is not available:', e);
    }

    // ボタンを完了状態にして次のページへ遷移
    btn.textContent = '✅ 完了！次のページへ移動中...';
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.7';

    setTimeout(() => {
        window.location.href = nextPage;
    }, 800);
}

// ボタンを完了済み表示にする
function setButtonCompleted(btn) {
    btn.dataset.completed = 'true';
    btn.textContent = '✅ 学習完了済み（クリックで解除）';
    btn.style.background = 'linear-gradient(135deg, #43a047, #66bb6a)';
    btn.style.boxShadow = '0 4px 15px rgba(67, 160, 71, 0.3)';
}

// ボタンを未完了表示にする
function setButtonIncomplete(btn) {
    btn.dataset.completed = 'false';
    // ボタンのテキストを元に戻す（onclikの第2引数から次ページ情報を取得）
    const onclickAttr = btn.getAttribute('onclick');
    if (onclickAttr && onclickAttr.includes('4-exam')) {
        btn.textContent = '第4章の確認テストに進む →';
    } else if (onclickAttr && (onclickAttr.includes('5-exam') || onclickAttr.includes('1-exam') || onclickAttr.includes('3-exam'))) {
        btn.textContent = '学習を完了して模擬試験へ →';
    } else if (onclickAttr && onclickAttr.includes('2-4_exam')) {
        btn.textContent = '学習を完了して確認問題へ →';
    } else {
        btn.textContent = '学習を完了して次へ →';
    }
    btn.style.background = '';
    btn.style.boxShadow = '';
}

// ページ読み込み時にボタンの完了状態を復元
function initCompletionButtons() {
    const completeBtns = document.querySelectorAll('.complete-btn');

    completeBtns.forEach(btn => {
        const onclickAttr = btn.getAttribute('onclick');
        if (!onclickAttr) return;

        // onclick属性からstorageKeyを抽出
        const match = onclickAttr.match(/completeLesson\('([^']+)'/);
        if (!match) return;

        const storageKey = match[1];

        try {
            if (localStorage.getItem(storageKey) === 'true') {
                setButtonCompleted(btn);
            }
        } catch (e) {
            console.warn('localStorage is not available:', e);
        }
    });
}

// ===== 初期化 =====
document.addEventListener('DOMContentLoaded', () => {
    initBackToTop();
    initDropdownMenu();
    initTableOfContents();
    highlightCurrentLesson();
    initCompletionButtons();
});
