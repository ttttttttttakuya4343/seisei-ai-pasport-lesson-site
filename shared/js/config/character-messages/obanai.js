// 伊黒のメッセージデータ - 改善版（蛇=執念の学習）
// 学習重視 (40%) + キャラクター性 (40%) + 試験対策 (20%)

export const obanaiMessages = {
    welcome: [
        { text: "...来たか。<br>今日も厳しく<br>見ていくぞ。", icon: "🐍" },
        { text: "戻ったな。<br>細部まで丁寧に<br>学べ。", icon: "⚡" },
        { text: "...。<br>集中して<br>取り組むんだ。", icon: "🐍" },
        { text: "来たな。<br>妥協せず<br>進めていこう。", icon: "⚡" },
        { text: "...よし。<br>今日も真剣に<br>やろう。", icon: "🐍" }
    ],
    lessonStart: {
        text: "新しい内容だ。細かく理解しろ。",
        icon: "📖"
    },
    quizStart: {
        text: "実力を見せてもらう。油断するな。",
        icon: "🐍"
    },
    correct: [
        { text: "...正解だ。<br>よく見ている。<br>認めよう。", icon: "🐍", effect: "snake" },
        { text: "完璧だ。<br>細部まで理解<br>できているな。", icon: "⚡", effect: "snake" },
        { text: "見事だ。<br>試験本番も<br>この集中力で。", icon: "🐍", effect: "snake" },
        { text: "素晴らしい。<br>お前の執念、<br>評価する。", icon: "⚡", effect: "snake" },
        { text: "いい答えだ。<br>合格への道、<br>見えたな。", icon: "🐍", effect: "snake" }
    ],
    incorrect: [
        { text: "...違う。<br>もっと注意深く<br>考えろ。", icon: "😐" },
        { text: "甘いな。<br>細部を見落とす<br>な。", icon: "⚡" },
        { text: "失敗か。<br>執念を持って<br>もう一度だ。", icon: "🐍" },
        { text: "惜しい。<br>油断せず<br>再挑戦しろ。", icon: "⚡" },
        { text: "...まだだ。<br>妥協せず<br>進め。", icon: "🐍" }
    ],
    lessonComplete: {
        text: "...よくやった。<br>着実に成長しているな。",
        icon: "🐍✨"
    },
    allComplete: {
        text: "全て終わった。<br>...認めよう。<br>お前の執念、<br>見事だった。<br>試験も必ず<br>突破できる。",
        icon: "🏆"
    }
};