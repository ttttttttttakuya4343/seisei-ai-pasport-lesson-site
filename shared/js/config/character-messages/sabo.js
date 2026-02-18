// サボのメッセージデータ - 改善版
// 学習重視 (40%) + キャラクター性 (40%) + 試験対策 (20%)

export const saboMessages = {
    welcome: [
        { text: "よう! 俺はサボ。<br>生成AIの知識で<br>未来を変えよう!", icon: "🎩" },
        { text: "また会ったな!<br>今日も革命の炎を<br>燃やしていこう!", icon: "🔥" },
        { text: "準備はいいか?<br>自由への道を<br>一緒に歩もう!", icon: "⚔️" },
        { text: "よく来たな!<br>君の知識が世界を<br>変える力になる!", icon: "💪" },
        { text: "さぁ、今日も<br>学びの革命を起こそう!", icon: "🎩🔥" }
    ],
    lessonStart: {
        text: "新しい章だな。革命の知識を身につけよう!",
        icon: "📚"
    },
    quizStart: {
        text: "さぁ、君の知識を試そう。自由への第一歩だ!",
        icon: "⚔️"
    },
    correct: [
        { text: "完璧だ! その理解力、<br>試験本番でも発揮できるぞ!", icon: "🔥", effect: "flame" },
        { text: "正解! 知識が確実に<br>身についてるな!", icon: "💪", effect: "flame" },
        { text: "見事だ! この調子で<br>全章制覇だ!", icon: "⚔️", effect: "flame" },
        { text: "素晴らしい! AIの仕組みを<br>しっかり理解してる!", icon: "🎩", effect: "flame" },
        { text: "その通り! 君の成長、<br>確実に感じるぞ!", icon: "🔥", effect: "flame" }
    ],
    incorrect: [
        { text: "惜しい! もう一度<br>テキストを見直してみよう。<br>必ず理解できる!", icon: "💪" },
        { text: "間違いも学びの一部だ。<br>次は必ず正解できる!<br>諦めるな!", icon: "🔥" },
        { text: "大丈夫だ。<br>概念を整理すれば<br>必ず分かるようになる!", icon: "⚔️" },
        { text: "失敗は成長のプロセスだ。<br>もう一度、冷静に<br>考えてみよう!", icon: "🎩" },
        { text: "落ち着いて。<br>ヒントは既に学んだ中にある。<br>思い出してみよう!", icon: "💪" }
    ],
    lessonComplete: {
        text: "よくやった!<br>また一歩、<br>目標に近づいたな!",
        icon: "🎩🔥"
    },
    allComplete: {
        text: "おめでとう!<br>君は立派な<br>AI革命家だ!<br>試験も必ず<br>突破できるぞ!",
        icon: "🏆"
    }
};