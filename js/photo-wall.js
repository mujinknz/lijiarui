// 等待页面DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 1. 返回主页面功能（点击“返回足迹”按钮跳转回history.html）
    const backBtn = document.querySelector('.back-btn');
    backBtn.addEventListener('click', function() {
        // 跳转到主页面，路径需与你的文件目录匹配（此处为同级目录示例）
        window.location.href = 'index.html';
    });

    // 2. 照片点击放大功能（弹窗展示高清图）
    const photoItems = document.querySelectorAll('.photo-item');
    const body = document.body;

    // 创建放大弹窗（初始隐藏）
    const zoomModal = document.createElement('div');
    zoomModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.9);
        z-index: 100;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
    `;
    body.appendChild(zoomModal);

    // 创建弹窗内的图片容器
    const zoomImg = document.createElement('img');
    zoomImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border: 2px solid rgba(255,122,69,0.5);
        border-radius: 8px;
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    zoomModal.appendChild(zoomImg);

    // 创建关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.innerText = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        font-size: 32px;
        color: #ff7a45;
        background: transparent;
        border: none;
        cursor: pointer;
        transition: color 0.3s ease;
        z-index: 101;
    `;
    closeBtn.addEventListener('mouseover', function() {
        closeBtn.style.color = '#ff5a26'; // hover加深主色调
    });
    zoomModal.appendChild(closeBtn);

    // 给每张照片绑定点击放大事件
    photoItems.forEach(item => {
        const img = item.querySelector('img');
        item.addEventListener('click', function() {
            // 获取当前照片的src，可替换为高清图路径（此处用原图示例）
            const highResSrc = img.src;
            zoomImg.src = highResSrc;

            // 显示弹窗并添加淡入效果
            zoomModal.style.display = 'flex';
            body.style.overflow = 'hidden'; // 禁止背景滚动

            // 图片加载完成后淡入
            zoomImg.onload = function() {
                zoomImg.style.opacity = '1';
            };
        });
    });

    // 关闭弹窗逻辑
    function closeModal() {
        zoomImg.style.opacity = '0';
        setTimeout(() => {
            zoomModal.style.display = 'none';
            zoomImg.src = ''; // 清空图片地址，避免缓存显示
            body.style.overflow = ''; // 恢复背景滚动
        }, 300); // 等待淡入动画结束
    }
    closeBtn.addEventListener('click', closeModal);
    // 点击弹窗空白处也可关闭
    zoomModal.addEventListener('click', function(e) {
        if (e.target === zoomModal) {
            closeModal();
        }
    });
    // 按ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && zoomModal.style.display === 'flex') {
            closeModal();
        }
    });

    // 3. 分享功能（模拟弹出分享选项，实际项目可对接社交平台API）
    const shareBtn = document.querySelector('.share-btn');
    const shareModal = document.createElement('div');
    shareModal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #1a1a1a;
        border: 1px solid rgba(255,122,69,0.3);
        border-radius: 8px;
        padding: 24px;
        z-index: 100;
        display: none;
        width: 90%;
        max-width: 300px;
    `;
    body.appendChild(shareModal);

    // 分享标题
    const shareTitle = document.createElement('h3');
    shareTitle.innerText = '分享我的城市足迹';
    shareTitle.style.cssText = `
        margin: 0 0 16px;
        font-size: 18px;
        color: #ff7a45;
        font-family: 'Oswald', sans-serif;
        text-align: center;
    `;
    shareModal.appendChild(shareTitle);

    // 分享平台选项（微信、微博、复制链接）
    const sharePlatforms = [
        { name: '微信', icon: '📱', color: '#07C160' },
        { name: '微博', icon: '🐦', color: '#E6162D' },
        { name: '复制链接', icon: '🔗', color: '#ff7a45' }
    ];
    const platformContainer = document.createElement('div');
    platformContainer.style.cssText = 'display: flex; gap: 16px; justify-content: center; margin-bottom: 20px;';
    shareModal.appendChild(platformContainer);

    sharePlatforms.forEach(platform => {
        const platformBtn = document.createElement('button');
        platformBtn.innerHTML = `${platform.icon}<br>${platform.name}`;
        platformBtn.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            background: transparent;
            border: 1px solid ${platform.color};
            color: ${platform.color};
            width: 60px;
            height: 60px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 12px;
        `;
        platformBtn.addEventListener('mouseover', function() {
            platformBtn.style.background = `${platform.color}20`; // 淡色背景
        });
        // 绑定分享逻辑（复制链接功能可直接用，其他平台需对接API）
        platformBtn.addEventListener('click', function() {
            if (platform.name === '复制链接') {
                // 复制当前页面链接到剪贴板
                navigator.clipboard.writeText(window.location.href)
                    .then(() => {
                        alert('链接已复制到剪贴板！');
                        closeShareModal();
                    })
                    .catch(err => {
                        alert('复制失败，请手动复制链接~');
                    });
            } else {
                alert(`暂未对接${platform.name}分享，后续可扩展~`);
                closeShareModal();
            }
        });
        platformContainer.appendChild(platformBtn);
    });

    // 分享弹窗关闭按钮
    const closeShareBtn = document.createElement('button');
    closeShareBtn.innerText = '取消';
    closeShareBtn.style.cssText = `
        width: 100%;
        height: 36px;
        background: transparent;
        border: 1px solid #ff7a45;
        color: #ff7a45;
        border-radius: 99px;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    closeShareBtn.addEventListener('mouseover', function() {
        closeShareBtn.style.background = 'rgba(255,122,69,0.1)';
    });
    shareModal.appendChild(closeShareBtn);

    // 打开分享弹窗
    shareBtn.addEventListener('click', function() {
        shareModal.style.display = 'block';
        body.style.overflow = 'hidden';
    });

    // 关闭分享弹窗
    function closeShareModal() {
        shareModal.style.display = 'none';
        body.style.overflow = '';
    }
    closeShareBtn.addEventListener('click', closeShareModal);
    // 点击弹窗外部关闭
    const shareOverlay = document.createElement('div');
    shareOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.5);
        z-index: 99;
        display: none;
    `;
    body.appendChild(shareOverlay);
    shareBtn.addEventListener('click', function() {
        shareOverlay.style.display = 'block';
    });
    shareOverlay.addEventListener('click', function() {
        closeShareModal();
        shareOverlay.style.display = 'none';
    });

    // 4. 下载照片功能（模拟下载，实际需后端提供高清图文件）
    const downloadBtn = document.querySelector('.download-btn');
    downloadBtn.addEventListener('click', function() {
        // 此处模拟下载，实际项目需替换为真实高清图压缩包地址
        const downloadUrl = '#'; // 替换为你的照片压缩包地址
        if (downloadUrl !== '#') {
            const aTag = document.createElement('a');
            aTag.href = downloadUrl;
            aTag.download = '旅游照片.zip'; // 下载文件命名
            aTag.click();
        } else {
            alert('照片压缩包正在准备中，暂无法下载~');
        }
    });
});