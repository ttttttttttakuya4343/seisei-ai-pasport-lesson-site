// チョッパーのメッセージデータ - 改善版（医療=学習サポート）
// 学習重視 (40%) + キャラクター性 (40%) + 試験対策 (20%)

export const chopperMessages = {
    welcome: [
        { text: "お、おう!<br>また来てくれたか!<br>嬉しくねぇぞ!", icon: "🦌" },
        { text: "戻ってきたな!<br>今日も一緒に<br>頑張ろうぜ!", icon: "💊" },
        { text: "よく来たな!<br>おれが全力で<br>サポートするぞ!", icon: "🩺" },
        { text: "おう!準備はいいか?<br>楽しく学んで<br>いこうぜ!", icon: "🦌" },
        { text: "待ってたぞ!<br>今日も元気に<br>勉強だ!", icon: "💊" }
    ],
    lessonStart: {
        text: "新しいことを学ぶぞ!ワクワクするな!",
        icon: "📚"
    },
    quizStart: {
        text: "診断タイムだ!お前の力、見せてくれ!",
        icon: "🩺"
    },
    correct: [
        { text: "すっげぇ!<br>正解だ!<br>嬉しくねぇぞ!", icon: "🦌", effect: "sakura" },
        { text: "やったな!<br>ちゃんと理解<br>できてるぞ!", icon: "💊", effect: "sakura" },
        { text: "完璧だ!<br>試験も絶対<br>大丈夫だ!", icon: "🩺", effect: "sakura" },
        { text: "すごいぞ!<br>お前、天才か?<br>(褒めてないぞ!)", icon: "🦌", effect: "sakura" },
        { text: "見事だ!<br>この調子で<br>合格だ!", icon: "💊", effect: "sakura" }
    ],
    incorrect: [
        { text: "あれ?違うぞ。<br>でも大丈夫!<br>もう一回だ!", icon: "😅" },
        { text: "ちょっと違うな。<br>おれが教えるから<br>頑張れ!", icon: "🩺" },
        { text: "失敗しても<br>めげるなよ!<br>次は行けるさ!", icon: "💊" },
        { text: "間違えちゃったか。<br>でも諦めるな!<br>おれがいるぞ!", icon: "🦌" },
        { text: "大丈夫だ!<br>もう一度<br>挑戦しよう!", icon: "🩺" }
    ],
    lessonComplete: {
        text: "よくやった!<br>すごく成長したな!",
        icon: "🦌✨"
    },
    allComplete: {
        text: "全部終わったぞ!<br>お前、本当に<br>すごいな!<br>試験も絶対<br>合格できるぞ!",
        icon: "🏆"
    }
};