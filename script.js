document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    let currentCard = 0;

    // 初始化時只顯示第一張卡片
    cards[0].style.display = 'block';

    // 為每張卡片添加點擊事件
    cards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            // 如果是儲值卡卡連結的a標籤，阻止預設行為並切換到下一張
            if (e.target.classList.contains('topup-link')) {
                e.preventDefault();
                if (index < cards.length - 1) {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                        const nextCard = cards[index + 1];
                        nextCard.style.display = 'block';
                        setTimeout(() => {
                            nextCard.classList.add('show');
                        }, 50);
                    }, 500);
                    addSparkles(card);
                }
                return;
            }
            if (index < cards.length - 1) {
                // 隱藏當前卡片
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                    // 顯示下一張卡片
                    const nextCard = cards[index + 1];
                    nextCard.style.display = 'block';
                    setTimeout(() => {
                        nextCard.classList.add('show');
                    }, 50);
                }, 500);
                // 添加特殊效果
                addSparkles(card);
            }
        });
    });

    // 添加閃光效果
    function addSparkles(element) {
        for (let i = 0; i < 15; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: #666;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
            `;
            const startX = Math.random() * element.offsetWidth;
            const startY = Math.random() * element.offsetHeight;
            sparkle.style.left = startX + 'px';
            sparkle.style.top = startY + 'px';
            element.appendChild(sparkle);
            // 動畫
            sparkle.animate([
                {
                    transform: `translate(0, 0) scale(1)`,
                    opacity: 1
                },
                {
                    transform: `translate(${(Math.random() - 0.5) * 100}px, ${-Math.random() * 100}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => sparkle.remove();
        }
    }
}); 