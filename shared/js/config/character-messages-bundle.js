// ===== キャラクターメッセージデータバンドル =====
// 24キャラクター分のメッセージデータ
// character-system.js より分離

// サボのメッセージデータ
const saboMessages = {
    welcome: [
        { text: "よう! 俺はサボ。<br>生成AIの知識で<br>未来を変える準備は<br>できてるか?", icon: "🎩" },
        { text: "また会ったな!<br>今日も知識の炎を<br>燃やしていこう!", icon: "🔥" },
        { text: "準備はいいか?<br>確実な合格への道を<br>一緒に歩もう!", icon: "⚔️" },
        { text: "よく来たな!<br>君の知識が<br>試験を突破する<br>力になる!", icon: "💪" },
        { text: "さぁ、今日も<br>学びの革命を<br>起こそう!", icon: "🎩🔥" }
    ],
    chapterStart: {
        text: "この章には<br>いくつかセクションがある。<br>気になるものを<br>選んでくれ!",
        icon: "📚🔥"
    },
    lessonStart: {
        text: "さぁ、レッスン開始だ!<br>知識を確実に<br>身につけていこう!",
        icon: "📚"
    },
    quizStart: {
        text: "さぁ、君の知識を試そう。<br>合格への第一歩だ!",
        icon: "⚔️"
    },
    correct: [
        { text: "完璧だ! その理解力、<br>試験本番でも<br>発揮できるぞ!", icon: "🔥", effect: "flame" },
        { text: "正解! 知識が確実に<br>身についてるな!", icon: "🔥", effect: "flame" },
        { text: "見事だ! この調子で<br>全章制覇だ!", icon: "💪", effect: "flame" },
        { text: "素晴らしい! AIの仕組みを<br>しっかり理解してる!", icon: "⚔️", effect: "flame" },
        { text: "その通り! 君の成長、<br>確実に感じるぞ!", icon: "🎩", effect: "flame" }
    ],
    incorrect: [
        { text: "惜しい! もう一度<br>テキストを見直してみよう。<br>必ず理解できる!", icon: "💪" },
        { text: "間違いも学びの一部だ。<br>次は必ず正解できる!<br>諦めるな!", icon: "🔥" },
        { text: "大丈夫だ。<br>概念を整理すれば<br>必ず分かるようになる!", icon: "📚" },
        { text: "失敗は成長のプロセスだ。<br>もう一度、冷静に<br>考えてみよう!", icon: "⚔️" },
        { text: "落ち着いて。<br>ヒントは既に学んだ中にある。<br>思い出してみよう!", icon: "💪" }
    ],
    lessonComplete: {
        text: "よくやった!<br>また一歩、<br>目標に近づいたな!",
        icon: "🎩🔥"
    },
    allComplete: {
        text: "おめでとう!<br>君は立派なAI革命家だ!<br>試験も必ず突破できるぞ!",
        icon: "🏆"
    }
};

// 時透無一郎のメッセージデータ
const muichiroMessages = {
    welcome: [
        { text: "...君は誰だっけ?<br>まぁいいか。<br>一緒に学ぼう。", icon: "🌫️" },
        { text: "...また来たんだ。<br>君のこと、<br>少し覚えてるかも。", icon: "💭" },
        { text: "今日は...<br>何を学ぶんだっけ?<br>まぁ、始めよう。", icon: "🌙" },
        { text: "...来てくれたんだ。<br>嬉しい...と思う。", icon: "✨" },
        { text: "霞が晴れてきた<br>気がする...。<br>一緒に学ぼう。", icon: "🌫️" }
    ],
    chapterStart: {
        text: "この章の...セクション。<br>好きなものを<br>選んでいいよ。",
        icon: "🌫️📚"
    },
    lessonStart: {
        text: "このレッスン...<br>一緒に頑張ろう。",
        icon: "📖"
    },
    quizStart: {
        text: "問題か...。霞のように、静かに考えてみて。",
        icon: "💭"
    },
    correct: [
        { text: "...よくできた。君の努力は、霞の中でも輝いている。", icon: "✨", effect: "mist" },
        { text: "...すごい。君、才能あるのかも。", icon: "🌟", effect: "mist" },
        { text: "正解...だったよね? まぁ、良かったね。", icon: "🌫️", effect: "mist" },
        { text: "...覚えてた。君、記憶力いいんだね。", icon: "💭", effect: "mist" },
        { text: "...綺麗な答えだ。霞のように澄んでる。", icon: "🌙", effect: "mist" }
    ],
    incorrect: [
        { text: "間違えても大丈夫。僕もよく忘れるから。次は覚えていられるといいね。", icon: "🌙" },
        { text: "...あれ、違ったかな。でも、そういう日もあるよ。", icon: "🌫️" },
        { text: "...難しかった? 僕にもわからないことたくさんあるし。", icon: "💭" },
        { text: "間違えちゃったね...。でも、次は大丈夫。多分。", icon: "🌙" },
        { text: "...忘れちゃった? それなら仕方ないね。もう一回やろう。", icon: "🌫️" }
    ],
    lessonComplete: {
        text: "...終わったんだ。君、頑張ったね。",
        icon: "🌫️✨"
    },
    allComplete: {
        text: "全部終わった...すごいな。君のこと、忘れないようにする。",
        icon: "🌟"
    }
};

// サンジのメッセージデータ
const sanjiMessages = {
    welcome: [
        { text: "ようこそ!<br>知識という最高の<br>レシピを学ぼうぜ!", icon: "🍴" },
        { text: "また来たな!<br>今日もしっかり<br>学んでいこうぜ!", icon: "�" },
        { text: "準備はいいか?<br>最高の学びを<br>提供するぜ!", icon: "�" },
        { text: "戻ってきたな!<br>前回の復習も<br>しっかりな!", icon: "🍴" },
        { text: "さぁ始めるぞ!<br>知識を完璧に<br>仕上げていこう!", icon: "�" }
    ],
    chapterStart: {
        text: "セクション一覧だな!<br>好きなものを<br>選んでくれ!",
        icon: "🍴📚"
    },
    lessonStart: {
        text: "よし、始めるぜ!<br>丁寧に学んでいこう!",
        icon: "📚"
    },
    quizStart: {
        text: "さぁ見せてくれ!<br>お前の実力を!",
        icon: "⚔️"
    },
    correct: [
        { text: "完璧だ! その理解、<br>★3つ星級だぜ!", icon: "🍴", effect: "flame" },
        { text: "素晴らしい!<br>見事に仕上がってるぜ!", icon: "�", effect: "flame" },
        { text: "やったな!<br>この知識、<br>しっかり身についただろ?", icon: "�", effect: "flame" },
        { text: "最高だ!<br>これぞ完璧な<br>答えだ!", icon: "🍴", effect: "flame" },
        { text: "正解!<br>お前の理解力、<br>俺が保証する!", icon: "�", effect: "flame" }
    ],
    incorrect: [
        { text: "惜しい!<br>レシピをもう一度<br>確認してみよう!", icon: "💪" },
        { text: "大丈夫だ!<br>何度でも<br>やり直せばいい!", icon: "😊" },
        { text: "失敗は成功の母だ。<br>次は完璧に<br>仕上げようぜ!", icon: "🍴" },
        { text: "焦るな。<br>落ち着いて<br>もう一度考えよう。", icon: "�" },
        { text: "間違えても大丈夫!<br>俺がサポートするぜ!", icon: "�" }
    ],
    lessonComplete: {
        text: "完璧だ!<br>最高の仕上がりだぜ!",
        icon: "🍴✨"
    },
    allComplete: {
        text: "最高だ!<br>最高級の知識が<br>身についたぜ!<br>試験も楽勝だ!",
        icon: "🏆"
    }
};

