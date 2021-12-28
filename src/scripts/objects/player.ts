export default class Player extends Phaser.Physics.Arcade.Sprite {
	cursors;
	#speed = 300;
	#jumpSpeed = 400;
	#mass = 1;
	constructor(scene: Phaser.Scene, x, y) {
		super(scene, x, y, 'player');
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.body.setSize(this.body.width*0.6, this.body.height*0.85); //set smaller hitbox
		this.body.setMass(100);

		this.setCollideWorldBounds(true);
		//this.setBounce(0.2);
		scene.cameras.main.startFollow(this);

		scene.anims.create({
			key: 'run',
			frames: this.anims.generateFrameNumbers('player', { start: 3, end: 6}),
			frameRate: 10,
			repeat: -1
		});

		scene.anims.create({
			key: 'front',
			frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3}),
			frameRate: 5,
			repeat: 1
		});

		this.cursors = scene.input.keyboard.createCursorKeys();
	}

	update() {
		if (this.cursors.left.isDown) {
			this.setVelocityX(-this.#speed);
			this.anims.play('run', true);
			this.flipX = true;
		}
		else if (this.cursors.right.isDown) {
			this.setVelocityX(this.#speed);
			this.anims.play('run', true);
			this.flipX = false;
		}
		else {
			this.setVelocityX(0);
			this.anims.play('front');
		}

		const body = this.body as Phaser.Physics.Arcade.Body; //typescript hack for onFloor() function
		if (this.cursors.up.isDown && (body.touching.down || body.onFloor())) {
			this.setVelocityY(-this.#jumpSpeed);
		}
	}
}