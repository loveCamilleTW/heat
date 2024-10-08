export enum Category {
  SPEED,
  HEAT,
  STRESS,
  SPONSOR,
  UPGRADE,
}

export enum Action {
  PLAY,
  BOOST,
  RETURN,
  COOL_DOWN,

  MOVE,
  DROP,
  INFO,
}

export function parseLogs(dom: Element | null) {
  if (!dom?.textContent) {
    return null;
  }

  const logDoms = dom.getElementsByClassName("log");
  const logs = Array.from(logDoms).map((logDom) => parseLog(logDom));
  
  return logs;
}

export function parseLog(dom: Element | null) {
  if (!dom?.textContent) {
    return null;
  }

  const roundedboxDom = dom.getElementsByClassName("roundedbox")[0];
  if (!roundedboxDom.textContent) {
    return null;
  }

  const movePattern = /將他的賽車往前移動(\d+)格/;
  if (movePattern.test(roundedboxDom.textContent)) {
    return { action: Action.MOVE };
  }

  const dropPattern = /棄置已打出的卡牌/;
  if (dropPattern.test(roundedboxDom.textContent)) {
    return { action: Action.DROP };
  }

  const playPattern = /將檔位切換至 (\d+) 並打出/;
  const playMatch = roundedboxDom.textContent.match(playPattern);
  if (playMatch) {
    const player = roundedboxDom.getElementsByTagName("span")[0].innerHTML;
    const gear = parseInt(playMatch[1], 10);
    const cardDoms = roundedboxDom.getElementsByClassName("log-card-image");
    const cards = Array.from(cardDoms).map((cardDom) => parseCard(cardDom));

    return {
      action: Action.PLAY,
      player,
      gear,
      cards,
    };
  }

  const boostPattern = /以發動/;
  const boostPattern2 = /符號/;
  if (
    boostPattern.test(roundedboxDom.textContent) &&
    boostPattern2.test(roundedboxDom.textContent)
  ) {
    const player = roundedboxDom.getElementsByTagName("span")[0].innerHTML;
    const cardDoms = roundedboxDom.getElementsByClassName("log-card-image");
    const cards = Array.from(cardDoms).map((cardDom) => parseCard(cardDom));

    return {
      action: Action.BOOST,
      player,
      cards,
    };
  }

  const coolDownPattern = /冷卻熱量(\d+)/;
  const coolDownMatch = roundedboxDom.textContent.match(coolDownPattern);
  if (coolDownMatch) {
    const player = roundedboxDom.getElementsByTagName("span")[0].innerHTML;
    const heat = parseInt(coolDownMatch[1], 10);
    return {
      action: Action.COOL_DOWN,
      player,
      heat,
    };
  }

  const returnPattern = /放回牌庫頂部/;
  if (returnPattern.test(roundedboxDom.textContent)) {
    const player = roundedboxDom.getElementsByTagName("span")[0].innerHTML;
    const cardDoms = roundedboxDom.getElementsByClassName("log-card-image");
    const cards = Array.from(cardDoms).map((cardDom) => parseCard(cardDom));

    return {
      action: Action.RETURN,
      player,
      cards,
    };
  }

  return { action: Action.INFO };
}

/**
 * 輸入範例
 *  <div
 *    class="log-card-image"
 *    style="--personal-card-background-y: 66.66666666666667%"
 *    data-symbols="2"
 *  >
 *    <div class="card personal-card" data-side="front">
 *      <div class="card-sides">
 *        <div
 *          class="card-side front upgrade-card"
 *          style="background-position: -100% -300%"
 *        >
 *          <div class="text">懸吊系統</div>
 *        </div>
 *      </div>
 *    </div>
 *  </div>
 *
 */
export function parseCard(cardDom: Element | null) {
  if (!cardDom) return null;
  const cardSideDom = cardDom.getElementsByClassName("card-side")[0];

  if (cardSideDom.classList.contains("stress")) {
    return { category: Category.STRESS };
  }
  if (cardSideDom.classList.contains("heat")) {
    return { category: Category.HEAT };
  }
  if (cardSideDom.classList.contains("upgrade-card")) {
    return {
      category: Category.UPGRADE,
      upgrade: cardSideDom.textContent?.trim(),
    };
  }
  if (cardSideDom.classList.contains("sponsor-card")) {
    return {
      category: Category.SPONSOR,
      sponsor: cardSideDom.textContent?.trim(),
    };
  }

  const speed = Number(cardSideDom.getAttribute("data-col"));
  return {
    category: Category.SPEED,
    speed,
  };
}
