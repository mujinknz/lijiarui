document.addEventListener('DOMContentLoaded', function() {
    // 初始化地图
    var map = new AMap.Map('mapContainer', {
        zoom: 5, // 地图缩放级别
        center: [116.397428, 39.90923], // 地图中心点（北京）
        viewMode: '3D' // 3D 视图
    });

    // 城市经纬度数据（示例，需替换为实际经纬度）
    var cityData = {
        xiamen: [118.1095, 24.4798],
        dali: [100.1823, 25.7172],
        hongkong: [114.1733, 22.2828],
        qingdao: [120.3551, 36.0846],
        sanya: [109.5024, 18.2503],
        macao: [113.5491, 22.1987]
    };

    // 标记城市
    for (var city in cityData) {
        if (cityData.hasOwnProperty(city)) {
            var marker = new AMap.Marker({
                position: cityData[city],
                map: map,
                label: {
                    content: city, // 标记显示的城市名
                    direction: 'top'
                }
            });

            // 标记点击事件（可选，可绑定显示对应图片等逻辑）
            marker.on('click', function() {
                var cityName = this.getLabel().getContent();
                // 这里可添加点击标记显示对应城市图片的逻辑
                console.log('点击了' + cityName + '的标记');
            });
        }
    }

    // 图片点击事件（可选，点击图片可定位到对应城市标记）
    var photoCards = document.querySelectorAll('.photo-card');
    photoCards.forEach(function(card) {
        card.addEventListener('click', function() {
            var city = this.getAttribute('data-city');
            if (cityData[city]) {
                map.setCenter(cityData[city]); // 地图中心定位到该城市
                map.setZoom(8); // 放大地图
            }
        });
    });
});