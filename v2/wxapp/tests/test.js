const { chromium } = require('playwright');

async function testPage(page, url, name) {
    console.log(`\n=== Testing: ${name} ===`);
    
    try {
        // Navigate to page
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
        console.log('✅ Page loaded successfully');
        
        // Check title
        const title = await page.title();
        console.log(`✅ Title: "${title}"`);
        
        // Check for console errors
        const errors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });
        
        // Check critical elements
        if (name === 'profile.html') {
            // Check profile header
            const header = await page.$('.profile-header');
            console.log(header ? '✅ Profile header found' : '❌ Profile header NOT found');
            
            // Check TabBar
            const tabBar = await page.$('.tab-bar');
            console.log(tabBar ? '✅ TabBar found' : '❌ TabBar NOT found');
            
            // Check active tab
            const activeTab = await page.$('.tab-item.active');
            console.log(activeTab ? '✅ Active tab found' : '❌ Active tab NOT found');
            
            // Check menu items
            const menuItems = await page.$$('.menu-item');
            console.log(`✅ Menu items: ${menuItems.length} found`);
        }
        
        if (name === 'calendar.html') {
            // Check header
            const header = await page.$('.header');
            console.log(header ? '✅ Header found' : '❌ Header NOT found');
            
            // Check date list
            const dateList = await page.$('.date-list');
            console.log(dateList ? '✅ Date list found' : '❌ Date list NOT found');
            
            // Check task list
            const taskList = await page.$('.task-list');
            console.log(taskList ? '✅ Task list found' : '❌ Task list NOT found');
            
            // Check task cards
            const taskCards = await page.$$('.task-card');
            console.log(`✅ Task cards: ${taskCards.length} found`);
        }
        
        if (name === 'tools.html') {
            // Check header
            const header = await page.$('.header');
            console.log(header ? '✅ Header found' : '❌ Header NOT found');
            
            // Check quick grid
            const quickGrid = await page.$('.quick-grid');
            console.log(quickGrid ? '✅ Quick grid found' : '❌ Quick grid NOT found');
            
            // Check stat cards
            const statCards = await page.$$('.stat-card');
            console.log(`✅ Stat cards: ${statCards.length} found`);
        }
        
        if (name === 'task-list.html') {
            // Check header
            const header = await page.$('.header');
            console.log(header ? '✅ Header found' : '❌ Header NOT found');
            
            // Check tabs
            const tabs = await page.$$('.tab');
            console.log(`✅ Tabs: ${tabs.length} found`);
            
            // Check task cards
            const taskCards = await page.$$('.task-card');
            console.log(`✅ Task cards: ${taskCards.length} found`);
        }
        
        // Check for broken resources
        const images = await page.$$('img');
        const brokenImages = [];
        for (const img of images) {
            const naturalWidth = await img.evaluate(el => el.naturalWidth);
            if (naturalWidth === 0) {
                brokenImages.push(await img.getAttribute('src'));
            }
        }
        
        if (brokenImages.length > 0) {
            console.log(`⚠️  Broken images: ${brokenImages.length}`);
        } else {
            console.log('✅ No broken images');
        }
        
        // Report errors
        if (errors.length > 0) {
            console.log(`⚠️  Console errors: ${errors.length}`);
            errors.forEach(e => console.log(`   - ${e}`));
        } else {
            console.log('✅ No console errors');
        }
        
        return true;
    } catch (error) {
        console.log(`❌ Error: ${error.message}`);
        return false;
    }
}

async function runTests() {
    console.log('========================================');
    console.log('  wxapp H5 Prototype - Testing Report');
    console.log('========================================');
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 375, height: 812 }
    });
    const page = await context.newPage();
    
    const baseUrl = 'http://localhost:8899';
    const pages = [
        { url: `${baseUrl}/profile.html`, name: 'profile.html' },
        { url: `${baseUrl}/calendar.html`, name: 'calendar.html' },
        { url: `${baseUrl}/tools.html`, name: 'tools.html' },
        { url: `${baseUrl}/task-list.html`, name: 'task-list.html' },
    ];
    
    let allPassed = true;
    
    for (const p of pages) {
        const result = await testPage(page, p.url, p.name);
        if (!result) allPassed = false;
    }
    
    await browser.close();
    
    console.log('\n========================================');
    if (allPassed) {
        console.log('  ✅ All pages passed testing!');
    } else {
        console.log('  ⚠️  Some pages have issues');
    }
    console.log('========================================\n');
}

runTests().catch(console.error);
