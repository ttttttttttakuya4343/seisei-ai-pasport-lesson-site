// ホームページ専用スクリプト
// 進捗管理、キャラクタープレビュー、CTAボタンのイベントハンドラー

// 各章のセクションID定義
const CHAPTER_SECTIONS = {
    1: ['1-1', '1-2', '1-3', '1-4'],
    2: ['2-1', '2-2', '2-3'],
    3: ['3-1', '3-2', '3-3', '3-4'],
    4: ['4-1', '4-2', '4-3', '4-4'],
    5: ['5-1', '5-2', '5-3', '5-4', '5-5']
};

// 成長段階の定義
const GROWTH_STAGES = [
    { min: 0, max: 0, icon: '🌱', stage: 'seed' },
    { min: 1, max: 49, icon: '🌿', stage: 'sprout' },
    { min: 50, max: 99, icon: '🌷', stage: 'bud' },
    { min: 100, max: 100, icon: '🌸', stage: 'bloom' }
];

// お宝データ（動画付き）
const TREASURE_DATA = {
    1: {
        name: 'AI知識の火種',
        desc: '古代のデータ結晶が発光する不思議な火起こし道具',
        img: 'shared/images/treasures/chapter1_treasure.jpg',
        video: 'video/hf_20260223_123655_a3d8eab7-8f9a-4341-8421-94cee541bb3a.mp4'
    },
    2: {
        name: '生成AIの閃光',
        desc: '奇妙な知性の光を放つ古代の機械',
        img: 'shared/images/treasures/chapter2_treasure.jpg',
        video: 'video/生成AIの閃光.mp4'
    },
    3: {
        name: 'プロンプトの水流',
        desc: '古代の命令が流れ続ける不思議な水源',
        img: 'shared/images/treasures/chapter3_treasure.jpg',
        video: 'video/プロンプトの水流.mp4'
    },
    4: {
        name: '法律の守り神',
        desc: '六法全書という名の、秩序を司る古代の書物',
        img: 'shared/images/treasures/chapter4_treasure.jpg',
        video: 'video/法律の守り神.mp4'
    },
    5: {
        name: '実践の翼',
        desc: '空へ飛び立つための古代技術。錆びた歯車が歴史を語る。',
        img: 'shared/images/treasures/chapter5_treasure.jpg',
        video: 'video/実践の翼.mp4'
    }
};

// お宝獲得モーダルを表示
function showTreasureModal(chapterNum) {
    const treasure = TREASURE_DATA[chapterNum];
    if (!treasure) return;

    const modal = document.getElementById('treasure-modal');
    const video = document.getElementById('treasure-video');
    const videoSource = video.querySelector('source');
    const videoContainer = document.querySelector('.treasure-modal-video');

    // モーダル情報をセット
    document.getElementById('treasure-modal-name').textContent = treasure.name;
    document.getElementById('treasure-modal-desc').textContent = treasure.desc;
    document.getElementById('treasure-modal-img').src = treasure.img;
    document.getElementById('treasure-modal-img').alt = treasure.name;

    // 動画がある場合のみ表示
    if (treasure.video) {
        videoContainer.style.display = 'block';
        videoSource.src = treasure.video;
        video.load();
    } else {
        videoContainer.style.display = 'none';
    }

    // モーダル表示
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // 動画があれば自動再生
    if (treasure.video) {
        video.play().catch(() => { });
    }

    // 閉じるボタン
    document.getElementById('treasure-modal-close').onclick = () => {
        closeTreasureModal();
    };

    // オーバーレイクリックで閉じる
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeTreasureModal();
        }
    };
}

