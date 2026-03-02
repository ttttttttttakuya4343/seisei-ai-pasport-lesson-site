// キャラクターメッセージシステム
// エフェクトシステムとキャラクター定義は別ファイルで読み込み済み

// ===== ユーティリティ関数 =====
const MessageUtils = {
    // 画像パスを現在のページに合わせて調整
    getAdjustedImagePath(imagePath) {
        const currentPath = window.location.pathname;
        const fileName = Array.isArray(imagePath)
            ? imagePath[0].split('/').pop()
            : imagePath.split('/').pop();

        // chapterディレクトリ内にいる場合は階層を上がる
        if (currentPath.includes('/chapter')) {
            return '../shared/images/' + fileName;
        }
        // それ以外（ルートのindex.htmlなど）は直下のリソースを参照
        return 'shared/images/' + fileName;
    },

    // エラーハンドリング付きLocalStorage読み込み
    getFromStorage(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value !== null ? value : defaultValue;
        } catch (error) {
            console.warn(`LocalStorage read error for key "${key}":`, error);
            return defaultValue;
        }
    },

    // エラーハンドリング付きLocalStorage保存
    setToStorage(key, value) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (error) {
            console.warn(`LocalStorage write error for key "${key}":`, error);
            return false;
        }
    }
};

// メッセージセットの選択（キャラクターをランダムまたは交互に）
// ページ読み込み時にランダムに選択
const characterKeys = Object.keys(characters);
let currentCharacter = 'sabo'; // デフォルトキャラクター（loadSelectedCharacterで上書きされる）

// キャラクターを切り替える関数
function switchCharacter() {
    const keys = Object.keys(characters);
    const currentIndex = keys.indexOf(currentCharacter);
    const nextIndex = (currentIndex + 1) % keys.length;
    currentCharacter = keys[nextIndex];
    return currentCharacter;
}

// ランダムにキャラクターを選択する関数
function selectRandomCharacter() {
    const keys = Object.keys(characters);
    currentCharacter = keys[Math.floor(Math.random() * keys.length)];
    return currentCharacter;
}

// 現在のキャラクターのメッセージを取得
function getCurrentMessages() {
    const messageMap = {
        'sabo': saboMessages,
        'muichiro': muichiroMessages,
        'sanemi': sanemiMessages,
        'sanji': sanjiMessages,
        'zoro': zoroMessages,
        'law': lawMessages,
        'chopper': chopperMessages,
        'mitsuri': mitsuriMessages,
        'shinobu': shinobuMessages,
        'gyomei': gyomeiMessages,
        'giyuu': giyuuMessages,
        'obanai': obanaiMessages,
        'rengoku': rengokuMessages,
        'tengen': tengenMessages,
        'ace': aceMessages,
        'luffy': luffyMessages,
        'koala': koalaMessages,
        'ivankov': ivankovMessages,
        'nami': namiMessages,
        'leo': leoMessages,
        'tanjiro': tanjiroMessages,
        'nezuko': nezukoMessages,
        'inosuke': inosukeMessages,
        'zenitsu': zenitsuMessages
    };
    return messageMap[currentCharacter] || saboMessages;
}

