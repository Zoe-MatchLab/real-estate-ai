const { chromium } = require('playwright');

const BASE_URL = 'https://zoe-matchlab.github.io/real-estate-ai/wxapp';

const pages = [
    { name: '首页', file: 'tools.html' },
    { name: 'AI设计', file: 'ai-design.html' },
    { name: 'Claw', file: 'claw.html' },
    { name: '任务中心', file: 'calendar.html' },
    { name: '新建任务', file: 'task-create.html' },
    { name: '任务详情', file: 'task-detail.html' },
    { name: '打卡配置', file: 'checkin-config.html' },
    { name: '定位打卡', file: 'checkin-location.html' },
    { name: '点位打卡', file: 'checkin-point.html' },
    { name: '确认文案', file: 'confirm-copywriter.html' },
    { name: '提交结果', file: 'submit-result.html' },
    { name: '话术训练', file: 'speech-train.html' },
    { name: '对话训练', file: 'train-dialog.html' },
    { name: '个人中心', file: 'profile.html' },
    { name: '物料库', file: 'material-library.html' },
    { name: '数据看板', file: 'performance-board.html' },
    { name: '算力明细', file: 'power-detail.html' },
    { name: '我的收藏', file: 'favorites.html' },
    { name: '足迹', file: 'footprint.html' },
    { name: '活动中心', file: 'activity.html' },
    { name: '任务列表', file: 'task-list.html' },
];

async function testPage(page, pageInfo) {
    const result = {
        name: pageInfo.name,
        file: pageInfo.file,
        url: `${BASE_URL}/${pageInfo.file}`,
        status: 'PASS',
        errors: [],
        checks: {}
    };

    try {
        // 1. 页面加载检查
        const response = await page.goto(result.url, { waitUntil: 'networkidle', timeout: 30000 });
        if (response && response.status() !== 200) {
            result.status = 'FAIL';
            result.errors.push(`HTTP ${response.status()}`);
        }
        result.checks.load = 'PASS';

        // 2. 检查 DOCTYPE
        const doctype = await page.evaluate(() => document.doctype ? document.doctype.name : null);
        result.checks.doctype = doctype === 'html' ? 'PASS' : `FAIL (${doctype})`;
        if (doctype !== 'html') result.status = 'FAIL';

        // 3. 检查 title
        const title = await page.title();
        result.checks.title = title ? 'PASS' : 'FAIL';
        result.title = title;
        if (!title) result.status = 'FAIL';

        // 4. 检查 meta viewport
        const viewport = await page.$('meta[name="viewport"]');
        result.checks.viewport = viewport ? 'PASS' : 'FAIL';
        if (!viewport) result.status = 'FAIL';

        // 5. 检查 meta charset
        const charset = await page.$('meta[charset="UTF-8"]');
        result.checks.charset = charset ? 'PASS' : 'FAIL';
        if (!charset) result.status = 'FAIL';

        // 6. 检查 body 内容
        const bodyContent = await page.evaluate(() => document.body ? document.body.innerHTML.length : 0);
        result.checks.bodyContent = bodyContent > 100 ? 'PASS' : 'FAIL';
        if (bodyContent <= 100) {
            result.status = 'FAIL';
            result.errors.push('Body content too short or empty');
        }

        // 7. 检查 TabBar
        const tabBar = await page.$('.tab-bar');
        result.checks.tabBar = tabBar ? 'PASS' : 'WARN (optional)';

        // 8. 检查 Focus 样式
        const focusStyles = await page.evaluate(() => {
            const styles = document.querySelectorAll('style');
            for (const style of styles) {
                if (style.textContent.includes(':focus-visible')) {
                    return 'PASS';
                }
            }
            return 'FAIL';
        });
        result.checks.focusStyles = focusStyles;

        // 9. 检查 Toast 函数
        const hasToast = await page.evaluate(() => typeof showToast === 'function');
        result.checks.toast = hasToast ? 'PASS' : 'WARN (no showToast found)';

        // 10. 检查安全区
        const safeArea = await page.evaluate(() => {
            const style = document.querySelector('style');
            return style && style.textContent.includes('safe-area-inset') ? 'PASS' : 'WARN';
        });
        result.checks.safeArea = safeArea;

        // 11. 检查 console errors
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') consoleErrors.push(msg.text());
        });
        await page.reload({ waitUntil: 'networkidle' });
        result.consoleErrors = consoleErrors;

    } catch (err) {
        result.status = 'FAIL';
        result.errors.push(err.message);
    }

    return result;
}

async function runTests() {
    console.log('🚀 开始测试小程序页面...\n');

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 390, height: 844 } // iPhone 14 size
    });
    const page = await context.newPage();

    const results = [];
    let passCount = 0;
    let failCount = 0;

    for (const pageInfo of pages) {
        process.stdout.write(`Testing: ${pageInfo.name.padEnd(10)}`);
        const result = await testPage(page, pageInfo);
        results.push(result);

        if (result.status === 'PASS') {
            passCount++;
            console.log(' ✅ PASS');
        } else {
            failCount++;
            console.log(' ❌ FAIL');
            if (result.errors.length > 0) {
                result.errors.forEach(e => console.log(`   └─ ${e}`));
            }
        }
    }

    await browser.close();

    console.log('\n' + '='.repeat(60));
    console.log('📊 测试结果汇总');
    console.log('='.repeat(60));
    console.log(`总页面数: ${pages.length}`);
    console.log(`通过: ${passCount} ✅`);
    console.log(`失败: ${failCount} ❌`);
    console.log(`通过率: ${((passCount / pages.length) * 100).toFixed(1)}%`);
    console.log('='.repeat(60));

    // 输出失败详情
    if (failCount > 0) {
        console.log('\n❌ 失败页面详情:\n');
        results.filter(r => r.status === 'FAIL').forEach(r => {
            console.log(`${r.name} (${r.file}):`);
            r.errors.forEach(e => console.log(`  └─ ${e}`));
        });
    }

    // 输出检查项汇总
    console.log('\n📋 检查项汇总:\n');
    const checks = ['doctype', 'title', 'viewport', 'charset', 'bodyContent', 'tabBar', 'focusStyles', 'toast', 'safeArea'];
    checks.forEach(check => {
        const pass = results.filter(r => r.checks[check] === 'PASS').length;
        const warn = results.filter(r => r.checks[check] && r.checks[check].includes('WARN')).length;
        const fail = results.filter(r => r.checks[check] === 'FAIL').length;
        console.log(`${check.padEnd(15)} PASS: ${pass.toString().padStart(2)} | WARN: ${warn.toString().padStart(2)} | FAIL: ${fail.toString().padStart(2)}`);
    });

    // 保存详细报告
    const report = {
        timestamp: new Date().toISOString(),
        summary: { total: pages.length, pass: passCount, fail: failCount },
        results
    };

    const fs = require('fs');
    fs.writeFileSync('test-results.json', JSON.stringify(report, null, 2));
    console.log('\n📄 详细报告已保存: test-results.json');

    return failCount === 0;
}

runTests().then(success => {
    process.exit(success ? 0 : 1);
}).catch(err => {
    console.error('测试执行失败:', err);
    process.exit(1);
});
