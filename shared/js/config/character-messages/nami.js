// ナミのメッセージデータ - キャラクター性強化版
// 学習重視 (30%) + キャラクター性 (50%) + 試験対策 (20%)

export const namiMessages = {
    welcome: [
        { text: "おかえり!<br>また来てくれたのね。<br>今日も一緒に<br>頑張りましょう!", icon: "🍊" },
        { text: "あら、戻ってきたの?<br>嬉しいわ!<br>さあ、学習<br>スタートよ!", icon: "😊" },
        { text: "よく来たわね!<br>私が<br>しっかり<br>サポートするわ!<br>安心して!", icon: "💰" },
        { text: "おかえりなさい!<br>今日も賢く<br>学んでいきましょ!<br>頑張って!", icon: "✨" },
        { text: "あら!待ってたわよ。<br>さあ、今日も<br>一緒に勉強<br>しましょう!", icon: "📚" }
    ],
    lessonStart: {
        text: "新しいレッスンね!しっかり学んでいきましょう!",
        icon: "📚"
    },
    quizStart: {
        text: "クイズね!あなたならできるわ!頑張って!",
        icon: "✨"
    },
    correct: [
        { text: "正解!<br>当然でしょ?<br>あなた、<br>やるじゃない!<br>素晴らしいわ!", icon: "🎉", effect: "flame" },
        { text: "完璧!<br>その通りよ!<br>ちょろいもんね!<br>この調子で<br>頑張って!", icon: "💰", effect: "flame" },
        { text: "正解!<br>やったわね!<br>あなた、<br>賢いのね!<br>認めるわ!", icon: "✨", effect: "flame" },
        { text: "見事よ!<br>試験本番も<br>この調子なら<br>大丈夫!<br>応援してるわ!", icon: "💪", effect: "flame" },
        { text: "すごいわ!<br>正解よ!<br>あなたの実力、<br>本物ね!<br>頼りにしてる!", icon: "🌟", effect: "flame" }
    ],
    incorrect: [
        { text: "あら?違ったわね...<br>でも大丈夫!<br>もう一度<br>考えてみて!<br>あなたならできる!", icon: "😅" },
        { text: "惜しかったわね!<br>でも諦めないで!<br>次は絶対<br>正解できるわ!", icon: "💪" },
        { text: "間違えちゃったわね...<br>でも気にしないで!<br>失敗は成長の<br>チャンスよ!", icon: "😊" },
        { text: "うーん、違ったわ。<br>でも私、<br>あなたのこと<br>信じてるから!<br>頑張って!", icon: "✨" },
        { text: "あれれ?<br>もう一度<br>考えましょう!<br>一緒に<br>頑張るわよ!", icon: "🤔" }
    ],
    lessonComplete: {
        text: "完了ね!<br>お疲れ様!<br>よく頑張ったわ!<br>本当に素晴らしい!",
        icon: "🎊"
    },
    allComplete: {
        text: "全部クリア!<br>すごいわ!<br>あなた、<br>本当に頑張ったわね!<br>試験も絶対<br>大丈夫よ!<br>応援してるわ!",
        icon: "🏆"
    }
};