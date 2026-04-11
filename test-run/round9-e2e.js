const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:3001';

async function runRound9Tests() {
    const browser = await chromium.launch({ headless: true });
    const results = {
        round: 9,
        name: '端到端测试',
        date: new Date().toISOString(),
        tests: [],
        passed: 0,
        failed: 0,
        warnings: 0
    };

    console.log('=== 第9轮测试：端到端测试 ===\n');
    console.log('验证完整业务流程\n');

    const pcContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const pcPage = await pcContext.newPage();

    // E2E-01: 客户管理完整流程
    console.log('测试 E2E-01: 客户管理完整流程');
    try {
        // Step 1: 访问客户列表
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/customer/customer-list.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        const hasList = await pcPage.locator('table').isVisible();
        const hasFilters = await pcPage.locator('input, select').count() > 0;

        // Step 2: 进入客户详情
        const firstRow = await pcPage.locator('tbody tr').first();
        await firstRow.click();
        await pcPage.waitForTimeout(500);

        const hasDetail = await pcPage.locator('text=/客户|姓名|电话/').count() > 0;

        results.tests.push({
            id: 'E2E-01',
            page: 'customer-list -> customer-detail',
            category: '端到端',
            issue: '客户管理列表到详情流程',
            status: hasList && hasDetail ? 'PASSED' : 'FAILED',
            details: `列表: ${hasList ? '有' : '无'}，详情: ${hasDetail ? '有' : '无'}`
        });

        if (hasList && hasDetail) results.passed++;
        else results.failed++;
    } catch (e) {
        results.tests.push({ id: 'E2E-01', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // E2E-02: 客户筛选到查看流程
    console.log('测试 E2E-02: 客户筛选到查看流程');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/customer/customer-list.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Apply high intent filter
        await pcPage.locator('select').nth(0).selectOption('high');
        await pcPage.waitForTimeout(300);

        // Search
        await pcPage.locator('button:has-text("搜索")').click();
        await pcPage.waitForTimeout(500);

        const rowsAfterFilter = await pcPage.locator('tbody tr').count();

        // Reset
        await pcPage.locator('button:has-text("重置")').click();
        await pcPage.waitForTimeout(500);

        const rowsAfterReset = await pcPage.locator('tbody tr').count();

        results.tests.push({
            id: 'E2E-02',
            page: 'customer-list.html',
            category: '端到端',
            issue: '筛选-搜索-重置流程',
            status: rowsAfterReset >= rowsAfterFilter ? 'PASSED' : 'WARNING',
            details: `筛选后: ${rowsAfterFilter}行，重置后: ${rowsAfterReset}行`
        });

        if (rowsAfterReset >= rowsAfterFilter) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'E2E-02', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // E2E-03: 录音管理完整流程
    console.log('测试 E2E-03: 录音管理完整流程');
    try {
        // Step 1: 访问录音列表
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/record/record-list.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        const hasRecordList = await pcPage.locator('table, [class*="list"]').count() > 0;

        // Step 2: 进入录音详情
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/record/record-detail.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        const hasRecordDetail = await pcPage.locator('text=/录音|评分|分析/').count() > 0;

        results.tests.push({
            id: 'E2E-03',
            page: 'record-list -> record-detail',
            category: '端到端',
            issue: '录音管理流程',
            status: hasRecordList && hasRecordDetail ? 'PASSED' : 'WARNING',
            details: `列表: ${hasRecordList ? '有' : '无'}，详情: ${hasRecordDetail ? '有' : '无'}`
        });

        if (hasRecordList && hasRecordDetail) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'E2E-03', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // E2E-04: 任务管理完整流程
    console.log('测试 E2E-04: 任务管理完整流程');
    try {
        // Step 1: 任务列表
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/task/task-list.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        const hasTaskList = await pcPage.locator('table, [class*="task"]').count() > 0;

        // Step 2: 任务审核
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/audit/task-audit.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        const hasAudit = await pcPage.locator('text=/审核|通过|驳回/').count() > 0;

        results.tests.push({
            id: 'E2E-04',
            page: 'task-list -> task-audit',
            category: '端到端',
            issue: '任务管理流程',
            status: hasTaskList && hasAudit ? 'PASSED' : 'WARNING',
            details: `任务列表: ${hasTaskList ? '有' : '无'}，审核页: ${hasAudit ? '有' : '无'}`
        });

        if (hasTaskList && hasAudit) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'E2E-04', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // E2E-05: 语音数据分析流程
    console.log('测试 E2E-05: 语音数据分析流程');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/speech/speech-data.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Check data is displayed
        const hasData = await pcPage.locator('[class*="score"], [class*="chart"], .text-3xl').count() > 0;
        const hasTabs = await pcPage.locator('[class*="tab"]').count() > 0;

        results.tests.push({
            id: 'E2E-05',
            page: 'speech-data.html',
            category: '端到端',
            issue: '语音数据分析完整展示',
            status: hasData ? 'PASSED' : 'WARNING',
            details: `数据: ${hasData ? '有' : '无'}，Tab: ${hasTabs ? '有' : '无'}`
        });

        if (hasData) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'E2E-05', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // E2E-06: 批量转移流程
    console.log('测试 E2E-06: 批量转移流程');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/customer/customer-list.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Select customers
        const checkboxes = await pcPage.locator('tbody input[type="checkbox"]');
        if (await checkboxes.count() > 0) {
            await checkboxes.first().check();
            await pcPage.waitForTimeout(200);
        }

        // Open transfer modal
        await pcPage.locator('button:has-text("批量转移")').click();
        await pcPage.waitForTimeout(500);

        const modalOpen = await pcPage.locator('text=/转移|目标经纪人|选择/').count() > 0;

        // Close modal
        await pcPage.keyboard.press('Escape');
        await pcPage.waitForTimeout(300);

        results.tests.push({
            id: 'E2E-06',
            page: 'customer-list.html',
            category: '端到端',
            issue: '批量转移操作流程',
            status: modalOpen ? 'PASSED' : 'WARNING',
            details: `转移弹窗: ${modalOpen ? '打开' : '未打开'}`
        });

        if (modalOpen) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'E2E-06', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // E2E-07: 添加跟进流程
    console.log('测试 E2E-07: 添加跟进流程');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/customer/customer-detail.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Click 添加跟进
        const followBtn = await pcPage.locator('button:has-text("添加跟进"), button:has-text("新建跟进")').first();
        await followBtn.click();
        await pcPage.waitForTimeout(500);

        // Check if modal/form opened
        const modalOpen = await pcPage.locator('text=/跟进方式|跟进内容|保存/').count() > 0;

        results.tests.push({
            id: 'E2E-07',
            page: 'customer-detail.html',
            category: '端到端',
            issue: '添加跟进流程',
            status: modalOpen ? 'PASSED' : 'WARNING',
            details: `跟进表单: ${modalOpen ? '打开' : '未打开'}`
        });

        if (modalOpen) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'E2E-07', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // ========== 小程序端E2E测试 ==========
    const wxContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const wxPage = await wxContext.newPage();

    // E2E-08: 小程序客户浏览流程
    console.log('测试 E2E-08: 小程序客户浏览流程');
    try {
        // Step 1: 客户列表
        await wxPage.goto(`${BASE_URL}/wxapp/pages/v2/profile/customer-list.html`, { waitUntil: 'networkidle' });
        await wxPage.waitForTimeout(500);

        const hasCustomerList = await wxPage.locator('[class*="list"], [class*="card"], text=/客户/').count() > 0;

        // Step 2: 客户详情
        await wxPage.goto(`${BASE_URL}/wxapp/pages/v2/profile/customer-detail.html`, { waitUntil: 'networkidle' });
        await wxPage.waitForTimeout(500);

        const hasCustomerDetail = await wxPage.locator('text=/客户|姓名|电话/').count() > 0;

        results.tests.push({
            id: 'E2E-08',
            page: 'customer-list -> customer-detail (wxapp)',
            category: '端到端',
            issue: '小程序客户浏览流程',
            status: hasCustomerList && hasCustomerDetail ? 'PASSED' : 'WARNING',
            details: `列表: ${hasCustomerList ? '有' : '无'}，详情: ${hasCustomerDetail ? '有' : '无'}`
        });

        if (hasCustomerList && hasCustomerDetail) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'E2E-08', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // E2E-09: 小程序物料中心浏览
    console.log('测试 E2E-09: 小程序物料中心浏览');
    try {
        await wxPage.goto(`${BASE_URL}/wxapp/pages/v2/home/material-center.html`, { waitUntil: 'networkidle' });
        await wxPage.waitForTimeout(500);

        const hasMaterialCenter = await wxPage.locator('text=/物料|海报|素材/').count() > 0;
        const hasTabs = await wxPage.locator('[class*="tab"], .flex.gap-').count() > 0;

        results.tests.push({
            id: 'E2E-09',
            page: 'material-center.html (wxapp)',
            category: '端到端',
            issue: '物料中心浏览',
            status: hasMaterialCenter || hasTabs ? 'PASSED' : 'WARNING',
            details: `物料内容: ${hasMaterialCenter ? '有' : '无'}，分类: ${hasTabs ? '有' : '无'}`
        });

        if (hasMaterialCenter || hasTabs) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'E2E-09', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // E2E-10: 小程序录音上传流程
    console.log('测试 E2E-10: 小程序录音上传流程');
    try {
        await wxPage.goto(`${BASE_URL}/wxapp/pages/v2/profile/record-upload.html`, { waitUntil: 'networkidle' });
        await wxPage.waitForTimeout(500);

        // Check upload form elements
        const hasUpload = await wxPage.locator('input[type="file"], [class*="upload"]').count() > 0;
        const hasCustomerSelect = await wxPage.locator('text=/客户/').count() > 0;
        const hasSubmit = await wxPage.locator('button:has-text("提交"), button:has-text("上传")').count() > 0;

        results.tests.push({
            id: 'E2E-10',
            page: 'record-upload.html (wxapp)',
            category: '端到端',
            issue: '录音上传完整表单',
            status: hasUpload || (hasCustomerSelect && hasSubmit) ? 'PASSED' : 'WARNING',
            details: `上传区: ${hasUpload ? '有' : '无'}，客户选择: ${hasCustomerSelect ? '有' : '无'}，提交: ${hasSubmit ? '有' : '无'}`
        });

        if (hasUpload || (hasCustomerSelect && hasSubmit)) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'E2E-10', status: 'ERROR', error: e.message });
        results.failed++;
    }

    await pcContext.close();
    await wxContext.close();
    await browser.close();

    return results;
}

module.exports = { runRound9Tests };
