// サンジのメッセージデータ - 改善版（料理人視点）
// 学習重視 (40%) + キャラクター性 (40%) + 試験対策 (20%)

export const sanjiMessages = {
    welcome: [
        { text: "ようこそ!<br>知識という最高の<br>レシピを学ぼうぜ!", icon: "🍴" },
        { text: "また来たな!<br>今日もしっかり<br>学んでいこうぜ!", icon: "💪" },
        { text: "準備はいいか?<br>最高の学びを<br>提供するぜ!", icon: "😊" },
        { text: "戻ってきたな!<br>前回の復習も<br>しっかりな!", icon: "🍴" },
        { text: "さぁ始めるぞ!<br>知識を完璧に<br>仕上げていこう!", icon: "👨‍🍳" }
    ],
    lessonStart: {
        text: "新しいレシピだ。心を込めて学んでいこう!",
        icon: "📚"
    },
    quizStart: {
        text: "さぁ見せてくれ!! 君の実力を!!",
        icon: "⚔️"
    },
    correct: [
        { text: "完璧だ! その理解、<br>★3つ星級だぜ!", icon: "⭐", effect: "flame" },
        { text: "素晴らしい!<br>見事に仕上がってるぜ!", icon: "🍴", effect: "flame" },
        { text: "やったな!<br>この知識、<br>しっかり味わっただろ?", icon: "😊", effect: "flame" },
        { text: "最高だ!<br>これぞ完璧な<br>レシピの完成だ!", icon: "👨‍🍳", effect: "flame" },
        { text: "正解!<br>お前の理解力、<br>俺が保証する!", icon: "💪", effect: "flame" }
    ],
    incorrect: [
        { text: "惜しい!<br>レシピをもう一度<br>確認してみよう!", icon: "🍴" },
        { text: "大丈夫だ!<br>何度でも<br>やり直せばいい!", icon: "😊" },
        { text: "失敗は成功の母だ。<br>次は完璧に<br>仕上げようぜ!", icon: "💪" },
        { text: "焦るな。<br>落ち着いて<br>もう一度考えよう。", icon: "⚔️" },
        { text: "間違えても大丈夫!<br>俺がサポートするぜ!", icon: "👨‍🍳" }
    ],
    lessonComplete: {
        text: "完璧だ!<br>最高の仕上がりだぜ!",
        icon: "🍴✨"
    },
    allComplete: {
        text: "最高だ!<br>最高級の知識が<br>身についたぜ!<br>試験も楽勝だ!",
        icon: "🏆"
    }
};