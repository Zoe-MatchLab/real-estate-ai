const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    const pages = [
        { name: '定位打卡页', url: 'http://localhost:8899/checkin-location.html', checks: ['地图', '打卡', '阶段1'] },
        { name: '点位打卡页', url: 'http://localhost:8899/checkin-point.html', checks: ['点位', '拍照', '阶段2'] },
        { name: '文案确认页', url: 'http://localhost:8899/confirm-copywriter.html', checks: ['文案', '小红书', '阶段3'] },
        { name: '成果提交页', url: 'http://localhost:8899/submit-result.html', checks: ['提交', '成果', '阶段4'] },
        { name: '任务详情页(更新)', url: 'http://localhost:8899/task-detail.html', checks: ['万科城市之光', '阶段1', '阶段2', '阶段3', '阶段4'] }
    ];
    
    let allPassed = true;
    
    for (const p of pages) {
        console.log(`\n--- Testing: ${p.name} ---`);
        try {
            await page.goto(p.url, { timeout: 10000 });
            const title = await page.title();
            console.log(`✅ Page loaded: ${title}`);
            
            for (const check of p.checks) {
                const content = await page.content();
                if (content.includes(check)) {
                    console.log(`✅ Contains: "${check}"`);
                } else {
                    console.log(`❌ Missing: "${check}"`);
                    allPassed = false;
                }
            }
            
            // 检查控制台错误
            const errors = [];
            page.on('console', msg => {
                if (msg.type() === 'error') errors.push(msg.text());
            });
            
        } catch (err) {
            console.log(`❌ Error: ${err.message}`);
            allPassed = false;
        }
    }
    
    // 测试页面跳转链接
    console.log('\n--- Testing Navigation Links ---');
    await page.goto('http://localhost:8899/task-detail.html', { timeout: 10000 });
    
    // 检查跳转到各阶段的链接
    const links = await page.evaluate(() => {
        const buttons = document.querySelectorAll('.stage-btn');
        return Array.from(buttons).map(b => ({
            text: b.textContent.trim(),
            onclick: b.getAttribute('onclick')
        }));
    });
    
    console.log('Stage buttons:');
    links.forEach(l => console.log(`  - ${l.text}: ${l.onclick}`));
    
    await browser.close();
    
    console.log('\n' + '='.repeat(50));
    console.log(allPassed ? '✅ All tests passed!' : '❌ Some tests failed');
    process.exit(allPassed ? 0 : 1);
})();
