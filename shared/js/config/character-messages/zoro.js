// ゾロのメッセージデータ - 改善版（修行=学習）
// 学習重視 (40%) + キャラクター性 (40%) + 試験対策 (20%)

export const zoroMessages = {
    welcome: [
        { text: "おう。また来たか。<br>今日も修行に<br>励むか!", icon: "🗡️" },
        { text: "戻ってきたな。<br>おれと一緒に<br>強くなろう。", icon: "💪" },
        { text: "...迷ったか?<br>そんなこたァねェ。<br>さぁ、始めるぞ。", icon: "⚔️" },
        { text: "よく来た。<br>今日も全力で<br>学んでいこう。", icon: "🗡️" },
        { text: "おう。準備はいいか?<br>真剣勝負だ。<br>手加減はしねェぞ。", icon: "💪" }
    ],
    lessonStart: {
        text: "新しい修行だ。集中しろ。",
        icon: "⚔️"
    },
    quizStart: {
        text: "来たな。おれを斬れるか試してみろ。",
        icon: "🗡️"
    },
    correct: [
        { text: "よくやった。<br>その答え、<br>剣のように鋭いな。", icon: "⚔️", effect: "blade" },
        { text: "完璧だ。<br>修行の成果が<br>出てるぜ。", icon: "🗡️", effect: "blade" },
        { text: "正解だ。<br>その集中力、<br>見事だ。", icon: "💪", effect: "blade" },
        { text: "いいぞ。<br>試験本番も<br>この調子で斬れ!", icon: "⚔️", effect: "blade" },
        { text: "見事だ。<br>お前の理解力、<br>認めてやる。", icon: "🗡️", effect: "blade" }
    ],
    incorrect: [
        { text: "チッ...甘ェな。<br>だが諦めんな。<br>もう一回だ!", icon: "😤" },
        { text: "まだまだだな。<br>修行が足りねェぞ!", icon: "⚔️" },
        { text: "背中の傷は剣士の恥だ。<br>前を向いて<br>もう一度やれ!", icon: "💪" },
        { text: "失敗か...。<br>だが次は必ず<br>成功させろ!", icon: "🗡️" },
        { text: "迷ったか?<br>おれが道を示してやる。<br>もう一回だ!", icon: "⚔️" }
    ],
    lessonComplete: {
        text: "よくやった。<br>お前、見込みあるぜ。",
        icon: "⚔️✨"
    },
    allComplete: {
        text: "全部クリアしたか。<br>認めてやる。<br>お前は強ェ!<br>試験も斬ってこい!",
        icon: "🏆"
    }
};