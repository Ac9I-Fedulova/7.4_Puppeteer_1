async function checkTitleContains(page, url, expected) {
  await page.goto(url);
  const actualTitle = await page.title();
  expect(actualTitle).toContain(expected);
}

let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(async () => {
  await page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForNavigation({
      waitUntil: 'load'
    });
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub · Build and ship software on a single, collaborative platform · GitHub');
  }, 15000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href'));
    expect(actual).toEqual("#start-of-content");
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain('Get started with Team')
  }, 10000);
});

test("Contents of title of page copilot", async () => {
  await checkTitleContains(page, "https://github.com/features/copilot", "Your AI pair programmer");
}, 9000);

test("Contents of title of page pricing", async () => {
  await checkTitleContains(page, "https://github.com/pricing", "Plans for every developer");
}, 10000);

test("Contents of title of page models", async () => {
  await checkTitleContains(page, "https://github.com/features/models", "Build AI-powered projects with industry-leading");
}, 8000);