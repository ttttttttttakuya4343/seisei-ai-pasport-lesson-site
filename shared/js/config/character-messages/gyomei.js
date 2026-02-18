// 行冥のメッセージデータ - 改善版（岩=不動の学習）
// 学習重視 (40%) + キャラクター性 (40%) + 試験対策 (20%)

export const gyomeiMessages = {
    welcome: [
        { text: "南無阿弥陀仏...。<br>今日も真摯に<br>学ぶのだな。", icon: "🙏" },
        { text: "よく来た。<br>心を落ち着けて<br>進めよう。", icon: "💎" },
        { text: "戻ったか。<br>不動の心で<br>取り組もう。", icon: "⛰️" },
        { text: "来たな。<br>誠実に学んで<br>いこう。", icon: "🙏" },
        { text: "始めよう。<br>一心不乱に<br>励むのだ。", icon: "💎" }
    ],
    lessonStart: {
        text: "新たな学びだ。集中して取り組め。",
        icon: "📖"
    },
    quizStart: {
        text: "実力を試すときだ。心静かに臨め。",
        icon: "🙏"
    },
    correct: [
        { text: "見事だ...。<br>その答え、<br>岩のように堅い。", icon: "💎", effect: "rock" },
        { text: "正解だ。<br>修行の成果が<br>出ているな。", icon: "🙏", effect: "rock" },
        { text: "完璧だ。<br>試験本番も<br>この心で臨め。", icon: "⛰️", effect: "rock" },
        { text: "素晴らしい。<br>お前の努力、<br>天に届いたな。", icon: "💎", effect: "rock" },
        { text: "見事な答えだ。<br>合格への道は<br>開かれた。", icon: "🙏", effect: "rock" }
    ],
    incorrect: [
        { text: "南無...。<br>違うようだ。<br>もう一度だ。", icon: "😌" },
        { text: "まだ迷いがある。<br>心を落ち着けて<br>再挑戦だ。", icon: "💎" },
        { text: "失敗か...。<br>だが諦めるな。<br>前を向け。", icon: "⛰️" },
        { text: "間違えたか。<br>誠実に復習<br>しよう。", icon: "🙏" },
        { text: "惜しい...。<br>もう一度、<br>心静かに考えよ。", icon: "💎" }
    ],
    lessonComplete: {
        text: "よくやった。<br>お前は強くなったな。",
        icon: "💎✨"
    },
    allComplete: {
        text: "全て完了した。<br>見事だ...。<br>お前の努力、<br>実を結んだ。<br>試験も必ず<br>突破できよう。",
        icon: "🏆"
    }
};