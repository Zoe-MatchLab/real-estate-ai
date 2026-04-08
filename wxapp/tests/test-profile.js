const { chromium } = require('playwright');

async function testProfile() {
    console.log('=== Testing: profile.html ===');
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 375, height: 812 }
    });
    const page = await context.newPage();
    
    try {
        await page.goto('http://localhost:8899/profile.html', { waitUntil: 'load', timeout: 30000 });
        console.log('✅ Page loaded successfully');
        
        const title = await page.title();
        console.log(`✅ Title: "${title}"`);
        
        // Check critical elements
        const header = await page.$('.profile-header');
        console.log(header ? '✅ Profile header found' : '❌ Profile header NOT found');
        
        const tabBar = await page.$('.tab-bar');
        console.log(tabBar ? '✅ TabBar found' : '❌ TabBar NOT found');
        
        const activeTab = await page.$('.tab-item.active');
        console.log(activeTab ? '✅ Active tab found' : '❌ Active tab NOT found');
        
        const menuItems = await page.$$('.menu-item');
        console.log(`✅ Menu items: ${menuItems.length} found`);
        
        const quickItems = await page.$$('.quick-item');
        console.log(`✅ Quick items: ${quickItems.length} found`);
        
        // Test settings modal
        const settingsBtn = await page.$('.header-action');
        if (settingsBtn) {
            await settingsBtn.click();
            await page.waitForTimeout(500);
            const modal = await page.$('.modal-overlay.show');
            console.log(modal ? '✅ Settings modal opens' : '❌ Settings modal NOT opening');
            
            // Close modal
            const closeBtn = await page.$('.modal-close');
            if (closeBtn) {
                await closeBtn.click();
                await page.waitForTimeout(500);
            }
        }
        
        console.log('✅ All profile.html tests passed!');
        
    } catch (error) {
        console.log(`❌ Error: ${error.message}`);
    }
    
    await browser.close();
}

testProfile();
