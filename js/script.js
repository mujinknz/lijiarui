// 核心修改：将景点数据改为个人足迹数据
const data = [
  {
    place: "厦门 · 2022.07",
    title: "海滨",
    title2: "慢时光",
    description:
        "2022年盛夏和同学去厦门毕业旅行！在鼓浪屿的小巷里漫无目的地逛，转角就是满墙三角梅，美到让人驻足。曾厝垵的沙茶面配着冰仙草，是至今想念的味道。傍晚坐在白城沙滩上看日落，海浪把脚印印冲掉又重来，像在写一封给夏天的信。",
    image: "image/all-1.jpg",
  },
  {
    place: "大理 · 2023.08",
    title: "风花",
    title2: "雪月",
    description:
        "2023年暑假和朋友去大理发呆！租电动车环洱海时，左手是苍山积雪，右手是碧波荡漾，云朵低得像要掉进水里。双廊古镇的老奶奶卖的乳扇沙琪玛，甜里带着奶香。晚上在古城听街头歌手唱《南方姑娘》，突然觉得孤独也是种自由。",
    image: "image/all-2.jpg",
  },
  {
    place: "香港 · 2024.08",
    title: "霓虹",
    title2: "烟火",
    description:
        "2024和朋友去香港看演唱会！维港夜景比电视里震撼100倍，灯光在海面碎成星星。旺角的咖喱鱼蛋要站在路边吃才够味，迪士尼的烟花秀让妈妈想起我小时候。坐天星小轮过海时，海风掀起妈妈的丝巾，突然懂了“人间烟火”四个字。",
    image: "image/all-3.jpg",
  },
  {
    place: "青岛 · 2024.08",
    title: "红瓦",
    title2: "碧海",
    description:
        "2024年和朋友暴走青岛！老城区的红瓦屋顶配着蓝天，像闯进童话书。栈桥的海鸥会精准接住面包，八大关的梧桐叶扫过肩头。在啤酒博物馆喝到微醺，对着“青岛啤酒”四个大字拍了100张合照，连空气里都是麦香味儿。",
    image: "image/all-4.jpg",
  },
  {
    place: "三亚 · 2025.06",
    title: "椰林",
    title2: "银滩",
    description:
        "2025年和朋友的三亚度假！亚龙湾的沙子白得像碎盐，海水蓝得分层，从浅绿到靛蓝。在蜈支洲岛浮潜时，小鱼在指缝间游过。晚上在沙滩烧烤，老板送的芒果糯米饭甜到心里，在酒店优秀度假。",
    image: "image/all-5.jpg",
  },
  {
    place: "澳门 · 2025.08",
    title: "葡韵",
    title2: "旧梦",
    description:
        "2025年和姐妹的澳门逛吃之旅！大三巴前排队拍照时，我们拍了不少照片。官也街的葡挞要趁热吃，酥皮掉满手也不管。在议事亭前地的彩色房子前，我们模仿小红书姿势拍照，路过的外国游客笑着竖大拇指，快乐就是这么简单。",
    image: "image/all-6.jpg",
  },
];

const _ = (id) => document.getElementById(id);
const cards = data
    .map(
        (i, index) =>
            `<div class="card" id="card${index}" style="background-image:url(${i.image})"  ></div>`
    )
    .join("");

const cardContents = data
    .map(
        (i, index) => `<div class="card-content" id="card-content-${index}">
<div class="content-start"></div>
<div class="content-tag">${
            i.place.includes("独自")
                ? "独自旅行"
                : i.place.includes("家人")
                    ? "和家人"
                    : "和朋友"
        }</div>
<div class="content-place">${i.place}</div>
<div class="content-title-1">${i.title}</div>
<div class="content-title-2">${i.title2}</div>
</div>`
    )
    .join("");

const slideNumbers = data
    .map(
        (_, index) =>
            `<div class="item" id="slide-item-${index}" >${index + 1}</div>`
    )
    .join("");
_("demo").innerHTML = cards + cardContents;
_("slide-numbers").innerHTML = slideNumbers;

const range = (n) =>
    Array(n)
        .fill(0)
        .map((i, j) => i + j);
const set = gsap.set;

function getCard(index) {
  return `#card${index}`;
}
function getCardContent(index) {
  return `#card-content-${index}`;
}
function getSliderItem(index) {
  return `#slide-item-${index}`;
}

function animate(target, duration, properties) {
  return new Promise((resolve) => {
    gsap.to(target, {
      ...properties,
      duration: duration,
      onComplete: resolve,
    });
  });
}

let order = [0, 1, 2, 3, 4, 5];
let detailsEven = true;

let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
const ease = "sine.inOut";
const destinationKeys = [
  "xiamen",
  "dali",
  "hongkong",
  "qingdao",
  "sanya",
  "macao",
];

