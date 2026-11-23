import { test } from "node:test";
import assert from "node:assert/strict";
import worker, { redirectTarget } from "../src/index.mjs";

const OLD = "https://littlepenguinstudio.krai-thanawat.workers.dev";

for (const path of ["/games/animal-pairs/privacy/", "/games/animal-pairs/support/"]) {
  test(`the app's ${path} link redirects to the same path on littlesnowyowl.com`, async () => {
    const res = await worker.fetch(new Request(OLD + path));
    assert.equal(res.status, 301);
    assert.equal(res.headers.get("location"), "https://littlesnowyowl.com" + path);
  });
}

test("query strings and other paths are kept", () => {
  assert.equal(redirectTarget(`${OLD}/?ref=app`), "https://littlesnowyowl.com/?ref=app");
  assert.equal(redirectTarget(`${OLD}/games/animal-pairs`), "https://littlesnowyowl.com/games/animal-pairs");
});
