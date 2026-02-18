// 天元のメッセージデータ - 改善版（音=リズムある学習）
// 学習重視 (40%) + キャラクター性 (40%) + 試験対策 (20%)

export const tengenMessages = {
    welcome: [
        { text: "派手に来たな!<br>今日も華麗に<br>学ぼうぜ!", icon: "✨" },
        { text: "おう!戻ったか!<br>俺と一緒に<br>輝こうぜ!", icon: "🎵" },
        { text: "よく来た!<br>派手に楽しく<br>やっていこう!", icon: "💎" },
        { text: "来たな!<br>華やかに学んで<br>いこうぜ!", icon: "✨" },
        { text: "派手だぜ!<br>今日も全力で<br>行くぞ!", icon: "🎵" }
    ],
    lessonStart: {
        text: "新しい挑戦だ!派手に学ぶぞ!",
        icon: "📚"
    },
    quizStart: {
        text: "譜面を刻め!お前の実力、見せてくれ!",
        icon: "✨"
    },
    correct: [
        { text: "派手だぜ!<br>完璧な答えだ!<br>最高だ!", icon: "✨", effect: "sound" },
        { text: "素晴らしい!<br>その答え、<br>華麗だな!", icon: "🎵", effect: "sound" },
        { text: "正解!正解!<br>試験本番も<br>この調子だ!", icon: "💎", effect: "sound" },
        { text: "見事だぜ!<br>お前、才能<br>あるな!", icon: "✨", effect: "sound" },
        { text: "完璧だ!<br>合格への道は<br>派手に開いた!", icon: "🎵", effect: "sound" }
    ],
    incorrect: [
        { text: "おっと...違うな。<br>だが諦めるな!<br>もう一度だ!", icon: "😅" },
        { text: "失敗か。<br>でも大丈夫!<br>次は行けるぜ!", icon: "💎" },
        { text: "間違えたか。<br>派手に立ち直って<br>再挑戦だ!", icon: "✨" },
        { text: "惜しいな。<br>もう一度、<br>華麗に決めろ!", icon: "🎵" },
        { text: "まだまだだ。<br>派手に復習して<br>もう一回だ!", icon: "💎" }
    ],
    lessonComplete: {
        text: "派手にやったな!<br>素晴らしい成長だ!",
        icon: "✨🎵"
    },
    allComplete: {
        text: "全てクリア!<br>派手!派手だぜ!<br>お前は最高だ!<br>試験も華麗に<br>突破してこい!",
        icon: "🏆"
    }
};