function init() {
  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

  // 初始：根据当前活动索引为按钮设置正确的 data-destination
  try {
    const initialKey = destinationKeys[order[0]];
    const initialBtn = document.querySelector(`${detailsActive} .discover`);
    if (initialBtn && initialKey) {
      initialBtn.setAttribute("data-destination", initialKey);
    }
  } catch (_) {}
  const { innerHeight: height, innerWidth: width } = window;
  offsetTop = height - 430;
  offsetLeft = width - 830;

  gsap.set("#pagination", {
    top: offsetTop + 330,
    left: offsetLeft,
    y: 200,
    opacity: 0,
    zIndex: 60,
  });
  gsap.set("nav", { y: -200, opacity: 0 });

  gsap.set(getCard(active), {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
  gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
  gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
  gsap.set(`${detailsInactive} .text`, { y: 100 });
  gsap.set(`${detailsInactive} .title-1`, { y: 100 });
  gsap.set(`${detailsInactive} .title-2`, { y: 100 });
  gsap.set(`${detailsInactive} .desc`, { y: 50 });
  gsap.set(`${detailsInactive} .cta`, { y: 60 });

  gsap.set(".progress-sub-foreground", {
    width: 500 * (1 / order.length) * (active + 1),
  });

  rest.forEach((i, index) => {
    gsap.set(getCard(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      y: offsetTop,
      width: cardWidth,
      height: cardHeight,
      zIndex: 30,
      borderRadius: 10,
    });
    gsap.set(getCardContent(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      zIndex: 40,
      y: offsetTop + cardHeight - 100,
    });
    gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
  });

  gsap.set(".indicator", { x: -window.innerWidth });

  const startDelay = 0.6;

  gsap.to(".cover", {
    x: width + 400,
    delay: 0.5,
    ease,
    onComplete: () => {
      setTimeout(() => {
        loop();
      }, 500);
    },
  });
  rest.forEach((i, index) => {
    gsap.to(getCard(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 30,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
    gsap.to(getCardContent(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 40,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
  });
  gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
}

let clicks = 0;
let isPrev = false;

function step() {
  return new Promise((resolve) => {
    // 根据方向调整order数组
    if (isPrev) {
      order.unshift(order.pop()); // 左箭头：上一张逻辑
    } else {
      order.push(order.shift()); // 右箭头：下一张逻辑
    }

    detailsEven = !detailsEven;
    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

    // 更新详情内容
    document.querySelector(`${detailsActive} .place-box .text`).textContent =
        data[order[0]].place;
    document.querySelector(`${detailsActive} .title-1`).textContent =
        data[order[0]].title;
    document.querySelector(`${detailsActive} .title-2`).textContent =
        data[order[0]].title2;
    document.querySelector(`${detailsActive} .desc`).textContent =
        data[order[0]].description;

    // 同步当前详情区按钮的 data-destination
    try {
      const activeKey = destinationKeys[order[0]];
      const discoverBtn = document.querySelector(`${detailsActive} .discover`);
      if (discoverBtn && activeKey) {
        discoverBtn.setAttribute("data-destination", activeKey);
      }
    } catch (_) {}

    // 详情区域动画
    gsap.set(detailsActive, { zIndex: 22 });
    gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
    gsap.to(`${detailsActive} .text`, {
      y: 0,
      delay: 0.1,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-1`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-2`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .desc`, {
      y: 0,
      delay: 0.3,
      duration: 0.4,
      ease,
    });
    gsap.to(`${detailsActive} .cta`, {
      y: 0,
      delay: 0.35,
      duration: 0.4,
      onComplete: resolve,
      ease,
    });
    gsap.set(detailsInactive, { zIndex: 12 });

    const [active, ...rest] = order;
    const prv = rest[rest.length - 1];

    // 根据方向调整卡片动画方向
    if (isPrev) {
      // 左箭头：卡片从左侧进入
      gsap.set(getCard(prv), { zIndex: 10 });
      gsap.set(getCard(active), { zIndex: 20 });
      gsap.to(getCard(prv), { scale: 1.5, ease });

      // 背景大图动画（反向）
      gsap.to(getCard(active), {
        x: 0,
        y: 0,
        ease,
        width: window.innerWidth,
        height: window.innerHeight,
        borderRadius: 0,
        onComplete: () => {
          const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
          gsap.set(getCard(prv), {
            x: xNew,
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            zIndex: 30,
            borderRadius: 10,
            scale: 1,
          });
          gsap.set(getCardContent(prv), {
            x: xNew,
            y: offsetTop + cardHeight - 100,
            opacity: 1,
            zIndex: 40,
          });
          gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

          // 重置详情区域
          gsap.set(detailsInactive, { opacity: 0 });
          gsap.set(`${detailsInactive} .text`, { y: 100 });
          gsap.set(`${detailsInactive} .title-1`, { y: 100 });
          gsap.set(`${detailsInactive} .title-2`, { y: 100 });
          gsap.set(`${detailsInactive} .desc`, { y: 50 });
          gsap.set(`${detailsInactive} .cta`, { y: 60 });

          clicks -= 1;
          if (clicks > 0) step();
        },
      });

      // 右侧卡片动画（反向）
      rest.forEach((i, index) => {
        if (i !== prv) {
          const xNew = offsetLeft + index * (cardWidth + gap);
          gsap.set(getCard(i), { zIndex: 30 });
          gsap.to(getCard(i), {
            x: xNew,
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            ease,
            delay: 0.1 * (index + 1),
          });
          gsap.to(getCardContent(i), {
            x: xNew,
            y: offsetTop + cardHeight - 100,
            opacity: 1,
            zIndex: 40,
            ease,
            delay: 0.1 * (index + 1),
          });
          gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
        }
      });
    } else {
      // 右箭头：保持原有动画逻辑（正向）
      gsap.set(getCard(prv), { zIndex: 10 });
      gsap.set(getCard(active), { zIndex: 20 });
      gsap.to(getCard(prv), { scale: 1.5, ease });

      gsap.to(getCardContent(active), {
        y: offsetTop + cardHeight - 10,
        opacity: 0,
        duration: 0.3,
        ease,
      });
      gsap.to(getSliderItem(active), { x: 0, ease });
      gsap.to(getSliderItem(prv), { x: -numberSize, ease });
      gsap.to(".progress-sub-foreground", {
        width: 500 * (1 / order.length) * (active + 1),
        ease,
      });

      gsap.to(getCard(active), {
        x: 0,
        y: 0,
        ease,
        width: window.innerWidth,
        height: window.innerHeight,
        borderRadius: 0,
        onComplete: () => {
          const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
          gsap.set(getCard(prv), {
            x: xNew,
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            zIndex: 30,
            borderRadius: 10,
            scale: 1,
          });
          gsap.set(getCardContent(prv), {
            x: xNew,
            y: offsetTop + cardHeight - 100,
            opacity: 1,
            zIndex: 40,
          });
          gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

          gsap.set(detailsInactive, { opacity: 0 });
          gsap.set(`${detailsInactive} .text`, { y: 100 });
          gsap.set(`${detailsInactive} .title-1`, { y: 100 });
          gsap.set(`${detailsInactive} .title-2`, { y: 100 });
          gsap.set(`${detailsInactive} .desc`, { y: 50 });
          gsap.set(`${detailsInactive} .cta`, { y: 60 });

          clicks -= 1;
          if (clicks > 0) step();
        },
      });

      rest.forEach((i, index) => {
        if (i !== prv) {
          const xNew = offsetLeft + index * (cardWidth + gap);
          gsap.set(getCard(i), { zIndex: 30 });
          gsap.to(getCard(i), {
            x: xNew,
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            ease,
            delay: 0.1 * (index + 1),
          });
          gsap.to(getCardContent(i), {
            x: xNew,
            y: offsetTop + cardHeight - 100,
            opacity: 1,
            zIndex: 40,
            ease,
            delay: 0.1 * (index + 1),
          });
          gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
        }
      });
    }

    // 重置方向标记
    isPrev = false;
  });
}

async function loop() {
  await animate(".indicator", 2, { x: 0 });
  await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
  set(".indicator", { x: -window.innerWidth });
  await step();
  loop();
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function loadImages() {
  const promises = data.map(({ image }) => loadImage(image));
  return Promise.all(promises);
}

// 导航栏跳转功能实现
function setupNavigation() {
  // 获取所有导航项
  const navItems = document.querySelectorAll('.nav-item');

  // 为每个导航项添加点击事件
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      // 获取目标页面
      const targetPage = this.getAttribute('data-target');

      // 如果点击的是当前页面，则不执行跳转
      if (window.location.pathname.endsWith(targetPage)) {
        return;
      }

      // 跳转到目标页面
      window.location.href = targetPage;
    });
  });
}

// 照片详情页跳转功能
function setupPhotoNavigation() {
  // 获取所有"查看更多照片"按钮
  const discoverButtons = document.querySelectorAll(".discover");

  // 为每个按钮添加点击事件
  discoverButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // 获取按钮上的目的地标识
      const destination = this.getAttribute("data-destination");

      // 定义每个目的地对应的网页地址
      const destinationPages = {
        xiamen: "xiamen.html",
        dali: "dali.html",
        hongkong: "hongkong.html",
        qingdao: "qingdao.html",
        sanya: "sanya.html",
        macao: "macao.html",
      };

      // 检查是否有对应的页面地址
      if (destinationPages[destination]) {
        window.location.href = destinationPages[destination];
      } else {
        alert("该地点的详情页正在建设中~");
      }
    });
  });
}

// 箭头切换功能
function setupArrows() {
  const leftArrow = document.querySelector(".arrow-left");
  const rightArrow = document.querySelector(".arrow-right");

  // 左箭头点击事件（切换上一张）
  leftArrow.addEventListener("click", async () => {
    isPrev = true;
    await step();
  });

  // 右箭头点击事件（切换下一张）
  rightArrow.addEventListener("click", async () => {
    isPrev = false;
    await step();
  });
}

async function start() {
  try {
    const loadedImages = await loadImages();
    console.log("所有图片加载成功，数量：", loadedImages.length);
    init();

    // 初始化导航功能
    setupNavigation();
    // 初始化照片跳转功能
    setupPhotoNavigation();
    // 初始化箭头切换功能
    setupArrows();
  } catch (error) {
    console.error("图片加载失败：", error);
  }
}

// 启动应用
start();
