'use strict';

var tracking = {
  startPreload() {
    mixpanel.track('Start preload')
  },

  finishPreload(totalTime) {
    mixpanel.track('Finish preload', {
      totalTimeMS: totalTime
    })
  },

  mainMenu() {
    mixpanel.track('Main menu');
  },

  startGame() {
    mixpanel.track('Start game');
  },

  died(wave, livesLeft) {
    mixpanel.track('Died', {
      wave: wave,
      livesLeft: livesLeft
    });
  }
};

export default tracking;
