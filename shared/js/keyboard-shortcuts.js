// ===== キーボードショートカットシステム =====

class KeyboardShortcuts {
    constructor() {
        this.shortcuts = {
            'h': { action: 'goHome', description: 'ホームに戻る' },
            'ArrowRight': { action: 'nextSection', description: '次のセクション' },
            'ArrowLeft': { action: 'prevSection', description: '前のセクション' },
            'ArrowUp': { action: 'scrollToTop', description: 'ページトップへ' },
            '/': { action: 'focusSearch', description: '検索にフォーカス' },
            '?': { action: 'showHelp', description: 'ショートカット一覧' },
            'Escape': { action: 'closeModals', description: 'モーダルを閉じる' }
        };
        
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        this.createHelpModal();
    }

    handleKeyPress(e) {
        // 入力フィールドやテキストエリアでは無効化
        if (e.target.matches('input, textarea, select')) {
            if (e.key === 'Escape') {
                e.target.blur();
            }
            return;
        }

        const key = e.key;
        const shortcut = this.shortcuts[key];

        if (shortcut) {
            e.preventDefault();
            this[shortcut.action]();
        }
    }

    goHome() {
        // 現在のディレクトリ階層を判定してホームへ
        const currentPath = window.location.pathname;
        let homePath = 'index.html';
        
        if (currentPath.includes('/chapter')) {
            homePath = '../index.html';
        }
        
        window.location.href = homePath;
    }

    nextSection() {
        const navButtons = document.querySelectorAll('.lesson-navigation .nav-button');
        const nextButton = Array.from(navButtons).find(btn => 
            btn.textContent.includes('次') || btn.textContent.includes('→')
        );
        
        if (nextButton) {
            nextButton.click();
        } else {
            this.showNotification('次のセクションはありません');
        }
    }

    prevSection() {
        const navButtons = document.querySelectorAll('.lesson-navigation .nav-button');
        const prevButton = Array.from(navButtons).find(btn => 
            btn.textContent.includes('前') || btn.textContent.includes('←')
        );
        
        if (prevButton) {
            prevButton.click();
        } else {
            this.showNotification('前のセクションはありません');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    focusSearch() {
        // 将来の検索機能用
        this.showNotification('検索機能は準備中です');
    }

    showHelp() {
        const modal = document.getElementById('keyboard-shortcuts-modal');
        if (modal) {
            modal.classList.add('show');
        }
    }

    closeModals() {
        // すべてのモーダルを閉じる
        const modals = document.querySelectorAll('.modal.show, .character-selector-panel.show, .nav-dropdown.open');
        modals.forEach(modal => {
            modal.classList.remove('show', 'open');
        });
        
        const helpModal = document.getElementById('keyboard-shortcuts-modal');
        if (helpModal) {
            helpModal.classList.remove('show');
        }
    }

    createHelpModal() {
        const modal = document.createElement('div');
        modal.id = 'keyboard-shortcuts-modal';
        modal.className = 'keyboard-shortcuts-modal';
        
        let shortcutsHTML = '<h3>⌨️ キーボードショートカット</h3><div class="shortcuts-grid">';
        
        for (const [key, data] of Object.entries(this.shortcuts)) {
            const displayKey = this.getDisplayKey(key);
            shortcutsHTML += `
                <div class="shortcut-item">
                    <kbd class="shortcut-key">${displayKey}</kbd>
                    <span class="shortcut-desc">${data.description}</span>
                </div>
            `;
        }
        
        shortcutsHTML += '</div><button class="close-modal-btn">閉じる</button>';
        modal.innerHTML = shortcutsHTML;
        
        document.body.appendChild(modal);
        
        // 閉じるボタンとモーダル外クリックのイベント
        const closeBtn = modal.querySelector('.close-modal-btn');
        closeBtn.addEventListener('click', () => modal.classList.remove('show'));
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }

    getDisplayKey(key) {
        const keyMap = {
            'ArrowRight': '→',
            'ArrowLeft': '←',
            'ArrowUp': '↑',
            'Escape': 'Esc'
        };
        return keyMap[key] || key.toUpperCase();
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'keyboard-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// 初期化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new KeyboardShortcuts();
    });
} else {
    new KeyboardShortcuts();
}