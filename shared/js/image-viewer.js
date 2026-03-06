/**
 * Image Viewer Modal System
 * 画像をクリックした際に全画面モーダルで拡大表示する機能を提供します。
 */

document.addEventListener("DOMContentLoaded", () => {
    // モーダル要素を本体に動的に追加
    const modalHTML = `
        <div id="image-modal-overlay" class="image-modal-overlay">
            <div class="image-modal-content">
                <button id="image-modal-close" class="image-modal-close" aria-label="閉じる">&times;</button>
                <img id="image-modal-img" src="" alt="拡大画像">
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const overlay = document.getElementById('image-modal-overlay');
    const modalImg = document.getElementById('image-modal-img');
    const closeBtn = document.getElementById('image-modal-close');

    // モーダルを開く関数
    const openModal = (src, alt) => {
        modalImg.src = src;
        modalImg.alt = alt || '拡大画像';
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden'; // 背景のスクロールを無効化
    };

    // モーダルを閉じる関数
    const closeModal = () => {
        overlay.classList.remove('show');
        document.body.style.overflow = '';
        setTimeout(() => {
            modalImg.src = '';
        }, 300); // トランジション完了後にsrcをクリア
    };

    // 閉じるボタンと背景クリックで閉じる
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    // ESCキーで閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('show')) {
            closeModal();
        }
    });

    // 拡大可能画像（.zoomable-image-container内のimgとボタン）にイベントを追加
    const containerNodes = document.querySelectorAll('.zoomable-image-container');
    containerNodes.forEach(container => {
        const img = container.querySelector('img');
        if (!img) return;

        // 画像そのもののクリック
        img.addEventListener('click', () => {
            openModal(img.src, img.alt);
        });

        // 拡大ボタン（虫眼鏡アイコンなど）の生成と追加
        const zoomBtn = document.createElement('button');
        zoomBtn.className = 'zoom-icon-button';
        zoomBtn.innerHTML = '🔍'; // 虫眼鏡絵文字、またはSVG
        zoomBtn.setAttribute('aria-label', '画像を拡大する');
        
        zoomBtn.addEventListener('click', () => {
            openModal(img.src, img.alt);
        });

        container.appendChild(zoomBtn);
    });
});
