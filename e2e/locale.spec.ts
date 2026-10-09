import { expect, test } from "@playwright/test";

test("switches a lesson between Vietnamese and English and defaults code to Python", async ({
  page,
}) => {
  await page.goto("/vi/learn/dsa/bubble-sort");
  await expect(page.locator("html")).toHaveAttribute("lang", "vi");

  await page.getByRole("link", { name: "Switch to English" }).first().click();
  await expect(page).toHaveURL("/en/learn/dsa/bubble-sort");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: "Bubble Sort", exact: true })).toBeVisible();
  await expect(
    page.getByText("Bubble Sort makes repeated passes through an array."),
  ).toBeVisible();

  const pythonTab = page.getByRole("tab", { name: "Python" }).first();
  await expect(pythonTab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("link", { name: "Vietnamese" }).first()).toBeVisible();

  await page.getByRole("link", { name: "Switch to Vietnamese" }).first().click();
  await expect(page).toHaveURL("/vi/learn/dsa/bubble-sort");
  await expect(page.locator("html")).toHaveAttribute("lang", "vi");
  await expect(page.getByRole("heading", { name: "Bubble Sort", exact: true })).toBeVisible();
});

test("redirects legacy lesson URLs to Vietnamese", async ({ page }) => {
  await page.goto("/learn/dsa/course-introduction");
  await expect(page).toHaveURL("/vi/learn/dsa/course-introduction");
  await expect(page.locator("html")).toHaveAttribute("lang", "vi");
});

test("renders the final translated System Design lesson without a fallback", async ({
  page,
}) => {
  await page.goto("/en/learn/system-design/sd-rate-limiting");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(
    page.getByRole("heading", { name: "Rate Limiting", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Limit requests to protect a system with fixed and sliding windows or a token bucket.",
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "English translation in progress" }),
  ).toHaveCount(0);
});
