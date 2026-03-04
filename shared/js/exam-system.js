/**
 * 生成AIパスポート試験 - 模擬試験共通システム
 * 各章の章末テスト（*-exam.html）で共通利用されるロジックです。
 */

const ExamSystem = {
    // 状態管理
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    userAnswers: [],
    config: {}, // 章別の設定を保持

    /**
     * 試験システムの初期化
     * @param {Array} questionsData - 問題データの配列
     * @param {Object} options - 章固有の設定（章番号、合格ライン、次へ進むリンクなど）
     */
    init: function (questionsData, options = {}) {
        // 問題データの正規化（異なるスキーマへの対応）
        // 第4章: { question, options, correctOptionIndex, explanation }
        // 第1〜3章: { q, a, exp }（boolean回答）
        this.allQuestions = (questionsData || []).map(item => {
            // 既に正規化済み（q/a/expキーを持つ）ならそのまま
            if ('q' in item && 'a' in item && 'exp' in item) {
                return item;
            }
            // 第4章形式 → 共通形式へ変換
            if ('question' in item && 'correctOptionIndex' in item) {
                return {
                    q: item.question,
                    a: item.correctOptionIndex,
                    exp: item.explanation || '',
                    options: item.options || []
                };
            }
            // それ以外はそのまま返す
            return item;
        });
        this.config = Object.assign({
            chapterNumber: 1,
            questionCount: 15,
            passingPercentage: 80,
            nextChapterLink: '../chapter2/index.html',
            storageKeyPrefix: 'chapter1',
            treasureShowKey: 'treasure_shown_1'
        }, options);

        // UI要素のバインディングとイベント設定
        document.addEventListener('DOMContentLoaded', () => {
            // テスト用：URLに ?test=treasure とつけるとお宝演出を強制確認できる
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('test') === 'treasure') {
                this.showTreasureModal();
                return;
            }

            // ベストスコアの復元
            const bestScore = localStorage.getItem(`${this.config.storageKeyPrefix}_exam_score`);
            if (bestScore) {
                const bestScoreDisplay = document.getElementById('best-score-display');
                const bestScoreSpan = document.getElementById('best-score');
                if (bestScoreDisplay && bestScoreSpan) {
                    bestScoreDisplay.style.display = 'block';
                    bestScoreSpan.textContent = bestScore;
                }
            }

            // ボタンイベント
            const startBtn = document.getElementById('start-btn');
            const nextBtn = document.getElementById('next-btn');

            if (startBtn) startBtn.addEventListener('click', () => this.startExam());
            if (nextBtn) nextBtn.addEventListener('click', () => this.nextQuestion());
        });

        // グローバル関数として登録（HTMLからのonclick呼び出し対応）
        window.selectExamAnswer = (answer, element) => this.selectAnswer(answer, element);
        window.toggleTreasureSound = () => this.toggleTreasureSound();
        window.closeTreasureModal = () => this.closeTreasureModal();
    },

    /**
     * シャッフル関数
     */
    shuffle: function (array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    },

    /**
     * 試験の開始
     */
    startExam: function () {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('exam-container').style.display = 'block';

        // 全問題から指定数（デフォルト15）をシャッフルして抽出
        const count = Math.min(this.config.questionCount, this.allQuestions.length);
        this.questions = this.shuffle([...this.allQuestions]).slice(0, count);

        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];

        this.showQuestion();
    },

    /**
     * 問題の表示
     */
    showQuestion: function () {
        document.getElementById('current-q').textContent = this.currentQuestionIndex + 1;
        const q = this.questions[this.currentQuestionIndex];

        const area = document.getElementById('question-area');

        // 問題タイプ（第1章のような○×か、章以降の択一か）を行数の有無で判定
        // 注: 1章は isCorrect プロパティがなく、q.a (boolean) で判定している。2章以降も同様を想定
        let optionsHtml = '';

        if (typeof q.a === 'boolean') {
            // ○×問題の場合
            optionsHtml = `
                <div class="exam-option" onclick="selectExamAnswer(true, this)">○（正しい）</div>
                <div class="exam-option" onclick="selectExamAnswer(false, this)">×（誤り）</div>
            `;
        } else if (q.options && Array.isArray(q.options)) {
            // 4択等の場合（汎用対応）
            optionsHtml = q.options.map((opt, idx) =>
                `<div class="exam-option" onclick="selectExamAnswer(${idx}, this)">${opt}</div>`
            ).join('');
        }

        area.innerHTML = `
            <div class="exam-question active">
                <p style="font-size: 1.2rem; margin-bottom: 1.5rem;"><strong>問題:</strong><br>${q.q}</p>
                <div class="exam-options">
                    ${optionsHtml}
                </div>
                <div id="exam-feedback" style="display: none; margin-top: 1.5rem; padding: 1.5rem; border-radius: 8px; line-height: 1.6;"></div>
            </div>
        `;
        document.getElementById('next-btn').style.display = 'none';
        window.scrollTo(0, 0);
    },

    /**
     * 解答の選択とフィードバック表示
     */
    selectAnswer: function (answer, element) {
        // 既に選択済みなら無視
        if (document.querySelector('.exam-option.selected')) return;

        // 選択状態のUI付与
        element.classList.add('selected');

        const q = this.questions[this.currentQuestionIndex];

        // 正誤判定
        let isCorrect = false;
        let correctIndex = -1;

        if (typeof q.a === 'boolean') {
            isCorrect = (answer === q.a);
            correctIndex = q.a ? 0 : 1;
        } else {
            isCorrect = (answer === q.a);
            correctIndex = q.a;
        }

        const options = element.parentElement.children;

        // 正解・不正解でボタンの色を変える（インラインスタイル付与）
        if (isCorrect) {
            element.style.backgroundColor = 'var(--success-green, #4caf50)';
            element.style.borderColor = '#388e3c';
            this.score++;
        } else {
            element.style.backgroundColor = 'var(--error-red, #f44336)';
            element.style.borderColor = '#d32f2f';
        }

        // ユーザーの解答履歴を保存
        this.userAnswers.push({
            q: q.q,
            user: answer,
            correct: q.a,
            exp: q.exp,
            type: typeof q.a === 'boolean' ? 'boolean' : 'choice',
            options: q.options || null
        });

        // フィードバックの即時表示
        const feedbackEl = document.getElementById('exam-feedback');

        let correctText = '';
        if (typeof q.a === 'boolean') {
            correctText = q.a ? '○（正しい）' : '×（誤り）';
        } else if (q.options) {
            correctText = q.options[q.a];
        }

        if (isCorrect) {
            feedbackEl.style.backgroundColor = '#e8f5e9';
            feedbackEl.style.borderLeft = '5px solid var(--success-green, #4caf50)';
            feedbackEl.innerHTML = '<strong style="color: #2e7d32; font-size: 1.2rem;">✅ 大正解！</strong><br><br>' + q.exp;
        } else {
            feedbackEl.style.backgroundColor = '#ffebee';
            feedbackEl.style.borderLeft = '5px solid var(--error-red, #f44336)';
            feedbackEl.innerHTML = '<strong style="color: #c62828; font-size: 1.2rem;">❌ うーん、惜しい！</strong><br><br><strong>正解は「' + correctText + '」だ！</strong><br>' + q.exp;
        }
        feedbackEl.style.display = 'block';

        // 次へボタン表示
        document.getElementById('next-btn').style.display = 'inline-block';
    },

    /**
     * 次の問題へ
     */
    nextQuestion: function () {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
            this.showQuestion();
        } else {
            this.showResult();
        }
    },

    /**
     * 試験結果の表示
     */
    showResult: function () {
        document.getElementById('exam-container').style.display = 'none';
        document.getElementById('result-screen').style.display = 'block';

        const percentage = Math.round((this.score / this.questions.length) * 100);
        document.getElementById('score-circle').style.setProperty('--percentage', `${percentage}%`);
        document.getElementById('final-score').textContent = `${this.score}/${this.questions.length}`;

        const msgEl = document.getElementById('result-message');
        const nextChapterBtn = document.getElementById('next-chapter-btn');
        const passLine = this.config.passingPercentage;

        if (percentage === 100) {
            msgEl.textContent = `完璧だ！第${this.config.chapterNumber}章の内容を完全にマスターしたな！🎉✨`;
            msgEl.style.color = "var(--primary-blue)";
            if (nextChapterBtn) {
                nextChapterBtn.style.display = 'inline-block';
                if (this.config.nextChapterLink) nextChapterBtn.href = this.config.nextChapterLink;
            }
        } else if (percentage >= passLine) {
            msgEl.textContent = "素晴らしい成績だ！合格圏内だぞ！👍";
            if (nextChapterBtn) {
                nextChapterBtn.style.display = 'inline-block';
                if (this.config.nextChapterLink) nextChapterBtn.href = this.config.nextChapterLink;
            }
        } else if (percentage >= 60) {
            msgEl.textContent = "よく頑張った！間違えたところを復習して、さらに上を目指そう！📝";
        } else {
            msgEl.textContent = "もう一度テキストを読み返して、再チャレンジしよう！君ならできる！💪";
        }

        // ハイスコア保存
        const bestScoreKey = `${this.config.storageKeyPrefix}_exam_score`;
        const bestScore = parseInt(localStorage.getItem(bestScoreKey) || '0');
        if (this.score > bestScore) {
            localStorage.setItem(bestScoreKey, this.score);
        }

        // 合格なら完了フラグセット＆お宝演出表示
        if (percentage >= passLine) {
            const completedKey = `${this.config.storageKeyPrefix}_completed`;
            const wasCompleted = localStorage.getItem(completedKey) === 'true';

            localStorage.setItem(completedKey, 'true');
            // 章ごとの最終セクションキーへの保存（必要に応じて各画面でセットさせてもOK）

            if (!wasCompleted || localStorage.getItem(this.config.treasureShowKey) !== 'true') {
                // 初回クリア時にお宝演出
                localStorage.setItem(this.config.treasureShowKey, 'true');
                setTimeout(() => {
                    this.showTreasureModal();
                }, 1000);
            }
        }

        // 振り返りリスト作成
        const listEl = document.getElementById('result-list');
        let html = '<h3>回答の振り返り</h3>';

        this.userAnswers.forEach((ans, i) => {
            const isCorrect = (ans.user === ans.correct);
            const mark = isCorrect ? '<span class="correct-ans">○ 正解</span>' : '<span class="wrong-ans">× 不正解</span>';

            let userChoice = '';
            let correctChoice = '';

            if (ans.type === 'boolean') {
                userChoice = ans.user ? '○' : '×';
                correctChoice = ans.correct ? '○' : '×';
            } else {
                userChoice = ans.options ? ans.options[ans.user] : ans.user;
                correctChoice = ans.options ? ans.options[ans.correct] : ans.correct;
            }

            html += `
                <div class="result-item">
                    <p><strong>問${i + 1}:</strong> ${ans.q}</p>
                    <p style="margin: 0.5rem 0;">あなたの回答: <strong>${userChoice}</strong> | 判定: ${mark}</p>
                    <div class="explanation">
                        <strong>正解: ${correctChoice}</strong><br>
                        ${ans.exp}
                    </div>
                </div>
            `;
        });

        if (listEl) listEl.innerHTML = html;
        window.scrollTo(0, 0);
    },

    /**
     * お宝動画機能：音声切り替え
     */
    toggleTreasureSound: function () {
        const video = document.getElementById('treasure-video');
        const btn = document.getElementById('sound-toggle-btn');
        if (video && btn) {
            if (video.muted) {
                video.muted = false;
                btn.innerHTML = '🔊 音声を消す';
            } else {
                video.muted = true;
                btn.innerHTML = '🔇 音声を出す';
            }
        }
    },

    /**
     * お宝動画機能：モーダル表示
     */
    showTreasureModal: function () {
        const modal = document.getElementById('treasure-modal');
        const video = document.getElementById('treasure-video');
        const btn = document.getElementById('sound-toggle-btn');
        if (modal && video) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // 初期状態セット
            video.muted = false;
            video.currentTime = 0;
            if (btn) btn.innerHTML = '🔊 音声を消す';

            video.play().catch((e) => {
                console.log("自動再生がブロックされました。ミュートで再生を試みます。", e);
                video.muted = true;
                if (btn) btn.innerHTML = '🔇 音声を出す';
                video.play();
            });
        }
    },

    /**
     * お宝動画機能：モーダル非表示
     */
    closeTreasureModal: function () {
        const modal = document.getElementById('treasure-modal');
        const video = document.getElementById('treasure-video');
        if (modal && video) {
            video.pause();
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
};

window.ExamSystem = ExamSystem;
