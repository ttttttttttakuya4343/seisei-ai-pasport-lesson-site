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

