const fs = require('fs');

const questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'));

// The exact structure of questions we want:
// { q: "...", options: ["A...", "B...", "C...", "D..."], a: 0, exp: "..." }
const formattedQuestions = questions.map(q => ({
    q: q.q,
    options: q.options,
    a: q.answer,
    exp: q.explanation.replace('✅ ', '') // or keep it
}));

const htmlTemplate = `<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>第3章: 模擬試験 | 生成AIパスポート講座</title>
    <link rel="stylesheet" href="../shared/css/styles.css">
    <style>
        .exam-header { text-align: center; margin-bottom: 2rem; }
        .exam-question { background: white; border-radius: 10px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); display: none; }
        .exam-question.active { display: block; }
        .exam-options { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; }
        .exam-option { padding: 1rem; text-align: left; background: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px; cursor: pointer; font-size: 1.1rem; font-weight: bold; transition: all 0.2s; }
        .exam-option:hover { background: #e9ecef; }
        .exam-option.selected { background: var(--primary-color); color: white; border-color: var(--primary-dark); }
        .exam-progress { margin: 2rem 0; font-size: 1.2rem; text-align: center; font-weight: bold; color: var(--primary-color); }
        .exam-result { text-align: center; background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); display: none; }
        .score-circle { width: 150px; height: 150px; border-radius: 50%; background: conic-gradient(var(--secondary-color) var(--percentage), #e9ecef 0); display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; font-size: 2rem; font-weight: bold; position: relative; }
        .score-circle::before { content: ""; position: absolute; width: 120px; height: 120px; background: white; border-radius: 50%; }
        .score-text { position: relative; z-index: 1; color: var(--text-color); }
        .explanation { background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: left; border-left: 4px solid var(--secondary-color); }
        .correct-ans { color: #2e7d32; font-weight: bold; }
        .wrong-ans { color: #c62828; font-weight: bold; }
        .result-list { margin-top: 2rem; text-align: left; }
        .result-item { margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #eee; }
        .start-screen { text-align: center; padding: 3rem 0; }
    </style>
</head>

<body>
    <nav class="navbar">
        <div class="container">
            <h1 class="logo">🎓 生成AIパスポート講座</h1>
            <div class="nav-links">
                <a href="../index.html">ホーム</a>
                <a href="index.html">第3章トップ</a>
            </div>
        </div>
    </nav>
    <main class="container lesson-layout">
        <div class="lesson-page" style="width: 100%; max-width: 800px; margin: 0 auto;">
            <div class="lesson-header exam-header">
                <div class="hero-badge" style="background-color: var(--secondary-color);">第3章 確認問題</div>
                <h1>模擬試験</h1>
                <p>第3章の全内容から15問が出題されます。記憶力をチェックしましょう！</p>
                <div id="best-score-display" style="margin-top: 1rem; font-weight: bold; color: var(--secondary-dark); display: none;">
                    🏆 最高スコア: <span id="best-score">0</span>/15
                </div>
            </div>

            <div id="start-screen" class="start-screen">
                <div id="unlock-content">
                    <p>準備はいいですか？全問正解を目指して頑張りましょう！</p>
                    <button id="start-btn" class="nav-button" style="font-size: 1.2rem; padding: 1rem 2rem;">試験を開始する</button>
                </div>
            </div>

            <div id="exam-container" style="display: none;">
                <div class="exam-progress">問題 <span id="current-q">1</span> / 15</div>

                <div id="question-area">
                    <!-- 問題がJSで生成されます -->
                </div>

                <div style="text-align: center; margin-top: 2rem;">
                    <button id="next-btn" class="nav-button" style="display: none;">次の問題へ</button>
                </div>
            </div>

            <div id="result-screen" class="exam-result">
                <h2>試験結果</h2>
                <div class="score-circle" id="score-circle" style="--percentage: 0%;">
                    <span class="score-text" id="final-score">0/15</span>
                </div>
                <h3 id="result-message"></h3>

                <div class="result-list" id="result-list">
                    <h3>回答の振り返り</h3>
                    <!-- 振り返りがJSで生成されます -->
                </div>

                <div style="margin-top: 2rem; display: flex; justify-content: center; gap: 1rem;">
                    <button onclick="location.reload()" class="nav-button">もう一度挑戦する</button>
                    <a href="../chapter4/index.html" id="next-chapter-btn" class="nav-button" style="display:none;">第4章へ進む →</a>
                    <a href="index.html" class="nav-button secondary">第3章トップへ戻る</a>
                </div>
            </div>
        </div>
    </main>

    <script>
        const allQuestions = ${JSON.stringify(formattedQuestions, null, 4)};

        let questions = [];
        let currentQuestionIndex = 0;
        let score = 0;
        let userAnswers = [];
        const EXAM_QUESTION_COUNT = 15;

        function shuffle(array) {
            let currentIndex = array.length, randomIndex;
            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
            return array;
        }

        document.addEventListener('DOMContentLoaded', () => {
            const bestScore = localStorage.getItem('chapter3_exam_score');
            if (bestScore) {
                document.getElementById('best-score-display').style.display = 'block';
                document.getElementById('best-score').textContent = bestScore;
            }
            document.getElementById('start-btn').addEventListener('click', startExam);
            document.getElementById('next-btn').addEventListener('click', nextQuestion);
        });

        function startExam() {
            document.getElementById('start-screen').style.display = 'none';
            document.getElementById('exam-container').style.display = 'block';

            questions = shuffle([...allQuestions]).slice(0, EXAM_QUESTION_COUNT);
            currentQuestionIndex = 0;
            score = 0;
            userAnswers = [];

            showQuestion();
        }

        function showQuestion() {
            document.getElementById('current-q').textContent = currentQuestionIndex + 1;
            const q = questions[currentQuestionIndex];

            let optionsHtml = '';
            q.options.forEach((opt, idx) => {
                optionsHtml += \`<div class="exam-option" onclick="selectExamAnswer(\${idx}, this)">\${opt}</div>\`;
            });

            const area = document.getElementById('question-area');
            area.innerHTML = \`
                <div class="exam-question active">
                    <p style="font-size: 1.2rem; margin-bottom: 1.5rem;"><strong>問題:</strong><br>\${q.q}</p>
                    <div class="exam-options">
                        \${optionsHtml}
                    </div>
                </div>
            \`;
            document.getElementById('next-btn').style.display = 'none';
            window.scrollTo(0, 0);
        }

        window.selectExamAnswer = function (optIndex, element) {
            if (document.querySelector('.exam-option.selected')) return;

            element.classList.add('selected');

            const q = questions[currentQuestionIndex];
            const isCorrect = optIndex === q.a;

            if (isCorrect) score++;

            userAnswers.push({
                q: q.q,
                userText: q.options[optIndex].substring(0, 1),
                correctText: q.options[q.a].substring(0, 1),
                correctFullPath: q.options[q.a],
                isCorrect: isCorrect,
                exp: q.exp
            });

            document.getElementById('next-btn').style.display = 'block';
        };

        function nextQuestion() {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }

        function showResult() {
            document.getElementById('exam-container').style.display = 'none';
            document.getElementById('result-screen').style.display = 'block';

            const percentage = Math.round((score / questions.length) * 100);
            document.getElementById('score-circle').style.setProperty('--percentage', \`\${percentage}%\`);
            document.getElementById('final-score').textContent = \`\${score}/\${questions.length}\`;

            const msgEl = document.getElementById('result-message');
            if (percentage === 100) {
                msgEl.textContent = "完璧です！第3章の内容を完全にマスターしましたね！🎉✨";
                msgEl.style.color = "var(--secondary-color)";
                document.getElementById('next-chapter-btn').style.display = 'inline-block';
            } else if (percentage >= 80) {
                msgEl.textContent = "素晴らしい成績です！合格圏内です！👍";
                document.getElementById('next-chapter-btn').style.display = 'inline-block';
            } else if (percentage >= 60) {
                msgEl.textContent = "よく頑張りました！間違えたところを復習しましょう。📝";
            } else {
                msgEl.textContent = "もう一度テキストを読み返して、再チャレンジしましょう！💪";
            }

            const bestScore = parseInt(localStorage.getItem('chapter3_exam_score') || '0');
            if (score > bestScore) {
                localStorage.setItem('chapter3_exam_score', score);
            }

            const listEl = document.getElementById('result-list');
            let html = '<h3>回答の振り返り</h3>';
            userAnswers.forEach((ans, i) => {
                const mark = ans.isCorrect ? '<span class="correct-ans">○ 正解</span>' : '<span class="wrong-ans">× 不正解</span>';
                
                html += \`
                    <div class="result-item">
                        <p><strong>問\${i + 1}:</strong> \${ans.q}</p>
                        <p style="margin: 0.5rem 0;">あなたの回答: \${ans.userText} | 判定: \${mark}</p>
                        <div class="explanation">
                            <strong>正解: \${ans.correctFullPath}</strong><br>
                            \${ans.exp}
                        </div>
                    </div>
                \`;
            });
            listEl.innerHTML = html;

            if (percentage >= 80) {
                localStorage.setItem('chapter3_completed', 'true');
                localStorage.setItem('chapter3_section3-exam_completed', 'true');
            }
            window.scrollTo(0, 0);
        }
    </script>
</body>
</html>
`;

fs.writeFileSync('3-exam.html', htmlTemplate);
console.log('Saved to 3-exam.html');
