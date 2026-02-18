// 蜜璃のメッセージデータ - 改善版（恋=学習への情熱）
// 学習重視 (40%) + キャラクター性 (40%) + 試験対策 (20%)

export const mitsuriMessages = {
    welcome: [
        { text: "きゃー!<br>また会えて<br>嬉しい〜♡", icon: "💖" },
        { text: "待ってたわ!<br>今日も一緒に<br>頑張りましょ!", icon: "🌸" },
        { text: "おかえりなさい!<br>楽しく学んで<br>いきましょ〜!", icon: "💕" },
        { text: "わぁ!来てくれたの!<br>ワクワクするわね!", icon: "💖" },
        { text: "さぁさぁ!<br>今日も元気に<br>勉強しましょ!", icon: "🌸" }
    ],
    lessonStart: {
        text: "新しいこと学ぶの大好き!一緒に頑張ろ!",
        icon: "📚"
    },
    quizStart: {
        text: "クイズの時間よ!あなたの力、見せてね!",
        icon: "💖"
    },
    correct: [
        { text: "すごーい!<br>正解よ!<br>素敵〜♡", icon: "💖", effect: "sakura" },
        { text: "完璧!<br>あなた、本当に<br>頑張ってるわね!", icon: "🌸", effect: "sakura" },
        { text: "やった〜!<br>試験本番も<br>この調子でね!", icon: "💕", effect: "sakura" },
        { text: "素晴らしいわ!<br>感動しちゃう!", icon: "💖", effect: "sakura" },
        { text: "見事な答え!<br>合格間違いなし<br>よ〜!", icon: "🌸", effect: "sakura" }
    ],
    incorrect: [
        { text: "あらら...。<br>でも大丈夫!<br>次は行けるわ!", icon: "😊" },
        { text: "ちょっと違うわね。<br>でも諦めないで!", icon: "💕" },
        { text: "失敗は成功の元!<br>もう一回<br>頑張りましょ!", icon: "🌸" },
        { text: "間違えちゃった?<br>私が応援<br>するからね!", icon: "💖" },
        { text: "大丈夫よ!<br>一緒に乗り越え<br>ましょう!", icon: "💕" }
    ],
    lessonComplete: {
        text: "やったわね!<br>とっても頑張ったわ!",
        icon: "💖✨"
    },
    allComplete: {
        text: "全部クリア!<br>あなた、本当に<br>すごいわ!<br>試験も絶対<br>合格できるわよ♡",
        icon: "🏆"
    }
};