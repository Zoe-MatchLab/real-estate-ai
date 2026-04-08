const { chromium } = require('playwright');

async function testNewPages() {
    console.log('=== Testing New Pages ===\n');
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 375, height: 812 }
    });
    const page = await context.newPage();
    
    const baseUrl = 'http://localhost:8899';
    const pages = [
        { url: `${baseUrl}/task-detail.html`, name: 'task-detail.html' },
        { url: `${baseUrl}/speech-train.html`, name: 'speech-train.html' },
    ];
    
    for (const p of pages) {
        console.log(`\n--- Testing: ${p.name} ---`);
        try {
            await page.goto(p.url, { waitUntil: 'load', timeout: 15000 });
            console.log('✅ Page loaded');
            
            const title = await page.title();
            console.log(`✅ Title: "${title}"`);
            
            // Check for errors
            const errors = [];
            page.on('console', msg => {
                if (msg.type() === 'error') errors.push(msg.text());
            });
            
            // Check TabBar
            const tabBar = await page.$('.tab-bar');
            console.log(tabBar ? '✅ TabBar found' : '❌ TabBar NOT found');
            
            // Check for navigation links
            const links = await page.$$('a');
            console.log(`✅ Navigation links: ${links.length} found`);
            
            if (errors.length > 0) {
                console.log(`⚠️  Console errors: ${errors.length}`);
                errors.forEach(e => console.log(`   - ${e}`));
            } else {
                console.log('✅ No console errors');
            }
            
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
    }
    
    // Test navigation between pages
    console.log('\n--- Testing Navigation ---');
    try {
        await page.goto(`${baseUrl}/profile.html`, { waitUntil: 'load' });
        console.log('✅ profile.html loaded');
        
        // Click on TabBar Calendar
        await page.click('a[href="calendar.html"]');
        await page.waitForLoadState('load');
        const calendarTitle = await page.title();
        console.log(`✅ Navigation to calendar.html: "${calendarTitle}"`);
        
        // Click on task-list
        await page.click('a[href="task-list.html"]');
        await page.waitForLoadState('load');
        const taskListTitle = await page.title();
        console.log(`✅ Navigation to task-list.html: "${taskListTitle}"`);
        
        // Click on task detail
        const taskCard = await page.$('.task-card');
        if (taskCard) {
            await taskCard.click();
            await page.waitForLoadState('load');
            const taskDetailTitle = await page.title();
            console.log(`✅ Navigation to task-detail.html: "${taskDetailTitle}"`);
        }
        
    } catch (error) {
        console.log(`❌ Navigation error: ${error.message}`);
    }
    
    await browser.close();
    console.log('\n=== Testing Complete ===');
}

testNewPages().catch(console.error);
