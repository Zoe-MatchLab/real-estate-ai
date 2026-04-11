const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:3001';

async function runRound6Tests() {
    const browser = await chromium.launch({ headless: true });
    const results = {
        round: 6,
        name: '功能深度测试',
        date: new Date().toISOString(),
        tests: [],
        passed: 0,
        failed: 0,
        warnings: 0
    };

    console.log('=== 第6轮测试：功能深度测试 ===\n');
    console.log('验证核心功能链路完整性\n');

    // ========== PC端功能深度测试 ==========
    const pcContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const pcPage = await pcContext.newPage();

    // FD-01: 客户列表 - 筛选功能链路
    console.log('测试 FD-01: 客户列表 - 筛选功能链路');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/customer/customer-list.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Select 高意向 filter
        const intentSelect = await pcPage.locator('select').nth(0);
        await intentSelect.selectOption('high');
        await pcPage.waitForTimeout(300);

        // Click search button
        await pcPage.locator('button:has-text("搜索")').click();
        await pcPage.waitForTimeout(500);

        // Check if filter applied - look for filtered results
        const tableRows = await pcPage.locator('tbody tr').count();

        results.tests.push({
            id: 'FD-01',
            page: 'customer-list.html',
            category: '功能链路',
            issue: '客户列表筛选功能',
            status: tableRows > 0 ? 'PASSED' : 'FAILED',
            details: `筛选后表格行数: ${tableRows}`
        });

        if (tableRows > 0) results.passed++;
        else results.failed++;
    } catch (e) {
        results.tests.push({ id: 'FD-01', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // FD-02: 客户列表 - 重置功能
    console.log('测试 FD-02: 客户列表 - 重置功能');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/customer/customer-list.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Fill search input
        const searchInput = await pcPage.locator('input[type="text"]').first();
        await searchInput.fill('测试客户');
        await pcPage.waitForTimeout(200);

        // Click reset button
        await pcPage.locator('button:has-text("重置")').click();
        await pcPage.waitForTimeout(500);

        // Check if input is cleared
        const inputValue = await searchInput.inputValue();

        results.tests.push({
            id: 'FD-02',
            page: 'customer-list.html',
            category: '功能链路',
            issue: '重置按钮清空筛选',
            status: inputValue === '' ? 'PASSED' : 'FAILED',
            details: inputValue === '' ? '输入框已清空' : `输入框仍为: ${inputValue}`
        });

        if (inputValue === '') results.passed++;
        else results.failed++;
    } catch (e) {
        results.tests.push({ id: 'FD-02', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // FD-03: 客户详情 - 跟进记录加载
    console.log('测试 FD-03: 客户详情 - 跟进记录加载');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/customer/customer-detail.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Check if follow-up section exists
        const followSection = await pcPage.locator('text=/跟进|跟进记录|跟进历史/').first().isVisible().catch(() => false);
        const followItems = await pcPage.locator('[class*="timeline"], [class*="follow"], [class*="record"]').count();

        results.tests.push({
            id: 'FD-03',
            page: 'customer-detail.html',
            category: '功能链路',
            issue: '客户详情跟进记录',
            status: followSection || followItems > 0 ? 'PASSED' : 'WARNING',
            details: `找到${followItems}个跟进相关元素，跟进区${followSection ? '可见' : '不可见'}`
        });

        if (followSection || followItems > 0) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'FD-03', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // FD-04: 任务列表 - 任务状态流转
    console.log('测试 FD-04: 任务列表 - 任务状态流转');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/task/task-list.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Check for task status badges
        const statusBadges = await pcPage.locator('[class*="status"], [class*="badge"], [class*="tag"]').count();
        const statusTexts = await pcPage.locator('text=/待提交|审核中|已通过|已驳回/').count();

        results.tests.push({
            id: 'FD-04',
            page: 'task-list.html',
            category: '功能链路',
            issue: '任务状态展示',
            status: statusTexts > 0 ? 'PASSED' : 'WARNING',
            details: `找到${statusTexts}个状态标签，${statusBadges}个状态元素`
        });

        if (statusTexts > 0) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'FD-04', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // FD-05: 录音列表 - 筛选与搜索
    console.log('测试 FD-05: 录音列表 - 筛选与搜索');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/record/record-list.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Check search functionality exists
        const hasSearch = await pcPage.locator('input[type="text"], input[placeholder*="搜索"]').count() > 0;
        const hasFilter = await pcPage.locator('select').count() > 0;

        results.tests.push({
            id: 'FD-05',
            page: 'record-list.html',
            category: '功能链路',
            issue: '录音列表筛选搜索',
            status: hasSearch && hasFilter ? 'PASSED' : 'WARNING',
            details: `搜索框: ${hasSearch ? '有' : '无'}，筛选器: ${hasFilter ? '有' : '无'}`
        });

        if (hasSearch && hasFilter) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'FD-05', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // FD-06: 任务审核 - 进度条展示
    console.log('测试 FD-06: 任务审核 - 进度条展示');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/audit/task-audit.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Check for progress bar
        const progressBar = await pcPage.locator('[class*="progress"], [class*="step"], .flex.items-center').count();
        const hasSteps = await pcPage.locator('text=/提交审核|审核中|已通过|已驳回/').count();

        results.tests.push({
            id: 'FD-06',
            page: 'task-audit.html',
            category: '功能链路',
            issue: '任务审核进度条',
            status: progressBar > 0 || hasSteps > 0 ? 'PASSED' : 'FAILED',
            details: `进度元素: ${progressBar}，步骤文字: ${hasSteps}`
        });

        if (progressBar > 0 || hasSteps > 0) results.passed++;
        else results.failed++;
    } catch (e) {
        results.tests.push({ id: 'FD-06', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // FD-07: 语音数据 - 雷达图展示
    console.log('测试 FD-07: 语音数据 - 雷达图展示');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/speech/speech-data.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Check for chart elements
        const hasChart = await pcPage.locator('canvas, svg, [class*="chart"], [class*="radar"]').count() > 0;
        const hasData = await pcPage.locator('[class*="score"], [class*="percent"], .text-3xl').count() > 0;

        results.tests.push({
            id: 'FD-07',
            page: 'speech-data.html',
            category: '功能链路',
            issue: '语音数据分析图表',
            status: hasChart || hasData ? 'PASSED' : 'WARNING',
            details: `图表: ${hasChart ? '有' : '无'}，数据: ${hasData ? '有' : '无'}`
        });

        if (hasChart || hasData) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'FD-07', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // FD-08: 录音详情 - 评分展示
    console.log('测试 FD-08: 录音详情 - 评分展示');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/record/record-detail.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Check for score/rating elements
        const hasScore = await pcPage.locator('[class*="score"], [class*="rating"], [class*="star"]').count() > 0;
        const scoreText = await pcPage.locator('text=/\\d+分|\\d+\\.\\d+/').first().textContent().catch(() => null);

        results.tests.push({
            id: 'FD-08',
            page: 'record-detail.html',
            category: '功能链路',
            issue: '录音详情评分展示',
            status: hasScore || scoreText ? 'PASSED' : 'WARNING',
            details: scoreText ? `评分: ${scoreText}` : '未找到评分元素'
        });

        if (hasScore || scoreText) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'FD-08', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // ========== 小程序端功能深度测试 ==========
    const wxContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const wxPage = await wxContext.newPage();

    // FD-09: 物料中心 - 分类切换
    console.log('测试 FD-09: 物料中心 - 分类切换');
    try {
        await wxPage.goto(`${BASE_URL}/wxapp/pages/v2/home/material-center.html`, { waitUntil: 'networkidle' });
        await wxPage.waitForTimeout(500);

        // Check for tab/category navigation
        const hasTabs = await wxPage.locator('[class*="tab"], scroll-view, .flex.gap-').count() > 0;
        const tabsCount = await wxPage.locator('[class*="tab"], .flex.gap- > div').count();

        results.tests.push({
            id: 'FD-09',
            page: 'material-center.html',
            category: '功能链路',
            issue: '物料中心分类切换',
            status: hasTabs ? 'PASSED' : 'WARNING',
            details: `分类元素: ${tabsCount}个`
        });

        if (hasTabs) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'FD-09', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // FD-10: 客户列表 - 小程序端搜索
    console.log('测试 FD-10: 客户列表 - 小程序端搜索');
    try {
        await wxPage.goto(`${BASE_URL}/wxapp/pages/v2/profile/customer-list.html`, { waitUntil: 'networkidle' });
        await wxPage.waitForTimeout(500);

        // Check for search input
        const hasSearch = await wxPage.locator('input[type="text"], input[placeholder*="搜索"]').count() > 0;

        results.tests.push({
            id: 'FD-10',
            page: 'customer-list.html (wxapp)',
            category: '功能链路',
            issue: '小程序客户搜索',
            status: hasSearch ? 'PASSED' : 'FAILED',
            details: `搜索框: ${hasSearch ? '有' : '无'}`
        });

        if (hasSearch) results.passed++;
        else results.failed++;
    } catch (e) {
        results.tests.push({ id: 'FD-10', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // FD-11: 客户详情 - 小程序端拨打电话
    console.log('测试 FD-11: 客户详情 - 拨打电话功能');
    try {
        await wxPage.goto(`${BASE_URL}/wxapp/pages/v2/profile/customer-detail.html`, { waitUntil: 'networkidle' });
        await wxPage.waitForTimeout(500);

        // Check for phone call button
        const phoneBtn = await wxPage.locator('button:has-text("拨打"), button:has-text("电话"), [href*="tel"]').count();

        results.tests.push({
            id: 'FD-11',
            page: 'customer-detail.html (wxapp)',
            category: '功能链路',
            issue: '小程序拨打电话',
            status: phoneBtn > 0 ? 'PASSED' : 'WARNING',
            details: `电话按钮: ${phoneBtn}个`
        });

        if (phoneBtn > 0) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'FD-11', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // FD-12: 录音上传 - 文件选择
    console.log('测试 FD-12: 录音上传 - 文件选择功能');
    try {
        await wxPage.goto(`${BASE_URL}/wxapp/pages/v2/profile/record-upload.html`, { waitUntil: 'networkidle' });
        await wxPage.waitForTimeout(500);

        // Check for file input or upload area
        const hasUpload = await wxPage.locator('input[type="file"], [class*="upload"], [class*="upload"]').count() > 0;
        const uploadText = await wxPage.locator('text=/上传|选择文件|点击上传/').count();

        results.tests.push({
            id: 'FD-12',
            page: 'record-upload.html (wxapp)',
            category: '功能链路',
            issue: '录音上传功能',
            status: hasUpload || uploadText > 0 ? 'PASSED' : 'WARNING',
            details: `上传组件: ${hasUpload ? '有' : '无'}，上传提示: ${uploadText}处`
        });

        if (hasUpload || uploadText > 0) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'FD-12', status: 'ERROR', error: e.message });
        results.failed++;
    }

    await pcContext.close();
    await wxContext.close();
    await browser.close();

    return results;
}

module.exports = { runRound6Tests };
