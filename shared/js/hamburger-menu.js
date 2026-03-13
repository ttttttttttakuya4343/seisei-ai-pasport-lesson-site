/**
 * hamburger-menu.js
 * スマホ時のハンバーガーメニューを全ページに自動注入するスクリプト
 * 方式: .nav-links の内容をコピーした独立ドロワーを body に追加
 *      + 「章を選択」アコーディオンを挿入
 */
(function () {
  'use strict';

  // ── ページの深さからルートへの相対パスを取得 ─────────────────────────────
  function getRootPath() {
    var path = window.location.pathname;
    // /chapterN/ 以下にいる場合は ../ が必要
    if (path.match(/\/chapter\d+\//)) return '../';
    return './';
  }

  // ── 章一覧データ ──────────────────────────────────────────────────────────
  var CHAPTERS = [
    { num: 1, label: '第1章: AI（人工知能）',      dir: 'chapter1' },
    { num: 2, label: '第2章: 生成AIの誕生',          dir: 'chapter2' },
    { num: 3, label: '第3章: 生成AIのサービス',      dir: 'chapter3' },
    { num: 4, label: '第4章: AIと法律・倫理',        dir: 'chapter4' },
    { num: 5, label: '第5章: プロンプトと活用',      dir: 'chapter5' },
  ];

  function initHamburger() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    var container = navbar.querySelector('.container');
    var navLinks  = navbar.querySelector('.nav-links');
    if (!container || !navLinks) return;

    var root = getRootPath();

    // ── ① ハンバーガーボタンを navbar.container に追加 ──────────────────
    var btn = document.createElement('button');
    btn.className = 'hamburger-btn';
    btn.setAttribute('aria-label', 'メニューを開く');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('type', 'button');
    btn.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(btn);

    // ── ② 独立したドロワーを body に追加 ────────────────────────────────
    var drawer = document.createElement('nav');
    drawer.className = 'mobile-nav';
    drawer.setAttribute('aria-label', 'モバイルナビゲーション');
    // 初期状態はCSSクラス（.mobile-nav）の定義に委ねる、インラインスタイルでの制御は廃止
    
    // ── ②-A 閉じるボタン（✕）を作成 ───────────────────────────────────
    var closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-nav-close';
    closeBtn.setAttribute('aria-label', 'メニューを閉じる');
    closeBtn.setAttribute('type', 'button');
    closeBtn.innerHTML = '✕';
    // ※ ここでは appendChild しない（innerHTML 上書き後に prepend する）

    // .nav-links の内容をコピー
    drawer.innerHTML = navLinks.innerHTML;

    // innerHTML 設定後にドロワー先頭へ挿入（上書きで消えるのを防ぐ）
    drawer.prepend(closeBtn);

    // ── コピーした中の不要な要素を削除 ─────────────────────────────────
    // ① 「章を選択」テキストを含む要素（重複防止）
    // ② chapterN/ へのリンク（アコーディオンで代替）
    drawer.querySelectorAll('a, button').forEach(function (el) {
      var text = el.textContent.trim();
      var href = el.getAttribute('href') || '';
      if (text.includes('章を選択') || href.match(/chapter\d+/)) {
        el.remove();
      }
    });

    // ── ③ 「章を選択」アコーディオンを挿入（ホームリンクの直後）──────────
    var accordion = document.createElement('div');
    accordion.className = 'drawer-accordion';

    // トグルボタン
    var accBtn = document.createElement('button');
    accBtn.className = 'drawer-accordion-btn';
    accBtn.setAttribute('type', 'button');
    accBtn.setAttribute('aria-expanded', 'false');
    accBtn.innerHTML = '📚 章を選択 <span class="drawer-accordion-arrow">▼</span>';

    // 章リスト
    var accList = document.createElement('div');
    accList.className = 'drawer-accordion-list';
    accList.setAttribute('aria-hidden', 'true');

    CHAPTERS.forEach(function (ch) {
      var a = document.createElement('a');
      a.href = root + ch.dir + '/index.html';
      a.textContent = ch.label;
      a.className = 'drawer-chapter-link';
      accList.appendChild(a);
    });

    accordion.appendChild(accBtn);
    accordion.appendChild(accList);

    // ホームリンクの直後に挿入
    var firstLink = drawer.querySelector('a');
    if (firstLink && firstLink.nextSibling) {
      drawer.insertBefore(accordion, firstLink.nextSibling);
    } else {
      drawer.appendChild(accordion);
    }

    // ── ③-B 「本試験模擬テスト」リンクを追加 ────────────────────────────
    var examLink = document.createElement('a');
    examLink.href = root + 'full-exam.html';
    examLink.textContent = '🏴‍☠️ 本試験模擬テスト';
    examLink.style.cssText = [
      'background: linear-gradient(135deg, rgba(198,40,40,0.4), rgba(229,57,53,0.4))',
      'border: 1px solid rgba(229,57,53,0.6)',
      'font-weight: 700',
      'text-align: center',
    ].join(';');
    drawer.insertBefore(examLink, drawer.querySelector('.character-selector-link') || null);
    // character-selector-link が見つからない場合は末尾に追加
    if (!examLink.parentNode) drawer.appendChild(examLink);

    document.body.appendChild(drawer);

    // ── ④ オーバーレイ ──────────────────────────────────────────────────
    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    // ── ⑤ 開閉関数 ──────────────────────────────────────────────────────
    function openMenu() {
      // メニューを開く処理

      btn.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      btn.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    // アコーディオン開閉
    accBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = accBtn.getAttribute('aria-expanded') === 'true';
      accBtn.setAttribute('aria-expanded', String(!isOpen));
      accList.setAttribute('aria-hidden', String(isOpen));
      accBtn.classList.toggle('is-open', !isOpen);
      accList.classList.toggle('is-open', !isOpen);
    });

    // ── ⑥ イベント登録 ─────────────────────────────────────────────────
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      btn.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);
    closeBtn.addEventListener('click', closeMenu);

    // ドロワー内リンクをタップ → ナビゲーション優先で少し遅らせて閉じる
    drawer.addEventListener('click', function (e) {
      var linkTarget = e.target.closest('a');
      if (linkTarget) {
        setTimeout(closeMenu, 100);
        return;
      }
      // character-selector-link ボタン: 閉じてから元のボタンのイベントを発火
      var btnTarget = e.target.closest('.character-selector-link');
      if (btnTarget) {
        closeMenu();
        var originalBtn = navLinks.querySelector('.character-selector-link');
        if (originalBtn) {
          setTimeout(function () { originalBtn.click(); }, 150);
        }
      }
    });

    // Escキーで閉じる
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    // PC幅になったら閉じる
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHamburger);
  } else {
    initHamburger();
  }
})();