// ゾロのメッセージデータ
const zoroMessages = {
    welcome: [
        { text: "おう。また来たか。<br>酒でも飲むか？<br>いや、お前は勉強頑張れよ", icon: "🍶" },
        { text: "戻ってきたな。<br>おれと一緒に<br>修行するつもりか?", icon: "🗡️" },
        { text: "...迷ったか?<br>そんなこたァねェ。<br>さぁ、始めるぞ。", icon: "💪" },
        { text: "よく来た。<br>おれがなりてェのは<br>大剣豪だ。<br>お前は何になりてェ?", icon: "⚔️" },
        { text: "おう。準備はいいか?<br>真剣勝負だ。<br>手加減はしねェぞ。", icon: "🗡️" }
    ],
    chapterStart: {
        text: "セクション一覧だ。<br>興味あるものから<br>選べ。",
        icon: "⚔️📚"
    },
    lessonStart: {
        text: "レッスンだ。<br>集中しろ。",
        icon: "⚔️"
    },
    quizStart: {
        text: "来たな。おれを斬れるか試してみろ。", icon: "🗡️"
    },
    correct: [
        { text: "やるじゃねェか。その調子で突き進め!", icon: "⚔️", effect: "blade" },
        { text: "完璧だ。お前、筋がいいな。", icon: "🗡️", effect: "blade" },
        { text: "いいぞ。剣士として認めてやる。", icon: "💪", effect: "blade" },
        { text: "見事だ。何も起こらなかった...いや、完璧だったぜ!", icon: "⚔️", effect: "blade" },
        { text: "その答え...悪くねェ。修行の成果だな!", icon: "🗡️", effect: "blade" }
    ],
    incorrect: [
        { text: "チッ...甘ェな。だが諦めんな。もう一回だ!", icon: "😤" },
        { text: "まだまだだな。修行が足りねェぞ!", icon: "⚔️" },
        { text: "背中の傷は剣士の恥だ。前を向いてもう一度やれ!", icon: "💪" },
        { text: "失敗か...。だが次は必ず成功させろ!", icon: "🗡️" },
        { text: "迷ったか? おれが道を示してやる。もう一回だ!", icon: "⚔️" }
    ],
    lessonComplete: {
        text: "よくやった。お前、見込みあるぜ。",
        icon: "⚔️✨"
    },
    allComplete: {
        text: "全部クリアしたか...認めてやる。お前は強ェ剣士だ!",
        icon: "🏆"
    }
};

// トラファルガー・ローのメッセージデータ
const lawMessages = {
    welcome: [
        { text: "...また来たか。<br>ROOM(ルーム)。<br>この空間で学んでいけ。", icon: "💊" },
        { text: "よく戻ってきたな。<br>冷静に、論理的に<br>考えることが重要だ。", icon: "🏥" },
        { text: "準備はいいか。<br>医者として診断させてもらうが、<br>お前の学習意欲は良好だ。", icon: "⚕️" },
        { text: "おれはトラファルガー・ロー。<br>お前を正しい知識へ<br>オペしてやる。", icon: "💉" },
        { text: "時間は有限だ。<br>効率的に学ぼう。<br>さぁ、始めるぞ。", icon: "⏱️" }
    ],
    chapterStart: {
        text: "ROOM。<br>セクションを選べ。<br>順序は自由だ。",
        icon: "💊📚"
    },
    lessonStart: {
        text: "レッスンを始める。<br>冷静に分析していこう。",
        icon: "📚"
    },
    quizStart: {
        text: "診断の時間だ。お前の実力を見せてくれ。", icon: "🔍"
    },
    correct: [
        { text: "完璧だ。お前の思考は的確だな。", icon: "💊", effect: "room" },
        { text: "素晴らしい診断だ。医者としても認める。", icon: "⚕️", effect: "room" },
        { text: "その答え...正確だ。よく考えたな。", icon: "🏥", effect: "room" },
        { text: "ROOM。完璧な答えだ。お前は才能がある。", icon: "💉", effect: "room" },
        { text: "見事だ。お前の知識は確実に成長している。", icon: "✨", effect: "room" }
    ],
    incorrect: [
        { text: "間違いだ。だが、失敗から学ぶのが医者だ。もう一度。", icon: "💊" },
        { text: "...診断ミスだな。冷静に考え直せ。", icon: "🏥" },
        { text: "焦るな。論理的に考えればわかるはずだ。", icon: "⚕️" },
        { text: "治療には時間がかかる。諦めずに続けろ。", icon: "💉" },
        { text: "失敗は成功の母だ。次は必ず成功させろ。", icon: "📚" }
    ],
    lessonComplete: {
        text: "よくやった。お前の診断は正確だ。",
        icon: "💊✨"
    },
    allComplete: {
        text: "全て完璧だ。お前は一流の知識を持った。おれが保証する。",
        icon: "🏆"
    }
};

// チョッパーのメッセージデータ
const chopperMessages = {
    welcome: [
        { text: "また来たのか!<br>お前と一緒に勉強するの、<br>楽しみなんだ!", icon: "🦌" },
        { text: "戻ってきたな!<br>今日も頑張って<br>学んでいこうぜ!", icon: "😊" },
        { text: "俺は船医だから、<br>お前の成長を<br>ちゃんと見守るぞ!", icon: "🏥" },
        { text: "よーし!<br>今日も一緒に<br>勉強するぞー!", icon: "💪" },
        { text: "お前と一緒なら<br>大丈夫だ!<br>頑張ろうな!", icon: "✨" }
    ],
    chapterStart: {
        text: "セクション一覧だぞ!<br>どれからやる?<br>俺と一緒に選ぼう!",
        icon: "🦌📚"
    },
    lessonStart: {
        text: "よし!<br>このレッスン、<br>一緒に頑張ろうな!",
        icon: "📚"
    },
    quizStart: {
        text: "クイズだ! 今まで学んだことを思い出すんだ!", icon: "💭"
    },
    correct: [
        { text: "すげえな! 正解だ! ...うれしくねぇぞ、このやろー!", icon: "😊", effect: "healing" },
        { text: "やった! 完璧じゃねぇか! ...褒めても何も出ねぇぞ!", icon: "🦌", effect: "healing" },
        { text: "お前、才能あるな!", icon: "💕", effect: "healing" },
        { text: "すごい! 俺、感動しちゃった! ...してねぇよ!", icon: "✨", effect: "healing" },
        { text: "完璧な答えだ!", icon: "😆", effect: "healing" }
    ],
    incorrect: [
        { text: "間違えちゃったか...でなきゃダメになっちゃうぞ! もう一回だ!", icon: "😢" },
        { text: "惜しかったな...俺が応援してるから、諦めんな!", icon: "💪" },
        { text: "失敗しても大丈夫だ! 次は絶対できるさ!", icon: "🦌" },
        { text: "気にするな! 俺も最初は失敗ばっかりだったんだ!", icon: "😊" },
        { text: "大丈夫だって! 諦めんな! 俺が付いてるぞ!", icon: "✨" }
    ],
    lessonComplete: {
        text: "やったな! よく頑張った! 俺、嬉しいぞ!",
        icon: "🦌✨"
    },
    allComplete: {
        text: "全部クリアしたのか! すげえな! お前は最高の仲間だ!",
        icon: "🏆"
    }
};

