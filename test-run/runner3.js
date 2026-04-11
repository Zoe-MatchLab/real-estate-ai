const { runRound3Tests } = require('./round3-boundary.js');
const fs = require('fs');
const path = require('path');

async function main() {
    console.log('开始执行第3轮边界测试...\n');
    
    const results = await runRound3Tests();
    
    const passRate = ((results.passed / (results.passed + results.failed)) * 100).toFixed(1);
    
    let report = `# 测试报告 第3轮 - 边界测试

> **测试时间**：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}  
> **测试类型**：边界测试（验证边界条件处理）  
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

## 边界测试详情

`;

    results.tests.forEach(test => {
        const statusIcon = test.status === 'PASSED' ? '✅' : test.status === 'FAILED' ? '❌' : '⚠️';
        report += `### ${statusIcon} ${test.id}: ${test.page}

- **分类**：${test.category}
- **测试项**：${test.issue}
- **状态**：${test.status}
- **说明**：${test.details || test.error || '-'}

`;
    });

    report += `---

## 边界问题汇总

`;

    const boundaryIssues = results.tests.filter(t => t.status !== 'PASSED');
    if (boundaryIssues.length === 0) {
        report += `**所有边界测试通过**，系统对边界条件处理正确。`;
    } else {
        report += `**发现${boundaryIssues.length}个边界问题**：\n\n`;
        boundaryIssues.forEach(t => {
            report += `| ${t.id} | ${t.page} | ${t.issue} | ${t.details} |\n`;
        });
    }

    report += `

---

## 结论

第3轮边界测试通过率${passRate}%，${results.failed === 0 ? '所有边界条件处理正确' : `存在${results.failed}个边界问题`}。

`;

    report += `

---

*报告生成时间：${new Date().toISOString()}*
`;

    const reportPath = path.join(__dirname, '..', 'docs', '产品设计', 'PRD-V2.0', '测试报告-第3轮.md');
    fs.writeFileSync(reportPath, report);
    
    console.log('\n=== 测试结果汇总 ===');
    console.log(`通过: ${results.passed}`);
    console.log(`失败: ${results.failed}`);
    console.log(`警告: ${results.warnings}`);
    console.log(`\n报告已生成: ${reportPath}`);
}

main().catch(console.error);
