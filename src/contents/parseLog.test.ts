import { expect, test } from "vitest";
import { JSDOM } from "jsdom";

import { Category, Action, parseCard, parseLog } from "./parseLog";

import heatCard from "/mockData/cards/heat.html?raw";
import moveLog from "/mockData/logs/move.html?raw";
import dropLog from "/mockData/logs/drop.html?raw";
import playLog from "/mockData/logs/play.html?raw";
import { describe } from "node:test";

function convertToDom(htmlContent: string) {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  return document.body.firstElementChild as HTMLElement | null;
}

describe("parseCard", () => {
  test("parse HEAT card", () => {
    const heatCardDom = convertToDom(heatCard);
    expect(parseLog(heatCardDom)).toEqual({ category: Category.HEAT });
  });
});

describe("parseLog", () => {
  test("parse MOVE", () => {
    const moveLogDom = convertToDom(moveLog);
    expect(parseLog(moveLogDom)).toEqual({ action: Action.MOVE });
  });

  test("parse DROP", () => {
    const dropLogDom = convertToDom(dropLog);
    expect(parseLog(dropLogDom)).toEqual({ action: Action.DROP });
  });

  test("parse PLAY", () => {
    const playLogDom = convertToDom(playLog);
    expect(parseLog(playLogDom)).toEqual({
      action: Action.PLAY,
      gear: 4,
      cards: ["2", "4", "4", "stress"],
    });
  });
});
