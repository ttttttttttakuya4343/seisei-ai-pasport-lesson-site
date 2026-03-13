/**
 * 生成AIパスポート試験 - 本試験形式 模擬試験システム
 * 60問・60分の本試験と同じ形式
 * 悪魔の実ガチャ付き
 */


const FullExamSystem = {
    // 状態管理
    questions: [],
    currentIndex: 0,
    userAnswers: [],       // [null, 2, 0, null, ...] 各問の選択index or null
    reviewFlags: [],       // [false, true, false, ...] 見直しフラグ
    timer: null,
    timeRemaining: 60 * 60, // 60分 = 3600秒
    examStarted: false,
    examSubmitted: false,
    gachaPlayed: false,
    gachaFruit: null,
    gachaSoundMuted: false,
    overtakenBgm: null,
    luffyBgm: null,

    // 悪魔の実データ（new/ フォルダの画像のみ使用・レア度1〜5）
    devilFruits: [
        // ★★★★★ レア度5（ルフィ・エース・ロー）
        { name: "ゴムゴムの実", type: "パラミシア系", ability: "モンキー・D・ルフィ", rarity: 5, emoji: "🤜", color: "#FF6B6B", image: "shared/images/devil-fruits/new/gomugomu.png" },
        { name: "メラメラの実", type: "ロギア系", ability: "ポートガス・D・エース", rarity: 5, emoji: "🔥", color: "#FF4500", image: "shared/images/devil-fruits/new/meramera.png" },
        { name: "オペオペの実", type: "パラミシア系", ability: "トラファルガー・ロー", rarity: 5, emoji: "💉", color: "#4169E1", image: "shared/images/devil-fruits/new/opeope.png" },
        // ★★★★ レア度4（クロコダイル・白ひげ）
        { name: "スナスナの実", type: "ロギア系", ability: "サー・クロコダイル", rarity: 4, emoji: "🏜️", color: "#C8A96E", image: "shared/images/devil-fruits/new/sunasuna.png" },
        { name: "グラグラの実", type: "パラミシア系", ability: "エドワード・ニューゲート（白ひげ）", rarity: 4, emoji: "💥", color: "#8B4513", image: "shared/images/devil-fruits/new/guragura.png" },
        // ★★★ レア度3（カイドウ・黄猿・ボア・ハンコック）
        { name: "ウオウオの実 幻獣種", type: "ゾオン系", ability: "カイドウ", rarity: 3, emoji: "🐉", color: "#7B2D8B", image: "shared/images/devil-fruits/new/uouo.png" },
        { name: "ヒトヒトの実 幻獣種", type: "ゾオン系", ability: "トニートニーチョッパー", rarity: 3, emoji: "🗿", color: "#DAA520", image: "shared/images/devil-fruits/new/hitohito.png" },
        { name: "メロメロの実", type: "パラミシア系", ability: "ボア・ハンコック", rarity: 3, emoji: "💘", color: "#FF69B4", image: "shared/images/devil-fruits/new/meromero.png" },
        // ★★ レア度2（スモーカー・ハグワール・D・サウロ）
        { name: "モクモクの実", type: "ロギア系", ability: "スモーカー", rarity: 2, emoji: "💨", color: "#B0B0B0", image: "shared/images/devil-fruits/new/mokumoku.png" },
        { name: "ネコネコの実", type: "ゾオン系", ability: "ロブ・ルッチ", rarity: 2, emoji: "🐆", color: "#DAA520", image: "shared/images/devil-fruits/new/nekoneko.png" },
        // ★ レア度1（ロビン）
        { name: "ハナハナの実", type: "パラミシア系", ability: "ニコ・ロビン", rarity: 1, emoji: "🌸", color: "#DDA0DD", image: "shared/images/devil-fruits/new/hanahana.png" },
    ],

    /**
     * 初期化
     */
    init: function () {
        document.addEventListener('DOMContentLoaded', () => {
            // ボタンイベント
            document.getElementById('start-btn').addEventListener('click', () => this.startExam());
            document.getElementById('prev-btn').addEventListener('click', () => this.goToPrev());
            document.getElementById('next-btn').addEventListener('click', () => this.goToNext());
            document.getElementById('review-toggle-btn').addEventListener('click', () => this.toggleReview());
            document.getElementById('submit-exam-btn').addEventListener('click', () => this.submitExam());
            document.getElementById('back-to-review-btn').addEventListener('click', () => this.showReviewScreen());
            document.getElementById('abort-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                this.abortExam();
            });

            // テスト用強制終了ボタン
            const forceFinishBtn = document.getElementById('force-finish-btn');
            if (forceFinishBtn) {
                forceFinishBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.forceFinishExam();
                });
            }

            // ガチャ専用画面からの戻るボタン
            const backFromGachaBtn = document.getElementById('back-from-gacha-btn');
            if (backFromGachaBtn) {
                backFromGachaBtn.addEventListener('click', () => {
                    this.gachaPlayed = true;
                    if (this.luffyBgm) {
                        this.luffyBgm.pause();
                        this.luffyBgm.currentTime = 0;
                    }
                    document.getElementById('gacha-screen').style.display = 'none';
                    document.getElementById('result-screen').style.display = 'block';
                    document.querySelector('.gacha-section').style.display = 'none';
                    window.scrollTo(0, 0);
                });
            }

            // フィルターボタン
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => this.filterResults(e.target.dataset.filter));
            });

            // 履歴とコレクション表示
            this.renderHistory();
            this.renderCollection();
        });
    },

    /**
     * 試験開始
     */
    startExam: function () {
        // 全問シャッフル
        this.questions = this.shuffle([...fullExamQuestions]);
        this.currentIndex = 0;
        this.userAnswers = new Array(60).fill(null);
        this.reviewFlags = new Array(60).fill(false);
        this.examStarted = true;
        this.examSubmitted = false;
        this.timeRemaining = 60 * 60;

        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('exam-screen').style.display = 'block';
        document.getElementById('review-screen').style.display = 'none';
        document.getElementById('result-screen').style.display = 'none';

        this.startTimer();
        this.renderQuestionNav();
        this.showQuestion();
    },

    /**
     * タイマー開始
     */
    startTimer: function () {
        this.updateTimerDisplay();
        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();
            if (this.timeRemaining <= 0) {
                clearInterval(this.timer);
                this.submitExam();
            }
        }, 1000);
    },

    /**
     * タイマー表示更新
     */
    updateTimerDisplay: function () {
        const min = Math.floor(this.timeRemaining / 60);
        const sec = this.timeRemaining % 60;
        const timerEl = document.getElementById('timer-display');
        timerEl.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

        // 残り5分で警告色
        if (this.timeRemaining <= 300) {
            timerEl.classList.add('timer-warning');
        } else {
            timerEl.classList.remove('timer-warning');
        }
    },

    /**
     * 配列シャッフル
     */
    shuffle: function (arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    /**
     * 問題番号ナビバーの描画
     */
    renderQuestionNav: function () {
        const nav = document.getElementById('question-nav');
        nav.innerHTML = '';
        for (let i = 0; i < this.questions.length; i++) {
            const btn = document.createElement('button');
            btn.className = 'q-nav-btn';
            btn.textContent = i + 1;
            btn.addEventListener('click', () => {
                this.currentIndex = i;
                this.showQuestion();
            });
            nav.appendChild(btn);
        }
        this.updateNavHighlight();
    },

    /**
     * ナビバーのハイライト更新
     */
    updateNavHighlight: function () {
        const btns = document.querySelectorAll('.q-nav-btn');
        btns.forEach((btn, i) => {
            btn.classList.remove('current', 'answered', 'review-flag');
            if (i === this.currentIndex) btn.classList.add('current');
            if (this.userAnswers[i] !== null) btn.classList.add('answered');
            if (this.reviewFlags[i]) btn.classList.add('review-flag');
        });
    },

    /**
     * 問題表示
     */
    showQuestion: function () {
        const q = this.questions[this.currentIndex];
        const idx = this.currentIndex;

        // 問題番号
        document.getElementById('q-number').textContent = `問 ${idx + 1} / ${this.questions.length}`;

        // プログレスバー
        const answered = this.userAnswers.filter(a => a !== null).length;
        const pct = Math.round((answered / this.questions.length) * 100);
        document.getElementById('progress-bar').style.width = pct + '%';
        document.getElementById('progress-text').textContent = `${answered} / ${this.questions.length} 問回答済み`;

        // 問題文
        document.getElementById('question-text').textContent = q.question;

        // 選択肢
        const optionsEl = document.getElementById('options-area');
        optionsEl.innerHTML = '';
        q.options.forEach((opt, i) => {
            const div = document.createElement('div');
            div.className = 'exam-option';
            if (this.userAnswers[idx] === i) {
                div.classList.add('selected');
            }
            div.textContent = `(${i + 1})  ${opt}`;
            div.addEventListener('click', () => this.selectOption(i));
            optionsEl.appendChild(div);
        });

        // 見直しボタン状態
        const reviewBtn = document.getElementById('review-toggle-btn');
        if (this.reviewFlags[idx]) {
            reviewBtn.classList.add('active');
            reviewBtn.textContent = '🔖 見直し中';
        } else {
            reviewBtn.classList.remove('active');
            reviewBtn.textContent = '🔖 後で見直す';
        }

        // 前へ/次へボタン
        document.getElementById('prev-btn').disabled = (idx === 0);

        const nextBtn = document.getElementById('next-btn');
        if (idx === this.questions.length - 1) {
            nextBtn.textContent = '回答一覧へ';
        } else {
            nextBtn.textContent = '次の問題 →';
        }

        this.updateNavHighlight();
        window.scrollTo(0, 0);
    },

    /**
     * 選択肢クリック（スクロールなしで選択状態だけ更新）
     */
    selectOption: function (optionIndex) {
        this.userAnswers[this.currentIndex] = optionIndex;

        // 選択状態の視覚更新のみ（scrollTo は呼ばない）
        document.querySelectorAll('.exam-option').forEach((el, i) => {
            el.classList.toggle('selected', i === optionIndex);
        });

        // プログレスバーとナビハイライト更新
        const answered = this.userAnswers.filter(a => a !== null).length;
        const pct = Math.round((answered / this.questions.length) * 100);
        document.getElementById('progress-bar').style.width = pct + '%';
        document.getElementById('progress-text').textContent = `${answered} / ${this.questions.length} 問回答済み`;
        this.updateNavHighlight();
    },

    /**
     * 見直しフラグ切替
     */
    toggleReview: function () {
        this.reviewFlags[this.currentIndex] = !this.reviewFlags[this.currentIndex];
        this.showQuestion();
    },

    /**
     * テスト用強制終了（未回答問題は不正解扱いで即提出）
     */
    forceFinishExam: function () {
        if (!this.examStarted || this.examSubmitted) return;
        showConfirmModal({
            icon: '🔧',
            title: '強制終了（テスト用）',
            message: '未回答の問題は不正解として採点されます。\nガチャ演出などを確認できます。',
            okText: '強制終了する',
            okColor: 'linear-gradient(135deg, #f57f17, #ff8f00)',
            onOk: () => { this._doForceFinish(); }
        });
    },

    _doForceFinish: function () {
        // 正規の submitExam と同じフローを呼び出す（確認ダイアログをスキップ）
        this.examSubmitted = true;
        clearInterval(this.timer);

        let score = 0;
        const results = this.questions.map((q, i) => {
            const userAns = this.userAnswers[i];
            const isCorrect = userAns === q.correctIndex;
            if (isCorrect) score++;
            return {
                questionId: q.id,
                question: q.question,
                options: q.options,
                userAnswer: userAns,
                correctIndex: q.correctIndex,
                isCorrect,
                explanation: q.explanation
            };
        });

        const percentage = Math.round((score / 60) * 100);
        const timeSpent = (60 * 60) - this.timeRemaining;
        const spentMin = Math.floor(timeSpent / 60);
        const spentSec = timeSpent % 60;
        const timeStr = `${String(spentMin).padStart(2, '0')}:${String(spentSec).padStart(2, '0')}`;

        this.gachaFruit = this.rollDevilFruit(percentage);
        this.gachaPlayed = false;

        this.saveHistory({
            score, total: 60, percentage, timeSpent: timeStr,
            devilFruit: this.gachaFruit.name, devilFruitRarity: this.gachaFruit.rarity
        });
        this.saveToCollection(this.gachaFruit);

        document.getElementById('exam-screen').style.display = 'none';
        document.getElementById('review-screen').style.display = 'none';
        this.showResultScreen(score, percentage, timeStr, results);
    },

    /**
     * 試験中断
     */
    abortExam: function () {
        showConfirmModal({
            icon: '✕',
            title: '試験を中断しますか？',
            message: '回答内容は保存されません。\nトップに戻ります。',
            okText: '中断する',
            okColor: 'linear-gradient(135deg, #c62828, #e53935)',
            onOk: () => {
                clearInterval(this.timer);
                this.examStarted = false;
                this.examSubmitted = false;

                document.getElementById('exam-screen').style.display = 'none';
                document.getElementById('review-screen').style.display = 'none';
                document.getElementById('result-screen').style.display = 'none';
                document.getElementById('start-screen').style.display = 'block';

                window.scrollTo(0, 0);
            }
        });
    },

    /**
     * 前の問題へ
     */
    goToPrev: function () {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.showQuestion();
        }
    },

    /**
     * 次の問題へ / 回答一覧画面へ
     */
    goToNext: function () {
        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
            this.showQuestion();
        } else {
            // 最後の問題 → 回答一覧画面へ
            this.showReviewScreen();
        }
    },

    /**
     * 回答一覧画面の表示
     */
    showReviewScreen: function () {
        document.getElementById('exam-screen').style.display = 'none';
        document.getElementById('review-screen').style.display = 'block';
        document.getElementById('result-screen').style.display = 'none';

        const grid = document.getElementById('review-grid');
        grid.innerHTML = '';

        const unanswered = this.userAnswers.filter(a => a === null).length;
        const reviewCount = this.reviewFlags.filter(f => f).length;
        document.getElementById('review-summary').textContent =
            `回答済み: ${60 - unanswered}/60 問　｜　未回答: ${unanswered} 問　｜　見直し: ${reviewCount} 問`;

        for (let i = 0; i < this.questions.length; i++) {
            const btn = document.createElement('button');
            btn.className = 'review-grid-btn';
            btn.textContent = i + 1;

            if (this.userAnswers[i] !== null) btn.classList.add('answered');
            if (this.reviewFlags[i]) btn.classList.add('review-flag');

            btn.addEventListener('click', () => {
                this.currentIndex = i;
                document.getElementById('review-screen').style.display = 'none';
                document.getElementById('exam-screen').style.display = 'block';
                this.showQuestion();
            });
            grid.appendChild(btn);
        }
    },

    /**
     * 試験提出
     */
    submitExam: function () {
        if (this.examSubmitted) return;

        const unanswered = this.userAnswers.filter(a => a === null).length;
        if (unanswered > 0) {
            showConfirmModal({
                icon: '📝',
                title: `${unanswered} 問が未回答です`,
                message: `まだ ${unanswered} 問に回答していません。\nこのまま提出しますか？`,
                okText: '提出する',
                okColor: 'linear-gradient(135deg, #c62828, #e53935)',
                onOk: () => { this._doSubmit(); }
            });
            return;
        }

        this._doSubmit();
    },

    _doSubmit: function () {
        this.examSubmitted = true;
        clearInterval(this.timer);

        // 採点
        let score = 0;
        const results = this.questions.map((q, i) => {
            const userAns = this.userAnswers[i];
            const isCorrect = userAns === q.correctIndex;
            if (isCorrect) score++;
            return {
                questionId: q.id,
                question: q.question,
                options: q.options,
                userAnswer: userAns,
                correctIndex: q.correctIndex,
                isCorrect,
                explanation: q.explanation
            };
        });

        const percentage = Math.round((score / 60) * 100);
        const timeSpent = (60 * 60) - this.timeRemaining;
        const spentMin = Math.floor(timeSpent / 60);
        const spentSec = timeSpent % 60;
        const timeStr = `${String(spentMin).padStart(2, '0')}:${String(spentSec).padStart(2, '0')}`;

        // ガチャ結果の決定
        this.gachaFruit = this.rollDevilFruit(percentage);
        this.gachaPlayed = false;

        // 履歴保存
        this.saveHistory({
            score, total: 60, percentage, timeSpent: timeStr,
            devilFruit: this.gachaFruit.name, devilFruitRarity: this.gachaFruit.rarity
        });

        // コレクション保存
        this.saveToCollection(this.gachaFruit);

        // 結果画面表示
        this.showResultScreen(score, percentage, timeStr, results);
    },

    /**
     * 結果画面
     */
    showResultScreen: function (score, percentage, timeStr, results, fruit) {
        document.getElementById('exam-screen').style.display = 'none';
        document.getElementById('review-screen').style.display = 'none';
        document.getElementById('result-screen').style.display = 'block';

        // スコア表示
        document.getElementById('result-score').textContent = `${score} / 60`;
        document.getElementById('result-percentage').textContent = `${percentage}%`;
        document.getElementById('result-time').textContent = timeStr;

        // スコアサークル
        const circle = document.getElementById('score-circle');
        circle.style.setProperty('--percentage', `${percentage}%`);

        // メッセージ
        const msg = document.getElementById('result-msg');
        if (percentage >= 90) {
            msg.textContent = '🏴‍☠️ 素晴らしい！海賊王の器だ！';
            msg.style.color = '#FFD700';
        } else if (percentage >= 75) {
            msg.textContent = '⚔️ 合格ライン突破！よく頑張った！';
            msg.style.color = '#2e7d32';
        } else if (percentage >= 50) {
            msg.textContent = '💪 惜しい！もう少しで合格だ！';
            msg.style.color = '#f57c00';
        } else {
            msg.textContent = '📚 もう一度テキストを復習しよう！';
            msg.style.color = '#c62828';
        }

        // 合格ライン表示
        const passEl = document.getElementById('pass-status');
        if (percentage >= 75) {
            passEl.innerHTML = '<span style="color:#2e7d32; font-size:1.5rem; font-weight:bold;">✅ 合格</span>';
        } else {
            passEl.innerHTML = '<span style="color:#c62828; font-size:1.5rem; font-weight:bold;">❌ 不合格（75%以上で合格）</span>';
        }

        // ガチャへの導線コントロール
        const gachaSection = document.querySelector('.gacha-section');
        if (this.gachaPlayed) {
            gachaSection.style.display = 'none';
        } else {
            gachaSection.style.display = 'block';
            const goBtn = document.getElementById('go-to-gacha-btn');
            if (goBtn) {
                goBtn.onclick = () => this.goToGachaScreen();
            }
        }

        // 回答振り返り
        this.renderResults(results);

        // 履歴テーブル更新
        this.renderHistory();
        this.renderCollection();

        window.scrollTo(0, 0);
    },

    /**
     * 回答振り返り描画
     */
    renderResults: function (results) {
        const container = document.getElementById('result-details');
        container.innerHTML = '';

        results.forEach((r, i) => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.dataset.correct = r.isCorrect;

            const userText = r.userAnswer !== null ? `(${r.userAnswer + 1}) ${r.options[r.userAnswer]}` : '未回答';
            const correctText = `(${r.correctIndex + 1}) ${r.options[r.correctIndex]}`;
            const mark = r.isCorrect
                ? '<span class="correct-mark">✅ 正解</span>'
                : '<span class="wrong-mark">❌ 不正解</span>';

            div.innerHTML = `
                <div class="result-item-header">
                    <span><strong>問${i + 1}</strong> ${mark}</span>
                </div>
                <p class="result-q">${r.question}</p>
                <p class="result-answer">あなたの回答: <strong>${userText}</strong></p>
                <p class="result-correct">正解: <strong>${correctText}</strong></p>
                <div class="result-explanation">${r.explanation}</div>
            `;
            container.appendChild(div);
        });
    },

    /**
     * フィルター
     */
    filterResults: function (filter) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`.filter-btn[data-filter="${filter}"]`).classList.add('active');

        const items = document.querySelectorAll('.result-item');
        items.forEach(item => {
            const isCorrect = item.dataset.correct === 'true';
            if (filter === 'all') {
                item.style.display = 'block';
            } else if (filter === 'correct') {
                item.style.display = isCorrect ? 'block' : 'none';
            } else if (filter === 'wrong') {
                item.style.display = isCorrect ? 'none' : 'block';
            }
        });
    },

    /**
     * 悪魔の実ガチャロール
     * レア度: 1（ノーマル）〜 5（伝説）の5段階
     */
    rollDevilFruit: function (percentage) {
        // レア度の基本重み（数字が大きいほど出やすい）
        const baseWeights = { 5: 3, 4: 8, 3: 20, 2: 35, 1: 50 };

        // 正解率ボーナス：高得点ほど高レアが出やすく
        let multiplier = { 5: 1, 4: 1, 3: 1, 2: 1, 1: 1 };
        if (percentage >= 90) {
            multiplier = { 5: 8, 4: 4, 3: 2, 2: 1, 1: 0.5 };  // 90%以上：★5 大幅アップ
        } else if (percentage >= 75) {
            multiplier = { 5: 4, 4: 3, 3: 2, 2: 1, 1: 0.8 };  // 75%以上（合格）：高レアアップ
        } else if (percentage >= 50) {
            multiplier = { 5: 2, 4: 1.5, 3: 1, 2: 1, 1: 1 };  // 50%以上：わずかボーナス
        }

        // 重み計算
        const weighted = this.devilFruits.map(f => ({
            fruit: f,
            weight: baseWeights[f.rarity] * multiplier[f.rarity]
        }));

        const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0);
        let rand = Math.random() * totalWeight;

        for (const w of weighted) {
            rand -= w.weight;
            if (rand <= 0) return w.fruit;
        }
        return weighted[weighted.length - 1].fruit;
    },

    /**
     * 音声ON/OFFトグル（ガチャ画面右上ボタン）
     */
    toggleGachaSound: function (btn) {
        this.gachaSoundMuted = !this.gachaSoundMuted;
        btn.textContent = this.gachaSoundMuted ? '🔇' : '🔊';
        btn.style.opacity = this.gachaSoundMuted ? '0.5' : '1';

        // 再生中のBGMにも即反映
        if (this.overtakenBgm) this.overtakenBgm.muted = this.gachaSoundMuted;
        if (this.luffyBgm) this.luffyBgm.muted = this.gachaSoundMuted;
    },

    goToGachaScreen: function () {
        document.getElementById('result-screen').style.display = 'none';
        document.getElementById('gacha-screen').style.display = 'block';

        // 音声ボタンを現在のミュート状態に同期
        const soundBtn = document.getElementById('gacha-sound-btn');
        if (soundBtn) {
            soundBtn.textContent = this.gachaSoundMuted ? '🔇' : '🔊';
            soundBtn.style.opacity = this.gachaSoundMuted ? '0.5' : '1';
        }

        // Overtaken BGMのループ再生
        if (!this.overtakenBgm) {
            this.overtakenBgm = new Audio("shared/bgm/One Piece OST Overtaken.mp3");
            this.overtakenBgm.loop = true;
            this.overtakenBgm.volume = 0.5;
        }
        this.overtakenBgm.currentTime = 0;
        this.overtakenBgm.play().catch(e => console.warn("BGM play failed", e));

        this.showDevilFruitResult(this.gachaFruit);
    },

    /**
     * 悪魔の実ガチャ結果表示
     */
    showDevilFruitResult: function (fruit) {
        const container = document.getElementById('gacha-result');

        // 本格的なガチャマシーン＆カプセルのDOMを表示
        container.innerHTML = `
            <div class="gacha-container" id="gacha-machine">
                <!-- ガチャを回すボタン -->
                <button id="spin-btn" class="spin-gacha-btn">ガチャを回す！</button>
                
                <!-- カプセル -->
                <div id="gacha-capsule" class="gacha-capsule">
                    <div class="capsule-top"></div>
                    <div class="capsule-bottom"></div>
                </div>
                
                <!-- 閃光エフェクト -->
                <div class="light-flash" id="capsule-flash"></div>
                
                <!-- ガチャ結果カード（初期は非表示） -->
                <div id="real-gacha-result" class="real-gacha-card"></div>
            </div>
        `;

        const spinBtn = document.getElementById('spin-btn');
        const capsule = document.getElementById('gacha-capsule');
        const flash = document.getElementById('capsule-flash');
        const resultCard = document.getElementById('real-gacha-result');
        const backBtnContainer = document.getElementById('gacha-back-btn-container');

        // 最初は戻るボタンを隠す
        if (backBtnContainer) backBtnContainer.style.display = 'none';

        // 事前に結果カードのDOMを生成してセットしておく
        this.renderGachaResult(fruit, resultCard);

        spinBtn.addEventListener('click', () => {
            // Overtaken再生停止
            if (this.overtakenBgm) {
                this.overtakenBgm.pause();
                this.overtakenBgm.currentTime = 0;
            }

            // ルフィの歌BGM再生
            // ボリュームは少し控えめに
            if (!this.luffyBgm) {
                this.luffyBgm = new Audio("shared/bgm/one piece luffy's song.mp3");
            }
            this.luffyBgm.currentTime = 0;
            this.luffyBgm.volume = 0.5;
            this.luffyBgm.play().catch(e => console.warn("BGM play failed", e));

            // ボタン無効化＆退場
            spinBtn.disabled = true;
            spinBtn.style.display = 'none';

            // カプセル落下・バウンスのアニメーション開始
            capsule.classList.remove('open', 'charging');
            flash.classList.remove('active');
            capsule.classList.add('drop');

            // 1.2秒後（バウンス終了）からオーラ・震えによるパワー溜め開始
            const chargingTimeout = setTimeout(() => {
                capsule.classList.add('charging');
            }, 1200);

            // BGMの再生時間を監視し、ドンのタイミング（約3.0秒）に合わせる
            let opened = false;
            this.luffyBgm.addEventListener('timeupdate', () => {
                // 音声の再生位置が3.0秒を超えたか、終了したら発動
                if (!opened && (this.luffyBgm.currentTime >= 3.0 || this.luffyBgm.ended)) {
                    opened = true;

                    // パワー溜め状態を解除
                    clearTimeout(chargingTimeout);
                    capsule.classList.remove('charging');

                    capsule.classList.add('open');

                    // 同時に閃光エフェクト開始
                    flash.classList.add('active');

                    // 閃光が一番眩しいタイミング（0.4秒後）で中身を表示
                    setTimeout(() => {
                        capsule.style.display = 'none'; // カプセルを消す
                        resultCard.classList.add('show'); // 悪魔の実カードをズームイン表示

                        // 結果確認後に「試験結果に戻る」ボタンを表示
                        if (backBtnContainer) backBtnContainer.style.display = 'block';
                    }, 400);
                }
            });
        });
    },

    // 実際の結果を描画する処理（showDevilFruitResultから分離）
    renderGachaResult: function (fruit, container) {
        const stars = '★'.repeat(fruit.rarity) + '☆'.repeat(5 - fruit.rarity);
        const rarityColors = { 5: '#FFD700', 4: '#FF6B6B', 3: '#9370DB', 2: '#4682B4', 1: '#808080' };
        const rarityGlows = {
            5: '0 0 40px rgba(255,215,0,0.9), 0 0 80px rgba(255,215,0,0.5)',
            4: '0 0 40px rgba(255,107,107,0.9), 0 0 80px rgba(255,107,107,0.5)',
            3: '0 0 40px rgba(147,112,219,0.9), 0 0 80px rgba(147,112,219,0.5)',
            2: '0 0 30px rgba(70,130,180,0.7)',
            1: '0 0 20px rgba(128,128,128,0.5)'
        };

        const iconHtml = fruit.image
            ? `<div style="
                width: 200px;
                height: 200px;
                border-radius: 50%;
                margin: 1.2rem auto;
                overflow: hidden;
                border: 5px solid ${rarityColors[fruit.rarity]};
                box-shadow: ${rarityGlows[fruit.rarity]};
                background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.4) 100%);
              "><img src="${fruit.image}" alt="${fruit.name}" style="width:100%;height:100%;object-fit:cover;"></div>`
            : `<div style="
                width: 200px;
                height: 200px;
                border-radius: 50%;
                margin: 1.2rem auto;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 5rem;
                border: 5px solid ${rarityColors[fruit.rarity]};
                box-shadow: ${rarityGlows[fruit.rarity]};
                background: radial-gradient(circle, ${fruit.color}30, rgba(0,0,0,0.5));
              ">${fruit.emoji}</div>`;

        container.innerHTML = `
            <div class="gacha-card" style="border-color: ${rarityColors[fruit.rarity]}; box-shadow: ${rarityGlows[fruit.rarity]}; min-width: 280px; padding: 1.5rem 2rem;">
                <div class="gacha-rarity" style="color: ${rarityColors[fruit.rarity]}; font-size: 1.5rem; letter-spacing: 4px;">${stars}</div>
                ${iconHtml}
                <div class="gacha-fruit-name" style="font-size: 1.6rem; margin-top: 0.5rem; text-shadow: 0 2px 8px rgba(0,0,0,0.6);">${fruit.name}</div>
                <div class="gacha-fruit-type" style="font-size: 1rem; color: #ccc; margin-top: 0.3rem;">${fruit.type}</div>
                <div class="gacha-fruit-ability" style="font-size: 0.85rem; color: #aaa; margin-top: 0.6rem; margin-bottom: 0.1rem;">この悪魔の実を食べたキャラ</div>
                <div class="gacha-fruit-ability" style="font-size: 1.05rem; color: #ffd54f; font-weight: 700;">⚡ ${fruit.ability}</div>
            </div>
        `;
    },

    /**
     * 履歴保存
     */
    saveHistory: function (data) {
        const history = JSON.parse(localStorage.getItem('fullExam_history') || '[]');
        history.push({
            attempt: history.length + 1,
            date: new Date().toISOString(),
            ...data
        });
        localStorage.setItem('fullExam_history', JSON.stringify(history));
    },

    /**
     * コレクション保存
     */
    saveToCollection: function (fruit) {
        const collection = JSON.parse(localStorage.getItem('devilFruit_collection') || '{}');
        collection[fruit.name] = (collection[fruit.name] || 0) + 1;
        localStorage.setItem('devilFruit_collection', JSON.stringify(collection));
    },

    /**
     * 履歴テーブル描画
     */
    renderHistory: function () {
        const history = JSON.parse(localStorage.getItem('fullExam_history') || '[]');

        // 開始画面の履歴
        const startHistory = document.getElementById('start-history');
        if (startHistory) {
            if (history.length === 0) {
                startHistory.innerHTML = '<p style="color:#888;">まだ受験履歴がありません。</p>';
            } else {
                let html = '<table class="history-table"><thead><tr><th>回</th><th>日時</th><th>スコア</th><th>正解率</th><th>時間</th><th>悪魔の実</th></tr></thead><tbody>';
                history.forEach(h => {
                    const d = new Date(h.date);
                    const dateStr = `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
                    const passClass = h.percentage >= 75 ? 'pass' : 'fail';
                    html += `<tr class="${passClass}"><td>${h.attempt}</td><td>${dateStr}</td><td>${h.score}/60</td><td>${h.percentage}%</td><td>${h.timeSpent}</td><td>${h.devilFruit || '-'}</td></tr>`;
                });
                html += '</tbody></table>';
                startHistory.innerHTML = html;
            }
        }

        // 結果画面の履歴
        const resultHistory = document.getElementById('result-history');
        if (resultHistory) {
            if (history.length === 0) {
                resultHistory.innerHTML = '';
            } else {
                let html = '<h3>📊 過去の受験履歴</h3><table class="history-table"><thead><tr><th>回</th><th>日時</th><th>スコア</th><th>正解率</th><th>時間</th><th>悪魔の実</th></tr></thead><tbody>';
                history.forEach(h => {
                    const d = new Date(h.date);
                    const dateStr = `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
                    const passClass = h.percentage >= 75 ? 'pass' : 'fail';
                    html += `<tr class="${passClass}"><td>${h.attempt}</td><td>${dateStr}</td><td>${h.score}/60</td><td>${h.percentage}%</td><td>${h.timeSpent}</td><td>${h.devilFruit || '-'}</td></tr>`;
                });
                html += '</tbody></table>';
                resultHistory.innerHTML = html;
            }
        }
    },

    /**
     * コレクション描画
     */
    renderCollection: function () {
        const container = document.getElementById('collection-grid');
        if (!container) return;

        const collection = JSON.parse(localStorage.getItem('devilFruit_collection') || '{}');
        const totalOwned = Object.keys(collection).length;

        document.getElementById('collection-count').textContent = `${totalOwned} / ${this.devilFruits.length}`;

        container.innerHTML = '';
        this.devilFruits.forEach(fruit => {
            const owned = collection[fruit.name] || 0;
            const div = document.createElement('div');
            div.className = 'collection-item' + (owned > 0 ? ' owned' : ' locked');
            const stars = '★'.repeat(fruit.rarity);

            if (owned > 0) {
                const imgHtml = fruit.image
                    ? `<div class="collection-emoji"><img src="${fruit.image}" alt="${fruit.name}" style="width:50px;height:50px;object-fit:cover;border-radius:50%;"></div>`
                    : `<div class="collection-emoji">${fruit.emoji}</div>`;
                div.innerHTML = `
                    ${imgHtml}
                    <div class="collection-name">${fruit.name}</div>
                    <div class="collection-stars">${stars}</div>
                    <div class="collection-count">×${owned}</div>
                `;
                // タップで拡大カード表示（所持済みのみ）
                div.style.cursor = 'pointer';
                div.addEventListener('click', () => this.showFruitCardModal(fruit, owned));
            } else {
                div.innerHTML = `
                    <div class="collection-emoji locked-emoji">？</div>
                    <div class="collection-name">？？？の実</div>
                    <div class="collection-stars">${stars}</div>
                `;
            }
            container.appendChild(div);
        });
    },

    /**
     * 悪魔の実カード拡大モーダルを表示
     */
    showFruitCardModal: function (fruit, ownedCount) {
        const modal = document.getElementById('fruit-card-modal');
        const inner = document.getElementById('fruit-card-modal-inner');
        if (!modal || !inner) return;

        const stars = '★'.repeat(fruit.rarity) + '☆'.repeat(5 - fruit.rarity);
        const rarityColors = { 5: '#FFD700', 4: '#FF6B6B', 3: '#9370DB', 2: '#4682B4', 1: '#808080' };
        const rarityLabels = { 5: 'LEGENDARY', 4: 'EPIC', 3: 'RARE', 2: 'UNCOMMON', 1: 'COMMON' };
        const rarityGlows = {
            5: '0 0 40px rgba(255,215,0,0.8), 0 0 80px rgba(255,215,0,0.3)',
            4: '0 0 40px rgba(255,107,107,0.8)',
            3: '0 0 30px rgba(147,112,219,0.7)',
            2: '0 0 20px rgba(70,130,180,0.5)',
            1: '0 0 12px rgba(128,128,128,0.4)'
        };
        const color = rarityColors[fruit.rarity];
        const glow  = rarityGlows[fruit.rarity];

        const imgHtml = fruit.image
            ? `<img src="${fruit.image}" alt="${fruit.name}" style="
                width: 160px; height: 160px; object-fit: cover;
                border-radius: 50%;
                border: 5px solid ${color};
                box-shadow: ${glow};
                display: block; margin: 0 auto 1rem;
              ">`
            : `<div style="
                width: 160px; height: 160px; border-radius: 50%;
                background: radial-gradient(circle, ${fruit.color}40, rgba(0,0,0,0.6));
                border: 5px solid ${color}; box-shadow: ${glow};
                display: flex; align-items: center; justify-content: center;
                font-size: 4rem; margin: 0 auto 1rem;
              ">${fruit.emoji}</div>`;

        inner.innerHTML = `
            <div style="
                background: linear-gradient(160deg, #1a1a2e 0%, #16213e 100%);
                border: 3px solid ${color};
                border-radius: 20px;
                padding: 1.8rem 1.5rem 1.5rem;
                text-align: center;
                color: white;
                box-shadow: ${glow};
                position: relative;
            ">
                <!-- 閉じるボタン -->
                <button onclick="document.getElementById('fruit-card-modal').style.display='none'" style="
                    position: absolute; top: 12px; right: 14px;
                    background: rgba(255,255,255,0.12); border: none;
                    color: #fff; font-size: 1.2rem; width: 32px; height: 32px;
                    border-radius: 50%; cursor: pointer; line-height: 1;
                ">✕</button>

                <!-- レアリティバッジ -->
                <div style="
                    display: inline-block;
                    background: ${color}22;
                    border: 1.5px solid ${color};
                    border-radius: 20px;
                    padding: 0.2rem 1rem;
                    font-size: 0.75rem;
                    font-weight: 900;
                    color: ${color};
                    letter-spacing: 2px;
                    margin-bottom: 1rem;
                ">${rarityLabels[fruit.rarity]}</div>

                ${imgHtml}

                <!-- 星 -->
                <div style="font-size: 1.4rem; color: ${color}; letter-spacing: 4px; margin-bottom: 0.5rem;">${stars}</div>

                <!-- 実名 -->
                <div style="font-size: 1.5rem; font-weight: 900; margin-bottom: 0.3rem; text-shadow: 0 2px 8px rgba(0,0,0,0.6);">${fruit.name}</div>

                <!-- 系統 -->
                <div style="font-size: 0.9rem; color: #aaa; margin-bottom: 0.3rem;">${fruit.type}</div>

                <!-- 能力者 -->
                <div style="font-size: 0.85rem; color: #aaa; margin-bottom: 0.15rem;">この悪魔の実を食べたキャラ</div>
                <div style="font-size: 1rem; color: #ffd54f; font-weight: 700; margin-bottom: 1rem;">⚡ ${fruit.ability}</div>

                <!-- 所持数 -->
                <div style="
                    display: inline-block;
                    background: rgba(255,255,255,0.08);
                    border-radius: 10px;
                    padding: 0.4rem 1.2rem;
                    font-size: 0.85rem;
                    color: #ccc;
                ">所持数: <strong style="color:#fff;">×${ownedCount}</strong></div>
            </div>
        `;

        // アニメーションをリセットして再生
        inner.style.animation = 'none';
        requestAnimationFrame(() => {
            inner.style.animation = '';
        });

        modal.style.display = 'flex';
    }
};

FullExamSystem.init();
