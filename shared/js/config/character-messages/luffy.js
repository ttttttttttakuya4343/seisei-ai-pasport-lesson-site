// ルフィのメッセージデータ - キャラクター性強化版
// 学習重視 (30%) + キャラクター性 (50%) + 試験対策 (20%)

export const luffyMessages = {
    welcome: [
        { text: "おう!また来たな!<br>おれと一緒に<br>冒険しようぜ!<br>へへっ!", icon: "👒" },
        { text: "よし!戻ってきたか!<br>今日も楽しく<br>学んでいこうな!<br>ニシシ!", icon: "😄" },
        { text: "お前!待ってたぞ!<br>一緒に<br>頑張ろうな!<br>おれの仲間だ!", icon: "💪" },
        { text: "おう!来たな!<br>今日も面白いこと<br>いっぱいあるぞ!<br>へへっ!", icon: "⚓" },
        { text: "よく来た!<br>さあ、行こうぜ!<br>新しい知識の<br>海へ!", icon: "🌊" }
    ],
    lessonStart: {
        text: "新しい冒険だ!ワクワクするな!へへっ!",
        icon: "👒"
    },
    quizStart: {
        text: "クイズだな!おれ、絶対負けねぇぞ!",
        icon: "💪"
    },
    correct: [
        { text: "すげぇ!<br>正解だ!<br>お前、<br>仲間として<br>最高だぜ!<br>へへっ!", icon: "😄", effect: "flame" },
        { text: "やったな!<br>その通りだ!<br>お前なら<br>海賊王の仲間に<br>なれるぜ!", icon: "👒", effect: "flame" },
        { text: "完璧だ!<br>すげぇじゃねぇか!<br>おれ、<br>お前のこと<br>好きだぞ!", icon: "💪", effect: "flame" },
        { text: "正解!<br>試験本番も<br>この調子で<br>突っ走れ!<br>ニシシ!", icon: "⚓", effect: "flame" },
        { text: "見事だ!<br>お前の答え、<br>ゴムゴムより<br>伸びてるぜ!<br>へへっ!", icon: "😄", effect: "flame" }
    ],
    incorrect: [
        { text: "あれ?違ったか?<br>でも大丈夫!<br>おれも昔は<br>何も知らなかったぞ!<br>もう一回だ!", icon: "😅" },
        { text: "惜しかったな!<br>でも諦めんなよ!<br>仲間はずっと<br>一緒だからな!", icon: "💪" },
        { text: "間違いか...<br>でも<br>失敗したって<br>立ち上がればいい!<br>もう一回!", icon: "👊" },
        { text: "違ったな!<br>でもおれは<br>お前を信じてるぞ!<br>次は決めような!", icon: "😊" },
        { text: "あれ?<br>肉食って<br>寝てたか?<br>じゃなくて!<br>もう一回だ!", icon: "🍖" }
    ],
    lessonComplete: {
        text: "やったー!<br>完了だ!<br>お前、すげぇな!<br>おれの大事な仲間だ!",
        icon: "🎉"
    },
    allComplete: {
        text: "全部クリアか!<br>すっげぇ!<br>お前なら<br>試験も絶対<br>合格だ!<br>海賊王の仲間として<br>誇りに思うぜ!<br>へへっ!",
        icon: "🏆"
    }
};