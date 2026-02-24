// ピクミン歩行アニメーション
// ホーム画面の下部でピクミンたちが歩き回る演出

(function () {
    'use strict';

    const PIKMIN_TYPES = [
        { src: 'shared/images/pikmin/red_pikmin.png', name: '赤ピクミン' },
        { src: 'shared/images/pikmin/yellow_pikmin.png', name: '黄ピクミン' },
        { src: 'shared/images/pikmin/blue_pikmin.png', name: '青ピクミン' },
        { src: 'shared/images/pikmin/rock_pikmin.png', name: '岩ピクミン' },
        { src: 'shared/images/pikmin/wing_pikmin.png', name: '羽ピクミン' },
        { src: 'shared/images/pikmin/white_pikmin.png', name: '白ピクミン' },
        { src: 'shared/images/pikmin/purple_pikmin.png', name: '紫ピクミン' },
        { src: 'shared/images/pikmin/ice_pikmin.png', name: '氷ピクミン' },
        { src: 'shared/images/pikmin/glow_pikmin.png', name: '光ピクミン' }
    ];

    const CONFIG = {
        maxPikmin: 5,          // 同時に表示するピクミンの最大数
        spawnInterval: 4000,   // 新しいピクミンが出現する間隔(ms)
        minSpeed: 30,          // 最小移動速度(秒/画面幅)
        maxSpeed: 60,          // 最大移動速度(秒/画面幅)
        pikminSize: 40,        // ピクミンのサイズ(px)
        bottomOffset: 10       // 画面下端からのオフセット(px)
    };

    let activePikmin = [];
    let container = null;

    function init() {
        // ホームページ判定（index.htmlのみで動作）
        if (!document.getElementById('pikmin-collection')) return;

        // フッター内にコンテナ作成
        const footer = document.querySelector('footer');
        if (!footer) return;
        footer.style.position = 'relative';
        footer.style.overflow = 'hidden';

        container = document.createElement('div');
        container.id = 'pikmin-walk-container';
        footer.appendChild(container);

        // 初回は少し遅延して出現開始
        setTimeout(() => {
            spawnPikmin();
            setInterval(spawnPikmin, CONFIG.spawnInterval);
        }, 2000);

        // お宝レーンのピクミン歩行を開始
        initTreasureLane();
    }

    function spawnPikmin() {
        if (activePikmin.length >= CONFIG.maxPikmin) return;

        // ランダムにピクミンを選択
        const type = PIKMIN_TYPES[Math.floor(Math.random() * PIKMIN_TYPES.length)];

        // 左右どちらから出現するか
        const fromLeft = Math.random() > 0.5;

        // ランダムな速度
        const duration = CONFIG.minSpeed + Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed);

        // ランダムな高さのズレ（少しバラけさせる）
        const bottomVariation = Math.random() * 30;

        // ピクミン要素を作成
        const pikminEl = document.createElement('div');
        pikminEl.className = 'walking-pikmin';
        pikminEl.style.animationDuration = duration + 's';
        pikminEl.style.bottom = (CONFIG.bottomOffset + bottomVariation) + 'px';

        // 方向を設定
        if (fromLeft) {
            pikminEl.classList.add('walk-left-to-right');
        } else {
            pikminEl.classList.add('walk-right-to-left');
        }

        // 画像
        const img = document.createElement('img');
        img.src = type.src;
        img.alt = type.name;
        img.draggable = false;

        // 向きを反転（右→左の時はそのまま、左→右の時は反転）
        if (fromLeft) {
            img.style.transform = 'scaleX(-1)';
        }

        pikminEl.appendChild(img);

        // 上下揺れの内部要素
        pikminEl.style.animationDelay = (Math.random() * 0.5) + 's';

        container.appendChild(pikminEl);
        activePikmin.push(pikminEl);

        // アニメーション完了後に削除
        pikminEl.addEventListener('animationend', () => {
            pikminEl.remove();
            activePikmin = activePikmin.filter(p => p !== pikminEl);
        });
    }

    // ==========================================
    // お宝セクション下のピクミン歩行レーン
    // ==========================================
    function initTreasureLane() {
        const lane = document.getElementById('treasure-pikmin-lane');
        if (!lane) return;

        let activeTreasurePikmin = [];

        function spawnTreasurePikmin() {
            if (activeTreasurePikmin.length >= 6) return;

            const type = PIKMIN_TYPES[Math.floor(Math.random() * PIKMIN_TYPES.length)];
            const fromLeft = Math.random() > 0.5;
            const duration = 12 + Math.random() * 16; // 12〜28秒でゆっくり横断
            const bottomPx = 4 + Math.random() * 10;  // レーン内の高さ

            const pikminEl = document.createElement('div');
            pikminEl.className = 'walking-pikmin';
            pikminEl.style.animationDuration = duration + 's';
            pikminEl.style.animationDelay = (Math.random() * 1) + 's';
            pikminEl.style.bottom = bottomPx + 'px';

            if (fromLeft) {
                pikminEl.classList.add('walk-left-to-right');
            } else {
                pikminEl.classList.add('walk-right-to-left');
            }

            const img = document.createElement('img');
            img.src = type.src;
            img.alt = type.name;
            img.draggable = false;
            if (fromLeft) {
                img.style.transform = 'scaleX(-1)';
            }

            pikminEl.appendChild(img);
            lane.appendChild(pikminEl);
            activeTreasurePikmin.push(pikminEl);

            pikminEl.addEventListener('animationend', () => {
                pikminEl.remove();
                activeTreasurePikmin = activeTreasurePikmin.filter(p => p !== pikminEl);
            });
        }

        // 初回に2〜3匹まとめて出現させる
        setTimeout(() => {
            const initialCount = 2 + Math.floor(Math.random() * 2);
            for (let i = 0; i < initialCount; i++) {
                setTimeout(spawnTreasurePikmin, i * 800);
            }
        }, 500);

        // その後は定期的に追加
        setInterval(spawnTreasurePikmin, 3000);
    }

    // DOM読み込み完了時に初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

