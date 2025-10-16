document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.photo-container');
    // 照片总数（可根据实际需要调整，这里按现有图片数量计算）
    const photoCount = 56;

    // 生成随机数的工具函数
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 生成照片
    for (let i = 1; i <= photoCount; i++) {
        const photo = document.createElement('div');
        photo.className = 'photo-item';

        // 随机大小（宽度范围：150-300px）
        const width = getRandom(150, 300);
        const height = getRandom(100, 250);

        // 随机位置
        const left = getRandom(0, window.innerWidth - width);
        const top = getRandom(60, window.innerHeight - height);

        // 随机旋转角度（-15° 到 15°）
        const rotate = getRandom(-15, 15);

        // 随机透明度（0.8-1）
        const opacity = (getRandom(8, 10) / 10).toFixed(1);

        // 设置照片样式
        photo.style.width = `${width}px`;
        photo.style.height = `${height}px`;
        photo.style.left = `${left}px`;
        photo.style.top = `${top}px`;
        photo.style.transform = `rotate(${rotate}deg)`;
        photo.style.opacity = opacity;

        let imgSrc = '';
        // 根据i的值选择不同的图片路径
        if (i >= 1 && i <= 8) {
            imgSrc = `../image/all-${i}.jpg`;
        } else if (i >= 9 && i <= 16) {
            const num = i - 8;
            imgSrc = `image/dali-${num}.jpg`;
        } else if (i >= 17 && i <= 24) {
            const num = i - 16;
            imgSrc = `image/hongkong-${num}.jpg`;
        } else if (i >= 25 && i <= 32) {
            const num = i - 24;
            imgSrc = `image/macao-${num}.jpg`;
        } else if (i >= 33 && i <= 40) {
            const num = i - 32;
            imgSrc = `image/qingdao-${num}.jpg`;
        } else if (i >= 41 && i <= 48) {
            const num = i - 40;
            imgSrc = `image/sanya-${num}.jpg`;
        } else if (i >= 49 && i <= 56) {
            const num = i - 48;
            imgSrc = `image/xiamen-${num}.jpg`;
        } else {
            // 若i超出现有图片范围，可默认显示某张图片，这里默认选all-1.jpg
            imgSrc = `image/all-1.jpg`;
        }

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `旅游照片 ${i}`;

        photo.appendChild(img);
        container.appendChild(photo);
    }
});