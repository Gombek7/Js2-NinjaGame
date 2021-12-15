import FpsText from "../objects/fpsText"
import Player from "../objects/player";

export default class MainScene extends Phaser.Scene {
    fpsText;
    player;
    platforms;
    constructor() {
        super({ key: 'MainScene' })
    }
    preload() {
        this.load.baseURL = 'https://examples.phaser.io/assets/';
        this.load.crossOrigin = 'anonymous';
        this.load.image('background', 'games/starstruck/background.png');
        this.load.image('platform', 'sprites/block.png');
  
        this.load.spritesheet('player', 'games/starstruck/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create() {
        this.fpsText = new FpsText(this);

        let background = this.add.tileSprite(0, 28, 500, 300, 'background');
        background.setOrigin(0);
        background.setScrollFactor(0);//fixedToCamera = true;
        this.cameras.main.setBounds(0, 0, 900, 300);
        this.physics.world.setBounds(0, 0, 900, 300);

        this.player = new Player(this, 50, 100);
        
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(200, 240, 'platform');
        this.platforms.create(300, 190, 'platform');
        this.platforms.create(400, 140, 'platform');
        this.platforms.create(450, 90, 'platform');
        this.platforms.create(500, 140, 'platform');
        this.platforms.create(600, 190, 'platform');
        this.platforms.create(700, 240, 'platform');
        this.platforms.getChildren().forEach(c => c.setScale(0.5).setOrigin(0).refreshBody());

        this.physics.add.collider(this.player, this.platforms);
    }

    update() {
        this.player.update();
        this.fpsText.update();
    }
}
