const { chromium } = require('playwright');

const BASE_URL = 'https://zoe-matchlab.github.io/real-estate-ai/wxapp';

async function testInteractions() {
    console.log('🔍 开始详细交互测试...\n');

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 390, height: 844 }
    });
    const page = await context.newPage();

    // 设置超时
    page.setDefaultTimeout(10000);

    const results = [];

    // 测试 1: TabBar 导航
    console.log('📱 测试 TabBar 导航...');
    await page.goto(`${BASE_URL}/tools.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000); // 等待 CSS 加载

    const tabBarLinks = await page.$$eval('.tab-bar a', links => links.map(l => l.href)).catch(() => []);
    console.log(`   发现 ${tabBarLinks.length} 个 TabBar 链接`);
    if (tabBarLinks.length === 5) {
        console.log('   ✅ TabBar 结构正确 (5个标签)');
    } else {
        console.log(`   ⚠️ TabBar 结构异常 (期望5个，实际${tabBarLinks.length}个)`);
    }

    // 测试 2: Toast 函数
    console.log('\n📝 测试 Toast 函数...');
    await page.goto(`${BASE_URL}/calendar.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    const toastExists = await page.evaluate(() => typeof showToast === 'function').catch(() => false);
    console.log(`   showToast 函数: ${toastExists ? '✅ 存在' : '❌ 不存在'}`);

    // 测试 Toast 显示
    await page.evaluate(() => showToast('测试 Toast'));
    await page.waitForTimeout(500);
    const toastVisible = await page.$('.toast');
    console.log(`   Toast 显示: ${toastVisible ? '✅ 显示正常' : '❌ 显示异常'}`);

    // 测试 Toast 消失
    await page.waitForTimeout(2500);
    const toastGone = await page.$('.toast');
    console.log(`   Toast 消失: ${!toastGone ? '✅ 正常消失' : '⚠️ 未消失'}`);

    // 测试 3: 任务中心 Tab 切换
    console.log('\n📋 测试任务中心 Tab 切换...');
    await page.goto(`${BASE_URL}/calendar.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    const tabs = await page.$$('.tab-item');
    console.log(`   发现 ${tabs.length} 个 Tab`);

    for (let i = 0; i < Math.min(tabs.length, 5); i++) {
        await tabs[i].click();
        await page.waitForTimeout(300);
        const activeTab = await page.$('.tab-item.active');
        const activeText = await activeTab?.textContent();
        console.log(`   Tab ${i + 1} 点击: ${activeText ? '✅ ' + activeText.trim() : '⚠️ 无active状态'}`);
    }

    // 测试 4: 筛选 Chip
    console.log('\n🏷️ 测试筛选 Chip...');
    await page.waitForTimeout(500);
    const chips = await page.$$('.filter-chip');
    console.log(`   发现 ${chips.length} 个筛选 Chip`);

    for (const chip of chips.slice(0, 3)) {
        const text = await chip.textContent();
        await chip.click();
        await page.waitForTimeout(200);
        const isActive = await chip.evaluate(el => el.classList.contains('active'));
        console.log(`   Chip "${text?.trim()}": ${isActive ? '✅ 选中' : '⚠️ 未选中'}`);
    }

    // 测试 5: 数据看板时间切换
    console.log('\n📊 测试数据看板时间切换...');
    await page.goto(`${BASE_URL}/performance-board.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    const timeTabs = await page.$$('.time-tab');
    console.log(`   发现 ${timeTabs.length} 个时间 Tab`);

    for (const tab of timeTabs) {
        const text = await tab.textContent();
        await tab.click();
        await page.waitForTimeout(300);
        const isActive = await tab.evaluate(el => el.classList.contains('active'));
        const toastAfterClick = await page.$('.toast');
        console.log(`   时间 Tab "${text}": ${isActive ? '✅ 选中' : '⚠️ 未选中'} ${toastAfterClick ? '| Toast ✅' : ''}`);
    }

    // 测试 6: 打卡配置开关
    console.log('\n⚙️ 测试打卡配置开关...');
    await page.goto(`${BASE_URL}/checkin-config.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    const toggle = await page.$('.toggle-switch');
    if (toggle) {
        const isOn = await toggle.evaluate(el => el.classList.contains('active'));
        console.log(`   定位开关初始状态: ${isOn ? '✅ 开启' : '⚠️ 关闭'}`);

        await toggle.click();
        await page.waitForTimeout(200);
        const isOnAfter = await toggle.evaluate(el => el.classList.contains('active'));
        console.log(`   点击后状态: ${isOnAfter ? '✅ 开启' : '⚠️ 关闭'}`);
    } else {
        console.log('   ⚠️ 未找到开关');
    }

    // 测试 7: 进度条
    console.log('\n📈 测试进度条...');
    await page.goto(`${BASE_URL}/task-detail.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    const progressBars = await page.$$('.progress-bar');
    console.log(`   发现 ${progressBars.length} 个进度条`);

    for (const bar of progressBars) {
        const text = await bar.textContent();
        const width = await bar.$eval('.progress-fill', el => el.style.width || '0%');
        console.log(`   进度: ${width} - ${text?.trim().substring(0, 20)}...`);
    }

    // 测试 8: 个人中心入口
    console.log('\n👤 测试个人中心入口...');
    await page.goto(`${BASE_URL}/profile.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    const menuItems = await page.$$('.menu-item');
    console.log(`   发现 ${menuItems.length} 个菜单项`);

    for (const item of menuItems.slice(0, 4)) {
        const text = await item.textContent();
        console.log(`   菜单: ${text?.trim().substring(0, 15).padEnd(15)}`);
    }

    // 测试 9: 漏斗图
    console.log('\n� Funnel 测试数据看板漏斗图...');
    await page.goto(`${BASE_URL}/performance-board.html`, { waitUntil: 'networkidle' });

    const funnelItems = await page.$$('.funnel-item');
    console.log(`   发现 ${funnelItems.length} 个漏斗项`);

    for (const item of funnelItems) {
        const label = await item.$eval('.funnel-label', el => el.textContent);
        const rate = await item.$eval('.funnel-rate', el => el.textContent);
        console.log(`   ${label}: ${rate}`);
    }

    // 测试 10: KPI 卡片点击
    console.log('\n📊 测试 KPI 卡片点击...');
    await page.goto(`${BASE_URL}/performance-board.html`, { waitUntil: 'networkidle' });

    const kpiCards = await page.$$('.kpi-card');
    console.log(`   发现 ${kpiCards.length} 个 KPI 卡片`);

    if (kpiCards.length > 0) {
        await kpiCards[0].click();
        await page.waitForTimeout(500);
        const toast = await page.$('.toast');
        console.log(`   KPI 卡片点击: ${toast ? '✅ Toast 显示' : '⚠️ Toast 未显示'}`);
    }

    await browser.close();

    console.log('\n' + '='.repeat(60));
    console.log('✅ 交互测试完成');
    console.log('='.repeat(60));
}

testInteractions().catch(console.error);
