import test from "node:test";
import assert from "node:assert/strict";
import { checkPassword, createSession, validSession } from "../lib/wedding-access.ts";

test("only the exact wedding password unlocks access", async () => {
  assert.equal(await checkPassword("Marvin"), true);
  assert.equal(await checkPassword("marvin"), false);
  assert.equal(await checkPassword(""), false);
});

test("sessions are signed and expire", async () => {
  const token = await createSession();
  assert.equal(await validSession(token), true);
  assert.equal(await validSession(), false);
  assert.equal(await validSession("true"), false);
  const [expiry, signature] = token.split(".");
  assert.equal(await validSession(`${Number(expiry) - 1}.${signature}`), false);
  assert.equal(await validSession(`1000000000.${signature}`), false);
  assert.equal(await validSession(`${expiry}.${"0".repeat(64)}`), false);
});