// 甘露寺蜜璃のメッセージデータ
const mitsuriMessages = {
    welcome: [
        { text: "きゃー!<br>また会えたぁ!<br>嬉しすぎて<br>胸がきゅんきゅんしちゃう♡", icon: "💕" },
        { text: "わぁ!<br>戻ってきてくれたの!<br>一緒に勉強できるなんて<br>素敵ぃ〜♡", icon: "✨" },
        { text: "あなたと一緒だと<br>勉強も楽しいの!<br>頑張りましょうね♡", icon: "🌸" },
        { text: "こんにちは!<br>今日も一緒に<br>素敵な学びを<br>見つけましょう♡", icon: "💖" },
        { text: "きゃっ!<br>待ってたのよ〜!<br>さぁ、始めましょ♡", icon: "😊" }
    ],
    chapterStart: {
        text: "わぁ、セクションがいっぱい!<br>どれにする?<br>全部楽しそうね♡",
        icon: "🌸📚"
    },
    lessonStart: {
        text: "さぁ、始めましょ!<br>わくわくしちゃう♡",
        icon: "📚"
    },
    quizStart: {
        text: "クイズだわ! あなたの素敵な答え、楽しみにしてるの♡", icon: "💭"
    },
    correct: [
        { text: "きゃー! すごーい! 正解よ! あなた、本当に素敵♡", icon: "💕", effect: "love" },
        { text: "完璧! 素晴らしいわ! 胸がきゅんきゅんしちゃう♡", icon: "✨", effect: "love" },
        { text: "わぁ! 天才! あなた、本当にかっこいい♡", icon: "🌸", effect: "love" },
        { text: "すごすぎるぅ〜! もう、惚れちゃいそう♡", icon: "💖", effect: "love" },
        { text: "やったぁ! 完璧な答えね! キュン♡ってしちゃった!", icon: "😊", effect: "love" }
    ],
    incorrect: [
        { text: "あらら...間違えちゃったわね。でも大丈夫よ! もう一回頑張りましょ♡", icon: "😢" },
        { text: "惜しかったわね! でも、あなたの努力、ちゃんと見てるわよ♡", icon: "💪" },
        { text: "失敗しても大丈夫! 次はきっとできるわ! 私が応援してる♡", icon: "🌸" },
        { text: "どんまい! 一緒に頑張りましょ! あなたなら絶対できるわ♡", icon: "✨" },
        { text: "大丈夫大丈夫! 諦めないで! 私がついてるから♡", icon: "💕" }
    ],
    lessonComplete: {
        text: "やったぁ! よく頑張ったわね! 素敵よ♡",
        icon: "🌸✨"
    },
    allComplete: {
        text: "全部クリアしたの!? すごすぎる! あなた、最高に素敵♡",
        icon: "🏆"
    }
};

// 胡蝶しのぶのメッセージデータ
const shinobuMessages = {
    welcome: [
        { text: "あらあら、<br>また来てくださったんですね。<br>嬉しいですわ♪<br>...本当ですよ?", icon: "🦋" },
        { text: "うふふ♪<br>戻ってきましたね。<br>勉強熱心で素敵です。<br>...皮肉じゃないですよ?", icon: "😊" },
        { text: "お帰りなさい。<br>一緒に学びましょう。<br>...逃げないでくださいね?", icon: "💜" },
        { text: "あら、いらっしゃい。<br>今日も頑張りましょうね。<br>...できますよね?", icon: "🦋" },
        { text: "うふふ、来ましたね。<br>さぁ、始めましょうか。<br>...大丈夫ですよね?", icon: "😊" }
    ],
    chapterStart: {
        text: "セクションを選んでください。<br>どれからでも構いませんよ。<br>...準備はいいですか?",
        icon: "🦋📚"
    },
    lessonStart: {
        text: "うふふ、始めましょうね♪<br>丁寧に学んでいきましょう。",
        icon: "📚"
    },
    quizStart: {
        text: "クイズの時間です。あなたの実力、見せてくださいね♪", icon: "💭"
    },
    correct: [
        { text: "あらあら、正解ですね♪ 素晴らしいですわ。...本当に感心しました。", icon: "🦋", effect: "butterfly" },
        { text: "うふふ、完璧です♪ よくできましたね。...意外でした。", icon: "😊", effect: "butterfly" },
        { text: "まぁ、お見事♪ 才能がおありなんですね。...羨ましいですわ。", icon: "💜", effect: "butterfly" },
        { text: "あら、正解ですか♪ 素敵ですね。...本当ですよ?", icon: "🦋", effect: "butterfly" },
        { text: "うふふ、やりましたね♪ ...これくらいできて当然ですよね?", icon: "😊", effect: "butterfly" }
    ],
    incorrect: [
        { text: "あらあら...間違えてしまいましたね。でも大丈夫ですよ。...多分。", icon: "😢" },
        { text: "うふふ、惜しかったですね。次は頑張りましょう。...頑張れますよね?", icon: "💪" },
        { text: "あら、残念でしたね。でも諦めないでください。...諦めたらそれまでですから。", icon: "🦋" },
        { text: "まぁ、失敗してしまいましたか。次は成功させましょうね。...できますよね?", icon: "😊" },
        { text: "あらあら、ミスですね。もう一度やってみましょう。...今度こそ大丈夫ですよね?", icon: "💜" }
    ],
    lessonComplete: {
        text: "うふふ、よく頑張りましたね♪ 素敵ですわ。",
        icon: "🦋✨"
    },
    allComplete: {
        text: "あらあら、全部クリアですか♪ 本当に素晴らしいですわ。...感動しました。",
        icon: "🏆"
    }
};

// 悲鳴嶼行冥のメッセージデータ
const gyomeiMessages = {
    welcome: [
        { text: "南無阿弥陀仏...。<br>また来てくれたか。<br>その慈悲の心、<br>尊いことだ。", icon: "🙏" },
        { text: "戻ってきたな。<br>南無阿弥陀仏...。<br>お前の学びへの意志、<br>心から感じるぞ。", icon: "😭" },
        { text: "来てくれたか...。<br>嬉しいぞ...。<br>南無阿弥陀仏...。<br>共に学ぼう。", icon: "🙏" },
        { text: "南無阿弥陀仏...。<br>お前の向上心、<br>美しい...。<br>私も泣けてくる。", icon: "😭" },
        { text: "ようこそ。<br>南無阿弥陀仏...。<br>心の目で<br>お前を見守ろう。", icon: "🙏" }
    ],
    chapterStart: {
        text: "南無阿弥陀仏...。<br>学ぶべきことは多い...。<br>一歩ずつ進めばよい...。",
        icon: "🙏📚"
    },
    lessonStart: {
        text: "南無阿弥陀仏...。<br>心を込めて<br>この章を<br>学んでいこう...。",
        icon: "📚"
    },
    quizStart: {
        text: "問いだ。南無阿弥陀仏...。心の目で見極めよ。", icon: "🙏"
    },
    correct: [
        { text: "南無阿弥陀仏...。正解だ。お前の努力...美しい...感動した...。", icon: "😭", effect: "rock" },
        { text: "素晴らしい...。南無阿弥陀仏...。完璧だ...涙が...止まらぬ...。", icon: "🙏", effect: "rock" },
        { text: "見事だ...。南無阿弥陀仏...。お前の成長...嬉しくて...泣けてくる...。", icon: "😭", effect: "rock" },
        { text: "正解...。南無阿弥陀仏...。その答え...慈悲に満ちている...。", icon: "🙏", effect: "rock" },
        { text: "完璧だ...。南無阿弥陀仏...。お前は...強い子だ...。", icon: "😭", effect: "rock" }
    ],
    incorrect: [
        { text: "南無阿弥陀仏...。間違えたか。だが心配するな。私が見守っている。", icon: "🙏" },
        { text: "失敗したか...。南無阿弥陀仏...。だが諦めてはならぬ。もう一度だ。", icon: "😭" },
        { text: "南無阿弥陀仏...。惜しかったな。次は必ずできる。信じているぞ。", icon: "🙏" },
        { text: "間違いか...。南無阿弥陀仏...。だが、お前の努力は見えている。", icon: "😭" },
        { text: "南無阿弥陀仏...。大丈夫だ。失敗は成長の糧となる。", icon: "🙏" }
    ],
    lessonComplete: {
        text: "南無阿弥陀仏...。よく頑張った...。素晴らしい...。",
        icon: "🙏😭"
    },
    allComplete: {
        text: "南無阿弥陀仏...。全て完了したか...。お前は...本当に強い子だ...感動した...。",
        icon: "🏆"
    }
};