function closeTreasureModal() {
    const modal = document.getElementById('treasure-modal');
    const video = document.getElementById('treasure-video');
    video.pause();
    video.currentTime = 0;
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// 新しいお宝が獲得されたかチェック
function checkNewTreasures(progress) {
    for (let chapter = 1; chapter <= 5; chapter++) {
        if (!TREASURE_DATA[chapter]) continue;
        const isCompleted = progress[`chapter${chapter}`];
        const alreadyShown = localStorage.getItem(`treasure_shown_${chapter}`) === 'true';

        if (isCompleted && !alreadyShown) {
            // 初回獲得 → モーダル表示
            localStorage.setItem(`treasure_shown_${chapter}`, 'true');
            // 少し遅延させてページ読み込み後に表示
            setTimeout(() => showTreasureModal(chapter), 800);
            break; // 一度に1つだけ表示
        }
    }
}

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

    // UI更新
    document.getElementById('completed-chapters').textContent = `${completedCount}/5`;
    document.getElementById('completion-rate').textContent = `${completionRate}%`;

    // プログレスバー更新
    const progressFill = document.querySelector('#overall-progress-bar .progress-fill');
    if (progressFill) {
        progressFill.style.width = `${completionRate}%`;
    }

    // メッセージ更新
    const progressMessage = document.getElementById('progress-message');
    if (progressMessage) {
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
    }

    // 各章の完了状態を更新
    Object.keys(progress).forEach((key, index) => {
        const chapterNum = index + 1;
        const card = document.querySelector(`.lesson-card[data-chapter="${chapterNum}"]`);
        if (card && progress[key]) {
            card.classList.add('completed');
        }
    });

    // 花成長アイコンを更新
    updateGrowthIcons();

    // ピクミンバッジを更新
    updatePikminBadges(progress);

    // お宝獲得チェック（初回のみ動画モーダル表示）
    checkNewTreasures(progress);
}

// 花成長アイコンの更新
function updateGrowthIcons() {
    for (let chapter = 1; chapter <= 5; chapter++) {
        const sections = CHAPTER_SECTIONS[chapter];
        let completedSections = 0;

        sections.forEach(sectionId => {
            if (localStorage.getItem(`chapter${chapter}_section${sectionId}_completed`) === 'true') {
                completedSections++;
            }
        });

        const progressPercent = Math.round((completedSections / sections.length) * 100);
        // 章自体が完了していたら100%
        const isChapterComplete = localStorage.getItem(`chapter${chapter}_completed`) === 'true';
        const effectivePercent = isChapterComplete ? 100 : progressPercent;

        // 適切な成長段階を取得
        const stage = GROWTH_STAGES.find(s => effectivePercent >= s.min && effectivePercent <= s.max) || GROWTH_STAGES[0];

        // DOM更新
        const card = document.querySelector(`.lesson-card[data-chapter="${chapter}"]`);
        if (card) {
            const growthIcon = card.querySelector('.growth-icon');
            if (growthIcon) {
                growthIcon.textContent = stage.icon;
                growthIcon.setAttribute('data-growth', stage.stage);
            }
        }
    }
}

