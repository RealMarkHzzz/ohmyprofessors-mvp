/**
 * Adelaide University Staff Directory Scraper
 * 
 * Purpose: Scrape professor data from University of Adelaide Staff Directory
 * Data Source: https://www.adelaide.edu.au/directory/
 * Target: Computer Science department (expandable to other departments)
 * 
 * Usage:
 *   npm run scrape        # Run scraper and save data
 *   npm run scrape:dev    # Run with debugging output
 * 
 * Output:
 *   - data/adelaide-professors.json (raw data)
 *   - Console logs showing progress
 * 
 * DHH Principles Applied:
 *   - Simple, direct code (no over-engineering)
 *   - Easy to understand 6 months later
 *   - Graceful error handling
 *   - Respectful rate limiting
 */

import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Professor {
  name: string;
  title: string;
  department: string;
  email: string;
  office_location: string;
  courses: string[];
  profile_url: string;
  phone?: string;
  researcher_profile_url?: string;
}

interface ScraperConfig {
  baseUrl: string;
  department: string;
  departmentId: string;
  delayBetweenPages: number; // milliseconds
  maxRetries: number;
  headless: boolean;
  debug: boolean;
}

interface ScraperStats {
  totalProcessed: number;
  successful: number;
  failed: number;
  startTime: Date;
  endTime?: Date;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG: ScraperConfig = {
  baseUrl: 'https://www.adelaide.edu.au',
  department: 'Computer Science',
  departmentId: '12521', // Computer Science department ID
  delayBetweenPages: 2000, // 2 seconds - respectful crawling
  maxRetries: 3,
  headless: true,
  debug: process.env.DEBUG === 'true'
};

const USER_AGENT = 'OhMyProfessors/1.0 (Educational; contact@ohmyprofessors.com)';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function log(message: string, level: 'info' | 'error' | 'debug' = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = level === 'error' ? '❌' : level === 'debug' ? '🔍' : '✅';
  
  if (level === 'debug' && !CONFIG.debug) return;
  
  console.log(`${prefix} [${timestamp}] ${message}`);
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    log('Created data directory');
  }
}

function saveData(professors: Professor[], filename: string = 'adelaide-professors.json') {
  ensureDataDirectory();
  const filepath = path.join(process.cwd(), 'data', filename);
  fs.writeFileSync(filepath, JSON.stringify(professors, null, 2), 'utf-8');
  log(`Saved ${professors.length} professors to ${filepath}`);
}

// ============================================================================
// SCRAPER FUNCTIONS
// ============================================================================

async function initBrowser(): Promise<Browser> {
  log('Launching browser...');
  const browser = await chromium.launch({
    headless: CONFIG.headless,
    args: ['--no-sandbox']
  });
  log('Browser launched successfully');
  return browser;
}

