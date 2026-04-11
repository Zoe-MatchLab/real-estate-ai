const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:3001';

async function runRound2Tests() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    
    const results = {
        round: 2,
        name: '回归测试',
        date: new Date().toISOString(),
        issues_tested: [],
        tests: [],
        passed: 0,
        failed: 0,
        warnings: 0
    };

    // Collect console errors
    const consoleErrors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
        }
    });

    console.log('=== 第2轮测试：回归测试 ===\n');

    // P1-01: 客户管理列表 - 批量转移弹窗目标经纪人默认值问题
    console.log('测试 P1-01: 客户管理列表 - 批量转移弹窗默认值');
    try {
        await page.goto(`${BASE_URL}/pc/pages/v2/customer/customer-list.html`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);
        
        // Click 批量转移 button
        const transferBtn = await page.locator('button:has-text("批量转移")');
        await transferBtn.click();
        await page.waitForTimeout(500);
        
        // Check if modal is visible
        const modal = await page.locator('.fixed.inset-0');
        const isModalVisible = await modal.isVisible();
        
        // Check target agent dropdown
        const targetAgentSelect = await page.locator('select').first();
        const currentOption = await targetAgentSelect.inputValue();
        
        // Check if "陈佳佳" is default (P1-01 issue)
        const hasIssue = currentOption === '陈佳佳' || currentOption === '';
        
        results.tests.push({
            id: 'P1-01',
            page: 'customer-list.html',
            issue: '批量转移弹窗目标经纪人默认值错误',
            status: hasIssue ? 'FAILED' : 'PASSED',
            details: hasIssue ? 
                `默认值仍为"陈佳佳"，与自己转移给自己问题仍存在` : 
                '默认值已修复，不再是自己'
        });
        
        if (hasIssue) results.failed++;
        else results.passed++;
        
        // Close modal
        await page.keyboard.press('Escape');
    } catch (e) {
        results.tests.push({ id: 'P1-01', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // P1-02: 客户详情 - 添加跟进弹窗空内容保存问题
    console.log('测试 P1-02: 客户详情 - 添加跟进空内容保存');
    try {
        await page.goto(`${BASE_URL}/pc/pages/v2/customer/customer-detail.html`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);
        
        // Click 添加跟进 button
        const followBtn = await page.locator('button:has-text("添加跟进")').first();
        await followBtn.click();
        await page.waitForTimeout(500);
        
        // Check if modal is visible
        const modal = await page.locator('.fixed.inset-0');
        const isModalVisible = await modal.isVisible();
        
        // Try to save without content
        const saveBtn = await page.locator('button:has-text("保存")').first();
        await saveBtn.click();
        await page.waitForTimeout(500);
        
        // Check if modal is still visible after empty save attempt
        const modalStillVisible = await modal.isVisible();
        
        // Issue exists if modal closed after empty save
        const hasIssue = !modalStillVisible;
        
        results.tests.push({
            id: 'P1-02',
            page: 'customer-detail.html',
            issue: '添加跟进弹窗空内容保存后弹窗关闭',
            status: hasIssue ? 'FAILED' : 'PASSED',
            details: hasIssue ? 
                '空内容保存后弹窗仍关闭，问题未修复' : 
                '空内容保存被正确阻止，弹窗保持打开'
        });
        
        if (hasIssue) results.failed++;
        else results.passed++;
        
        // Close modal
        await page.keyboard.press('Escape');
    } catch (e) {
        results.tests.push({ id: 'P1-02', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // P2-01: 探盘任务列表 - 重置按钮功能
    console.log('测试 P2-01: 探盘任务列表 - 重置按钮');
    try {
        await page.goto(`${BASE_URL}/pc/pages/v2/task/task-list.html`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);
        
        // Enter search text
        const searchInput = await page.locator('input[placeholder*="楼盘"]').first();
        await searchInput.fill('测试楼盘');
        await page.waitForTimeout(300);
        
        // Click reset button
        const resetBtn = await page.locator('button:has-text("重置")');
        await resetBtn.click();
        await page.waitForTimeout(500);
        
        // Check if input was cleared
        const inputValue = await searchInput.inputValue();
        const isCleared = inputValue === '';
        
        results.tests.push({
            id: 'P2-01',
            page: 'task-list.html',
            issue: '重置按钮未清空筛选栏',
            status: isCleared ? 'PASSED' : 'FAILED',
            details: isCleared ? 
                '重置按钮已正确清空输入内容' : 
                `重置后输入框仍为"${inputValue}"，未清空`
        });
        
        if (isCleared) results.passed++;
        else results.failed++;
    } catch (e) {
        results.tests.push({ id: 'P2-01', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // P2-02: 录音分析列表 - 重置按钮功能
    console.log('测试 P2-02: 录音分析列表 - 重置按钮');
    try {
        await page.goto(`${BASE_URL}/pc/pages/v2/record/record-list.html`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);
        
        // Find and fill search input
        const searchInput = await page.locator('input[type="text"], input[placeholder]').first();
        await searchInput.fill('测试搜索');
        await page.waitForTimeout(300);
        
        // Click reset button
        const resetBtn = await page.locator('button:has-text("重置")');
        await resetBtn.click();
        await page.waitForTimeout(500);
        
        // Check if input was cleared
        const inputValue = await searchInput.inputValue();
        const isCleared = inputValue === '';
        
        results.tests.push({
            id: 'P2-02',
            page: 'record-list.html',
            issue: '重置按钮未清空表单',
            status: isCleared ? 'PASSED' : 'FAILED',
            details: isCleared ? 
                '重置按钮已正确清空表单内容' : 
                `重置后输入框仍为"${inputValue}"，未清空`
        });
        
        if (isCleared) results.passed++;
        else results.failed++;
    } catch (e) {
        results.tests.push({ id: 'P2-02', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // P2-03: 训练数据中心 - Drill-Down硬编码数据
    console.log('测试 P2-03: 训练数据中心 - Drill-Down数据');
    try {
        await page.goto(`${BASE_URL}/pc/pages/v2/speech/speech-data.html`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);
        
        // Check if drill-down panel shows hardcoded data
        const cityExpertCard = await page.locator('text=全城专家').first();
        await cityExpertCard.click();
        await page.waitForTimeout(500);
        
        // Count the number of members shown
        const memberRows = await page.locator('.drill-down-panel tbody tr, .drill-down-content tr').count();
        
        // Hardcoded issue if only 3 rows
        const hasIssue = memberRows > 0 && memberRows <= 3;
        
        results.tests.push({
            id: 'P2-03',
            page: 'speech-data.html',
            issue: 'Drill-Down面板硬编码mock数据',
            status: hasIssue ? 'FAILED' : 'PASSED',
            details: hasIssue ? 
                `Drill-Down仅显示${memberRows}条数据，仍为硬编码mock` : 
                `Drill-Down显示${memberRows}条数据，数据已替换为真实接口`
        });
        
        if (hasIssue) results.failed++;
        else results.passed++;
    } catch (e) {
        results.tests.push({ id: 'P2-03', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // P2-04: 录音分析详情 - 原音/转写按钮无响应
    console.log('测试 P2-04: 录音分析详情 - 原音/转写按钮');
    try {
        await page.goto(`${BASE_URL}/pc/pages/v2/record/record-detail.html`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);
        
        // Click 原音 button
        const originalBtn = await page.locator('button:has-text("原音")');
        let originalHasAction = false;
        
        // Listen for any changes after clicking
        const dialogPromise = page.waitForEvent('dialog', { timeout: 2000 }).catch(() => null);
        await originalBtn.click();
        const dialog = await dialogPromise;
        originalHasAction = dialog !== null;
        
        // Click 转写 button
        const transcriptBtn = await page.locator('button:has-text("转写")');
        let transcriptHasAction = false;
        
        const dialogPromise2 = page.waitForEvent('dialog', { timeout: 2000 }).catch(() => null);
        await transcriptBtn.click();
        const dialog2 = await dialogPromise2;
        transcriptHasAction = dialog2 !== null;
        
        const hasIssue = !originalHasAction && !transcriptHasAction;
        
        results.tests.push({
            id: 'P2-04',
            page: 'record-detail.html',
            issue: '原音和转写按钮无功能响应',
            status: hasIssue ? 'FAILED' : 'PASSED',
            details: hasIssue ? 
                '原音和转写按钮仍无功能实现' : 
                '原音/转写按钮已有功能响应'
        });
        
        if (hasIssue) results.failed++;
        else results.passed++;
    } catch (e) {
        results.tests.push({ id: 'P2-04', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // P2-05: 物料中心 - 瀑布流卡片点击无响应
    console.log('测试 P2-05: 物料中心 - 瀑布流卡片点击');
    try {
        await page.setViewportSize({ width: 375, height: 812 }); // Mobile viewport
        await page.goto(`${BASE_URL}/wxapp/pages/v2/home/material-center.html`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);
        
        // Try to click on a material card
        const cards = await page.locator('.card, [class*="card"]').all();
        let hasClickHandler = false;
        
        if (cards.length > 0) {
            const firstCard = cards[0];
            const boundingBox = await firstCard.boundingBox();
            
            // Check if card has click event by looking for cursor style
            const cursor = await firstCard.evaluate(el => getComputedStyle(el).cursor);
            hasClickHandler = cursor === 'pointer';
        }
        
        results.tests.push({
            id: 'P2-05',
            page: 'material-center.html',
            issue: '瀑布流卡片点击无响应',
            status: hasClickHandler ? 'PASSED' : 'FAILED',
            details: hasClickHandler ? 
                '瀑布流卡片已添加点击处理器' : 
                '瀑布流卡片仍无点击处理器'
        });
        
        if (hasClickHandler) results.passed++;
        else results.failed++;
    } catch (e) {
        results.tests.push({ id: 'P2-05', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // P2-06: 客户列表 - 搜索框无实时筛选
    console.log('测试 P2-06: 客户列表 - 搜索框实时筛选');
    try {
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto(`${BASE_URL}/wxapp/pages/v2/profile/customer-list.html`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);
        
        // Find search input
        const searchInput = await page.locator('input[type="search"], input[placeholder*="搜索"]').first();
        await searchInput.fill('测试');
        await page.waitForTimeout(500);
        
        // Check if real-time filtering happened (cards should change)
        const cardCount = await page.locator('.card, .customer-card').count();
        
        // Check if there's an input event listener
        const hasInputListener = await searchInput.evaluate(el => {
            return el.hasOwnProperty('oninput') || 
                   el.addEventListener !== undefined; // We can't easily detect this without code inspection
        });
        
        results.tests.push({
            id: 'P2-06',
            page: 'customer-list.html (wxapp)',
            issue: '搜索框无实时筛选联动',
            status: 'WARNING',
            details: '无法完全通过UI验证搜索是否实时联动，需代码检查确认'
        });
        results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'P2-06', status: 'ERROR', error: e.message });
        results.failed++;
    }

    await browser.close();

    return results;
}

module.exports = { runRound2Tests };
