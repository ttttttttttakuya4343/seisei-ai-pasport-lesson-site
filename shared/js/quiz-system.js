// ===== クイズ・セクション完了 共通システム =====
// 全セクションHTMLから共有されるクイズ回答処理と進捗管理

/**
 * クイズの回答を処理する
 * @param {HTMLElement} e - クリックされた選択肢要素
 * @param {boolean} isCorrect - 正解かどうか
 * @param {string} explanation - 解説テキスト
 */
function selectAnswer(e, isCorrect, explanation) {
    const options = e.parentElement.children;
    const feedback = e.parentElement.nextElementSibling;

    // 全選択肢のスタイルをリセット
    for (let opt of options) {
        opt.classList.remove("correct", "incorrect");
    }

    // 正解・不正解のスタイル適用
    if (isCorrect) {
        e.classList.add("correct");
        feedback.className = "quiz-feedback correct";
        feedback.innerHTML = "✅ 正解です!";
    } else {
        e.classList.add("incorrect");
        feedback.className = "quiz-feedback incorrect";
        feedback.innerHTML = "❌ 不正解です。もう一度考えてみましょう。";
    }

    // 解説の表示
    if (explanation) {
        let isCustom = explanation.trim().startsWith("✅") || explanation.trim().startsWith("❌");
        if (isCustom) {
            feedback.innerHTML = "";
        }
        let styleStr = isCustom ? "font-size: 0.95em;" : "margin-top: 10px; font-size: 0.95em; padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.1);";
        feedback.innerHTML += `<div class="quiz-explanation" style="${styleStr}">${explanation}</div>`;
    }
    feedback.style.display = "block";

    // キャラクターシステム連携
    if (typeof selectRandomCharacter === "function" && typeof isRandomMode !== "undefined" && isRandomMode) {
        selectRandomCharacter();
    }
    if (isCorrect && typeof playCharacterEffect === "function" && typeof currentCharacter !== "undefined") {
        playCharacterEffect(currentCharacter, e);
    }
    if (typeof showSaboMessage === "function") {
        setTimeout(() => {
            showSaboMessage(isCorrect ? "correct" : "incorrect", 5000);
        }, 500);
    }
}

/**
 * 現在のページから章番号とセクションIDを自動検出する
 * @returns {{ chapter: string, sectionId: string }}
 */
function detectChapterAndSection() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();

    // 章番号をパスから検出 (chapter1, chapter2, ...)
    const chapterMatch = path.match(/chapter(\d+)/);
    const chapterNum = chapterMatch ? chapterMatch[1] : '1';
    const chapter = `chapter${chapterNum}`;

    // セクションIDをファイル名から検出 (1-1, 2-3, 5-1, ...)
    const sectionMatch = filename.match(/(\d+-\d+[a-z]?)/);
    const sectionId = sectionMatch ? sectionMatch[1] : '';

    return { chapter, sectionId };
}

/**
 * セクションの完了/未完了を切り替える
 * @param {string} sectionId - セクションID (例: '1-1', '2-3')
 */
function completeSection(sectionId) {
    const { chapter } = detectChapterAndSection();
    const storageKey = `${chapter}_section${sectionId}_completed`;
    const button = document.querySelector('button[onclick*="completeSection"]');
    const isCompleted = localStorage.getItem(storageKey) === "true";

    if (isCompleted) {
        // 完了を取り消す
        localStorage.removeItem(storageKey);
        button.textContent = "✅ このセクションを完了する";
        button.classList.remove("completed");
        if (typeof showSaboMessage === "function") {
            showSaboMessage("lessonReset", 3000);
        }
    } else {
        // 完了にする
        localStorage.setItem(storageKey, "true");
        button.textContent = "🔄 完了を取り消す";
        button.classList.add("completed");
        if (typeof showSaboMessage === "function") {
            showSaboMessage("lessonComplete", 4000);
        }
        // 3秒後にチャプタートップへ（取り消し可能な猶予期間）
        setTimeout(() => {
            if (localStorage.getItem(storageKey) === "true") {
                window.location.href = "index.html";
            }
        }, 3000);
    }
}

// ===== ページ読み込み時の状態復元 =====
window.addEventListener("load", () => {
    const { chapter, sectionId } = detectChapterAndSection();
    if (!sectionId) return;

    const storageKey = `${chapter}_section${sectionId}_completed`;
    const button = document.querySelector('button[onclick*="completeSection"]');

    if (button && localStorage.getItem(storageKey) === "true") {
        button.textContent = "🔄 完了を取り消す";
        button.classList.add("completed");
    }
});

// ===== 外部データからのクイズ動的生成 =====
/**
 * クイズデータ配列を受け取り、画面に描画する
 * @param {Array} questionsData - {q: 問題文, a: 正解(boolean), exp: 解説} の配列
 */
