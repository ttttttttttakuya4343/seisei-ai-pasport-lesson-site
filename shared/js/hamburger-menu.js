/**
 * hamburger-menu.js
 * スマホ時のハンバーガーメニューを全ページに自動注入するスクリプト
 * 方式: .nav-links の内容をコピーした独立ドロワーを body に追加
 */
(function () {
  'use strict';

  function initHamburger() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const container = navbar.querySelector('.container');
    const navLinks = navbar.querySelector('.nav-links');
    if (!container || !navLinks) return;

    // ── ① ハンバーガーボタンを navbar.container に追加 ──────────────────
    const btn = document.createElement('button');
    btn.className = 'hamburger-btn';
    btn.setAttribute('aria-label', 'メニューを開く');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('type', 'button');
    btn.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(btn);

    // ── ② 独立したドロワーを body に追加（.nav-links は触らない） ────────
    const drawer = document.createElement('nav');
    drawer.className = 'mobile-nav';
    drawer.setAttribute('aria-label', 'モバイルナビゲーション');
    // .nav-links の中身を深コピーしてドロワーに入れる
    drawer.innerHTML = navLinks.innerHTML;
    document.body.appendChild(drawer);

    // ── ③ オーバーレイ ─────────────────────────────────────────────────────
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    // ── ④ 開閉関数 ────────────────────────────────────────────────────────
    function openMenu() {
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

    // ── ⑤ イベント登録 ───────────────────────────────────────────────────
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      btn.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    // ドロワー内リンクをタップ → ナビゲーション優先で少し遅らせて閉じる
    drawer.addEventListener('click', function (e) {
      const linkTarget = e.target.closest('a');
      if (linkTarget) {
        setTimeout(closeMenu, 100);
        return;
      }
      // character-selector-link ボタン: 閉じてから元のボタンのイベントを発火させる
      const btnTarget = e.target.closest('.character-selector-link');
      if (btnTarget) {
        closeMenu();
        // 元の .nav-links 内の対応ボタンに対してクリックを転送
        const originalBtn = navLinks.querySelector('.character-selector-link');
        if (originalBtn) {
          setTimeout(function () { originalBtn.click(); }, 150);
        }
      }
    });

    // Escキーで閉じる
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    // リサイズ時に PC 幅になったら閉じる
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