// ピクミンバッジの更新
function updatePikminBadges(progress) {
    for (let chapter = 1; chapter <= 5; chapter++) {
        const badge = document.getElementById(`pikmin-badge-${chapter}`);
        if (!badge) continue;

        const isCompleted = progress[`chapter${chapter}`];
        const img = badge.querySelector('.pikmin-img-wrapper img');

        if (isCompleted) {
            badge.classList.remove('locked');
            badge.classList.add('unlocked');
            // お宝データがあれば実際の画像に切替
            if (TREASURE_DATA[chapter] && img) {
                img.src = TREASURE_DATA[chapter].img;
            }
        } else {
            badge.classList.remove('unlocked');
            badge.classList.add('locked');
            // はてなマーク画像に差替
            if (img) {
                img.src = 'shared/images/treasures/unknown_treasure.png';
            }
        }
    }
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
    document.querySelectorAll('.lesson-card, .pikmin-badge, .path-step').forEach(el => {
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

    // お宝リセットボタン
    const resetBtn = document.getElementById('treasure-reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetTreasureProgress);
    }
});

// 定期的に進捗を更新（他のタブで学習が進んだ場合に対応）
setInterval(loadLearningProgress, 30000); // 30秒ごと

// お宝の獲得状況をリセット
function resetTreasureProgress() {
    showHomeConfirmModal({
        icon: '🔄',
        title: 'お宝獲得状況のリセット',
        message: 'お宝の獲得状況をリセットしますか？\n（各章の模擬試験をもう一度クリアする必要があります）\n\n※ 悪魔の実コレクションや模擬試験の履歴はそのまま保持されます。',
        okText: 'リセットする',
        okColor: 'linear-gradient(135deg, #c62828, #e53935)',
        onOk: () => {
            // お宝取得情報のみ削除（セクション完了・悪魔の実・模擬試験履歴は保持）
            for (let i = 1; i <= 5; i++) {
                localStorage.removeItem(`chapter${i}_completed`);
                localStorage.removeItem(`treasure_shown_${i}`);
            }

            // UIを即座に更新
            loadLearningProgress();

            showHomeConfirmModal({
                icon: '✅',
                title: 'リセット完了',
                message: 'お宝の獲得状況をリセットしました！\n（悪魔の実・模擬試験履歴は保持されています）',
                okText: '閉じる',
                okColor: 'linear-gradient(135deg, #2e7d32, #43a047)',
                hideCancel: true,
                onOk: () => {}
            });
        }
    });
}

/**
 * ホームページ用カスタム確認モーダル
 * @param {Object} opts - { icon, title, message, okText, okColor, hideCancel, onOk }
 */
function showHomeConfirmModal(opts) {
    // 既存モーダルがあれば再利用、なければ動的生成
    let modal = document.getElementById('home-confirm-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'home-confirm-modal';
        modal.style.cssText = `
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.6);
            z-index: 99999;
            align-items: center;
            justify-content: center;
        `;
        modal.innerHTML = `
            <div style="
                background: white;
                border-radius: 16px;
                padding: 2rem 2rem 1.5rem;
                max-width: 400px;
                width: 90%;
                box-shadow: 0 20px 60px rgba(0,0,0,0.4);
                text-align: center;
            ">
                <div id="hcm-icon" style="font-size: 2.5rem; margin-bottom: 0.8rem;"></div>
                <h3 id="hcm-title" style="margin: 0 0 0.6rem; font-size: 1.15rem; color: #1a1a1a;"></h3>
                <p id="hcm-message" style="margin: 0 0 1.5rem; font-size: 0.95rem; color: #555; line-height: 1.7; white-space: pre-line;"></p>
                <div style="display: flex; gap: 0.8rem;" id="hcm-btn-row">
                    <button id="hcm-cancel" style="
                        flex: 1;
                        padding: 0.75rem;
                        border: 2px solid #ddd;
                        border-radius: 10px;
                        background: white;
                        color: #555;
                        font-size: 1rem;
                        font-weight: 700;
                        cursor: pointer;
                    ">キャンセル</button>
                    <button id="hcm-ok" style="
                        flex: 1;
                        padding: 0.75rem;
                        border: none;
                        border-radius: 10px;
                        color: white;
                        font-size: 1rem;
                        font-weight: 700;
                        cursor: pointer;
                    ">OK</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    document.getElementById('hcm-icon').textContent = opts.icon || '⚠️';
    document.getElementById('hcm-title').textContent = opts.title || '確認';
    document.getElementById('hcm-message').textContent = opts.message || '';

    const okBtn = document.getElementById('hcm-ok');
    const cancelBtn = document.getElementById('hcm-cancel');
    okBtn.textContent = opts.okText || 'OK';
    okBtn.style.background = opts.okColor || 'linear-gradient(135deg, #c62828, #e53935)';
    cancelBtn.style.display = opts.hideCancel ? 'none' : '';

    modal.style.display = 'flex';

    // イベントリスナーをリセット（クローンで置き換え）
    const newOk = okBtn.cloneNode(true);
    okBtn.parentNode.replaceChild(newOk, okBtn);
    const newCancel = cancelBtn.cloneNode(true);
    cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);

    newOk.textContent = opts.okText || 'OK';
    newOk.style.background = opts.okColor || 'linear-gradient(135deg, #c62828, #e53935)';
    newCancel.style.display = opts.hideCancel ? 'none' : '';

    function closeModal() { modal.style.display = 'none'; }

    newOk.addEventListener('click', () => { closeModal(); if (opts.onOk) opts.onOk(); });
    newCancel.addEventListener('click', closeModal);

    modal.addEventListener('click', function onOverlay(e) {
        if (e.target === modal) { closeModal(); modal.removeEventListener('click', onOverlay); }
    });
}
