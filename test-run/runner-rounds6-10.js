const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3001';

async function runAllRounds() {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║     房产AI作业平台 V2.0 - 第6-10轮测试   ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    const browser = await chromium.launch({ headless: true });
    const allResults = [];

    const rounds = [
        { num: 6, name: '功能深度测试', file: 'round6-functionality.js' },
        { num: 7, name: '数据一致性测试', file: 'round7-data-consistency.js' },
        { num: 8, name: '用户体验测试', file: 'round8-ux.js' },
        { num: 9, name: '端到端测试', file: 'round9-e2e.js' },
        { num: 10, name: '最终验收测试', file: 'round10-final-acceptance.js' }
    ];

    for (const round of rounds) {
        console.log(`\n${'═'.repeat(60)}`);
        console.log(`正在执行: 第${round.num}轮 - ${round.name}`);
        console.log('═'.repeat(60));

        try {
            const module = require(`./${round.file}`);
            const runTests = module[`runRound${round.num}Tests`];
            if (runTests) {
                const result = await runTests();
                allResults.push(result);
                console.log(`\n第${round.num}轮结果: 通过=${result.passed} 失败=${result.failed} 警告=${result.warnings}`);
            }
        } catch (e) {
            console.error(`第${round.num}轮执行失败:`, e.message);
        }
    }

    await browser.close();

    // Summary
    console.log('\n' + '═'.repeat(60));
    console.log('测试完成 - 汇总报告');
    console.log('═'.repeat(60));

    let totalPassed = 0, totalFailed = 0, totalWarnings = 0;

    for (const r of allResults) {
        totalPassed += r.passed;
        totalFailed += r.failed;
        totalWarnings += r.warnings;
        console.log(`第${r.round}轮 (${r.name}): 通过=${r.passed} 失败=${r.failed} 警告=${r.warnings}`);
    }

    console.log('\n' + '-'.repeat(60));
    console.log(`总计: 通过=${totalPassed} 失败=${totalFailed} 警告=${totalWarnings}`);
    console.log(`通过率: ${((totalPassed / (totalPassed + totalFailed + totalWarnings)) * 100).toFixed(1)}%`);

    // Save results
    const reportData = {
        summary: {
            date: new Date().toISOString(),
            totalRounds: 5,
            totalPassed,
            totalFailed,
            totalWarnings,
            passRate: ((totalPassed / (totalPassed + totalFailed + totalWarnings)) * 100).toFixed(1) + '%'
        },
        rounds: allResults
    };

    fs.writeFileSync(
        path.join(__dirname, 'test-results-rounds6-10.json'),
        JSON.stringify(reportData, null, 2)
    );

    console.log('\n结果已保存到 test-results-rounds6-10.json');
}

runAllRounds().catch(console.error);