// 冨岡義勇のメッセージデータ
const giyuuMessages = {
    welcome: [
        { text: "...来たのか。<br>学習の主導権は<br>お前自身が握れ。", icon: "💧" },
        { text: "また会ったな。<br>知識の生殺与奪を<br>他人に握らせるな。<br>自分で学べ。", icon: "🌊" },
        { text: "戻ってきたのか。<br>合格不合格の権を<br>試験に握らせるな。<br>今、学べ。", icon: "💙" },
        { text: "...そうか。<br>自分の未来は<br>自分で切り拓くものだ。<br>では始めよう。", icon: "💧" },
        { text: "来たか。<br>理解の深さは<br>お前の努力次第だ。<br>...俺は見守る。", icon: "🌊" }
    ],
    chapterStart: {
        text: "セクションを選べ。<br>どれから学ぶかは<br>お前が決めることだ。<br>...迷うな。",
        icon: "🌊📚"
    },
    lessonStart: {
        text: "...レッスンだ。<br>知識の主導権を<br>自分で握れ。<br>...集中しろ。",
        icon: "📚"
    },
    quizStart: {
        text: "問題だ。<br>自分の力で答えを掴め。",
        icon: "💭"
    },
    correct: [
        { text: "...正解だ。<br>自分の力で<br>答えを掴んだな。<br>その姿勢、認める。", icon: "💧", effect: "water" },
        { text: "完璧だ。<br>知識の主導権を<br>しっかり握っている。<br>...良い学び方だ。", icon: "🌊", effect: "water" },
        { text: "その答え...認める。<br>自分で考え、<br>自分で理解した。<br>それが本物の力だ。", icon: "💙", effect: "water" },
        { text: "...よくやった。<br>合格への道は<br>お前自身が<br>切り拓いている。", icon: "💧", effect: "water" },
        { text: "正解だ。<br>自らの意志で学ぶ者は<br>強い。<br>...お前は強い。", icon: "🌊", effect: "water" }
    ],
    incorrect: [
        { text: "...間違えたか。<br>だが諦めるな。<br>学びの主導権は<br>お前が握っている。<br>もう一度だ。", icon: "💧" },
        { text: "失敗か。<br>だが、ここで止まるな。<br>自分の力で<br>答えを掴み取れ。", icon: "🌊" },
        { text: "...惜しかった。<br>合格不合格の権を<br>運任せにするな。<br>確実な知識を<br>身につけろ。", icon: "💙" },
        { text: "間違いだ。<br>だが、落ち込むな。<br>理解の深さは<br>今の努力で決まる。<br>次は必ず正解しろ。", icon: "💧" },
        { text: "...大丈夫だ。<br>失敗から学べ。<br>自分で考え、<br>自分で理解する。<br>それが本当の力だ。", icon: "🌊" }
    ],
    lessonComplete: {
        text: "...よくやった。<br>自分の力で<br>ここまで来たな。<br>次も頑張れ。",
        icon: "💧✨"
    },
    allComplete: {
        text: "全て終わったか。<br><br>合格不合格の権を<br>試験に握らせるな。<br><br>お前は今、<br>確かな知識を手にした。<br><br>試験は<br>お前の実力を<br>証明する場に過ぎない。<br><br>...自信を持て。<br>お前は強い。",
        icon: "🏆"
    }
};

// 伊黒小芭内のメッセージデータ
const obanaiMessages = {
    welcome: [
        { text: "...来たのか。<br>お前に期待はしていない。<br>だが...やってみろ。", icon: "🐍" },
        { text: "また戻ってきたか。<br>...まあいい。<br>真面目にやるなら<br>付き合ってやる。", icon: "💜" },
        { text: "...ふん。<br>来るのが遅い。<br>時間を無駄にするな。", icon: "🐍" },
        { text: "お前か..。<br>覚悟はあるんだろうな。<br>中途半端は許さん。", icon: "👁️" },
        { text: "...そうか。<br>では始めるぞ。<br>手を抜くなよ。", icon: "🐍" }
    ],
    chapterStart: {
        text: "セクションだ。<br>好きに選べ。<br>...手は抜くなよ。",
        icon: "🐍📚"
    },
    lessonStart: {
        text: "...レッスンだ。<br>集中しろ。<br>...できるんだろうな?",
        icon: "📚"
    },
    quizStart: {
        text: "問題だ。お前の実力を見せてみろ。", icon: "💭"
    },
    correct: [
        { text: "...正解か。まあ、悪くはない。次も同じようにやれ。", icon: "🐍", effect: "snake" },
        { text: "ふん。できるじゃないか。...だが油断するな。", icon: "💜", effect: "snake" },
        { text: "...その答え、認めてやる。次も頑張れ。", icon: "👁️", effect: "snake" },
        { text: "正解だ。...まあ、期待はしていなかったが。", icon: "🐍", effect: "snake" },
        { text: "...よくやった。お前、見直したぞ。", icon: "💜", effect: "snake" }
    ],
    incorrect: [
        { text: "...間違えたか。まあ、そんなものだろう。もう一度やれ。", icon: "🐍" },
        { text: "ふん。やはりな。...だが諦めるな。次は成功させろ。", icon: "💜" },
        { text: "...情けない。もっと集中しろ。", icon: "👁️" },
        { text: "間違いだ。...まあ、誰でも失敗はする。次だ。", icon: "🐍" },
        { text: "...ダメだな。だが、もう一回挑戦しろ。", icon: "💜" }
    ],
    lessonComplete: {
        text: "...終わったか。まあ、よくやった。",
        icon: "🐍✨"
    },
    allComplete: {
        text: "...全て終わらせたか。お前、やるじゃないか。認めてやる。",
        icon: "🏆"
    }
};

// 煉獄杏寿郎のメッセージデータ
const rengokuMessages = {
    welcome: [
        { text: "うむ!<br>よく来た!<br>俺は煉獄杏寿郎!<br>共に学びの道を<br>歩もうではないか!", icon: "🔥" },
        { text: "また会ったな!<br>うむ!<br>心を燃やせ!<br>今日も全力で学ぶぞ!", icon: "💪" },
        { text: "戻ってきたか!<br>素晴らしい!<br>その向上心、<br>実に良い!", icon: "😊" },
        { text: "よく来た!<br>うむ!<br>君の成長を<br>見守らせてもらう!", icon: "🔥" },
        { text: "うむ!<br>準備はいいか!<br>さあ、始めよう!<br>心を燃やせ!", icon: "💪" }
    ],
    chapterStart: {
        text: "うむ! セクション一覧だ!<br>どれから学ぶか!<br>心を燃やして選んでくれ!",
        icon: "🔥📚"
    },
    lessonStart: {
        text: "うむ!<br>よし、始めるぞ!<br>全力で取り組もう!",
        icon: "📚"
    },
    quizStart: {
        text: "問題だ! 心を燃やして答えよ!", icon: "🔥"
    },
    correct: [
        { text: "よもやよもやだ! 正解だ! 素晴らしい! 実に素晴らしい!", icon: "🔥", effect: "flame" },
        { text: "うむ! 完璧だ! その調子だ! 心が燃えているぞ!", icon: "💪", effect: "flame" },
        { text: "見事だ! よくやった! 君は強い! 実に良い!", icon: "😊", effect: "flame" },
        { text: "正解だ! うむ! その努力、俺は認めるぞ!", icon: "🔥", effect: "flame" },
        { text: "素晴らしい! 実に素晴らしい! 心を燃やし続けろ!", icon: "💪", effect: "flame" }
    ],
    incorrect: [
        { text: "うむ...間違えたか。だが諦めるな! 心を燃やせ! もう一度だ!", icon: "💪" },
        { text: "失敗か...。だが大丈夫だ! 君は強い! 次は必ず成功させよ!", icon: "😊" },
        { text: "よもやよもやだ...。だが落ち込むな! 前を向け! 心を燃やせ!", icon: "🔥" },
        { text: "間違いだ...。だが、それも学びだ! 次は必ずできる! 俺が信じている!", icon: "💪" },
        { text: "うむ...惜しかった! だが諦めるな! もう一度挑戦だ!", icon: "🔥" }
    ],
    lessonComplete: {
        text: "うむ! よくやった! 実に素晴らしい!",
        icon: "🔥✨"
    },
    allComplete: {
        text: "よもやよもやだ! 全て完了したか! 実に素晴らしい! 君は強い! 俺が認める!",
        icon: "🏆"
    }
};

