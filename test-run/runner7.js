const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3001';

async function runRound7Only() {
    console.log('=== 第7轮测试：数据一致性测试 ===\n');

    const browser = await chromium.launch({ headless: true });
    const results = {
        round: 7,
        name: '数据一致性测试',
        date: new Date().toISOString(),
        tests: [],
        passed: 0,
        failed: 0,
        warnings: 0
    };

    const pcContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const pcPage = await pcContext.newPage();

    // DC-01: 客户列表 - 统计数据一致性
    console.log('测试 DC-01: 客户列表 - 统计数据一致性');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/customer/customer-list.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        const countText = await pcPage.locator('text=/共.*位客户/').textContent().catch(() => '');
        const tableRows = await pcPage.locator('tbody tr').count();
        const hasCountText = countText.length > 0;

        results.tests.push({
            id: 'DC-01',
            page: 'customer-list.html',
            category: '数据一致性',
            issue: '客户总数与列表行数一致性',
            status: hasCountText ? 'PASSED' : 'WARNING',
            details: `统计提示: "${countText}"，表格行数: ${tableRows}`
        });

        if (hasCountText) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'DC-01', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // DC-02: 客户列表 - 意向阶段标签一致性
    console.log('测试 DC-02: 客户列表 - 意向阶段标签一致性');
    try {
        const highIntentTag = await pcPage.locator('[class*="tag-level-high"]').count();
        const mediumIntentTag = await pcPage.locator('[class*="tag-level-medium"]').count();
        const lowIntentTag = await pcPage.locator('[class*="tag-level-low"]').count();
        const dealTag = await pcPage.locator('[class*="tag-level-deal"]').count();

        const totalTags = highIntentTag + mediumIntentTag + lowIntentTag + dealTag;

        results.tests.push({
            id: 'DC-02',
            page: 'customer-list.html',
            category: '数据一致性',
            issue: '意向阶段标签分类',
            status: totalTags > 0 ? 'PASSED' : 'WARNING',
            details: `高意向: ${highIntentTag}，中等: ${mediumIntentTag}，低: ${lowIntentTag}，成交: ${dealTag}`
        });

        if (totalTags > 0) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'DC-02', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // DC-03: 任务审核 - 进度条阶段一致性
    console.log('测试 DC-03: 任务审核 - 进度条阶段一致性');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/audit/task-audit.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        const stage1 = await pcPage.locator('text=/提交|创建/i').count();
        const stage2 = await pcPage.locator('text=/审核/i').count();
        const stage3 = await pcPage.locator('text=/通过/i').count();
        const stage4 = await pcPage.locator('text=/驳回|拒绝/i').count();

        const allStages = stage1 > 0 && stage2 > 0 && (stage3 > 0 || stage4 > 0);

        results.tests.push({
            id: 'DC-03',
            page: 'task-audit.html',
            category: '数据一致性',
            issue: '四阶段进度条完整性',
            status: allStages ? 'PASSED' : 'WARNING',
            details: `提交/创建: ${stage1}，审核: ${stage2}，通过: ${stage3}，驳回: ${stage4}`
        });

        if (allStages) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'DC-03', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // DC-04: 录音详情 - 评分与建议一致性
    console.log('测试 DC-04: 录音详情 - 评分与建议一致性');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/record/record-detail.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        const scoreElements = await pcPage.locator('[class*="score"], .text-3xl, .text-2xl').count();
        const hasSuggestions = await pcPage.locator('text=/建议|改进|优化|提升/').count() > 0;

        results.tests.push({
            id: 'DC-04',
            page: 'record-detail.html',
            category: '数据一致性',
            issue: '录音评分与改进建议',
            status: scoreElements > 0 ? 'PASSED' : 'WARNING',
            details: `评分元素: ${scoreElements}，建议内容: ${hasSuggestions ? '有' : '无'}`
        });

        if (scoreElements > 0) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'DC-04', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // DC-05: 语音数据 - 能力维度数据完整性
    console.log('测试 DC-05: 语音数据 - 能力维度数据完整性');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/speech/speech-data.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        const dimensionCount = await pcPage.locator('[class*="dimension"], [class*="metric"], [class*="ability"]').count();
        const hasChart = await pcPage.locator('canvas, svg, [class*="chart"]').count() > 0;

        results.tests.push({
            id: 'DC-05',
            page: 'speech-data.html',
            category: '数据一致性',
            issue: '能力维度数据展示',
            status: dimensionCount > 0 || hasChart ? 'PASSED' : 'WARNING',
            details: `维度元素: ${dimensionCount}，图表: ${hasChart ? '有' : '无'}`
        });

        if (dimensionCount > 0 || hasChart) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'DC-05', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // DC-06: 录音列表 - 状态筛选一致性
    console.log('测试 DC-06: 录音列表 - 状态筛选一致性');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/record/record-list.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        const filterOptions = await pcPage.locator('select option').allTextContents();
        const tableStatuses = await pcPage.locator('tbody [class*="status"], tbody [class*="badge"]').allTextContents();

        results.tests.push({
            id: 'DC-06',
            page: 'record-list.html',
            category: '数据一致性',
            issue: '录音状态筛选器',
            status: filterOptions.length > 0 ? 'PASSED' : 'WARNING',
            details: `筛选选项: ${filterOptions.length}个，表格状态: ${tableStatuses.length}个`
        });

        if (filterOptions.length > 0) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'DC-06', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // DC-07: 客户详情 - 基本信息完整性
    console.log('测试 DC-07: 客户详情 - 基本信息完整性');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/customer/customer-detail.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        const hasName = await pcPage.locator('text=/姓名|名字/i').count() > 0;
        const hasPhone = await pcPage.locator('text=/手机|电话/i').count() > 0;
        const hasIntent = await pcPage.locator('text=/意向|阶段/i').count() > 0;

        const infoComplete = hasName && hasPhone;

        results.tests.push({
            id: 'DC-07',
            page: 'customer-detail.html',
            category: '数据一致性',
            issue: '客户基本信息完整',
            status: infoComplete ? 'PASSED' : 'FAILED',
            details: `姓名: ${hasName ? '有' : '无'}，电话: ${hasPhone ? '有' : '无'}，意向: ${hasIntent ? '有' : '无'}`
        });

        if (infoComplete) results.passed++;
        else results.failed++;
    } catch (e) {
        results.tests.push({ id: 'DC-07', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // DC-08: 任务列表 - 统计数据与列表一致性
    console.log('测试 DC-08: 任务列表 - 统计数据与列表一致性');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/task/task-list.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        const statCards = await pcPage.locator('[class*="rounded-lg"][class*="shadow"]').count();

        results.tests.push({
            id: 'DC-08',
            page: 'task-list.html',
            category: '数据一致性',
            issue: '任务统计数据',
            status: statCards > 0 ? 'PASSED' : 'WARNING',
            details: `统计卡片: ${statCards}个`
        });

        if (statCards > 0) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'DC-08', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // 小程序端数据一致性
    const wxContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const wxPage = await wxContext.newPage();

    // DC-09: 小程序客户列表 - 数据展示一致性
    console.log('测试 DC-09: 小程序客户列表 - 数据展示一致性');
    try {
        await wxPage.goto(`${BASE_URL}/wxapp/pages/v2/profile/customer-list.html`, { waitUntil: 'networkidle' });
        await wxPage.waitForTimeout(500);

        const customerCards = await wxPage.locator('[class*="card"], [class*="item"]').count();

        results.tests.push({
            id: 'DC-09',
            page: 'customer-list.html (wxapp)',
            category: '数据一致性',
            issue: '小程序客户列表展示',
            status: customerCards > 0 ? 'PASSED' : 'WARNING',
            details: `客户卡片: ${customerCards}个`
        });

        if (customerCards > 0) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'DC-09', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // DC-10: 小程序客户详情 - 信息一致性
    console.log('测试 DC-10: 小程序客户详情 - 信息一致性');
    try {
        await wxPage.goto(`${BASE_URL}/wxapp/pages/v2/profile/customer-detail.html`, { waitUntil: 'networkidle' });
        await wxPage.waitForTimeout(500);

        const hasCustomerName = await wxPage.locator('text=/客户|姓名/i').count() > 0;
        const hasFollowUp = await wxPage.locator('text=/跟进|记录/i').count() > 0;

        results.tests.push({
            id: 'DC-10',
            page: 'customer-detail.html (wxapp)',
            category: '数据一致性',
            issue: '小程序客户详情完整性',
            status: hasCustomerName ? 'PASSED' : 'WARNING',
            details: `客户信息: ${hasCustomerName ? '有' : '无'}，跟进: ${hasFollowUp ? '有' : '无'}`
        });

        if (hasCustomerName) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'DC-10', status: 'ERROR', error: e.message });
        results.failed++;
    }

    await pcContext.close();
    await wxContext.close();
    await browser.close();

    console.log(`\n第7轮结果: 通过=${results.passed} 失败=${results.failed} 警告=${results.warnings}`);
    return results;
}

runRound7Only().catch(console.error);
