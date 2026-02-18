// ===== 学習時間自動計測システム =====

class LearningTracker {
    constructor() {
        this.sessionStart = Date.now();
        this.totalTime = this.loadTotalTime();
        this.currentPageTime = 0;
        this.isActive = true;
        this.checkInterval = null;
        
        this.init();
    }

    init() {
        // ページ読み込み時に開始
        this.startTracking();
        
        // ページ離脱時に保存
        window.addEventListener('beforeunload', () => this.saveSession());
        
        // タブの表示/非表示を監視
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
        
        // 定期的に保存（1分ごと）
        this.checkInterval = setInterval(() => this.autoSave(), 60000);
        
        // 進捗表示を更新
        this.updateDisplay();
    }

    startTracking() {
        this.sessionStart = Date.now();
        this.isActive = true;
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // タブが非表示になった時
            this.isActive = false;
            this.saveSession();
        } else {
            // タブが表示された時
            this.isActive = true;
            this.sessionStart = Date.now();
        }
    }

    autoSave() {
        if (this.isActive) {
            this.saveSession();
        }
    }

    saveSession() {
        const currentTime = Date.now();
        const sessionDuration = currentTime - this.sessionStart;
        
        // 現在のセッション時間を加算（秒単位）
        this.currentPageTime += Math.floor(sessionDuration / 1000);
        
        // 合計時間に加算
        this.totalTime += Math.floor(sessionDuration / 1000);
        
        // LocalStorageに保存
        localStorage.setItem('learningTotalTime', this.totalTime.toString());
        
        // ページごとの学習時間も保存
        const pageKey = this.getCurrentPageKey();
        const pageTime = this.getPageTime(pageKey) + Math.floor(sessionDuration / 1000);
        localStorage.setItem(`pageTime_${pageKey}`, pageTime.toString());
        
        // セッション開始時刻をリセット
        this.sessionStart = Date.now();
        
        // 表示を更新
        this.updateDisplay();
    }

    loadTotalTime() {
        const saved = localStorage.getItem('learningTotalTime');
        return saved ? parseInt(saved, 10) : 0;
    }

    getTotalTime() {
        // 現在のセッション時間を含めた合計時間を返す
        const currentSession = this.isActive ? Math.floor((Date.now() - this.sessionStart) / 1000) : 0;
        return this.totalTime + currentSession;
    }

    getCurrentPageKey() {
        // 現在のページのキーを生成
        const path = window.location.pathname;
        return path.replace(/[^a-zA-Z0-9]/g, '_');
    }

    getPageTime(pageKey) {
        const saved = localStorage.getItem(`pageTime_${pageKey}`);
        return saved ? parseInt(saved, 10) : 0;
    }

    formatTime(seconds) {
        if (seconds < 60) {
            return `${seconds}秒`;
        } else if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60);
            return `${minutes}分`;
        } else {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            return `${hours}時間${minutes}分`;
        }
    }

    updateDisplay() {
        // ホームページの進捗表示を更新
        const totalTimeElement = document.getElementById('total-time');
        if (totalTimeElement) {
            const time = this.getTotalTime();
            totalTimeElement.textContent = this.formatTime(time);
        }
        
        // その他の進捗情報も更新
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
            totalTime: this.getTotalTime(),
            completedChapters: this.getCompletedChapters(),
            studySessions: this.getStudySessions(),
            averageSessionTime: this.getAverageSessionTime()
        };
    }

    getStudySessions() {
        const sessions = localStorage.getItem('studySessions');
        return sessions ? parseInt(sessions, 10) : 0;
    }

    getAverageSessionTime() {
        const sessions = this.getStudySessions();
        if (sessions === 0) return 0;
        return Math.floor(this.getTotalTime() / sessions);
    }

    // セッション数を記録
    incrementSessions() {
        const sessions = this.getStudySessions() + 1;
        localStorage.setItem('studySessions', sessions.toString());
    }

    // データをリセット（デバッグ用）
    reset() {
        if (confirm('学習記録をリセットしますか？この操作は取り消せません。')) {
            localStorage.removeItem('learningTotalTime');
            localStorage.removeItem('studySessions');
            // ページごとの時間も削除
            for (let key in localStorage) {
                if (key.startsWith('pageTime_')) {
                    localStorage.removeItem(key);
                }
            }
            this.totalTime = 0;
            this.currentPageTime = 0;
            this.updateDisplay();
            alert('学習記録をリセットしました');
        }
    }
}

// グローバルインスタンスを作成
let learningTracker;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        learningTracker = new LearningTracker();
        // 新しいセッションとしてカウント
        learningTracker.incrementSessions();
    });
} else {
    learningTracker = new LearningTracker();
    learningTracker.incrementSessions();
}

// グローバルアクセス用
window.learningTracker = learningTracker;