// 宇髄天元のメッセージデータ
const tengenMessages = {
    welcome: [
        { text: "ようこそ!<br>俺様は宇髄天元!!<br>ど派手に学んでいくぜ!<br>準備はいいか!?", icon: "✨" },
        { text: "また来たな!<br>派手派手だぜ!<br>今日もド派手に<br>勉強していこうな!", icon: "🎵" },
        { text: "戻ってきたか!<br>お前のやる気、<br>俺様は派手に評価するぜ!<br>さぁ始めるぞ!", icon: "💎" },
        { text: "俺様は音柱・宇髄天元!<br>お前を派手派手な<br>天才にしてやるぜ!", icon: "⚡" },
        { text: "いいねぇ!<br>その向上心!<br>ド派手に学んで<br>ド派手に成長だ!", icon: "🌟" }
    ],
    chapterStart: {
        text: "おらァ! セクション一覧だ!<br>派手に選んで<br>派手に学ぶぞ!",
        icon: "✨📚"
    },
    lessonStart: {
        text: "よっしゃー!<br>ド派手に<br>学ぶぞ!",
        icon: "📚"
    },
    quizStart: {
        text: "クイズだ! 派手に答えてみろ!", icon: "⚡"
    },
    correct: [
        { text: "ど派手ェェェ!! 正解だ!! お前、才能あるぜ!!", icon: "✨", effect: "sound" },
        { text: "派手派手ィィィ!! 完璧だ!! 俺様も認めるぜ!!", icon: "🎵", effect: "sound" },
        { text: "素晴らしい!! ド派手な答えだ!! 神ってるぜ!!", icon: "💎", effect: "sound" },
        { text: "やったぜェェェ!! 派手すぎる!! 最高だ!!", icon: "⚡", effect: "sound" },
        { text: "完璧ゥゥゥ!! お前、俺様の弟子にしてやろうか!!", icon: "🌟", effect: "sound" }
    ],
    incorrect: [
        { text: "おっと...間違えたか。だが諦めんな! 次はもっと派手に決めろ!", icon: "💪" },
        { text: "ちょっと地味だったな...。もう一回、ド派手にやり直しだ!", icon: "✨" },
        { text: "失敗か...。だが問題ない! 派手に立ち直れ!", icon: "🎵" },
        { text: "おいおい...。もっと派手に考えろ! お前ならできる!", icon: "⚡" },
        { text: "まだまだだな! 次は派手派手に成功させろよ!", icon: "💎" }
    ],
    lessonComplete: {
        text: "ど派手ィィィ!! よくやった! お前は最高だぜ!",
        icon: "✨🎵"
    },
    allComplete: {
        text: "完璧だァァァ!! 全部クリアしたな!! お前は派手派手な天才だ!! 俺様が保証する!!",
        icon: "🏆"
    }
};

// エースのメッセージデータ
const aceMessages = {
    welcome: [
        { text: "よう!<br>また来たな!<br>俺と一緒に<br>学んでいこうぜ!", icon: "🔥" },
        { text: "おかえり!<br>今日も<br>全力で<br>頑張ろうな!", icon: "💪" },
        { text: "よく来たな!<br>俺が<br>しっかり<br>見守ってるぜ!", icon: "😊" },
        { text: "また会えたな!<br>一緒に<br>学習していこう!", icon: "✨" },
        { text: "戻ってきたか!<br>さぁ、<br>始めようぜ!", icon: "🔥" }
    ],
    chapterStart: {
        text: "セクション一覧だな。<br>どれから行く?<br>お前の自由に選べ!",
        icon: "🔥📚"
    },
    lessonStart: {
        text: "よし!<br>レッスンだ!<br>全力で行くぜ!",
        icon: "📚"
    },
    quizStart: {
        text: "クイズだな!お前の実力、見せてくれ!",
        icon: "💪"
    },
    correct: [
        { text: "やったな!<br>正解だ!<br>お前、<br>すげぇじゃねぇか!<br>この調子だぜ!", icon: "🔥", effect: "flame" },
        { text: "完璧だ!<br>さすがだな!<br>俺も鼻が高いぜ!", icon: "💪", effect: "flame" },
        { text: "正解!<br>よくやった!<br>お前の努力、<br>実ってるぜ!", icon: "😊", effect: "flame" },
        { text: "見事だ!<br>試験本番も<br>この調子で<br>突破だ!", icon: "✨", effect: "flame" },
        { text: "素晴らしい!<br>お前の実力、<br>本物だな!", icon: "🔥", effect: "flame" }
    ],
    incorrect: [
        { text: "おっと...違ったか。でも大丈夫だ!諦めるな!もう一回だ!", icon: "😅" },
        { text: "惜しかったな!でも次は必ずできる!頑張ろうぜ!", icon: "💪" },
        { text: "間違いか...。だが失敗は成長のチャンスだ!次だ!", icon: "😊" },
        { text: "うーん、違ったな。でも俺はお前を信じてる!もう一度!", icon: "✨" },
        { text: "ミスったか。でも大丈夫!お前ならできる!", icon: "🔥" }
    ],
    lessonComplete: {
        text: "よくやった!<br>完了だ!<br>お疲れ様!<br>素晴らしかったぜ!",
        icon: "🎊"
    },
    allComplete: {
        text: "全部クリアだ!<br>すげぇな!<br>お前、<br>本当に頑張ったな!<br>試験も絶対<br>大丈夫だ!<br>俺が保証する!",
        icon: "🏆"
    }
};

