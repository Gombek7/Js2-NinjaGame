import UpdateList from "../scenes/UpdateList";
import HittableObject from "./HittableObject";

export default class Saw extends Phaser.Physics.Arcade.Sprite{
    static HIT_DELAY = 700;
    attackedObjects: Object[]
    static KNOCKBACK_STRENGTH = 200;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'saw');
        scene.add.existing(this);
		scene.physics.add.existing(this);
        UpdateList.push(this);
        
        const body = this.body as Phaser.Physics.Arcade.Body; //typescript hack
        body.setAllowGravity(false);

        this.setDisplaySize(50, 50);
        this.setAngularVelocity(-200);

        this.attackedObjects = [];
        setInterval(()=>{
            this.attackedObjects = [];
        }, Saw.HIT_DELAY);

        this.body.onOverlap = true;
        scene.physics.world.on(Phaser.Physics.Arcade.Events.OVERLAP, this.overlapHandler, this);
    }

    overlapHandler(saw, object){
        if(saw != this)
          return;
        if(object instanceof(HittableObject) && !this.attackedObjects.includes(object))
        {
          let direction = object.body.position.clone().subtract(this.body.position).normalize();
          object.body.velocity.add(direction.scale(Saw.KNOCKBACK_STRENGTH));
          this.attackedObjects.push(object)
          object.Hit(1);
        }
    };

    destroy(){
        this.scene.physics.world.off(Phaser.Physics.Arcade.Events.OVERLAP, this.overlapHandler, this)
        
        const index = UpdateList.indexOf(this);
		if (index > -1)
			UpdateList.splice(index, 1);

        super.destroy();
    }
}