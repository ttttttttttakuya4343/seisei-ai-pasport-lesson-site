// ===== 学習進捗管理システム =====

class LearningTracker {
    constructor() {
        this.init();
    }

    init() {
        // ページ読み込み時に進捗表示を更新
        this.updateDisplay();
    }

    updateDisplay() {
        this.updateProgress();
    }

    updateProgress() {
        // 完了した章数を計算
        const completedChapters = this.getCompletedChapters();
        const completedElement = document.getElementById('completed-chapters');
        if (completedElement) {
            completedElement.textContent = completedChapters;
        }
        
        // 達成率を計算
        const totalChapters = 5;
        const completionRate = Math.floor((completedChapters / totalChapters) * 100);
        const rateElement = document.getElementById('completion-rate');
        if (rateElement) {
            rateElement.textContent = `${completionRate}%`;
        }
        
        // プログレスバーを更新
        const progressBar = document.querySelector('#overall-progress-bar .progress-fill');
        if (progressBar) {
            progressBar.style.width = `${completionRate}%`;
            progressBar.textContent = `${completionRate}%`;
        }
        
        // メッセージを更新
        this.updateProgressMessage(completedChapters, totalChapters);
    }

    getCompletedChapters() {
        let completed = 0;
        for (let i = 1; i <= 5; i++) {
            const chapterData = localStorage.getItem(`chapter${i}_completed`);
            if (chapterData === 'true') {
                completed++;
            }
        }
        return completed;
    }

    updateProgressMessage(completed, total) {
        const messageElement = document.getElementById('progress-message');
        if (!messageElement) return;
        
        if (completed === 0) {
            messageElement.textContent = 'まだ学習を始めていません。第1章から始めましょう！';
        } else if (completed === total) {
            messageElement.textContent = '🎉 おめでとうございます！全章を完了しました！';
        } else {
            messageElement.textContent = `${total}章中${completed}章完了！引き続き頑張りましょう！`;
        }
    }

    // 統計情報を取得
    getStats() {
        return {
            completedChapters: this.getCompletedChapters(),
            totalChapters: 5
        };
    }

    // データをリセット（デバッグ用）
    reset() {
        if (confirm('学習記録をリセットしますか？この操作は取り消せません。')) {
            for (let i = 1; i <= 5; i++) {
                localStorage.removeItem(`chapter${i}_completed`);
            }
            this.updateDisplay();
            alert('学習記録をリセットしました');
            window.location.reload();
        }
    }
}

// グローバルインスタンスを作成
let learningTracker;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        learningTracker = new LearningTracker();
    });
} else {
    learningTracker = new LearningTracker();
}

// グローバルアクセス用
window.learningTracker = learningTracker;