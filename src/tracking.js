var tracking = {
  startPreload() {
    // mixpanel.track('Start preload');
  },

  finishPreload(totalTimeMS) {
    // mixpanel.track('Finish preload', {
    //   totalTimeMS
    // });
  },

  mainMenu() {
    // mixpanel.track('Main menu');
  },

  instructions() {
    // mixpanel.track('Instructions');
  },

  options() {
    // mixpanel.track('Options');
  },

  startGame() {
    // mixpanel.track('Start game');
  },

  died(wave, livesLeft) {
    // mixpanel.track('Died', {
    //   wave,
    //   livesLeft
    // });
  },

  newWave(wave) {
    // mixpanel.track('New wave', {
    //   wave
    // });
  },

  bomb(wave, livesLeft, bombsLeft) {
    // mixpanel.track('Bomb', {
    //   wave,
    //   livesLeft,
    //   bombsLeft
    // });
  }
};

export default tracking;
