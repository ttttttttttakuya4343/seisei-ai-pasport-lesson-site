/**
 * hamburger-menu.js
 * スマホ時のハンバーガーメニューを全ページに自動注入するスクリプト
 */
(function () {
  'use strict';

  function initHamburger() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const container = navbar.querySelector('.container');
    const navLinks = navbar.querySelector('.nav-links');
    if (!container || !navLinks) return;

    // ハンバーガーボタンを作成
    const btn = document.createElement('button');
    btn.className = 'hamburger-btn';
    btn.setAttribute('aria-label', 'メニューを開く');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('type', 'button');
    btn.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(btn);

    // nav-links にモバイルメニュークラスを追加
    navLinks.classList.add('mobile-nav');

    // オーバーレイ（背景タップで閉じる）
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function openMenu() {
      btn.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      navLinks.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      btn.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (btn.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener('click', closeMenu);

    // メニュー内のリンクをタップしたら遷移後に閉じる（遅延で確実にnavigationを先行させる）
    navLinks.addEventListener('click', function (e) {
      const target = e.target.closest('a');
      if (target) {
        // リンクはナビゲーション優先→少し遅らせて閉じる
        setTimeout(closeMenu, 100);
      }
      // character-selector-link ボタンはクリックを通過させるだけ（他のJSに委譲）
      const btnTarget = e.target.closest('.character-selector-link');
      if (btnTarget) {
        // メニューだけ閉じてボタン本来の動作に任せる
        closeMenu();
      }
    });

    // Escキーで閉じる
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    // リサイズ時にモバイルメニューをリセット
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
