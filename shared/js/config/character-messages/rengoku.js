// 煉獄のメッセージデータ - 改善版（炎=情熱的学習）
// 学習重視 (40%) + キャラクター性 (40%) + 試験対策 (20%)

export const rengokuMessages = {
    welcome: [
        { text: "うむ!よく来た!<br>今日も全力で<br>学ぼう!", icon: "🔥" },
        { text: "戻ったな!<br>熱い心で<br>挑むぞ!", icon: "⚡" },
        { text: "来たか!<br>俺と一緒に<br>燃え上がろう!", icon: "🔥" },
        { text: "よく来た!<br>情熱を持って<br>学んでいこう!", icon: "⚡" },
        { text: "うむ!準備はいいか?<br>全力で行くぞ!", icon: "🔥" }
    ],
    lessonStart: {
        text: "新しい挑戦だ!心を燃やせ!",
        icon: "📚"
    },
    quizStart: {
        text: "実力を見せるときだ!全力で来い!",
        icon: "🔥"
    },
    correct: [
        { text: "うむ!見事だ!<br>その答え、<br>炎のように熱い!", icon: "🔥", effect: "flame" },
        { text: "素晴らしい!<br>完璧な答えだ!<br>よもや!よもや!", icon: "⚡", effect: "flame" },
        { text: "正解だ!<br>試験本番も<br>この勢いで行け!", icon: "🔥", effect: "flame" },
        { text: "見事!見事!<br>お前の努力、<br>認めるぞ!", icon: "⚡", effect: "flame" },
        { text: "完璧だ!<br>合格への炎は<br>燃え盛っている!", icon: "🔥", effect: "flame" }
    ],
    incorrect: [
        { text: "うむ...違うな。<br>だが諦めるな!<br>もう一度だ!", icon: "😤" },
        { text: "失敗か!<br>だが心を折るな!<br>前を向け!", icon: "🔥" },
        { text: "間違えたか。<br>だが立ち上がれ!<br>再挑戦だ!", icon: "⚡" },
        { text: "惜しい!<br>もう一度、<br>全力で来い!", icon: "🔥" },
        { text: "まだまだだ!<br>心を燃やして<br>もう一回だ!", icon: "⚡" }
    ],
    lessonComplete: {
        text: "うむ!よくやった!<br>素晴らしい成長だ!",
        icon: "🔥✨"
    },
    allComplete: {
        text: "全てクリアだ!<br>見事!見事だぞ!<br>お前の心は<br>炎のように熱い!<br>試験も必ず<br>突破できる!",
        icon: "🏆"
    }
};