// キャラクターメッセージを表示する関数（統合版）
function showSaboMessage(messageType, duration = null) {
    // ランダムモードがONの場合、毎回ランダムにキャラクターを選択
    if (isRandomMode) {
        selectRandomCharacter();
    }

    const messages = getCurrentMessages();
    let message = messages[messageType];
    if (!message) return;

    // メッセージが配列の場合、ランダムに1つ選択
    if (Array.isArray(message)) {
        message = message[Math.floor(Math.random() * message.length)];
    }

    const character = characters[currentCharacter];

    // 画像パスを取得
    let imagePath = character.image;

    // 画像が配列の場合、ランダムに選択
    if (Array.isArray(imagePath)) {
        imagePath = imagePath[Math.floor(Math.random() * imagePath.length)];
    }

    // 画像パスを現在のページに合わせて調整
    imagePath = MessageUtils.getAdjustedImagePath(imagePath);

    // 既存のメッセージがあれば全て削除
    const existingMessages = document.querySelectorAll('.character-message');
    existingMessages.forEach(msg => msg.remove());

    // メッセージの長さに応じて表示時間を調整
    if (duration === null) {
        const textLength = message.text.replace(/<br>/g, '').length;
        if (textLength < 20) {
            duration = 3000;
        } else if (textLength < 40) {
            duration = 4000;
        } else {
            duration = 5000;
        }
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `character-message ${currentCharacter}-message`;
    messageDiv.setAttribute('role', 'alert');
    messageDiv.setAttribute('aria-live', 'polite');
    // <br>タグをスペースに変換（コンパクトレイアウト対応）
    const messageText = message.text.replace(/<br\s*\/?>/gi, ' ').replace(/\s{2,}/g, ' ').trim();
    messageDiv.innerHTML = `
        <button class="close-button" aria-label="メッセージを閉じる" title="閉じる">×</button>
        <img src="${imagePath}" alt="${character.name}" class="character-avatar">
        <div class="message-content">
            <div class="character-name">${character.name}</div>
            <p>${messageText}</p>
        </div>
    `;

    document.body.appendChild(messageDiv);

    // 閉じるボタンのイベントリスナー
    const closeButton = messageDiv.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        messageDiv.classList.remove('show');
        setTimeout(() => messageDiv.remove(), 500);
    });

    // アニメーション
    setTimeout(() => messageDiv.classList.add('show'), 100);

    // エフェクトを追加
    if (message.effect === 'flame') {
        messageDiv.classList.add('flame-effect');
    } else if (message.effect === 'mist') {
        messageDiv.classList.add('mist-effect');
    } else if (message.effect === 'wind') {
        messageDiv.classList.add('wind-effect');
    }

    // 自動で消す
    const autoCloseTimer = setTimeout(() => {
        if (document.body.contains(messageDiv)) {
            messageDiv.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(messageDiv)) {
                    messageDiv.remove();
                }
            }, 500);
        }
    }, duration);

    // ホバー時にタイマーを一時停止
    messageDiv.addEventListener('mouseenter', () => {
        clearTimeout(autoCloseTimer);
    });

    // ホバー解除時に再度タイマーを設定
    messageDiv.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (document.body.contains(messageDiv)) {
                messageDiv.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(messageDiv)) {
                        messageDiv.remove();
                    }
                }, 500);
            }
        }, 2000);
    });
}

// ランダムモードの状態
let isRandomMode = true;

// localStorageから選択されたキャラクターを読み込む
function loadSelectedCharacter() {
    const saved = localStorage.getItem('selectedCharacter');
    if (saved && characters[saved]) {
        currentCharacter = saved;
    }

    // ランダムモードの設定を読み込む
    const randomMode = localStorage.getItem('randomMode');
    isRandomMode = randomMode === 'true';
}

// 選択されたキャラクターをlocalStorageに保存
function saveSelectedCharacter(characterKey) {
    localStorage.setItem('selectedCharacter', characterKey);
    currentCharacter = characterKey;
}

// ランダムモードの設定を保存
function toggleRandomMode(enabled) {
    isRandomMode = enabled;
    localStorage.setItem('randomMode', enabled.toString());

    // ランダムモードOFF時は、ユーザーが選択していたキャラクターに戻す
    if (!enabled) {
        const saved = localStorage.getItem('selectedCharacter');
        if (saved && characters[saved]) {
            currentCharacter = saved;
        }
    }
}

