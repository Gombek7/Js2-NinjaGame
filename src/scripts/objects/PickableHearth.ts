import HittableObject from "./HittableObject"

export default class PickableHearth extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'hearth');
        scene.add.existing(this);
		scene.physics.add.existing(this);

        const body = this.body as Phaser.Physics.Arcade.Body //typescript hack
        body.setAllowGravity(false)

        this.setDisplaySize(50, 50);

        //animate
        this.scene.tweens.add({
            targets: this,
            y: this.y - 20,
            ease: 'Cubic.easeOut',
            duration: 500,
            repeat: -1,
            yoyo: true
        })

        this.body.onOverlap = true;
        scene.physics.world.on(Phaser.Physics.Arcade.Events.OVERLAP, this.overlapHandler, this);
    }

    overlapHandler(hearth, object){
        if(hearth != this)
          return;
        if(object instanceof(HittableObject))
        {
          object.Heal(1);
        }

        //TODO: Play some heal effect
        this.scene.tweens.add({
            targets: this,
            alpha:0,
            scale:1,
            ease: Phaser.Math.Easing.Sine.Out,
            duration: 500,
            repeat: 0,
            onComplete(tween, targets)
            {
              targets.forEach(e => e.destroy())
            }
        })
        this.scene.physics.world.off(Phaser.Physics.Arcade.Events.OVERLAP, this.overlapHandler, this);
      };
}
