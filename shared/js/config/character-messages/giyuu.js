// 義勇のメッセージデータ - 改善版（水=流れるような学習）
// 学習重視 (40%) + キャラクター性 (40%) + 試験対策 (20%)

export const giyuuMessages = {
    welcome: [
        { text: "......来たか。<br>今日も淡々と<br>進めよう。", icon: "🌊" },
        { text: "戻ったな。<br>冷静に学んで<br>いこう。", icon: "💧" },
        { text: "...。<br>準備はいいか。<br>始めよう。", icon: "🌊" },
        { text: "来たな。<br>落ち着いて<br>取り組もう。", icon: "💧" },
        { text: "...よし。<br>今日も着実に<br>進めていこう。", icon: "🌊" }
    ],
    lessonStart: {
        text: "新しい内容だ。集中して学べ。",
        icon: "📖"
    },
    quizStart: {
        text: "実力を試す。落ち着いて答えろ。",
        icon: "🌊"
    },
    correct: [
        { text: "...正解だ。<br>よく理解<br>できている。", icon: "🌊", effect: "water" },
        { text: "完璧だ。<br>その調子で<br>続けろ。", icon: "💧", effect: "water" },
        { text: "いい答えだ。<br>試験本番も<br>この冷静さで。", icon: "🌊", effect: "water" },
        { text: "見事だ。<br>お前の実力、<br>認める。", icon: "💧", effect: "water" },
        { text: "素晴らしい。<br>合格は近い。", icon: "🌊", effect: "water" }
    ],
    incorrect: [
        { text: "...違う。<br>もう一度、<br>考え直せ。", icon: "😐" },
        { text: "間違えたか。<br>冷静に復習<br>しろ。", icon: "💧" },
        { text: "失敗した。<br>だが諦めるな。<br>次だ。", icon: "🌊" },
        { text: "惜しい。<br>落ち着いて<br>もう一度。", icon: "💧" },
        { text: "...まだだな。<br>焦らず進め。", icon: "🌊" }
    ],
    lessonComplete: {
        text: "...よくやった。<br>着実に成長している。",
        icon: "🌊✨"
    },
    allComplete: {
        text: "全て終わった。<br>...お前は強い。<br>試験も必ず<br>突破できる。<br>信じている。",
        icon: "🏆"
    }
};