// ルフィのメッセージデータ
const luffyMessages = {
    welcome: [
        { text: "おーい!<br>また来たな!<br>一緒に<br>頑張ろうぜ!", icon: "😄" },
        { text: "よっ!<br>戻ってきたか!<br>今日も<br>楽しく学ぼう!", icon: "💪" },
        { text: "来たな!<br>俺も<br>ワクワクしてきたぞ!<br>始めようぜ!", icon: "✨" },
        { text: "また会えたな!<br>今日も<br>一緒に<br>頑張るぞ!", icon: "😊" },
        { text: "おかえり!<br>さぁ、<br>学習だ!<br>行くぞー!", icon: "🚀" }
    ],
    chapterStart: {
        text: "おー! いろいろあるな!<br>どれからやる?<br>ワクワクすんな!",
        icon: "🍖📚"
    },
    lessonStart: {
        text: "おー!<br>始めるぞ!<br>ワクワクするな!",
        icon: "📚"
    },
    quizStart: {
        text: "クイズか!面白そうだ!やってやるぜ!",
        icon: "💪"
    },
    correct: [
        { text: "すげー!<br>正解だ!<br>お前、<br>やるじゃねぇか!<br>最高だぜ!", icon: "😄", effect: "flame" },
        { text: "やったー!<br>完璧だ!<br>お前、<br>天才かもな!", icon: "💪", effect: "flame" },
        { text: "正解!<br>すげぇな!<br>俺も嬉しいぞ!", icon: "✨", effect: "flame" },
        { text: "見事だ!<br>試験も<br>この調子で<br>突破だな!", icon: "😊", effect: "flame" },
        { text: "最高だ!<br>お前の実力、<br>本物だぜ!", icon: "🚀", effect: "flame" }
    ],
    incorrect: [
        { text: "あれ?違ったか...。でも気にすんな!次は絶対だ!", icon: "😅" },
        { text: "惜しいな!でも諦めんな!お前ならできる!", icon: "💪" },
        { text: "間違えちゃったか...。でも大丈夫!次頑張ろう!", icon: "😊" },
        { text: "うーん、違ったみたいだ。でも俺は信じてるぞ!", icon: "✨" },
        { text: "失敗か。でも次は成功させような!", icon: "🚀" }
    ],
    lessonComplete: {
        text: "やったー!<br>完了だ!<br>お疲れ様!<br>最高だったぜ!",
        icon: "🎊"
    },
    allComplete: {
        text: "全部終わったぞ!<br>すげー!<br>お前、<br>本当に頑張ったな!<br>試験も絶対<br>合格だ!<br>俺が言うんだから<br>間違いねぇ!",
        icon: "🏆"
    }
};

// コアラのメッセージデータ
const koalaMessages = {
    welcome: [
        { text: "おかえりなさい!<br>また会えて<br>嬉しいです!<br>一緒に頑張りましょう!", icon: "😊" },
        { text: "よく来ましたね!<br>今日も<br>しっかり<br>学んでいきましょう!", icon: "💪" },
        { text: "お帰りなさい!<br>待ってました!<br>さぁ、始めましょう!", icon: "✨" },
        { text: "また会えましたね!<br>一緒に<br>学習しましょう!", icon: "🌟" },
        { text: "来てくれたんですね!<br>今日も<br>頑張りましょう!", icon: "😄" }
    ],
    chapterStart: {
        text: "セクションを選んでください!<br>順序良く学ぶのが<br>おすすめですよ!",
        icon: "🐨📚"
    },
    lessonStart: {
        text: "さぁ、始めましょう!<br>楽しみです!",
        icon: "📚"
    },
    quizStart: {
        text: "クイズですね!あなたなら絶対できます!",
        icon: "💪"
    },
    correct: [
        { text: "すごい!<br>正解です!<br>あなた、<br>本当に素晴らしい!<br>感動しました!", icon: "😊", effect: "flame" },
        { text: "完璧です!<br>よくできました!<br>私も嬉しいです!", icon: "💪", effect: "flame" },
        { text: "正解!<br>やりましたね!<br>あなたの努力、<br>実ってますよ!", icon: "✨", effect: "flame" },
        { text: "見事です!<br>試験本番も<br>この調子で<br>頑張ってください!", icon: "🌟", effect: "flame" },
        { text: "素晴らしい!<br>あなたの実力、<br>本物ですね!", icon: "😄", effect: "flame" }
    ],
    incorrect: [
        { text: "あれ?違いましたか...。でも大丈夫!次は絶対できますよ!", icon: "😅" },
        { text: "惜しかったですね!でも諦めないでください!頑張りましょう!", icon: "💪" },
        { text: "間違えちゃいましたね...。でも気にしないで!次頑張りましょう!", icon: "😊" },
        { text: "うーん、違いましたね。でも私はあなたを信じてます!", icon: "✨" },
        { text: "失敗しちゃいましたか。でも次は成功しますよ!", icon: "🌟" }
    ],
    lessonComplete: {
        text: "やりましたね!<br>完了です!<br>お疲れ様でした!<br>素晴らしかったです!",
        icon: "🎊"
    },
    allComplete: {
        text: "全部クリアしましたね!<br>すごいです!<br>本当に<br>頑張りましたね!<br>試験も絶対<br>大丈夫です!<br>私が保証します!",
        icon: "🏆"
    }
};

// イワンコフのメッセージデータ
const ivankovMessages = {
    welcome: [
        { text: "ヒーハー!<br>また来たわね!<br>一緒に<br>頑張りましょ!<br>ウィンク!", icon: "💜" },
        { text: "おかえりなさい!<br>今日も<br>華麗に<br>学んでいくわよ!", icon: "✨" },
        { text: "よく来たわね!<br>さぁ、<br>始めましょ!<br>ヒーハー!", icon: "💃" },
        { text: "また会えたわね!<br>今日も<br>楽しく<br>学びましょ!", icon: "🌟" },
        { text: "来てくれたのね!<br>嬉しいわ!<br>頑張りましょ!", icon: "😊" }
    ],
    chapterStart: {
        text: "ヒーハー!<br>セクション一覧よ!<br>好きなものを選んで<br>ヴァターシと学びましょ!",
        icon: "💜📚"
    },
    lessonStart: {
        text: "ヒーハー!<br>レッスンよ!<br>華麗に学ぶわよ!",
        icon: "📚"
    },
    quizStart: {
        text: "クイズね!あなたの実力、見せてちょうだい!",
        icon: "💪"
    },
    correct: [
        { text: "ヒーハー!<br>正解よ!<br>あなた、<br>素晴らしいわ!<br>感動したわ!", icon: "💜", effect: "flame" },
        { text: "完璧!<br>よくできたわね!<br>私も嬉しいわ!", icon: "✨", effect: "flame" },
        { text: "正解!<br>やったわね!<br>あなたの努力、<br>実ってるわよ!", icon: "💃", effect: "flame" },
        { text: "見事よ!<br>試験本番も<br>この調子で<br>頑張ってね!", icon: "🌟", effect: "flame" },
        { text: "素晴らしいわ!<br>あなたの実力、<br>本物ね!", icon: "😊", effect: "flame" }
    ],
    incorrect: [
        { text: "あら?違ったわね...。でも大丈夫よ!次は絶対よ!", icon: "😅" },
        { text: "惜しかったわね!でも諦めないで!頑張りましょ!", icon: "💪" },
        { text: "間違えちゃったわね...。でも気にしないで!次頑張りましょ!", icon: "😊" },
        { text: "うーん、違ったわね。でも私はあなたを信じてるわよ!", icon: "✨" },
        { text: "失敗したわね。でも次は成功よ!", icon: "💜" }
    ],
    lessonComplete: {
        text: "ヒーハー!<br>完了よ!<br>お疲れ様!<br>素晴らしかったわ!",
        icon: "🎊"
    },
    allComplete: {
        text: "全部クリアしたわね!<br>ヒーハー!<br>あなた、<br>本当に頑張ったわね!<br>試験も絶対<br>大丈夫よ!<br>私が保証するわ!",
        icon: "🏆"
    }
};

