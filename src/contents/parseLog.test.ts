import { expect, test } from "vitest";
import { JSDOM } from "jsdom";

import { Category, Action, parseCard, parseLog, parseLogs } from "./parseLog";

import speedCard from "/mockData/cards/speed.html?raw";
import heatCard from "/mockData/cards/heat.html?raw";
import stressCard from "/mockData/cards/stress.html?raw";
import upgradeCard from "/mockData/cards/upgrade.html?raw";
import sponsorCard from "/mockData/cards/sponsor.html?raw";
import sponsorCard2 from "/mockData/cards/sponsor2.html?raw";

import moveLog from "/mockData/logs/move.html?raw";
import dropLog from "/mockData/logs/drop.html?raw";
import playLog from "/mockData/logs/play.html?raw";
import boostLog from "/mockData/logs/boost.html?raw";
import returnLog from "/mockData/logs/return.html?raw";
import coolDownLog from "/mockData/logs/coolDown.html?raw";

import mockLogs from "/mockData/logs/mockLogs.html?raw";
import { describe } from "node:test";

function convertToDom(htmlContent: string) {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  return document.body.firstElementChild as HTMLElement | null;
}

describe("parseCard", () => {
  test("parse SPEED card", () => {
    const speedCardDom = convertToDom(speedCard);
    expect(parseCard(speedCardDom)).toEqual({
      category: Category.SPEED,
      speed: 3,
    });
  });

  test("parse HEAT card", () => {
    const heatCardDom = convertToDom(heatCard);
    expect(parseCard(heatCardDom)).toEqual({ category: Category.HEAT });
  });

  test("parse STRESS card", () => {
    const stressCardDom = convertToDom(stressCard);
    expect(parseCard(stressCardDom)).toEqual({ category: Category.STRESS });
  });

  test("parse UPGRADE card", () => {
    const stressCardDom = convertToDom(stressCard);
    expect(parseCard(stressCardDom)).toEqual({ category: Category.STRESS });
  });

  test("parse SPONSOR card", () => {
    const sponsorCardDom = convertToDom(sponsorCard);
    expect(parseCard(sponsorCardDom)).toEqual({
      category: Category.SPONSOR,
      sponsor: "Dramdo Brakes",
    });
  });

  test("parse SPONSOR card(2)", () => {
    const sponsorCardDom = convertToDom(sponsorCard2);
    expect(parseCard(sponsorCardDom)).toEqual({
      category: Category.SPONSOR,
      sponsor: "Lord&Co. T.B.",
    });
  });

  test("parse UPGRADE card", () => {
    const upgradeCardDom = convertToDom(upgradeCard);
    expect(parseCard(upgradeCardDom)).toEqual({
      category: Category.UPGRADE,
      upgrade: "輪胎",
    });
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
      player: 'nandom111',
      gear: 4,
      cards: [
        { category: Category.SPEED, speed: 2 },
        { category: Category.SPEED, speed: 4 },
        { category: Category.SPEED, speed: 4 },
        { category: Category.STRESS },
      ],
    });
  });
  
  test("parse COOL_DOWN", () => {
    const coolDownLogDom = convertToDom(coolDownLog);
    expect(parseLog(coolDownLogDom)).toEqual({
      action: Action.COOL_DOWN,
      player: 'loveCamilleTW',
      heat: 1,
    });
  });

  test("parse BOOST", () => {
    const boostLogDom = convertToDom(boostLog);
    expect(parseLog(boostLogDom)).toEqual({
      action: Action.BOOST,
      player: 'nandom111',
      cards: [
        { category: Category.SPEED, speed: 1 },
      ],
    });
  });

  test("parse RETURN", () => {
    const returnLogDom = convertToDom(returnLog);
    expect(parseLog(returnLogDom)).toEqual({
      action: Action.RETURN,
      player: 'loveCamilleTW',
      cards: [
        { category: Category.UPGRADE, upgrade: '懸吊系統' },
      ],
    });
  });
});

describe.skip('parseLogs', () => {
  test("parseLogs(1)", () => {
    const mockLogsDom = convertToDom(mockLogs);
    // expect(parseLogs(mockLogsDom)).toEqual({ action: Action.DROP });
    console.log(JSON.stringify(parseLogs(mockLogsDom), null, 2));
  });
})