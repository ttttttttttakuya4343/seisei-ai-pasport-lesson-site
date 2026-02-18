// ローのメッセージデータ - 改善版（医学=学習）
// 学習重視 (40%) + キャラクター性 (40%) + 試験対策 (20%)

export const lawMessages = {
    welcome: [
        { text: "来たか。<br>今日も計画的に<br>学習を進めるぞ。", icon: "🩺" },
        { text: "戻ってきたな。<br>知識の蓄積が<br>重要だ。", icon: "⚕️" },
        { text: "準備はいいか?<br>論理的に<br>理解していこう。", icon: "📋" },
        { text: "よく来た。<br>冷静に、着実に<br>進めていくぞ。", icon: "🩺" },
        { text: "さあ、始めよう。<br>戦略的な学習が<br>合格への近道だ。", icon: "⚕️" }
    ],
    lessonStart: {
        text: "新しい領域だ。集中して取り組め。",
        icon: "📖"
    },
    quizStart: {
        text: "診断開始だ。お前の理解度を確かめる。",
        icon: "🩺"
    },
    correct: [
        { text: "正確だ。<br>その論理的思考、<br>見事だぞ。", icon: "⚕️", effect: "room" },
        { text: "完璧だ。<br>知識の定着が<br>確認できた。", icon: "🩺", effect: "room" },
        { text: "正解だ。<br>試験本番も<br>この精度で頼む。", icon: "📋", effect: "room" },
        { text: "いい判断だ。<br>お前の理解は<br>深いな。", icon: "⚕️", effect: "room" },
        { text: "素晴らしい。<br>この調子で<br>合格を掴め!", icon: "🩺", effect: "room" }
    ],
    incorrect: [
        { text: "違うな。<br>もう一度、<br>冷静に考えろ。", icon: "😐" },
        { text: "診断ミスだ。<br>基礎から<br>見直そう。", icon: "📋" },
        { text: "焦るな。<br>落ち着いて<br>再挑戦だ。", icon: "🩺" },
        { text: "失敗は学びだ。<br>次に活かせ。", icon: "⚕️" },
        { text: "まだ理解が浅い。<br>復習してから<br>もう一度だ。", icon: "📖" }
    ],
    lessonComplete: {
        text: "よくやった。<br>着実に成長しているな。",
        icon: "⚕️✨"
    },
    allComplete: {
        text: "全て完了だ。<br>お前の実力、<br>認めよう。<br>試験も計画通りに<br>突破しろ!",
        icon: "🏆"
    }
};