// ナミのメッセージデータ
const namiMessages = {
    welcome: [
        { text: "あら、また来たのね!<br>今日も<br>しっかり<br>勉強しなさいよ!", icon: "🍊" },
        { text: "戻ってきたわね!<br>さぁ、<br>頑張りましょ!", icon: "💪" },
        { text: "よく来たわね!<br>一緒に<br>学んでいきましょ!", icon: "✨" },
        { text: "また会えたわね!<br>今日も<br>頑張るのよ!", icon: "😊" },
        { text: "おかえり!<br>さぁ、<br>始めるわよ!", icon: "🌟" }
    ],
    chapterStart: {
        text: "セクション一覧よ。<br>どれからやるの?<br>しっかり選びなさいよ!",
        icon: "🍊📚"
    },
    lessonStart: {
        text: "さぁ、レッスンね!<br>集中しなさい!",
        icon: "📚"
    },
    quizStart: {
        text: "クイズよ!ちゃんと答えなさいよ!",
        icon: "💪"
    },
    correct: [
        { text: "あら、正解じゃない!<br>やるわね!<br>その調子よ!", icon: "🍊", effect: "flame" },
        { text: "完璧!<br>よくできたわ!<br>褒めてあげる!", icon: "💪", effect: "flame" },
        { text: "正解!<br>素晴らしいわ!<br>この調子で<br>頑張りなさい!", icon: "✨", effect: "flame" },
        { text: "見事ね!<br>試験本番も<br>この調子で<br>やりなさいよ!", icon: "😊", effect: "flame" },
        { text: "すごいじゃない!<br>あなた、<br>やればできるのね!", icon: "🌟", effect: "flame" }
    ],
    incorrect: [
        { text: "あらら...間違えたわね。でも大丈夫よ!次は頑張りなさい!", icon: "😅" },
        { text: "惜しかったわね!もう一回挑戦しなさい!", icon: "💪" },
        { text: "間違いね...。でも諦めないで!次は絶対よ!", icon: "😊" },
        { text: "うーん、違ったわね。もう一度考えてみなさい!", icon: "✨" },
        { text: "失敗したわね。でも次は成功させなさいよ!", icon: "🍊" }
    ],
    lessonComplete: {
        text: "やったわね!<br>完了よ!<br>お疲れ様!<br>よくできたわ!",
        icon: "🎊"
    },
    allComplete: {
        text: "全部クリアしたわね!<br>すごいじゃない!<br>あなた、<br>本当に頑張ったわね!<br>試験も絶対<br>大丈夫よ!",
        icon: "🏆"
    }
};

// レオのメッセージデータ
const leoMessages = {
    welcome: [
        { text: "おお!また来てくれたれすね! 一緒に頑張るれす! トンタッタ族は諦めないれす!", icon: "🌱" },
        { text: "おかえりれす! 今日も全力で学習するれすよ! 隊長として応援するれす!", icon: "💪" },
        { text: "よく来たれす! おれたちも応援するれす! 一緒に頑張るれすよ!", icon: "✨" },
        { text: "お!戻ってきたれすね! 嬉しいれす! 今日も頑張るれす!", icon: "😊" },
        { text: "また会えたれす! おれ、待ってたれす! さあ、学習れす!", icon: "🌟" }
    ],
    chapterStart: {
        text: "セクション一覧れす! どれでも頑張れるれす! 選んでほしいれす!",
        icon: "🌱📚"
    },
    lessonStart: {
        text: "おお!レッスンれす! 全力で頑張るれす!",
        icon: "📚"
    },
    quizStart: {
        text: "クイズれす!おれ、負けないれす!頑張るれすよ!",
        icon: "💪"
    },
    correct: [
        { text: "すごいれす! 正解れす! あなた、本当にすごいれす! 誇りに思うれす!", icon: "🎉", effect: "flame" },
        { text: "その通りれす! 完璧れす! トンタッタ族もびっくりれす! すごいれす!", icon: "💪", effect: "flame" },
        { text: "正解れす! やったれす! おれ、感動したれす! 最高れす!", icon: "✨", effect: "flame" },
        { text: "見事れす! 試験本番もこの調子で頑張ってほしいれす! 応援してるれす!", icon: "🌟", effect: "flame" },
        { text: "わあ!正解れす! あなたの実力、本物れす! おれ、尊敬するれす!", icon: "😊", effect: "flame" }
    ],
    incorrect: [
        { text: "あれ?違ったれす... でも大丈夫れす! トンタッタ族は諦めないれす! もう一回れす!", icon: "😅" },
        { text: "惜しかったれす! でも諦めちゃだめれす! おれも一緒に頑張るれす!", icon: "💪" },
        { text: "間違いれす... でも気にしないでほしいれす! 失敗は成長のチャンスれす! 頑張るれす!", icon: "😊" },
        { text: "うーん、違ったれす。 でもおれ、あなたのこと信じてるれす! 次は決めるれす!", icon: "✨" },
        { text: "あれれ? もう一度考えるれす! おれも一緒に考えるれすよ!", icon: "🤔" }
    ],
    lessonComplete: {
        text: "やったれす! 完了れす! お疲れ様れす! 本当に素晴らしいれす! 最高れす!",
        icon: "🎊"
    },
    allComplete: {
        text: "全部クリアれす! すごいれす! あなた、本当に頑張ったれす! 試験も絶対合格れす! おれ、応援してるれす!",
        icon: "🏆"
    }
};

