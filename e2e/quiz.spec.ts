import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const DRILL = "/learn/dsa/complexity-drill";
const EASY_QUIZ = "/learn/dsa/complexity-quiz-easy";

test("complexity drill exposes pause, extend and disable controls", async ({
  page,
}) => {
  await page.goto(DRILL);
  await expect(
    page.getByRole("button", { name: "Tạm dừng" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "+15s" })).toBeVisible();
  await page.getByRole("button", { name: "Tắt đồng hồ" }).click();
  await expect(page.getByText("Đồng hồ đã tắt")).toBeVisible();
});

test("quiz answers a question, shows feedback and advances", async ({
  page,
}) => {
  await page.goto(EASY_QUIZ);
  const options = page
    .getByRole("group", { name: "Đáp án" })
    .getByRole("button");
  await options.first().click();
  await page.getByRole("button", { name: "Kiểm tra" }).click();
  await expect(page.getByRole("status")).toBeVisible();
  await page.getByRole("button", { name: /Câu tiếp theo/ }).click();
  await expect(page.getByText("2/10")).toBeVisible();
});

test("complexity drill has no serious accessibility violations", async ({
  page,
}) => {
  await page.goto(DRILL);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  const serious = results.violations.filter(
    (violation) =>
      violation.impact === "serious" || violation.impact === "critical",
  );
  expect(
    serious,
    serious
      .map((violation) => `${violation.id}: ${violation.help}`)
      .join("\n"),
  ).toEqual([]);
});
