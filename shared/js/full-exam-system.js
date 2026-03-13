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
    overtakenBgm: null,
    luffyBgm: null,

    // 悪魔の実データ
    devilFruits: [
        // ★★★★★ 自然系（レア度5）
        { name: "ゴロゴロの実", type: "自然系", ability: "雷人間", rarity: 5, emoji: "⚡", color: "#FFD700", image: "shared/images/devil-fruits/gorogoro.png" },
        { name: "ピカピカの実", type: "自然系", ability: "光人間", rarity: 5, emoji: "✨", color: "#FFFACD", image: "shared/images/devil-fruits/pikapika.png" },
        { name: "マグマグの実", type: "自然系", ability: "マグマ人間", rarity: 5, emoji: "🌋", color: "#FF4500", image: "shared/images/devil-fruits/magumagu.png" },
        { name: "ヒエヒエの実", type: "自然系", ability: "氷結人間", rarity: 5, emoji: "❄️", color: "#87CEEB", image: "shared/images/devil-fruits/hiehie.png" },
        // ★★★★ 超人系・動物系（レア度4）
        { name: "ゴムゴムの実", type: "超人系", ability: "ゴム人間", rarity: 4, emoji: "🤜", color: "#FF6B6B", image: "shared/images/devil-fruits/gomugomu.png" },
        { name: "メラメラの実", type: "超人系", ability: "炎を操る", rarity: 4, emoji: "🔥", color: "#FF4500", image: "shared/images/devil-fruits/meramera.png" },
        { name: "オペオペの実", type: "超人系", ability: "空間操作", rarity: 4, emoji: "💉", color: "#4169E1", image: "shared/images/devil-fruits/opeope.png" },
        { name: "ヒトヒトの実 幻獣種", type: "動物系", ability: "大仏", rarity: 4, emoji: "🗿", color: "#DAA520", image: "shared/images/devil-fruits/hitohito.png" },
        { name: "グラグラの実", type: "超人系", ability: "振動人間", rarity: 4, emoji: "💥", color: "#8B4513", image: "shared/images/devil-fruits/guragura.png" },
        // ★★★ 超人系・動物系（レア度3）
        { name: "バラバラの実", type: "超人系", ability: "体がバラバラ", rarity: 3, emoji: "🎪", color: "#FF69B4", image: "shared/images/devil-fruits/barabara.png" },
        { name: "ハナハナの実", type: "超人系", ability: "体を咲かせる", rarity: 3, emoji: "🌸", color: "#DDA0DD", image: "shared/images/devil-fruits/hanahana.png" },
        { name: "ヨミヨミの実", type: "超人系", ability: "蘇る", rarity: 3, emoji: "💀", color: "#9370DB", image: "shared/images/devil-fruits/yomiyomi.png" },
        { name: "ノロノロの実", type: "超人系", ability: "のろくする", rarity: 3, emoji: "🐢", color: "#FFA07A", image: "shared/images/devil-fruits/noronoro.png" },
        { name: "トリトリの実", type: "動物系", ability: "鳥に変身", rarity: 3, emoji: "🦅", color: "#2E8B57", image: "shared/images/devil-fruits/toritori.png" },
        { name: "ウシウシの実", type: "動物系", ability: "牛に変身", rarity: 3, emoji: "🐂", color: "#8B4513", image: "shared/images/devil-fruits/ushiushi.png" },
        { name: "ニキュニキュの実", type: "超人系", ability: "肉球人間", rarity: 3, emoji: "🐾", color: "#FFB6C1", image: "shared/images/devil-fruits/nikyunikyu.png" },
        // ★★ 超人系（レア度2）
        { name: "スベスベの実", type: "超人系", ability: "滑らか肌", rarity: 2, emoji: "💎", color: "#E0E0E0", image: "shared/images/devil-fruits/subesube.png" },
        { name: "ボムボムの実", type: "超人系", ability: "爆発人間", rarity: 2, emoji: "💣", color: "#333", image: null },
        { name: "キロキロの実", type: "超人系", ability: "体重変化", rarity: 2, emoji: "⚖️", color: "#C0C0C0", image: null },
        { name: "ドルドルの実", type: "超人系", ability: "蝋人間", rarity: 2, emoji: "🕯️", color: "#FFFFF0", image: null },
        { name: "マネマネの実", type: "超人系", ability: "変身", rarity: 2, emoji: "🎭", color: "#DEB887", image: null },
        // ★ 超人系（レア度1）
        { name: "アワアワの実", type: "超人系", ability: "泡人間", rarity: 1, emoji: "🫧", color: "#ADD8E6" },
        { name: "サビサビの実", type: "超人系", ability: "錆人間", rarity: 1, emoji: "🔩", color: "#B8860B" },
        { name: "シャリシャリの実", type: "超人系", ability: "車輪人間", rarity: 1, emoji: "⚙️", color: "#A9A9A9" }
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
            document.getElementById('abort-btn').addEventListener('click', () => this.abortExam());

            // テスト用強制終了ボタン
            const forceFinishBtn = document.getElementById('force-finish-btn');
            if (forceFinishBtn) {
                forceFinishBtn.addEventListener('click', () => this.forceFinishExam());
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
     * 選択肢クリック
     */
    selectOption: function (optionIndex) {
        this.userAnswers[this.currentIndex] = optionIndex;
        this.showQuestion(); // 再描画して選択状態を反映
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
        if (!confirm('【テスト用】強制終了します。\n未回答の問題は不正解として採点されます。\nガチャ演出などを確認できます。')) {
            return;
        }
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
        if (!confirm('試験を中断しますか？\n回答内容は保存されません。')) {
            return;
        }
        clearInterval(this.timer);
        this.examStarted = false;
        this.examSubmitted = false;

        document.getElementById('exam-screen').style.display = 'none';
        document.getElementById('review-screen').style.display = 'none';
        document.getElementById('result-screen').style.display = 'none';
        document.getElementById('start-screen').style.display = 'block';

        window.scrollTo(0, 0);
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
            if (!confirm(`まだ ${unanswered} 問が未回答です。このまま提出しますか？`)) {
                return;
            }
        }

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
        } else if (percentage >= 70) {
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
        if (percentage >= 70) {
            passEl.innerHTML = '<span style="color:#2e7d32; font-size:1.5rem; font-weight:bold;">✅ 合格</span>';
        } else {
            passEl.innerHTML = '<span style="color:#c62828; font-size:1.5rem; font-weight:bold;">❌ 不合格（70%以上で合格）</span>';
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
     */
    rollDevilFruit: function (percentage) {
        // レア度の基本重み
        const baseWeights = { 5: 2, 4: 5, 3: 12, 2: 18, 1: 25 };

        // 正解率ボーナス
        let multiplier = { 5: 1, 4: 1, 3: 1, 2: 1, 1: 1 };
        if (percentage >= 100) {
            multiplier = { 5: 5, 4: 3, 3: 1, 2: 0.5, 1: 0.3 };
        } else if (percentage >= 80) {
            multiplier = { 5: 2, 4: 2, 3: 1, 2: 1, 1: 1 };
        } else if (percentage >= 60) {
            multiplier = { 5: 1.5, 4: 1.5, 3: 1, 2: 1, 1: 1 };
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

    goToGachaScreen: function () {
        document.getElementById('result-screen').style.display = 'none';
        document.getElementById('gacha-screen').style.display = 'block';

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
                <button id="spin-btn" class="spin-gacha-btn">🎰 ガチャを回す！</button>
                
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

            // BGMの再生時間を監視し、曲の終盤（約5.0秒）のタイミングに合わせてカプセルを開く
            let opened = false;
            this.luffyBgm.addEventListener('timeupdate', () => {
                // 音声の再生位置が5.0秒を超えたか、終了したら発動
                if (!opened && (this.luffyBgm.currentTime >= 5.0 || this.luffyBgm.ended)) {
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

        const iconHtml = fruit.image
            ? `<div class="gacha-fruit-icon" style="border: 3px solid ${fruit.color}"><img src="${fruit.image}" alt="${fruit.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;"></div>`
            : `<div class="gacha-fruit-icon" style="background: radial-gradient(circle, ${fruit.color}40, ${fruit.color}10); border: 3px solid ${fruit.color}">${fruit.emoji}</div>`;

        container.innerHTML = `
            <div class="gacha-card" style="border-color: ${rarityColors[fruit.rarity]}">
                <div class="gacha-rarity" style="color: ${rarityColors[fruit.rarity]}">${stars}</div>
                ${iconHtml}
                <div class="gacha-fruit-name">${fruit.name}</div>
                <div class="gacha-fruit-type">${fruit.type}</div>
                <div class="gacha-fruit-ability">能力：${fruit.ability}</div>
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
                    const passClass = h.percentage >= 70 ? 'pass' : 'fail';
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
                    const passClass = h.percentage >= 70 ? 'pass' : 'fail';
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
            } else {
                div.innerHTML = `
                    <div class="collection-emoji locked-emoji">？</div>
                    <div class="collection-name">？？？の実</div>
                    <div class="collection-stars">${stars}</div>
                `;
            }
            container.appendChild(div);
        });
    }
};

FullExamSystem.init();
