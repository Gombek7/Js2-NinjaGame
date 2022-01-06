import { DestroyablesLayer, TrapsLayer } from '../utils/CollisionLayers';
import HittableObject from './HittableObject'
import PickableHearth from './PickableHearth';

export default class HearthCrate extends HittableObject {
    constructor(scene: Phaser.Scene, x, y) {
        super(scene, x, y, 'hearth_crate')
        this.setCollideWorldBounds(true)
        DestroyablesLayer.add(this)
        
        this.setDisplaySize(50, 50)
        this.MaxHP = 2;
        this.CurrentHP = 2;
        this.healthBarOffset.x = -25;
        this.healthBarOffset.y = -10;
        
    }
    update(time, delta) {
        const body = this.body as Phaser.Physics.Arcade.Body //typescript hack for onFloor() function
        if(body)
        {
            if (body.touching.down || body.onFloor()) {
                this.setDragX(400);
            }
        }
        super.update(time, delta)
    }

    onDead(){
        this.isHealthbarHidden = true;
        new PickableHearth(this.scene, this.x, this.y);
        DestroyablesLayer.remove(this)
        this.scene.tweens.add({
            targets: this,
            alpha:0,
            scale:0,
            rotation:3.14,
            ease: Phaser.Math.Easing.Cubic.Out,
            duration: 500,
            repeat: 0,
            onComplete(tween, targets)
            {
              targets.forEach(e => e.destroy())
            }
        })
    }
}