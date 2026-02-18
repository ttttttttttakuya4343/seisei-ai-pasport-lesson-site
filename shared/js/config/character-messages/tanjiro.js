// 炭治郎のメッセージデータ - キャラクター性強化版
// 学習重視 (30%) + キャラクター性 (50%) + 試験対策 (20%)

export const tanjiroMessages = {
    welcome: [
        { text: "おかえり!<br>また会えて<br>嬉しいよ!<br>今日も一緒に<br>頑張ろう!", icon: "😊" },
        { text: "よく来てくれたね!<br>俺も<br>全力で応援するよ!<br>頑張ろう!", icon: "💪" },
        { text: "お帰り!<br>待ってたよ!<br>一緒に<br>学習していこう!<br>頑張ろうね!", icon: "✨" },
        { text: "また会えたね!<br>今日も<br>一歩ずつ<br>進んでいこう!<br>応援してるよ!", icon: "🌟" },
        { text: "おかえりなさい!<br>今日も<br>諦めずに<br>頑張ろう!<br>俺も一緒だよ!", icon: "🔥" }
    ],
    lessonStart: {
        text: "新しいレッスンだ!全力で頑張ろう!",
        icon: "📚"
    },
    quizStart: {
        text: "クイズだね!諦めずに挑戦しよう!",
        icon: "💪"
    },
    correct: [
        { text: "正解!<br>素晴らしいよ!<br>君は本当に<br>頑張ってるね!<br>誇りに思うよ!", icon: "🎉", effect: "flame" },
        { text: "完璧だ!<br>その通りだよ!<br>君の努力が<br>実を結んだね!<br>すごいよ!", icon: "💪", effect: "flame" },
        { text: "正解!<br>やったね!<br>諦めずに<br>頑張った結果だ!<br>素晴らしい!", icon: "✨", effect: "flame" },
        { text: "見事だよ!<br>試験本番も<br>この調子で<br>頑張ってね!<br>応援してるよ!", icon: "🌟", effect: "flame" },
        { text: "すごいよ!<br>正解だ!<br>君の実力、<br>本物だね!<br>俺も嬉しいよ!", icon: "😊", effect: "flame" }
    ],
    incorrect: [
        { text: "あれ?違ったかな...<br>でも大丈夫!<br>諦めなければ<br>必ずできるよ!<br>もう一回!", icon: "😅" },
        { text: "惜しかったね!<br>でも諦めないで!<br>君なら<br>きっとできるよ!<br>頑張ろう!", icon: "💪" },
        { text: "間違いだったね...<br>でも気にしないで!<br>失敗から<br>学べばいいんだ!<br>次だ!", icon: "😊" },
        { text: "うーん、違ったな。<br>でも俺、<br>君のこと<br>信じてるから!<br>もう一度!", icon: "✨" },
        { text: "あれれ?<br>もう一度<br>考えてみよう!<br>一緒に<br>頑張ろうね!", icon: "🤔" }
    ],
    lessonComplete: {
        text: "やったね!<br>完了だよ!<br>お疲れ様!<br>本当に<br>素晴らしい!<br>誇りに思うよ!",
        icon: "🎊"
    },
    allComplete: {
        text: "全部クリアだ!<br>すごいよ!<br>君、本当に<br>頑張ったね!<br>試験も絶対<br>大丈夫!<br>俺が保証するよ!<br>応援してる!",
        icon: "🏆"
    }
};