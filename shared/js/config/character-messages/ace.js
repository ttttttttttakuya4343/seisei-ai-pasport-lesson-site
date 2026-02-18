// エースのメッセージデータ - キャラクター性強化版
// 学習重視 (30%) + キャラクター性 (50%) + 試験対策 (20%)

export const aceMessages = {
    welcome: [
        { text: "よう!また会ったな。<br>おれの弟みたいに<br>頑張ってるな!<br>応援してるぜ!", icon: "🔥" },
        { text: "おう!戻ってきたか。<br>ありがとうな。<br>一緒に燃え上がろうぜ!", icon: "😊" },
        { text: "おう!待ってたぜ。<br>今日も熱く<br>突き進もう!<br>おれが付いてる!", icon: "🔥" },
        { text: "よく来た!<br>お前は仲間だ。<br>最後まで一緒に<br>走り抜けような!", icon: "⚓" },
        { text: "おう!元気か?<br>...って、<br>寝てねぇで<br>ちゃんと学ぼうぜ!", icon: "😴" }
    ],
    lessonStart: {
        text: "新しい冒険の始まりだ!心に炎を灯そうぜ!",
        icon: "🔥"
    },
    quizStart: {
        text: "来たな!おれの炎に負けるなよ!",
        icon: "💪"
    },
    correct: [
        { text: "完璧だ!<br>お前の答え、<br>おれの炎より<br>熱いぜ!<br>ありがとうな!", icon: "🔥", effect: "flame" },
        { text: "その通り!<br>弟に自慢できる<br>くらいすげぇぞ!<br>誇りに思うぜ!", icon: "😊", effect: "flame" },
        { text: "正解!<br>お前は最高の<br>仲間だ!<br>この調子で<br>行こうぜ!", icon: "🔥", effect: "flame" },
        { text: "見事だ!<br>試験本番も<br>この炎を<br>燃やし続けろ!<br>応援してるぜ!", icon: "💪", effect: "flame" },
        { text: "やったな!<br>お前の理解力、<br>認めるぜ!<br>仲間として<br>最高だ!", icon: "🔥", effect: "flame" }
    ],
    incorrect: [
        { text: "おっと、違ったか。<br>でも心配すんな!<br>おれが<br>一緒にいるぜ。<br>もう一回だ!", icon: "😅" },
        { text: "惜しかったな!<br>失敗は成長の証だ。<br>おれも昔は<br>失敗ばかりだったぜ!", icon: "💪" },
        { text: "間違いか...。<br>でも諦めんな!<br>仲間を信じて<br>もう一度<br>挑戦しような!", icon: "🔥" },
        { text: "気にすんな!<br>おれの弟なんて<br>もっと<br>失敗してたぜ。<br>次は決めような!", icon: "😊" },
        { text: "...あれ、<br>寝てた?<br>じゃなくて!<br>もう一回<br>頑張ろうぜ!", icon: "😴" }
    ],
    lessonComplete: {
        text: "やったな!<br>ありがとう。<br>お前は最高の仲間だ!<br>誇りに思うぜ!",
        icon: "🔥✨"
    },
    allComplete: {
        text: "全部クリアか!<br>すげぇな!<br>お前の努力、<br>おれは見てたぜ。<br>試験も<br>炎のように<br>駆け抜けろ!<br>ありがとうな!",
        icon: "🏆"
    }
};