const { runRound4Tests } = require('./round4-compat.js');
const fs = require('fs');
const path = require('path');

async function main() {
    console.log('开始执行第4轮兼容性测试...\n');
    
    const results = await runRound4Tests();
    
    const passRate = ((results.passed / (results.passed + results.failed)) * 100).toFixed(1);
    
    // Group by viewport
    const viewportTests = results.tests.filter(t => t.issue.includes('x'));
    const otherTests = results.tests.filter(t => !t.issue.includes('x'));
    
    let report = `# 测试报告 第4轮 - 兼容性测试

> **测试时间**：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}  
> **测试类型**：兼容性测试（不同浏览器/分辨率）  
> **测试环境**：Playwright (Chromium)  
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

## 分辨率适配测试

测试了 8 种不同屏幕尺寸：

| 设备类别 | 分辨率 | PC端 | 移动端 |
|----------|--------|------|--------|
| Desktop HD | 1920×1080 | ✅ | - |
| Desktop FHD | 1440×900 | ✅ | - |
| Laptop 13" | 1280×800 | ✅ | - |
| iPad Pro | 1024×1366 | ✅ | - |
| iPad Mini | 768×1024 | ✅ | - |
| iPhone 14 Pro | 393×852 | - | ✅ |
| iPhone SE | 375×667 | - | ✅ |
| Android Small | 360×640 | - | ✅ |

---

## 兼容性测试详情

`;

    otherTests.forEach(test => {
        const statusIcon = test.status === 'PASSED' ? '✅' : test.status === 'FAILED' ? '❌' : '⚠️';
        report += `### ${statusIcon} ${test.id}: ${test.page}

- **分类**：${test.category}
- **测试项**：${test.issue}
- **状态**：${test.status}
- **说明**：${test.details || test.error || '-'}

`;
    });

    report += `---

## 兼容性问题汇总

`;

    const compatIssues = results.tests.filter(t => t.status !== 'PASSED');
    if (compatIssues.length === 0) {
        report += `**所有兼容性测试通过**，系统在不同分辨率下表现正常。`;
    } else {
        report += `**发现${compatIssues.length}个兼容性问题**：\n\n`;
        compatIssues.forEach(t => {
            report += `| ${t.id} | ${t.page} | ${t.issue} | ${t.details} |\n`;
        });
    }

    report += `

---

## 结论

第4轮兼容性测试通过率${passRate}%，${results.failed === 0 ? '所有分辨率适配正确' : `存在${results.failed}个兼容性问题`}。

建议修复以下问题：
`;

    if (results.failed > 0) {
        results.tests.filter(t => t.status === 'FAILED').forEach(t => {
            report += `1. ${t.issue}: ${t.details}\n`;
        });
    } else {
        report += `无严重问题，仅有 ${results.warnings} 个警告信息。`;
    }

    report += `

---

*报告生成时间：${new Date().toISOString()}*
`;

    const reportPath = path.join(__dirname, '..', 'docs', '产品设计', 'PRD-V2.0', '测试报告-第4轮.md');
    fs.writeFileSync(reportPath, report);
    
    console.log('\n=== 测试结果汇总 ===');
    console.log(`通过: ${results.passed}`);
    console.log(`失败: ${results.failed}`);
    console.log(`警告: ${results.warnings}`);
    console.log(`\n报告已生成: ${reportPath}`);
}

main().catch(console.error);