// キャラクター選択UIを作成
function createCharacterSelector() {
    // ヘッダーのボタンを取得
    const selectorBtn = document.getElementById('character-selector-toggle');
    if (!selectorBtn) {
        return;
    }

    // 選択パネルを作成
    const selectorPanel = document.createElement('div');
    selectorPanel.className = 'character-selector-panel';

    let panelHTML = '<h3>🎭 キャラクターを選択</h3>';

    // 常にランダムモード（上部に配置）
    panelHTML += `
        <div class="random-mode-toggle">
            <label class="toggle-label">
                <input type="checkbox" id="random-mode-checkbox" ${isRandomMode ? 'checked' : ''}>
                <span class="toggle-switch"></span>
                <span class="toggle-text">🎲 常にランダム</span>
            </label>
            <p class="toggle-description">ONにすると、メッセージごとに毎回異なるキャラクターが登場します</p>
        </div>
    `;

    panelHTML += '<div class="character-grid">';

    // 全キャラクターのオプションを作成
    Object.keys(characters).forEach(key => {
        const char = characters[key];
        const isSelected = key === currentCharacter ? 'selected' : '';

        // 画像パスを現在のページに合わせて調整
        // 画像パスを現在のページに合わせて調整
        let displayImage = Array.isArray(char.image) ? char.image[0] : char.image;
        displayImage = MessageUtils.getAdjustedImagePath(displayImage);

        panelHTML += `
            <div class="character-option ${isSelected}" data-character="${key}">
                <img src="${displayImage}" alt="${char.name}">
                <div class="character-option-name">${char.name}</div>
            </div>
        `;
    });

    panelHTML += '</div>';

    panelHTML += '<button class="selector-close-btn">閉じる</button>';

    selectorPanel.innerHTML = panelHTML;

    document.body.appendChild(selectorPanel);

    // イベントリスナー
    selectorBtn.addEventListener('click', () => {
        selectorPanel.classList.toggle('show');
    });

    // キャラクター選択
    selectorPanel.querySelectorAll('.character-option').forEach(option => {
        option.addEventListener('click', () => {
            const characterKey = option.dataset.character;

            // 選択状態を更新
            selectorPanel.querySelectorAll('.character-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            option.classList.add('selected');

            // 保存
            saveSelectedCharacter(characterKey);

            // フィードバック
            const char = characters[characterKey];
            const feedback = document.createElement('div');

            // ランダムモードONの場合は警告スタイル
            const isRandom = isRandomMode;

            const bgColor = isRandom ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' : 'white';
            const borderColor = isRandom ? '#f59e0b' : 'var(--primary-blue)';
            const textColor = isRandom ? '#92400e' : 'var(--text-gray)';

            feedback.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.8);
                background: ${bgColor};
                padding: 2rem;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                text-align: center;
                border: 3px solid ${borderColor};
                max-width: 400px;
                opacity: 0;
                animation: popupFadeIn 0.3s ease forwards;
            `;

            // 画像パスを現在のページに合わせて調整
            // 画像パスを現在のページに合わせて調整
            let feedbackImagePath = Array.isArray(char.image) ? char.image[0] : char.image;
            feedbackImagePath = MessageUtils.getAdjustedImagePath(feedbackImagePath);

            let feedbackHTML = `
                <img src="${feedbackImagePath}" alt="${char.name}" style="width: 100px; height: 100px; border-radius: 50%; margin-bottom: 1rem; border: 3px solid ${borderColor};">
                <h3 style="margin: 0 0 0.5rem 0; color: ${isRandom ? '#92400e' : 'var(--primary-blue)'};">${char.name}</h3>
                <p style="margin: 0 0 ${isRandom ? '1rem' : '0'} 0; color: ${textColor};">を選択しました！</p>
            `;

            // ランダムモードONの場合は追加メッセージ
            if (isRandom) {
                feedbackHTML += `
                    <div style="background: rgba(245, 158, 11, 0.2); padding: 1rem; border-radius: 10px; margin-top: 1rem;">
                        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">⚠️</div>
                        <p style="margin: 0; font-weight: 600; color: #92400e; font-size: 0.95rem;">
                            現在、ランダムモードがONです
                        </p>
                        <p style="margin: 0.5rem 0 0 0; color: #92400e; font-size: 0.85rem;">
                            メッセージごとにキャラクターが変わります
                        </p>
                    </div>
                `;
            }

            feedback.innerHTML = feedbackHTML;
            document.body.appendChild(feedback);

            setTimeout(() => {
                feedback.style.animation = 'popupFadeOut 0.3s ease forwards';
                setTimeout(() => feedback.remove(), 300);
            }, isRandom ? 2500 : 1500); // ランダムモードの場合は表示時間を長く
        });
    });

    // ランダムモードトグル
    const randomModeCheckbox = selectorPanel.querySelector('#random-mode-checkbox');
    randomModeCheckbox.addEventListener('change', (e) => {
        toggleRandomMode(e.target.checked);

        // フィードバック
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: ${e.target.checked ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' : 'white'};
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            text-align: center;
            border: 3px solid ${e.target.checked ? '#f59e0b' : 'var(--primary-blue)'};
            opacity: 0;
            animation: popupFadeIn 0.3s ease forwards;
        `;
        feedback.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">${e.target.checked ? '🎲' : '📌'}</div>
            <h3 style="margin: 0 0 0.5rem 0; color: ${e.target.checked ? '#92400e' : 'var(--primary-blue)'};">
                ${e.target.checked ? '常にランダムモードON' : '固定モードON'}
            </h3>
            <p style="margin: 0; color: ${e.target.checked ? '#92400e' : 'var(--text-gray)'};">
                ${e.target.checked ? 'メッセージごとにキャラクターが変わります！' : '選択したキャラクターが固定されます'}
            </p>
        `;
        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.style.animation = 'popupFadeOut 0.3s ease forwards';
            setTimeout(() => feedback.remove(), 300);
        }, 1500);
    });

    // 閉じるボタン
    selectorPanel.querySelector('.selector-close-btn').addEventListener('click', () => {
        selectorPanel.classList.remove('show');
    });

    // パネル外をクリックで閉じる
    document.addEventListener('click', (e) => {
        if (!selectorPanel.contains(e.target) && !selectorBtn.contains(e.target)) {
            selectorPanel.classList.remove('show');
        }
    });
}

// クイズ進捗追跡
let quizProgress = {
    total: 0,
    correct: 0,
    incorrect: 0,
    answered: 0
};

// ページタイプ判定関数（優先順位付き）
function detectPageType() {
    const path = window.location.pathname;
    const hasHero = !!document.querySelector('.hero');
    const hasLessonList = !!document.querySelector('.lesson-list');
    const hasLessonPage = !!document.querySelector('.lesson-page');

    // 優先順位1: レッスンページ（最も具体的）
    if (path.match(/\d+-\d+[a-z]?_\w+\.html/) && hasLessonPage) {
        return 'lesson';
    }

    // 優先順位2: 章ページ
    if (path.match(/\/chapter\d+\//) && hasLessonList) {
        return 'chapter';
    }

    // 優先順位3: ホームページ
    if ((path.includes('/index.html') || path === '/' || path.endsWith('/ai_passport_course/')) && hasHero) {
        return 'home';
    }

    return 'unknown';
}

// クイズトラッキング初期化（確実にカウント）
function initQuizTracking() {
    // 初期カウント
    const quizQuestions = document.querySelectorAll('.quiz-question');
    quizProgress.total = quizQuestions.length;

    // DOMの動的変更を監視（クイズが後から追加される場合に対応）
    if (quizProgress.total === 0) {
        const observer = new MutationObserver(() => {
            const newCount = document.querySelectorAll('.quiz-question').length;
            if (newCount > 0 && newCount !== quizProgress.total) {
                quizProgress.total = newCount;
                observer.disconnect(); // カウント完了したら監視終了
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // 5秒後に強制的に監視終了
        setTimeout(() => observer.disconnect(), 5000);
    }
}

// ページ読み込み時の処理
window.addEventListener('load', () => {
    // 保存されたキャラクターを読み込む
    loadSelectedCharacter();

    // キャラクター選択UIを作成
    createCharacterSelector();

    // ページタイプを判定
    const pageType = detectPageType();

    // ページタイプ別の処理
    switch (pageType) {
        case 'home':
            setTimeout(() => {
                showSaboMessage('welcome', 5000);
            }, 1000);
            break;

        case 'chapter':
            setTimeout(() => {
                showSaboMessage('chapterStart', 5000);
            }, 1000);
            break;

        case 'lesson':
            // クイズトラッキング初期化
            setTimeout(() => {
                initQuizTracking();
                showSaboMessage('lessonStart', 5000);
            }, 1000);

            // 15分後に応援メッセージ
            setTimeout(() => {
                showSaboMessage('lessonComplete', 5000);
            }, 15 * 60 * 1000);
            break;

        default:
            // unknownの場合は何もしない
            console.log('Page type: unknown - no message displayed');
            break;
    }
});

// 既存のselectAnswer関数を拡張（グローバルスコープで定義）
const originalSelectAnswer = window.selectAnswer;
window.selectAnswer = function (element, isCorrect, explanation = null) {
    // 既存の処理を実行
    if (originalSelectAnswer) {
        originalSelectAnswer(element, isCorrect, explanation);
    } else {
        // 既存の処理がない場合の代替処理
        const allOptions = element.parentElement.querySelectorAll('li');
        allOptions.forEach(option => {
            option.style.pointerEvents = 'none';
        });

        const feedbackId = element.parentElement.id.replace('quiz', 'feedback');
        const feedbackDiv = document.getElementById(feedbackId);

        if (isCorrect) {
            element.classList.add('correct');
            if (feedbackDiv) {
                // 解説がある場合は表示
                if (explanation) {
                    feedbackDiv.innerHTML = `
                        <div class="feedback-correct">
                            <div class="feedback-icon">✅</div>
                            <div class="feedback-content">
                                <div class="feedback-title">正解です！</div>
                                <div class="feedback-explanation">${explanation}</div>
                            </div>
                        </div>
                    `;
                } else {
                    feedbackDiv.innerHTML = '<div class="feedback-correct"><div class="feedback-icon">✅</div><div class="feedback-title">正解です! よくできました!</div></div>';
                }
                feedbackDiv.className = 'quiz-feedback correct';
                feedbackDiv.style.display = 'block';
            }

        } else {
            element.classList.add('incorrect');
            if (feedbackDiv) {
                // 解説がある場合は表示
                if (explanation) {
                    feedbackDiv.innerHTML = `
                        <div class="feedback-incorrect">
                            <div class="feedback-icon">❌</div>
                            <div class="feedback-content">
                                <div class="feedback-title">不正解です</div>
                                <div class="feedback-explanation">${explanation}</div>
                            </div>
                        </div>
                    `;
                } else {
                    feedbackDiv.innerHTML = '<div class="feedback-incorrect"><div class="feedback-icon">❌</div><div class="feedback-title">不正解です。もう一度考えてみましょう。</div></div>';
                }
                feedbackDiv.className = 'quiz-feedback incorrect';
                feedbackDiv.style.display = 'block';
            }
        }
    }

    // クイズ進捗を更新
    quizProgress.answered++;
    if (isCorrect) {
        quizProgress.correct++;
    } else {
        quizProgress.incorrect++;
    }

    // キャラクターに応じたメッセージを表示（エフェクトは無効化）
    if (isCorrect) {
        setTimeout(() => {
            showSaboMessage('correct', 5000);
        }, 500);
    } else {
        // 不正解時はメッセージのみ
        setTimeout(() => {
            showSaboMessage('incorrect', 5000);
        }, 500);
    }

    // 全問回答済みかチェック
    if (quizProgress.answered === quizProgress.total) {
        setTimeout(() => {
            if (quizProgress.correct === quizProgress.total) {
                // 全問正解！
                showSaboMessage('allComplete', 6000);
            } else if (quizProgress.incorrect === quizProgress.total) {
                // 全問不正解...励ましのメッセージ
                showSaboMessage('lessonStart', 5000);
            }
        }, 2000); // 最後の正解/不正解メッセージの後に表示
    }
};
