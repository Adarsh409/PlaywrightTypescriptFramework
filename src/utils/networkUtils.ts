import { Page, Response } from '@playwright/test';

export async function waitForResponse(
  page: Page,
  url: string,
  action: () => Promise<void>,
  statusCode = 200
): Promise<Response> {
  const responsePromise = page.waitForResponse(
    response =>
      response.url().includes(url) &&
      response.status() === statusCode
  );

  await action();

  return await responsePromise;
}