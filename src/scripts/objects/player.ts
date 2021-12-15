export default class Player extends Phaser.Physics.Arcade.Sprite {
	cursors;

	constructor(scene: Phaser.Scene, x, y) {
		super(scene, x, y, 'player');
		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.setCollideWorldBounds(true);
		this.setBounce(0.2);
		scene.cameras.main.startFollow(this);

		scene.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});

		scene.anims.create({
			key: 'front',
			frames: [{ key: 'player', frame: 4 }],
			frameRate: 20
		});

		scene.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		});

		this.cursors = scene.input.keyboard.createCursorKeys();
	}

	update() {
		if (this.cursors.left.isDown) {
			this.setVelocityX(-150);
			this.anims.play('left', true);
		}
		else if (this.cursors.right.isDown) {
			this.setVelocityX(150);
			this.anims.play('right', true);
		}
		else {
			this.setVelocityX(0);
			this.anims.play('front');
		}

		const body = this.body as Phaser.Physics.Arcade.Body; //typescript hack for onFloor() function
		if (this.cursors.up.isDown && (body.touching.down || body.onFloor())) {
			this.setVelocityY(-250);
		}
	}
}