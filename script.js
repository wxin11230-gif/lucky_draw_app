let currentMode = "";
let drawing = false;

// 音效
const shakeSfx = new Audio('shake.mp3');
const successSfx = new Audio('success.mp3');

// =============================
// 本地超大题库（完全安全）
// =============================

const backups = {
    party: [
        "请表演一个“见钱眼开”的表情 🧧",
        "大喊三声：我是大笨蛋",
        "模仿微信默认表情包三个",
        "给最近的一个联系人发‘过年好’",
        "深情朗诵一段零食广告词",
        "现场展示一段热舞",
        "请在座的一位异性喝水",
        "模仿一种小动物的叫声",
        "讲一个冷笑话",
        "闭眼摸一个人的手，猜是谁",
        "祝福你！逃过一劫 🎉",
        "上上吉：平安喜乐 🎉",
        "模仿财神爷走路",
        "对左边的人说土味情话",
        "用家乡话夸一个人",
        "用播音腔念一句‘我饿了’",
        "随机选一个人对视10秒",
        "现场来一段即兴RAP（不少于5秒）",
        "用气声说一句‘我错了’",
        "给大家比一个心并保持3秒",
        "模仿一个电视剧经典桥段",
        "对右边的人说一句霸道总裁台词",
        "用唱歌的方式自我介绍",
        "做一个夸张的生气表情",
        "学一段主持人开场白",
        "现场走一段模特步",
        "模仿一种交通工具的声音",
        "给全场一个新年祝福",
        "用三种不同语气说‘你好’",
        "假装自己中了彩票",
        "模仿一段武侠出场",
        "随机夸一个人三句",
        "做一个慢动作转身",
        "用童声说一句绕口令",
        "假装打电话汇报年终总结",
        "对空气深情告白",
        "模仿老师点名",
        "说一句土味霸总语录",
        "摆一个最帅/最美的POSE",
        "现场编一个两句的小故事"
    ],
    book: [
        "答案就在你心中。",
        "现在还不是时候。",
        "顺其自然。",
        "换个角度看问题。",
        "大胆去尝试。",
        "保持微笑。",
        "这是好时机。",
        "需要更多耐心。",
        "念念不忘。",
        "别纠结。",
        "此时无声胜有声。",
        "一切都是安排。",
        "跟随直觉。",
        "先去喝杯茶。",
        "问题并未成熟。",
        "现在回答，只会更混乱。",
        "你在等待一个并不存在的许可。",
        "是，也不是。",
        "方向正确，动机存疑。",
        "沉默是目前最诚实的选项。",
        "这件事会发生，但不会如你所想。",
        "别急，错误还没出现。",
        "答案已经给过，只是你没听见。",
        "你会后悔，但不是现在。",
        "再问一次，结果会不同。",
        "真正的代价尚未显现。",
        "有人比你更清楚真相。",
        "不是不能，只是不该。",
        "此路通向另一种困惑。",
        "保持怀疑。",
        "事情比看起来更简单，也更复杂。",
        "如果你必须问，答案通常是否定的。",
        "再拖延一下。",
        "表面平静，水下翻涌。",
        "问题本身需要被重写。",
        "风险正在靠近。",
        "这是一个测试。",
        "所有路径都通向改变。"
    ]
};

// =============================
// 随机抽取
// =============================

function getRandomBackup(mode) {
    const list = backups[mode];
    return list[Math.floor(Math.random() * list.length)];
}

// =============================
// 选择模式
// =============================

function selectMode(mode) {
    currentMode = mode;

    document.getElementById("mode-select").classList.add("hidden");
    document.getElementById("draw-area").classList.remove("hidden");
    document.getElementById("home-btn")?.classList.remove("hidden");

    generateSticks();
}

// =============================
// 生成筒内小签
// =============================

function generateSticks() {
    const container = document.getElementById("sticks-container");
    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i < 20; i++) {
        const s = document.createElement("div");
        s.className = "stick-small";

        const left = 50 + (Math.random() * 30 - 15);
        const rotate = (i - 10) * 3 + (Math.random() * 8 - 4);
        const scaleY = 0.9 + Math.random() * 0.2;

        s.style.left = `${left}%`;
        s.style.transform =
            `translateX(-50%) rotate(${rotate}deg) scaleY(${scaleY})`;

        container.appendChild(s);
    }
}

// =============================
// 抽签
// =============================

function handleDraw() {
    if (drawing) return;
    drawing = true;

    // 播放摇晃音
    shakeSfx.loop = true;
    shakeSfx.play().catch(() => {});
    document.getElementById("tube-wrapper")
        .classList.add("shaking");

    // 模拟摇晃时间
    setTimeout(() => {

        // 停止摇晃音
        shakeSfx.pause();
        shakeSfx.currentTime = 0;
        document.getElementById("tube-wrapper")
            .classList.remove("shaking");

        // 随机本地生成
        const text = getRandomBackup(currentMode);

        // 显示结果
        successSfx.play().catch(() => {});
        const flying = document.getElementById("flying-stick");
        const textEl = document.getElementById("stick-text");

        textEl.innerText = text;

        flying.style.display = "flex";

        setTimeout(() => {
            flying.classList.add("fly");
            document.getElementById("scroll-done")
                ?.classList.add("show");
        }, 50);

    }, 1200);
}

// =============================
// 重置
// =============================

function resetDraw() {
    const flying = document.getElementById("flying-stick");
    document.getElementById("scroll-done")
        ?.classList.remove("show");

    flying.classList.remove("fly");

    setTimeout(() => {
        flying.style.display = "none";
        drawing = false;
    }, 600);
}

// =============================
// 回到主页
// =============================

function goHome() {
    location.reload();
}