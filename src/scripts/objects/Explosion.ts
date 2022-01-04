import { Scene } from "phaser";

export default class Explosion extends Phaser.Physics.Arcade.Sprite {
    /**
     * Creates, plays explosion and destroys when animation ends.
     * @param x x position of explosion
     * @param y y position of explosion
     */
    constructor(scene: Phaser.Scene, x, y)
    {
        super(scene, x, y,'explosion');
        scene.add.existing(this)

        this.on('animationcomplete-boom', (animation, frame)=>{
            this.destroy();
        });

        scene.anims.create({
            key: 'boom',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 23, frames: [0,1,2,3,4,5,6,13,14,15,16,17,18,19,20,21,22,23]}),
            frameRate: 30,
            repeat: 0
          });

          this.anims.play('boom');
    }
}