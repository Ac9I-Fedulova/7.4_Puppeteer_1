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
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub · Build and ship software on a single, collaborative platform · GitHub');
  }, 41000);

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
  await page.goto("https://github.com/features/copilot");
  const expected = "Your AI pair programmer";
  const title = await page.title();
  expect(title).toContain(expected);
}, 9000);

test("Contents of title of page pricing", async () => {
  await page.goto("https://github.com/pricing");
  const expected = "Plans for every developer";
  const title = await page.title();
  expect(title).toContain(expected);
}, 10000);

test("Contents of title of page models", async () => {
  await page.goto("https://github.com/features/models");
  const expected = "Build AI-powered projects with industry-leading";
  const title = await page.title();
  expect(title).toContain(expected);
}, 8000);