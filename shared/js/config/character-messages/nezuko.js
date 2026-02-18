// 禰豆子のメッセージデータ - キャラクター性強化版
// 学習重視 (30%) + キャラクター性 (50%) + 試験対策 (20%)

export const nezukoMessages = {
    welcome: [
        { text: "んー!<br>(おかえり!<br>また会えて<br>嬉しいよ!)<br>むむ!", icon: "🌸" },
        { text: "んんっ!<br>(よく来たね!<br>一緒に<br>頑張ろうね!)<br>ふんふん!", icon: "💪" },
        { text: "むー!<br>(待ってたよ!<br>今日も<br>学習しようね!)<br>んー!", icon: "✨" },
        { text: "んっ!んっ!<br>(おかえり!<br>今日も<br>頑張ろうね!)<br>むむむ!", icon: "😊" },
        { text: "んー!<br>(また会えたね!<br>一緒に<br>学ぼうね!)<br>ふふん!", icon: "🌟" }
    ],
    lessonStart: {
        text: "んんっ!(新しいレッスンだね!頑張ろう!)",
        icon: "📚"
    },
    quizStart: {
        text: "むむ!(クイズだね!負けないよ!)",
        icon: "💪"
    },
    correct: [
        { text: "んー!んー!<br>(正解!<br>すごいよ!<br>お兄ちゃんも<br>喜んでるよ!)<br>むむむ!", icon: "🎉", effect: "flame" },
        { text: "ふふん!<br>(完璧だよ!<br>よく頑張ったね!<br>えらいよ!)<br>んんっ!", icon: "💪", effect: "flame" },
        { text: "んっ!んっ!<br>(正解!<br>素晴らしいよ!<br>誇りに思うよ!)<br>むむ!", icon: "✨", effect: "flame" },
        { text: "んー!<br>(見事だよ!<br>試験本番も<br>この調子だよ!)<br>ふんふん!", icon: "🌟", effect: "flame" },
        { text: "むむむ!<br>(すごい!正解!<br>本当に<br>頑張ったね!)<br>んー!", icon: "😊", effect: "flame" }
    ],
    incorrect: [
        { text: "んー...<br>(あれ?違ったかな...<br>でも大丈夫!<br>もう一回!)<br>むむ!", icon: "😅" },
        { text: "むむ...<br>(惜しかったね!<br>諦めないで!<br>次は絶対!)<br>んんっ!", icon: "💪" },
        { text: "んん...<br>(間違いだったね...<br>でも大丈夫!<br>次頑張ろう!)<br>ふふ!", icon: "😊" },
        { text: "んー?<br>(違ったね...<br>でも信じてるよ!<br>頑張って!)<br>むむ!", icon: "✨" },
        { text: "むむ?<br>(もう一度<br>考えてみよう!<br>一緒だよ!)<br>んー!", icon: "🤔" }
    ],
    lessonComplete: {
        text: "んー!んー!<br>(やったね!<br>完了だよ!<br>お疲れ様!<br>すごく頑張ったね!)<br>むむむ!",
        icon: "🎊"
    },
    allComplete: {
        text: "んー!んー!んー!<br>(全部クリア!<br>すごいよ!<br>本当に<br>頑張ったね!<br>試験も絶対<br>大丈夫だよ!<br>応援してるよ!)<br>ふふふん!",
        icon: "🏆"
    }
};