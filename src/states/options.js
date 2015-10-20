'use strict';

import BaseIntro from './baseIntro';
import tracking from '../tracking';
import BlasterButton from '../sprites/blasterButton';

export default class Options extends BaseIntro {
  create() {
    super.create();
    tracking.options();
  }
}
