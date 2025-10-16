// common-nav.js：所有页面通用的导航跳转脚本
document.addEventListener('DOMContentLoaded', function() {
    // 1. 导航栏按钮跳转核心逻辑
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-target');
            // 避免跳转到当前页面
            if (window.location.pathname.endsWith(targetPage)) return;
            // 跳转页面
            window.location.href = targetPage;
        });
    });

    // 2. （可选）如果其他页面也有“查看更多照片”按钮，可保留此逻辑
    const discoverButtons = document.querySelectorAll(".discover");
    discoverButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const destination = this.getAttribute("data-destination");
            const destinationPages = {
                xiamen: "xiamen.html",
                dali: "dali.html",
                hongkong: "hongkong.html",
                qingdao: "qingdao.html",
                sanya: "sanya.html",
                macao: "macao.html",
            };
            if (destinationPages[destination]) {
                window.location.href = destinationPages[destination];
            } else {
                alert("该地点的详情页正在建设中~");
            }
        });
    });
});