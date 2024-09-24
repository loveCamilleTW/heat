export enum Action {
  PLAY,
  MOVE,
  DROP,
}

export function parseLog(dom: HTMLElement | null) {
  if (!dom?.textContent) {
    return null;
  }

  const roundedboxDom = dom.getElementsByClassName("roundedbox")[0];
  if (!roundedboxDom.textContent) {
    return null;
  }

  // console.log('outerHTML\n', dom.outerHTML);
  // console.log('textContent\n', dom.textContent);

  const movePattern = /將他的賽車往前移動(\d+)格/;
  if (movePattern.test(roundedboxDom.textContent)) {
    return { action: Action.MOVE };
  }

  const dropPattern = /棄置已打出的卡牌/;
  if (dropPattern.test(roundedboxDom.textContent)) {
    return { action: Action.DROP };
  }

  const playPattern = /將檔位切換至 (\d+) 並打出/;
  const match = roundedboxDom.textContent.match(playPattern);
  if (match) {
    const gear = parseInt(match[1], 10);
    const cardDoms = roundedboxDom.getElementsByClassName("log-card-image");
    const cards: string[] = [];
    Array.from(cardDoms).forEach((cardDom) => {
      const cardSideDom = cardDom.getElementsByClassName("card-side")[0];
      
      if (cardSideDom.classList.contains('stress')) {
        cards.push('stress');
      }
      else {
        const speed = cardSideDom.getAttribute("data-col");
        if (speed) cards.push(speed);
      }
    });

    return {
      action: Action.PLAY,
      gear,
      cards,
    };
  }
}