async function getProfessorListUrls(page: Page): Promise<string[]> {
  log('Fetching professor list page...');
  
  // Start with the department listing (showing 50 results per page)
  const listUrl = `${CONFIG.baseUrl}/directory/?dsn=directory.phonebook;m=list;v__scpx=0;v_department=${CONFIG.departmentId};v_expertise=0;perpage=50`;
  
  await page.goto(listUrl, { waitUntil: 'networkidle' });
  await delay(1000);
  
  log('Parsing professor list...');
  
  // Extract all profile URLs from the table
  const profileUrls = await page.$$eval('table tbody tr', (rows) => {
    const urls: string[] = [];
    
    rows.forEach(row => {
      // Find the first link in the row (which is the profile link)
      const link = row.querySelector('a[href*="/directory/"]');
      if (link && link.getAttribute('href')) {
        const href = link.getAttribute('href')!;
        // Filter out non-profile links (org links, building links, etc.)
        if (!href.includes('/org/') && !href.includes('/building/') && !href.includes('?dsn=')) {
          urls.push(href);
        }
      }
    });
    
    return urls;
  });
  
  // Remove duplicates and convert to full URLs
  const uniqueUrls = [...new Set(profileUrls)].map(url => {
    return url.startsWith('http') ? url : `${CONFIG.baseUrl}${url}`;
  });
  
  log(`Found ${uniqueUrls.length} professor profiles on page 1`);
  
  // Check if there are more pages
  const totalPages = await page.evaluate(() => {
    const paginationText = document.querySelector('.list-pagination')?.textContent || '';
    const match = paginationText.match(/of\s+(\d+)/);
    return match ? parseInt(match[1] || '1') : 1;
  });
  
  if (totalPages > 1) {
    log(`Found ${totalPages} pages total. Scraping all pages...`);
    
    // Scrape all pages to get complete dataset
    const maxPages = totalPages; // Full scrape
    
    for (let pageNum = 2; pageNum <= maxPages; pageNum++) {
      log(`Fetching page ${pageNum}...`);
      await delay(CONFIG.delayBetweenPages);
      
      const pageUrl = `${listUrl};page=${pageNum}`;
      await page.goto(pageUrl, { waitUntil: 'networkidle' });
      
      const pageUrls = await page.$$eval('table tbody tr', (rows) => {
        const urls: string[] = [];
        
        rows.forEach(row => {
          const link = row.querySelector('a[href*="/directory/"]');
          if (link && link.getAttribute('href')) {
            const href = link.getAttribute('href')!;
            if (!href.includes('/org/') && !href.includes('/building/') && !href.includes('?dsn=')) {
              urls.push(href);
            }
          }
        });
        
        return urls;
      });
      
      const newUrls = pageUrls.map(url => url.startsWith('http') ? url : `${CONFIG.baseUrl}${url}`);
      uniqueUrls.push(...newUrls);
      log(`Found ${newUrls.length} profiles on page ${pageNum}`);
    }
  }
  
  const finalUrls = [...new Set(uniqueUrls)];
  log(`Total unique profiles to scrape: ${finalUrls.length}`);
  
  return finalUrls;
}

async function scrapeProfessorProfile(page: Page, url: string): Promise<Professor | null> {
  try {
    log(`Scraping: ${url}`, 'debug');
    
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await delay(500);
    
    const professor = await page.evaluate(() => {
      // Extract name from h1
      const nameElement = document.querySelector('main h1');
      const fullName = nameElement?.textContent?.trim() || '';
      
      // Extract data from the information table
      const rows = document.querySelectorAll('table tbody tr');
      let position = '';
      let department = '';
      let email = '';
      let phone = '';
      let location = '';
      
      rows.forEach(row => {
        const header = row.querySelector('th')?.textContent?.trim().toLowerCase() || '';
        const cell = row.querySelector('td');
        
        if (header.includes('position')) {
          position = cell?.textContent?.trim() || '';
        } else if (header.includes('org unit')) {
          department = cell?.textContent?.trim() || '';
        } else if (header.includes('email')) {
          email = cell?.querySelector('a')?.textContent?.trim() || '';
        } else if (header.includes('telephone')) {
          phone = cell?.textContent?.trim() || '';
        } else if (header.includes('location')) {
          location = cell?.textContent?.trim() || '';
        }
      });
      
      // Extract researcher profile URL
      const researcherLink = document.querySelector('a[href*="researchers.adelaide.edu.au"]');
      let researcherUrl = researcherLink?.getAttribute('href') || '';
      
      // Fix relative URLs
      if (researcherUrl && researcherUrl.startsWith('//')) {
        researcherUrl = 'https:' + researcherUrl;
      } else if (researcherUrl && researcherUrl.startsWith('/')) {
        researcherUrl = 'https://researchers.adelaide.edu.au' + researcherUrl;
      }
      
      return {
        fullName,
        position,
        department,
        email,
        phone,
        location,
        researcherUrl
      };
    });
    
    // Clean up whitespace in location
    const cleanLocation = professor.location
      .replace(/\s+/g, ' ')
      .trim();
    
    // Transform to our schema
    const result: Professor = {
      name: professor.fullName,
      title: professor.position,
      department: professor.department,
      email: professor.email,
      office_location: cleanLocation,
      courses: [], // Will be populated in future iterations
      profile_url: url,
      phone: professor.phone,
      researcher_profile_url: professor.researcherUrl
    };
    
    // Validate required fields
    if (!result.name || !result.department) {
      log(`Skipping invalid profile: ${url} (missing name or department)`, 'debug');
      return null;
    }
    
    log(`✓ Scraped: ${result.name}`, 'debug');
    return result;
    
  } catch (error) {
    log(`Failed to scrape ${url}: ${error}`, 'error');
    return null;
  }
}

