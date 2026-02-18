// ホームページ専用スクリプト
// 進捗管理、キャラクタープレビュー、CTAボタンのイベントハンドラー

// 学習進捗の管理
function loadLearningProgress() {
    // localStorageから進捗データを取得
    const progress = {
        chapter1: localStorage.getItem('chapter1_completed') === 'true',
        chapter2: localStorage.getItem('chapter2_completed') === 'true',
        chapter3: localStorage.getItem('chapter3_completed') === 'true',
        chapter4: localStorage.getItem('chapter4_completed') === 'true',
        chapter5: localStorage.getItem('chapter5_completed') === 'true'
    };

    // 完了章数を計算
    const completedCount = Object.values(progress).filter(Boolean).length;
    const totalChapters = 5;
    const completionRate = Math.round((completedCount / totalChapters) * 100);

    // 学習時間を計算（簡易版：各章45-60分と仮定）
    const estimatedTimePerChapter = [45, 60, 50, 40, 50]; // 分
    let totalTime = 0;
    Object.keys(progress).forEach((key, index) => {
        if (progress[key]) {
            totalTime += estimatedTimePerChapter[index];
        }
    });

    // UI更新
    document.getElementById('completed-chapters').textContent = `${completedCount}/5`;
    document.getElementById('total-time').textContent = `${totalTime}分`;
    document.getElementById('completion-rate').textContent = `${completionRate}%`;

    // プログレスバー更新
    const progressFill = document.querySelector('#overall-progress-bar .progress-fill');
    if (progressFill) {
        progressFill.style.width = `${completionRate}%`;
    }

    // メッセージ更新
    const progressMessage = document.getElementById('progress-message');
    if (completedCount === 0) {
        progressMessage.textContent = 'まだ学習を始めていません。第1章から始めましょう！';
    } else if (completedCount === totalChapters) {
        progressMessage.textContent = '🎉 全章完了！おめでとうございます！試験に向けて復習しましょう！';
        progressMessage.style.color = '#10b981';
        progressMessage.style.fontWeight = 'bold';
    } else {
        progressMessage.textContent = `素晴らしい進捗です！あと${totalChapters - completedCount}章で完了です！`;
        progressMessage.style.color = '#3b82f6';
    }

    // 各章のステータスバッジを更新
    Object.keys(progress).forEach((key, index) => {
        const chapterNum = index + 1;
        const card = document.querySelector(`.lesson-card[data-chapter="${chapterNum}"]`);
        if (card) {
            const statusBadge = card.querySelector('.status-badge');
            if (progress[key]) {
                statusBadge.textContent = '✅ 完了';
                statusBadge.className = 'status-badge status-completed';
                card.classList.add('completed');
            } else {
                // 前の章が完了していれば「学習可能」、そうでなければ「未開始」
                const prevChapterCompleted = index === 0 || progress[`chapter${index}`];
                if (prevChapterCompleted || index === 0) {
                    statusBadge.textContent = '📖 学習可能';
                    statusBadge.className = 'status-badge status-available';
                } else {
                    statusBadge.textContent = '🔒 未開始';
                    statusBadge.className = 'status-badge status-not-started';
                }
            }
        }
    });
}


// CTAボタンのイベントハンドラー
function setupCTAButtons() {
    // 学習を始めるボタン
    const startLearningBtn = document.querySelector('.hero-cta .cta-primary');
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // スムーズスクロール
            document.getElementById('curriculum').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

// スムーズスクロールの設定
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// アニメーション効果
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // アニメーション対象要素を監視
    document.querySelectorAll('.lesson-card, .overview-card, .path-step, .character-preview-card').forEach(el => {
        observer.observe(el);
    });
}

// ページ読み込み時の初期化
window.addEventListener('load', () => {
    loadLearningProgress();
    setupCTAButtons();
    setupSmoothScroll();
    setupScrollAnimations();

    // 進捗セクションの表示/非表示（進捗が0%の場合は薄く表示）
    const completedChapters = parseInt(document.getElementById('completed-chapters').textContent);
    const progressSection = document.getElementById('progress-section');
    if (completedChapters === 0) {
        progressSection.style.opacity = '0.6';
    }
});

// 定期的に進捗を更新（他のタブで学習が進んだ場合に対応）
setInterval(loadLearningProgress, 30000); // 30秒ごと