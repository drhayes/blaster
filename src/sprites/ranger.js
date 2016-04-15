import Enemy from './enemy';
import OrbitPlayer from '../behaviors/orbitPlayer';
import ShootPlayer from '../behaviors/shootPlayer';

export default class Ranger extends Enemy {
constructor(game, x, y) {
super(game, x, y, 'blueenemy', 0);

this.addBehavior(new OrbitPlayer());
this.addBehavor(new ShootPlayer());

this.anchor.set(0.5);
this.body.width = 20;
this.body.height = 30;
this.body.bounce.set(0.6);

this.health = 40;
this.score = 600;




}
}