async function scrapeWithRetry(
  page: Page, 
  url: string, 
  retries: number = CONFIG.maxRetries
): Promise<Professor | null> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await scrapeProfessorProfile(page, url);
      return result;
    } catch (error) {
      if (attempt === retries) {
        log(`Failed after ${retries} attempts: ${url}`, 'error');
        return null;
      }
      log(`Retry ${attempt}/${retries} for ${url}`, 'debug');
      await delay(CONFIG.delayBetweenPages * attempt); // Exponential backoff
    }
  }
  return null;
}

// ============================================================================
// MAIN SCRAPER
// ============================================================================

async function main() {
  const stats: ScraperStats = {
    totalProcessed: 0,
    successful: 0,
    failed: 0,
    startTime: new Date()
  };
  
  let browser: Browser | null = null;
  
  try {
    log('='.repeat(60));
    log('Adelaide University Scraper - Starting');
    log('='.repeat(60));
    log(`Department: ${CONFIG.department}`);
    log(`Delay between pages: ${CONFIG.delayBetweenPages}ms`);
    log(`Headless mode: ${CONFIG.headless}`);
    log('');
    
    // Initialize browser
    browser = await initBrowser();
    const context = await browser.newContext({
      userAgent: USER_AGENT
    });
    const page = await context.newPage();
    
    // Get list of professor profile URLs
    const profileUrls = await getProfessorListUrls(page);
    stats.totalProcessed = profileUrls.length;
    
    log('');
    log('Starting individual profile scraping...');
    log('');
    
    // Scrape each professor profile
    const professors: Professor[] = [];
    const checkpointInterval = 10; // Save every 10 professors
    
    for (let i = 0; i < profileUrls.length; i++) {
      const url = profileUrls[i];
      const progress = `[${i + 1}/${profileUrls.length}]`;
      
      log(`${progress} Processing...`);
      
      const professor = await scrapeWithRetry(page, url);
      
      if (professor) {
        professors.push(professor);
        stats.successful++;
        log(`${progress} ✓ ${professor.name} - ${professor.title}`);
      } else {
        stats.failed++;
        log(`${progress} ✗ Failed to scrape`, 'error');
      }
      
      // Respectful delay between requests
      if (i < profileUrls.length - 1) {
        await delay(CONFIG.delayBetweenPages);
      }
      
      // Checkpoint save every N professors
      if ((i + 1) % checkpointInterval === 0) {
        const checkpointFile = `adelaide-professors-checkpoint-${i + 1}.json`;
        saveData(professors, checkpointFile);
        log(`💾 Checkpoint saved: ${i + 1} professors`);
      }
    }
    
    // Save data
    log('');
    log('Saving data...');
    saveData(professors);
    
    // Print statistics
    stats.endTime = new Date();
    const duration = (stats.endTime.getTime() - stats.startTime.getTime()) / 1000;
    
    log('');
    log('='.repeat(60));
    log('SCRAPING COMPLETE');
    log('='.repeat(60));
    log(`Total profiles: ${stats.totalProcessed}`);
    log(`Successful: ${stats.successful}`);
    log(`Failed: ${stats.failed}`);
    log(`Success rate: ${((stats.successful / stats.totalProcessed) * 100).toFixed(1)}%`);
    log(`Duration: ${duration.toFixed(1)}s`);
    log(`Output: data/adelaide-professors.json`);
    log('='.repeat(60));
    
  } catch (error) {
    log(`Fatal error: ${error}`, 'error');
    throw error;
  } finally {
    if (browser) {
      await browser.close();
      log('Browser closed');
    }
  }
}

// ============================================================================
// ENTRY POINT
// ============================================================================

if (require.main === module) {
  main()
    .then(() => {
      log('Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      log(`Script failed: ${error}`, 'error');
      console.error(error);
      process.exit(1);
    });
}

export { main, Professor, ScraperConfig };
