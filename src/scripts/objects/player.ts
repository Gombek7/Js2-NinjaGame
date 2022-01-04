import HearthsUI from "./HearthsUI";
import HittableObject from "./HittableObject";

export default class Player extends HittableObject {
	isAttacking: boolean;

	#hearthsUI: HearthsUI;
	#cursors;
	#speed = 300;
	#jumpSpeed = 400;
	#mass = 1;

	constructor(scene: Phaser.Scene, x, y) {
		super(scene, x, y, 'player');
		this.body.setSize(this.body.width * 0.6, this.body.height * 0.85); //set smaller hitbox
		this.body.setMass(100);
		this.setCollideWorldBounds(true);
		//this.setBounce(0.2);
		scene.cameras.main.startFollow(this);

		scene.anims.create({
		key: 'run',
		frames: this.anims.generateFrameNumbers('player', { start: 3, end: 6 }),
		frameRate: 10,
		repeat: -1
		})

		scene.anims.create({
		key: 'front',
		frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
		frameRate: 5,
		repeat: 1
		})

		scene.anims.create({
		key: 'attack',
		frames: this.anims.generateFrameNumbers('player_attacks', { start: 0, end: 3 }),
		frameRate: 10
		})

		this.#cursors = scene.input.keyboard.createCursorKeys();

		//Hp config
		this.MaxHP = 10;
		this.CurrentHP = 7;
		this.#hearthsUI = new HearthsUI(this.scene);
		this.#hearthsUI.update(this.CurrentHP, this.MaxHP);
		//test hits
		/*
		setInterval(()=>
		{
			this.Hit(1);
		},1000);
		*/
	}

	update() {
		super.update();
		if (this.#cursors.left.isDown) {
			this.setVelocityX(-this.#speed);
			this.anims.play('run', true);
			this.flipX = true;
		}
		else if (this.#cursors.right.isDown) {
			this.setVelocityX(this.#speed);
			this.anims.play('run', true);
			this.flipX = false;
		}
		else if (this.#cursors.space.isDown) {
			this.anims.play('attack', true)
      if (this.flipX) {
        this.setVelocityX(-this.#speed)
      } else {
        this.setVelocityX(this.#speed)
      }
		}
		else {
			this.setVelocityX(0);
			this.anims.play('front');
		}

    const body = this.body as Phaser.Physics.Arcade.Body //typescript hack for onFloor() function
    if (this.#cursors.up.isDown && (body.touching.down || body.onFloor())) {
      this.setVelocityY(-this.#jumpSpeed)
    }
  }

  Hit(damage: number): void {
	  super.Hit(damage);

	  this.#hearthsUI.update(this.CurrentHP, this.MaxHP);
  }
}
