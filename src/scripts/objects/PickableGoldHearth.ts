import UpdateList from "../scenes/UpdateList";
import { PickablesLayer } from "../utils/CollisionLayers";
import HittableObject from "./HittableObject"

export default class PickableGoldHearth extends Phaser.Physics.Arcade.Sprite {
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, 'gold_hearth');
		scene.add.existing(this);
		scene.physics.add.existing(this);
		PickablesLayer.add(this);

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

	overlapHandler(hearth, object) {
		if (hearth != this)
			return;
		if (object instanceof (HittableObject)) {
			object.MaxHP += 1;
			object.CurrentHP += 1;
		}

		this.scene.tweens.add({
			targets: this,
			alpha: 0,
			scale: 1,
			ease: Phaser.Math.Easing.Sine.Out,
			duration: 500,
			repeat: 0,
			onComplete(tween, targets) {
				targets.forEach(e => e.destroy())
			}
		})
		this.scene.physics.world.off(Phaser.Physics.Arcade.Events.OVERLAP, this.overlapHandler, this);
	};

	destroy(fromScene?: boolean): void {
		PickablesLayer.remove(this);
		super.destroy(fromScene);
	}
}
