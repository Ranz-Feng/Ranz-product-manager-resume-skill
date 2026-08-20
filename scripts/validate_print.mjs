#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

function readOption(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

const input = process.argv[2];
if (!input || input.startsWith("--")) {
  console.error("Usage: node validate_print.mjs <resume.html> [--expected-pages 2] [--output-dir /tmp/resume-qa]");
  process.exit(2);
}

const htmlPath = path.resolve(input);
const expectedPages = Number(readOption("--expected-pages", "2"));
const outputDir = path.resolve(readOption("--output-dir", "/tmp/resume-qa"));
const moduleValue = process.env.PLAYWRIGHT_MODULE || "playwright";
const moduleSpecifier = path.isAbsolute(moduleValue) ? pathToFileURL(moduleValue).href : moduleValue;

if (!fs.existsSync(htmlPath)) {
  console.error(`HTML not found: ${htmlPath}`);
  process.exit(2);
}

let chromium;
try {
  ({ chromium } = await import(moduleSpecifier));
} catch (error) {
  console.error("Playwright could not be loaded. Install it or set PLAYWRIGHT_MODULE to its index.mjs path.");
  console.error(error.message);
  process.exit(2);
}

fs.mkdirSync(outputDir, { recursive: true });
const launchOptions = { headless: true };
if (process.env.CHROME_EXECUTABLE) launchOptions.executablePath = process.env.CHROME_EXECUTABLE;

const browser = await chromium.launch(launchOptions);
const page = await browser.newPage({ viewport: { width: 1000, height: 1300 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
await page.emulateMedia({ media: "print" });
await page.evaluate(() => document.fonts.ready);

const pages = page.locator(".page");
const pageCount = await pages.count();
const checks = await pages.evaluateAll((nodes) => nodes.map((node, index) => {
  const rect = node.getBoundingClientRect();
  const children = [...node.children].filter((child) => !child.classList.contains("page-no"));
  const lowest = children.length ? Math.max(...children.map((child) => child.getBoundingClientRect().bottom)) : rect.top;
  const usage = Math.round(((lowest - rect.top) / rect.height) * 100);
  return {
    page: index + 1,
    usagePercent: usage,
    densityWarning: usage < 70 || usage > 85,
    overflow: node.scrollHeight > node.clientHeight || lowest > rect.bottom + 0.5,
  };
}));

for (let index = 0; index < pageCount; index += 1) {
  await pages.nth(index).screenshot({ path: path.join(outputDir, `page-${index + 1}.png`) });
}

const report = {
  file: htmlPath,
  expectedPages,
  pageCount,
  bodyFont: await page.evaluate(() => getComputedStyle(document.body).fontFamily),
  checks,
  screenshots: outputDir,
};

console.log(JSON.stringify(report, null, 2));
await browser.close();

if (pageCount !== expectedPages || checks.some((check) => check.overflow)) process.exit(1);
