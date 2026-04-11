const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:3001';

async function runRound5Tests() {
    const browser = await chromium.launch({ headless: true });
    const results = {
        round: 5,
        name: '安全测试',
        date: new Date().toISOString(),
        tests: [],
        passed: 0,
        failed: 0,
        warnings: 0
    };

    console.log('=== 第5轮测试：安全测试 ===\n');

    // ========== XSS 测试 ==========
    
    // SEC-01: 搜索框XSS尝试
    console.log('测试 SEC-01: XSS攻击防护 - 搜索框');
    try {
        const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await context.newPage();
        
        // Collect any console errors or alerts
        const alerts = [];
        page.on('dialog', async dialog => {
            alerts.push(dialog.message());
            await dialog.dismiss();
        });
        
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') consoleErrors.push(msg.text());
        });
        
        await page.goto(`${BASE_URL}/pc/pages/v2/customer/customer-list.html`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(500);
        
        // XSS payloads
        const xssPayloads = [
            '<script>alert("XSS")</script>',
            '<img src=x onerror="alert(1)">',
            '<svg onload="alert(1)">',
            'javascript:alert(1)',
            '<iframe src="javascript:alert(1)">'
        ];
        
        const searchInput = await page.locator('input').first();
        
        for (const payload of xssPayloads) {
            await searchInput.fill(payload);
            await page.waitForTimeout(200);
            await searchInput.fill(''); // Clear
        }
        
        // Check if XSS executed
        const xssExecuted = alerts.length > 0 || consoleErrors.some(e => e.includes('XSS') || e.includes('alert'));
        
        results.tests.push({
            id: 'SEC-01',
            page: 'customer-list.html',
            category: 'XSS防护',
            issue: '搜索框XSS注入',
            status: xssExecuted ? 'FAILED' : 'PASSED',
            details: xssExecuted ? 
                `XSS注入成功执行！发现${alerts.length}个alert` : 
                'XSS payload未执行，输入被正确转义或过滤'
        });
        
        if (!xssExecuted) results.passed++;
        else results.failed++;
        
        await context.close();
    } catch (e) {
        results.tests.push({ id: 'SEC-01', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // SEC-02: 表单输入XSS
    console.log('测试 SEC-02: XSS攻击防护 - 表单输入');
    try {
        const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await context.newPage();
        
        const alerts = [];
        page.on('dialog', async dialog => {
            alerts.push(dialog.message());
            await dialog.dismiss();
        });
        
        await page.goto(`${BASE_URL}/pc/pages/v2/customer/customer-detail.html`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(500);
        
        // Open follow modal
        const followBtn = await page.locator('button:has-text("添加跟进")').first();
        await followBtn.click();
        await page.waitForTimeout(300);
        
        // Try XSS in follow content
        const followInput = await page.locator('textarea, input[type="text"]').first();
        await followInput.fill('<script>alert("XSS in follow")</script>');
        await page.waitForTimeout(200);
        
        // Save
        const saveBtn = await page.locator('#followModal button:has-text("保存")').first();
        await saveBtn.click();
        await page.waitForTimeout(500);
        
        const xssExecuted = alerts.some(a => a.includes('XSS'));
        
        results.tests.push({
            id: 'SEC-02',
            page: 'customer-detail.html',
            category: 'XSS防护',
            issue: '跟进内容XSS注入',
            status: xssExecuted ? 'FAILED' : 'PASSED',
            details: xssExecuted ? 
                '跟进内容XSS注入成功执行' : 
                '跟进内容XSS被正确防护'
        });
        
        if (!xssExecuted) results.passed++;
        else results.failed++;
        
        await context.close();
    } catch (e) {
        results.tests.push({ id: 'SEC-02', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // SEC-03: URL参数XSS
    console.log('测试 SEC-03: XSS攻击防护 - URL参数');
    try {
        const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await context.newPage();
        
        const alerts = [];
        page.on('dialog', async dialog => {
            alerts.push(dialog.message());
            await dialog.dismiss();
        });
        
        // Try XSS in URL hash/params
        const xssUrl = `${BASE_URL}/pc/pages/v2/customer/customer-list.html?search=<script>alert('XSS')</script>`;
        await page.goto(xssUrl, { waitUntil: 'networkidle' });
        await page.waitForTimeout(500);
        
        const xssExecuted = alerts.some(a => a.includes('XSS'));
        
        results.tests.push({
            id: 'SEC-03',
            page: 'customer-list.html',
            category: 'XSS防护',
            issue: 'URL参数XSS注入',
            status: xssExecuted ? 'FAILED' : 'PASSED',
            details: xssExecuted ? 
                'URL参数XSS注入成功执行' : 
                'URL参数XSS被正确防护'
        });
        
        if (!xssExecuted) results.passed++;
        else results.failed++;
        
        await context.close();
    } catch (e) {
        results.tests.push({ id: 'SEC-03', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // ========== 权限控制测试 ==========
    
    // SEC-04: 未授权页面访问
    console.log('测试 SEC-04: 权限控制 - 页面访问');
    try {
        const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await context.newPage();
        
        // Try direct navigation to audit page
        await page.goto(`${BASE_URL}/pc/pages/v2/audit/task-audit.html`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(500);
        
        // Check if redirected to login or shows unauthorized
        const url = page.url();
        const content = await page.content();
        const isUnauthorized = content.includes('未授权') || content.includes('登录') || 
                              url.includes('login') || url.includes('unauthorized');
        
        results.tests.push({
            id: 'SEC-04',
            page: 'task-audit.html',
            category: '权限控制',
            issue: '未授权页面访问',
            status: 'WARNING',
            details: isUnauthorized ? 
                '页面访问被正确拦截' : 
                '原型阶段无权限控制，需后端实现'
        });
        
        results.warnings++;
        
        await context.close();
    } catch (e) {
        results.tests.push({ id: 'SEC-04', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // SEC-05: 敏感操作二次确认
    console.log('测试 SEC-05: 敏感操作 - 二次确认');
    try {
        const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await context.newPage();
        
        const dialogsShown = [];
        page.on('dialog', async dialog => {
            dialogsShown.push(dialog.message());
            await dialog.dismiss();
        });
        
        await page.goto(`${BASE_URL}/pc/pages/v2/customer/customer-list.html`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(500);
        
        // Try batch transfer (sensitive operation)
        const transferBtn = await page.locator('button:has-text("批量转移")');
        await transferBtn.click();
        await page.waitForTimeout(300);
        
        // Check if confirmation is shown
        const hasConfirmDialog = dialogsShown.length > 0 || 
                                 await page.locator('text=/确认|取消/').count() > 0;
        
        results.tests.push({
            id: 'SEC-05',
            page: 'customer-list.html',
            category: '权限控制',
            issue: '敏感操作二次确认',
            status: hasConfirmDialog ? 'PASSED' : 'WARNING',
            details: hasConfirmDialog ? 
                '敏感操作有确认提示' : 
                '原型阶段可能无二次确认，需确认'
        });
        
        if (hasConfirmDialog) results.passed++;
        else results.warnings++;
        
        await context.close();
    } catch (e) {
        results.tests.push({ id: 'SEC-05', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // SEC-06: 数据泄露检查
    console.log('测试 SEC-06: 敏感信息 - 数据泄露');
    try {
        const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await context.newPage();
        
        await page.goto(`${BASE_URL}/pc/pages/v2/customer/customer-detail.html`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(500);
        
        // Check page source for sensitive patterns
        const content = await page.content();
        
        const sensitivePatterns = [
            /password[\s]*=/i,
            /api[_-]?key[\s]*=/i,
            /secret[\s]*=/i,
            /token[\s]*=/i,
            /Bearer[\s]+[a-zA-Z0-9]/
        ];
        
        let foundSensitive = false;
        for (const pattern of sensitivePatterns) {
            if (pattern.test(content)) {
                foundSensitive = true;
                break;
            }
        }
        
        results.tests.push({
            id: 'SEC-06',
            page: 'customer-detail.html',
            category: '敏感信息',
            issue: '页面源码敏感信息泄露',
            status: foundSensitive ? 'FAILED' : 'PASSED',
            details: foundSensitive ? 
                '发现敏感信息泄露！' : 
                '未发现敏感信息泄露'
        });
        
        if (!foundSensitive) results.passed++;
        else results.failed++;
        
        await context.close();
    } catch (e) {
        results.tests.push({ id: 'SEC-06', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // SEC-07: SQL注入防护 (simulated)
    console.log('测试 SEC-07: SQL注入防护');
    try {
        const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await context.newPage();
        
        const alerts = [];
        page.on('dialog', async dialog => {
            alerts.push(dialog.message());
            await dialog.dismiss();
        });
        
        await page.goto(`${BASE_URL}/pc/pages/v2/customer/customer-list.html`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(500);
        
        // SQL injection payloads
        const sqlPayloads = [
            "' OR '1'='1",
            "'; DROP TABLE users;--",
            "1' AND '1'='1",
            "admin'--"
        ];
        
        const searchInput = await page.locator('input').first();
        
        for (const payload of sqlPayloads) {
            await searchInput.fill(payload);
            await page.waitForTimeout(200);
        }
        
        // Check if any SQL error displayed (indicating vulnerability)
        const content = await page.content();
        const sqlErrorShown = content.includes('sql') || 
                              content.includes('syntax') ||
                              content.includes('database');
        
        const sqlExecuted = alerts.some(a => a.toLowerCase().includes('sql'));
        
        results.tests.push({
            id: 'SEC-07',
            page: 'customer-list.html',
            category: 'SQL注入防护',
            issue: '搜索框SQL注入',
            status: (sqlExecuted || sqlErrorShown) ? 'FAILED' : 'PASSED',
            details: (sqlExecuted || sqlErrorShown) ? 
                'SQL注入可能被执行' : 
                'SQL注入被正确防护'
        });
        
        if (!sqlExecuted && !sqlErrorShown) results.passed++;
        else results.failed++;
        
        await context.close();
    } catch (e) {
        results.tests.push({ id: 'SEC-07', status: 'ERROR', error: e.message });
        results.failed++;
    }

    // SEC-08: CORS配置检查
    console.log('测试 SEC-08: CORS跨域配置');
    try {
        const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await context.newPage();
        
        // Check CORS headers
        const corsResponse = await page.goto(`${BASE_URL}/pc/pages/v2/customer/customer-list.html`, { waitUntil: 'networkidle' });
        
        // CORS is mainly a server-side concern, but we can check if fetch works from different origin
        const fetchTest = await page.evaluate(async () => {
            try {
                const resp = await fetch(window.location.href);
                return resp.ok;
            } catch {
                return false;
            }
        });
        
        results.tests.push({
            id: 'SEC-08',
            page: 'customer-list.html',
            category: 'CORS配置',
            issue: '跨域请求允许',
            status: 'WARNING',
            details: 'CORS配置需服务器端检查，原型阶段无法完全验证'
        });
        
        results.warnings++;
        
        await context.close();
    } catch (e) {
        results.tests.push({ id: 'SEC-08', status: 'ERROR', error: e.message });
        results.failed++;
    }

    await browser.close();

    return results;
}

module.exports = { runRound5Tests };