function initQuiz(questionsData) {
    const container = document.getElementById('quiz-container');
    if (!container || !questionsData || !questionsData.length) return;

    let html = '';

    questionsData.forEach((item, index) => {
        let qText = item.q !== undefined ? item.q : item.question;
        let expText = item.exp !== undefined ? item.exp : item.explanation;
        let options = item.options;
        let correctIndex = item.a !== undefined ? item.a : item.correctOptionIndex;

        // シングルクォーテーションのエスケープ（解説文内にある場合）
        const safeExp = expText ? expText.replace(/'/g, "\\'") : '';

        html += `
            <div class="quiz-question">
                <p><strong>問題${index + 1}:</strong> ${qText}</p>
                <ul class="quiz-options">`;

        if (options && options.length > 0) {
            // 選択肢がデータに定義されている場合 (4択や指定の○×など)
            options.forEach((opt, optIdx) => {
                const isCorrect = (optIdx === correctIndex);
                html += `
                    <li onclick="selectAnswer(this, ${isCorrect}, '${isCorrect ? '✅解説：' : '❌'}${safeExp}')">${opt}</li>`;
            });
        } else {
            // 従来の○×形式 (options未定義の場合のフォールバック)
            let isTrueCorrect = (correctIndex === true);
            let isFalseCorrect = (correctIndex === false);
            html += `
                    <li onclick="selectAnswer(this, ${isTrueCorrect}, '${isTrueCorrect ? '✅解説：' : '❌'}${safeExp}')">○（正しい）</li>
                    <li onclick="selectAnswer(this, ${isFalseCorrect}, '${isFalseCorrect ? '✅解説：' : '❌'}${safeExp}')">×（誤り）</li>`;
        }

        html += `
                </ul>
                <div class="quiz-feedback" style="display: none;"></div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ===== 章別 進捗リセット機能 =====

/** 各章のセクションID定義 */
const CHAPTER_SECTION_MAP = {
    1: ['1-1', '1-2', '1-3', '1-4'],
    2: ['2-1', '2-2', '2-3'],
    3: ['3-1', '3-2', '3-3', '3-4'],
    4: ['4-1', '4-2', '4-3', '4-4', '4-5', '4-6'],
    5: ['5-1', '5-2', '5-3', '5-4', '5-5']
};

/**
 * 章の学習進捗をリセットする（完了フラグのみ。テストスコアは残す）
 * @param {number} chapterNum - リセットする章番号 (1〜5)
 */
function resetChapterProgress(chapterNum) {
    _showChapterResetModal({
        icon: '🔄',
        title: `第${chapterNum}章の進捗をリセット`,
        message: `第${chapterNum}章のセクション完了状態をすべて初期化します。\n（テストスコアはそのまま残ります）\n\nこの操作は取り消せません。`,
        okText: 'リセットする',
        onOk: () => {
            const sections = CHAPTER_SECTION_MAP[chapterNum] || [];
            const chapterKey = `chapter${chapterNum}`;

            // セクション完了フラグを削除
            sections.forEach(sec => {
                localStorage.removeItem(`${chapterKey}_section${sec}_completed`);
            });

            // 章全体の完了フラグを削除
            localStorage.removeItem(`${chapterKey}_completed`);

            // 章末テスト完了フラグを削除
            localStorage.removeItem(`${chapterKey}_section${chapterNum}-exam_completed`);

            // お宝表示済みフラグを削除
            localStorage.removeItem(`treasure_shown_${chapterNum}`);

            // 完了通知 → ページリロード
            _showChapterResetModal({
                icon: '✅',
                title: 'リセット完了',
                message: `第${chapterNum}章の進捗をリセットしました！\n（テストスコアは保持されています）`,
                okText: '閉じる',
                hideCancel: true,
                onOk: () => { window.location.reload(); }
            });
        }
    });
}

/**
 * 章リセット用の確認モーダル（動的生成）
 * @param {Object} opts - { icon, title, message, okText, hideCancel, onOk }
 */
function _showChapterResetModal(opts) {
    let modal = document.getElementById('chapter-reset-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'chapter-reset-modal';
        modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:99999;align-items:center;justify-content:center;';
        modal.innerHTML = `
            <div style="background:white;border-radius:16px;padding:2rem 2rem 1.5rem;max-width:400px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.4);text-align:center;">
                <div id="crm-icon" style="font-size:2.5rem;margin-bottom:0.8rem;"></div>
                <h3 id="crm-title" style="margin:0 0 0.6rem;font-size:1.15rem;color:#1a1a1a;"></h3>
                <p id="crm-message" style="margin:0 0 1.5rem;font-size:0.95rem;color:#555;line-height:1.7;white-space:pre-line;"></p>
                <div style="display:flex;gap:0.8rem;">
                    <button id="crm-cancel" style="flex:1;padding:0.75rem;border:2px solid #ddd;border-radius:10px;background:white;color:#555;font-size:1rem;font-weight:700;cursor:pointer;">キャンセル</button>
                    <button id="crm-ok" style="flex:1;padding:0.75rem;border:none;border-radius:10px;background:linear-gradient(135deg,#c62828,#e53935);color:white;font-size:1rem;font-weight:700;cursor:pointer;">OK</button>
                </div>
            </div>`;
        document.body.appendChild(modal);
    }

    document.getElementById('crm-icon').textContent = opts.icon || '⚠️';
    document.getElementById('crm-title').textContent = opts.title || '確認';
    document.getElementById('crm-message').textContent = opts.message || '';

    const okBtn = document.getElementById('crm-ok');
    const cancelBtn = document.getElementById('crm-cancel');
    okBtn.textContent = opts.okText || 'OK';
    cancelBtn.style.display = opts.hideCancel ? 'none' : '';

    modal.style.display = 'flex';

    // リスナーをクリーンアップ（クローン置換）
    const newOk = okBtn.cloneNode(true);
    okBtn.parentNode.replaceChild(newOk, okBtn);
    const newCancel = cancelBtn.cloneNode(true);
    cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);

    newOk.textContent = opts.okText || 'OK';
    newCancel.style.display = opts.hideCancel ? 'none' : '';

    function closeModal() { modal.style.display = 'none'; }

    newOk.addEventListener('click', () => { closeModal(); if (opts.onOk) opts.onOk(); });
    newCancel.addEventListener('click', closeModal);
    modal.addEventListener('click', function onOverlay(e) {
        if (e.target === modal) { closeModal(); modal.removeEventListener('click', onOverlay); }
    });
}
