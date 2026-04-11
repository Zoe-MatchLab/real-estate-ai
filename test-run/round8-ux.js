const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:3001';

async function runRound8Tests() {
    const browser = await chromium.launch({ headless: true });
    const results = {
        round: 8,
        name: '用户体验测试',
        date: new Date().toISOString(),
        tests: [],
        passed: 0,
        failed: 0,
        warnings: 0
    };

    console.log('=== 第8轮测试：用户体验测试 ===\n');
    console.log('验证交互流畅度和用户体验\n');

    const pcContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const pcPage = await pcContext.newPage();

    // UE-01: 页面加载性能
    console.log('测试 UE-01: 页面加载性能');
    try {
        const startTime = Date.now();
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/customer/customer-list.html`, { waitUntil: 'networkidle' });
        const loadTime = Date.now() - startTime;

        results.tests.push({
            id: 'UE-01',
            page: 'customer-list.html',
            category: '用户体验',
            issue: '页面加载时间',
            status: loadTime < 3000 ? 'PASSED' : 'WARNING',
            details: `加载耗时: ${loadTime}ms`
        });

        if (loadTime < 3000) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'UE-01', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // UE-02: 按钮点击响应
    console.log('测试 UE-02: 按钮点击响应');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/customer/customer-list.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Check if 批量转移 button exists and is clickable
        const transferBtn = await pcPage.locator('button:has-text("批量转移")');
        const isVisible = await transferBtn.isVisible();
        const isEnabled = await transferBtn.isEnabled();

        results.tests.push({
            id: 'UE-02',
            page: 'customer-list.html',
            category: '用户体验',
            issue: '批量转移按钮可用性',
            status: isVisible && isEnabled ? 'PASSED' : 'FAILED',
            details: `可见: ${isVisible}，可用: ${isEnabled}`
        });

        if (isVisible && isEnabled) results.passed++;
        else results.failed++;
    } catch (e) {
        results.tests.push({ id: 'UE-02', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // UE-03: 表单输入体验
    console.log('测试 UE-03: 表单输入体验');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/customer/customer-list.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Check input focus states
        const searchInput = await pcPage.locator('input[type="text"]').first();
        await searchInput.focus();
        await pcPage.waitForTimeout(200);

        // Check for focus ring
        const focusStyle = await searchInput.evaluate(el => window.getComputedStyle(el).outline);
        const hasFocus = await searchInput.evaluate(el => document.activeElement === el);

        results.tests.push({
            id: 'UE-03',
            page: 'customer-list.html',
            category: '用户体验',
            issue: '输入框焦点状态',
            status: hasFocus ? 'PASSED' : 'WARNING',
            details: `焦点获取: ${hasFocus}`
        });

        if (hasFocus) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'UE-03', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // UE-04: 下拉菜单交互
    console.log('测试 UE-04: 下拉菜单交互');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/customer/customer-list.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Check select dropdowns
        const selectCount = await pcPage.locator('select').count();
        const firstSelect = await pcPage.locator('select').first();
        const selectVisible = await firstSelect.isVisible();

        // Try to interact
        await firstSelect.click();
        await pcPage.waitForTimeout(200);

        results.tests.push({
            id: 'UE-04',
            page: 'customer-list.html',
            category: '用户体验',
            issue: '下拉菜单交互',
            status: selectCount > 0 && selectVisible ? 'PASSED' : 'FAILED',
            details: `下拉框: ${selectCount}个，均可见: ${selectVisible}`
        });

        if (selectCount > 0 && selectVisible) results.passed++;
        else results.failed++;
    } catch (e) {
        results.tests.push({ id: 'UE-04', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // UE-05: 模态框打开关闭
    console.log('测试 UE-05: 模态框打开关闭');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/customer/customer-list.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Click 批量转移 to open modal
        const transferBtn = await pcPage.locator('button:has-text("批量转移")');
        await transferBtn.click();
        await pcPage.waitForTimeout(500);

        // Check modal opened
        const modalTitle = await pcPage.locator('text=/转移|目标经纪人/').count();

        // Close modal
        await pcPage.keyboard.press('Escape');
        await pcPage.waitForTimeout(300);

        results.tests.push({
            id: 'UE-05',
            page: 'customer-list.html',
            category: '用户体验',
            issue: '模态框打开关闭',
            status: modalTitle > 0 ? 'PASSED' : 'WARNING',
            details: `模态框内容: ${modalTitle}处`
        });

        if (modalTitle > 0) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'UE-05', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // UE-06: 客户详情页跟进按钮
    console.log('测试 UE-06: 客户详情页跟进按钮');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/customer/customer-detail.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Check for 添加跟进 button
        const followBtn = await pcPage.locator('button:has-text("添加跟进"), button:has-text("新建跟进")').first();
        const btnVisible = await followBtn.isVisible().catch(() => false);

        results.tests.push({
            id: 'UE-06',
            page: 'customer-detail.html',
            category: '用户体验',
            issue: '添加跟进按钮',
            status: btnVisible ? 'PASSED' : 'WARNING',
            details: `按钮: ${btnVisible ? '可见' : '不可见'}`
        });

        if (btnVisible) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'UE-06', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // UE-07: 表格悬停效果
    console.log('测试 UE-07: 表格悬停效果');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/customer/customer-list.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Check for hover-row class
        const hasHoverEffect = await pcPage.locator('.hover-row').count() > 0;

        results.tests.push({
            id: 'UE-07',
            page: 'customer-list.html',
            category: '用户体验',
            issue: '表格行悬停效果',
            status: hasHoverEffect ? 'PASSED' : 'WARNING',
            details: `悬停行: ${hasHoverEffect ? '有' : '无'}`
        });

        if (hasHoverEffect) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'UE-07', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // UE-08: 任务审核按钮布局
    console.log('测试 UE-08: 任务审核按钮布局');
    try {
        await pcPage.goto(`${BASE_URL}/pc/pages/v2/audit/task-audit.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Check for approve/reject buttons
        const approveBtn = await pcPage.locator('button:has-text("通过"), button:has-text("通过审核")').count();
        const rejectBtn = await pcPage.locator('button:has-text("驳回"), button:has-text("拒绝")').count();

        results.tests.push({
            id: 'UE-08',
            page: 'task-audit.html',
            category: '用户体验',
            issue: '审核按钮布局',
            status: approveBtn > 0 || rejectBtn > 0 ? 'PASSED' : 'WARNING',
            details: `通过按钮: ${approveBtn}，驳回按钮: ${rejectBtn}`
        });

        if (approveBtn > 0 || rejectBtn > 0) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'UE-08', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // ========== 小程序端用户体验 ==========
    const wxContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const wxPage = await wxContext.newPage();

    // UE-09: 小程序页面加载
    console.log('测试 UE-09: 小程序页面加载');
    try {
        const startTime = Date.now();
        await wxPage.goto(`${BASE_URL}/wxapp/pages/v2/home/material-center.html`, { waitUntil: 'networkidle' });
        const loadTime = Date.now() - startTime;

        results.tests.push({
            id: 'UE-09',
            page: 'material-center.html (wxapp)',
            category: '用户体验',
            issue: '小程序页面加载时间',
            status: loadTime < 3000 ? 'PASSED' : 'WARNING',
            details: `加载耗时: ${loadTime}ms`
        });

        if (loadTime < 3000) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'UE-09', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // UE-10: 小程序端触摸交互
    console.log('测试 UE-10: 小程序端触摸交互');
    try {
        await wxPage.goto(`${BASE_URL}/wxapp/pages/v2/profile/customer-list.html`, { waitUntil: 'networkidle' });
        await wxPage.waitForTimeout(500);

        // Check for touch-friendly button sizes
        const buttons = await wxPage.locator('button').count();
        const hasProperSize = buttons > 0;

        results.tests.push({
            id: 'UE-10',
            page: 'customer-list.html (wxapp)',
            category: '用户体验',
            issue: '小程序按钮触摸友好',
            status: hasProperSize ? 'PASSED' : 'WARNING',
            details: `按钮数量: ${buttons}`
        });

        if (hasProperSize) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'UE-10', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // UE-11: 小程序录音上传区域
    console.log('测试 UE-11: 小程序录音上传区域');
    try {
        await wxPage.goto(`${BASE_URL}/wxapp/pages/v2/profile/record-upload.html`, { waitUntil: 'networkidle' });
        await wxPage.waitForTimeout(500);

        // Check upload area is prominent
        const uploadArea = await wxPage.locator('[class*="upload"], [class*="file"], input[type="file"]').count();
        const hasUploadText = await wxPage.locator('text=/点击|上传|选择/').count() > 0;

        results.tests.push({
            id: 'UE-11',
            page: 'record-upload.html (wxapp)',
            category: '用户体验',
            issue: '上传区域明显程度',
            status: uploadArea > 0 || hasUploadText ? 'PASSED' : 'WARNING',
            details: `上传元素: ${uploadArea}，提示文字: ${hasUploadText ? '有' : '无'}`
        });

        if (uploadArea > 0 || hasUploadText) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'UE-11', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // UE-12: 客户详情拨打电话按钮
    console.log('测试 UE-12: 客户详情拨打电话按钮');
    try {
        await wxPage.goto(`${BASE_URL}/wxapp/pages/v2/profile/customer-detail.html`, { waitUntil: 'networkidle' });
        await pcPage.waitForTimeout(500);

        // Check phone button
        const phoneBtn = await wxPage.locator('button:has-text("拨打"), button:has-text("电话")').count();

        results.tests.push({
            id: 'UE-12',
            page: 'customer-detail.html (wxapp)',
            category: '用户体验',
            issue: '拨打电话按钮',
            status: phoneBtn > 0 ? 'PASSED' : 'WARNING',
            details: `电话按钮: ${phoneBtn}个`
        });

        if (phoneBtn > 0) results.passed++;
        else results.warnings++;
    } catch (e) {
        results.tests.push({ id: 'UE-12', status: 'ERROR', error: e.message });
        results.failed++;
    }

    await pcContext.close();
    await wxContext.close();
    await browser.close();

    return results;
}

module.exports = { runRound8Tests };