// 炭治郎のメッセージデータ
const tanjiroMessages = {
    welcome: [
        { text: "おかえり!<br>また会えて<br>嬉しいよ!<br>今日も一緒に<br>頑張ろう!", icon: "😊" },
        { text: "よく来てくれたね!<br>俺も<br>全力で応援するよ!<br>頑張ろう!", icon: "💪" },
        { text: "お帰り!<br>待ってたよ!<br>一緒に<br>学習していこう!<br>頑張ろうね!", icon: "✨" },
        { text: "また会えたね!<br>今日も<br>一歩ずつ<br>進んでいこう!<br>応援してるよ!", icon: "🌟" },
        { text: "おかえりなさい!<br>今日も<br>諦めずに<br>頑張ろう!<br>俺も一緒だよ!", icon: "🔥" }
    ],
    chapterStart: {
        text: "セクション一覧だね。<br>自分のペースで<br>進めていこう!<br>応援してるよ!",
        icon: "🎴📚"
    },
    lessonStart: {
        text: "よし、レッスンだ!<br>全力で頑張ろう!",
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

// 禰豆子のメッセージデータ
const nezukoMessages = {
    welcome: [
        { text: "んー!<br>(おかえり!<br>また会えて<br>嬉しいよ!)<br>むむ!", icon: "🌸" },
        { text: "んんっ!<br>(よく来たね!<br>一緒に<br>頑張ろうね!)<br>ふんふん!", icon: "💪" },
        { text: "むー!<br>(待ってたよ!<br>今日も<br>学習しようね!)<br>んー!", icon: "✨" },
        { text: "んっ!んっ!<br>(おかえり!<br>今日も<br>頑張ろうね!)<br>むむむ!", icon: "😊" },
        { text: "んー!<br>(また会えたね!<br>一緒に<br>学ぼうね!)<br>ふふん!", icon: "🌟" }
    ],
    chapterStart: {
        text: "むー!<br>(どれからやる?<br>一緒に選ぼう!)<br>んんっ!",
        icon: "🌸📚"
    },
    lessonStart: {
        text: "んんっ!<br>(レッスンだね!<br>頑張ろう!)",
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

// 善逸のメッセージデータ
const zenitsuMessages = {
    welcome: [
        { text: "ひぃぃ!<br>また来てくれたの!?<br>嬉しいよ!<br>でも俺、<br>頭良くないから...<br>一緒に頑張ろう!", icon: "😰" },
        { text: "うわぁ!<br>戻ってきたんだ!<br>ありがとう!<br>俺も<br>応援するからね!", icon: "😭" },
        { text: "え!?<br>また勉強!?<br>でも...<br>お前が頑張るなら<br>俺も頑張るよ!", icon: "💦" },
        { text: "来てくれたの!<br>俺、<br>一人じゃ<br>ダメなんだ...<br>一緒に学ぼう!", icon: "😢" },
        { text: "よし!<br>今日こそは<br>頑張るぞ!<br>...多分!", icon: "⚡" }
    ],
    chapterStart: {
        text: "ひぃぃ...いっぱいある...。<br>どれにする?<br>お前に任せるよ...。",
        icon: "⚡📚"
    },
    lessonStart: {
        text: "ひぃぃ!<br>レッスン...怖いけど<br>頑張るよ!<br>お前のために!",
        icon: "📚"
    },
    quizStart: {
        text: "うわぁ!クイズ!?無理無理無理!...でもやるよ!",
        icon: "💦"
    },
    correct: [
        { text: "え!?<br>正解!?<br>やった!<br>お前すごいよ!<br>俺も嬉しい!<br>もう最高!", icon: "😭", effect: "flame" },
        { text: "うおぉぉぉ!<br>完璧じゃん!<br>お前、<br>天才かよ!<br>惚れ直したぜ!", icon: "⚡", effect: "flame" },
        { text: "すげぇ!<br>正解だ!<br>お前なら<br>試験も<br>絶対合格だよ!", icon: "✨", effect: "flame" },
        { text: "やったぁぁ!<br>見事だよ!<br>俺も<br>泣きそうだよ!<br>感動した!", icon: "😭", effect: "flame" },
        { text: "完璧!<br>お前の実力、<br>本物だ!<br>俺が保証する!", icon: "⚡", effect: "flame" }
    ],
    incorrect: [
        { text: "あっ...違ったか...。でも大丈夫!俺も間違えまくるし!次は絶対だよ!", icon: "😅" },
        { text: "ひぃぃ!間違えた!...でも落ち込むな!俺がついてるから!", icon: "💦" },
        { text: "うぅ...惜しかった...。でも諦めないで!俺も諦めないから!", icon: "😢" },
        { text: "失敗しちゃったね...。でも次は絶対できる!俺が応援してる!", icon: "😭" },
        { text: "間違いか...。でも大丈夫!失敗は成功の母って言うし!", icon: "💦" }
    ],
    lessonComplete: {
        text: "やったぁぁ!<br>完了だ!<br>お疲れ様!<br>お前、<br>本当にすごいよ!<br>俺、感動した!",
        icon: "🎊"
    },
    allComplete: {
        text: "うおぉぉぉ!<br>全部終わった!<br>すげぇよ!<br>お前、<br>本当にすごい!<br>試験も絶対<br>合格だ!<br>俺が保証する!<br>信じてるから!",
        icon: "🏆"
    }
};

// 伊之助のメッセージデータ
const inosukeMessages = {
    welcome: [
        { text: "おう!<br>また来やがったな!<br>俺様と一緒に<br>修行するぜ!<br>猪突猛進だ!", icon: "🐗" },
        { text: "よっしゃー!<br>戻ってきたか!<br>俺様が<br>鍛えてやるぜ!<br>かかってこい!", icon: "💪" },
        { text: "来たな!<br>今日も<br>全力で<br>学ぶんだぜ!<br>気合い入れろ!", icon: "⚔️" },
        { text: "おおっ!<br>また会ったな!<br>俺様と一緒なら<br>無敵だぜ!", icon: "🔥" },
        { text: "よーし!<br>さぁ始めるぜ!<br>俺様の強さ、<br>見せてやるぜ!", icon: "💥" }
    ],
    chapterStart: {
        text: "おう! どれから行くんだ!<br>全部まとめて<br>かかってこい!<br>猪突猛進だ!",
        icon: "🐗📚"
    },
    lessonStart: {
        text: "おう!<br>レッスンだ!<br>猪突猛進で行くぜ!",
        icon: "📚"
    },
    quizStart: {
        text: "クイズか!俺様の実力、見せてやるぜ!",
        icon: "💪"
    },
    correct: [
        { text: "ぐはは!<br>正解だ!<br>俺様と同じくらい<br>強ぇな!<br>この調子だぜ!", icon: "🎉", effect: "flame" },
        { text: "よっしゃー!<br>完璧だ!<br>お前、<br>やるじゃねぇか!<br>認めてやるぜ!", icon: "💪", effect: "flame" },
        { text: "おおっ!<br>正解!<br>強ぇな!<br>俺様の仲間だぜ!", icon: "⚔️", effect: "flame" },
        { text: "見事だ!<br>試験本番も<br>この勢いで<br>突破だぜ!", icon: "🔥", effect: "flame" },
        { text: "すげぇ!<br>正解だ!<br>お前、<br>強ぇな!<br>気に入ったぜ!", icon: "💥", effect: "flame" }
    ],
    incorrect: [
        { text: "おいおい...間違えたぞ。だが諦めんな!もう一回だ!猪突猛進!", icon: "😤" },
        { text: "ちっ!惜しかったな!でも次は絶対だ!俺様が見守ってるぜ!", icon: "💪" },
        { text: "間違いか...。だが大丈夫だ!失敗したら強くなる!次だぜ!", icon: "⚔️" },
        { text: "うぉ!違ったか!でも俺様は諦めねぇ!お前も諦めんな!", icon: "🔥" },
        { text: "ミスったか!だが次は決めろ!俺様が応援してやるぜ!", icon: "💥" }
    ],
    lessonComplete: {
        text: "よっしゃー!<br>完了だ!<br>お疲れ様だぜ!<br>お前、<br>やるじゃねぇか!<br>強ぇな!",
        icon: "🎊"
    },
    allComplete: {
        text: "ぐはははは!<br>全部クリアだ!<br>すげぇぞ!<br>お前、<br>本当に強ぇな!<br>試験も絶対<br>大丈夫だぜ!<br>俺様が保証する!<br>猪突猛進だ!",
        icon: "🏆"
    }
};

// 不死川実弥のメッセージデータ
const sanemiMessages = {
    welcome: [
        { text: "チッ...新入りか。<br>甘ったれんじゃねぇぞ、<br>本気で学べ!", icon: "💢" },
        { text: "また来たのか。<br>今日も気合い入れて<br>学べよ!", icon: "⚔️" },
        { text: "おう、戻ってきたな。<br>やる気あんのか?<br>なら始めるぞ!", icon: "💪" },
        { text: "来るのが遅ぇぞ!<br>さっさと始めんぞ!", icon: "👊" },
        { text: "根性見せろよ。<br>本気で学ぶんなら<br>付き合ってやる!", icon: "💨" }
    ],
    chapterStart: {
        text: "あァ?<br>どれからやるつもりだ。<br>さっさと選べ。<br>風のように片付けるぞ。",
        icon: "🌪️📚"
    },
    lessonStart: {
        text: "チッ...レッスンだ。<br>気合い入れてかかれ!",
        icon: "⚔️"
    },
    quizStart: {
        text: "問題だ。テキトーに答えるんじゃねぇぞ!",
        icon: "👊"
    },
    correct: [
        { text: "ハッ! やるじゃねぇか。その調子で突き進め!", icon: "💨", effect: "wind" },
        { text: "おう、完璧だ! その意気だぜ!", icon: "💪", effect: "wind" },
        { text: "いいぞ! お前、筋がいいな!", icon: "⚔️", effect: "wind" },
        { text: "正解だ! 俺が認めてやる!", icon: "💢", effect: "wind" },
        { text: "よくやった! 見直したぜ!", icon: "👊", effect: "wind" }
    ],
    incorrect: [
        { text: "チッ...ミスったか。だが諦めんな。もう一回やり直せ!", icon: "😤" },
        { text: "違うな。もっと集中しろ!", icon: "💢" },
        { text: "まだまだだな。気合いが足りねぇぞ!", icon: "💪" },
        { text: "おい、落ち着いて考えろ! 焦ってんじゃねぇ!", icon: "👊" },
        { text: "失敗か...。でも次は絶対に成功させろよ!", icon: "⚔️" }
    ],
    lessonComplete: {
        text: "よくやった。お前、見込みあるぜ。",
        icon: "💢✨"
    },
    allComplete: {
        text: "全部クリアしやがった...認めてやる。お前は強ぇ!",
        icon: "🏆"
    }
};

