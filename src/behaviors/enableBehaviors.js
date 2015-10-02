'use strict';

export default function enableBehaviors(sprite) {
  sprite.behaviors = [];
  Phaser.Utils.mixinPrototype(sprite, behaviorsProto);
  sprite.events.onDestroy.addOnce(removeAllBehaviors, sprite);
}

function removeAllBehaviors(sprite) {
  for (var i = sprite.behaviors.length - 1; i >= 0; i--) {
    var behavior = sprite.behaviors[i];
    behavior.removed(sprite);
  }
  sprite.behaviors.length = 0;
}

var behaviorsProto = {
  behave: function(methodName) {
    var length = this.behaviors.length;
    for (var i = 0; i < length; i++) {
      var behavior = this.behaviors[i];
      if (!behavior || !behavior.enabled) {
        continue;
      }
      var args = Array.prototype.slice.call(arguments, 1);
      if (behavior[methodName]) {
        behavior[methodName](this, ...args);
      }
    }
  },

  addBehavior: function(behavior) {
    this.behaviors.push(behavior);
    behavior.added(this);
  },

  removeBehavior: function(behavior) {
    var index = this.behaviors.indexOf(behavior);
    if (index === -1) {
      return;
    }
    behavior.removed(this);
    this.behaviors.splice(index, 1);
  },

  setOtherBehaviorsEnabled: function(behavior, enabled) {
    enabled = !!enabled;
    this.behaviors.forEach(function(b) {
      if (b !== behavior) {
        b.enabled = enabled;
      }
    });
  }
};
