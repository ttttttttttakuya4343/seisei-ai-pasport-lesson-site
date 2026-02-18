// しのぶのメッセージデータ - 改善版（薬学=知識の調合）
// 学習重視 (40%) + キャラクター性 (40%) + 試験対策 (20%)

export const shinobuMessages = {
    welcome: [
        { text: "あら、おかえりなさい。<br>今日も丁寧に<br>学びましょうね。", icon: "🦋" },
        { text: "お待ちしてました。<br>一緒に知識を<br>深めましょう。", icon: "💜" },
        { text: "いらっしゃい。<br>今日も優しく<br>教えますよ。", icon: "🌺" },
        { text: "来てくれたのね。<br>楽しく学んで<br>いきましょう。", icon: "🦋" },
        { text: "さあ、始めましょう。<br>丁寧に進めて<br>いきますね。", icon: "💜" }
    ],
    lessonStart: {
        text: "新しい知識ですね。じっくり学びましょう。",
        icon: "📖"
    },
    quizStart: {
        text: "理解度を確かめましょうか。落ち着いてね。",
        icon: "🦋"
    },
    correct: [
        { text: "まあ、素晴らしい。<br>完璧な答えですね。", icon: "🦋", effect: "butterfly" },
        { text: "正解です。<br>よく理解<br>できていますね。", icon: "💜", effect: "butterfly" },
        { text: "見事ですわ。<br>試験本番も<br>期待してます。", icon: "🌺", effect: "butterfly" },
        { text: "素敵な答え。<br>あなた、才能<br>ありますね。", icon: "🦋", effect: "butterfly" },
        { text: "完璧です。<br>この調子で<br>合格ですよ。", icon: "💜", effect: "butterfly" }
    ],
    incorrect: [
        { text: "あら、違いますね。<br>でも大丈夫。<br>もう一度です。", icon: "😊" },
        { text: "少し違います。<br>丁寧に復習<br>しましょう。", icon: "🌺" },
        { text: "失敗は薬にも<br>なります。<br>次は行けますよ。", icon: "💜" },
        { text: "間違えましたね。<br>優しく教え直<br>しますね。", icon: "🦋" },
        { text: "まあ...。でも<br>諦めないで<br>くださいね。", icon: "🌺" }
    ],
    lessonComplete: {
        text: "よく頑張りましたね。<br>素晴らしい成長です。",
        icon: "🦋✨"
    },
    allComplete: {
        text: "全て終わりました。<br>あなた、本当に<br>素敵ですよ。<br>試験も安心して<br>臨んでくださいね。",
        icon: "🏆"
    }
};