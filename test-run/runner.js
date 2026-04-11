const { runRound2Tests } = require('./round2-regression.js');
const fs = require('fs');
const path = require('path');

async function main() {
    console.log('开始执行第2轮回归测试...\n');
    
    const results = await runRound2Tests();
    
    // Generate report
    const report = generateMarkdownReport(results);
    
    const reportPath = path.join(__dirname, '..', 'docs', '产品设计', 'PRD-V2.0', '测试报告-第2轮.md');
    
    // Ensure directory exists
    const dir = path.dirname(reportPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, report);
    
    console.log('\n=== 测试结果汇总 ===');
    console.log(`通过: ${results.passed}`);
    console.log(`失败: ${results.failed}`);
    console.log(`警告: ${results.warnings}`);
    console.log(`\n报告已生成: ${reportPath}`);
}

function generateMarkdownReport(results) {
    const passRate = ((results.passed / (results.passed + results.failed)) * 100).toFixed(1);
    
    let report = `# 测试报告 第2轮 - 回归测试

> **测试时间**：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}  
> **测试类型**：回归测试（验证P1/P2问题修复）  
> **测试环境**：Playwright + http-server  
> **基础URL**：http://localhost:3001

---

## 测试结果汇总

| 指标 | 数值 |
|------|------|
| 测试用例数 | ${results.passed + results.failed + results.warnings} |
| 通过 | ${results.passed} |
| 失败 | ${results.failed} |
| 警告 | ${results.warnings} |
| 通过率 | ${passRate}% |

---

## 问题修复验证详情

### P1级问题（核心功能）

`;

    results.tests.filter(t => t.id.startsWith('P1')).forEach(test => {
        const statusIcon = test.status === 'PASSED' ? '✅' : test.status === 'FAILED' ? '❌' : '⚠️';
        report += `#### ${statusIcon} ${test.id}: ${test.page}

- **问题描述**：${test.issue}
- **验证结果**：${test.status}
- **详细说明**：${test.details || test.error || '-'}

`;
    });

    report += `### P2级问题（交互细节）

`;

    results.tests.filter(t => t.id.startsWith('P2')).forEach(test => {
        const statusIcon = test.status === 'PASSED' ? '✅' : test.status === 'FAILED' ? '❌' : '⚠️';
        report += `#### ${statusIcon} ${test.id}: ${test.page}

- **问题描述**：${test.issue}
- **验证结果**：${test.status}
- **详细说明**：${test.details || test.error || '-'}

`;
    });

    report += `---

## 结论

第2轮回归测试未通过，${results.failed}个问题仍需修复。

`;

    if (results.failed === 0) {
        report += `**所有P1/P2问题已修复**，可进入下一轮测试。`;
    } else {
        report += `**以下问题仍需修复**：\n`;
        results.tests.filter(t => t.status === 'FAILED').forEach(t => {
            report += `- ${t.id}: ${t.issue}\n`;
        });
    }

    report += `

---

*报告生成时间：${new Date().toISOString()}*
`;

    return report;
}

main().catch(console.error);
