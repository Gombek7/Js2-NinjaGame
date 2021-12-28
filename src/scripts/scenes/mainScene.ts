import FpsText from "../objects/fpsText"
import Player from "../objects/player";
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../constants';

export default class MainScene extends Phaser.Scene {
    fpsText;
    player;
    platforms;
    constructor() {
        super({ key: 'MainScene' })
    }
    
    create() {
        this.fpsText = new FpsText(this);

        let background = this.add.tileSprite(0, 28, 500, 300, 'background');
        background.setOrigin(0);
        background.setScrollFactor(0);//fixedToCamera = true;
        this.cameras.main.setBounds(0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT);
        this.physics.world.setBounds(0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT);

        this.player = new Player(this, 50, 100);
        
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(200, 240 + DEFAULT_HEIGHT/2, 'platform');
        this.platforms.create(300, 190 + DEFAULT_HEIGHT/2, 'platform');
        this.platforms.create(400, 140 + DEFAULT_HEIGHT/2, 'platform');
        this.platforms.create(450, 90 + DEFAULT_HEIGHT/2, 'platform');
        this.platforms.create(500, 140 + DEFAULT_HEIGHT/2, 'platform');
        this.platforms.create(600, 190 + DEFAULT_HEIGHT/2, 'platform');
        this.platforms.create(700, 240 + DEFAULT_HEIGHT/2, 'platform');
        this.platforms.getChildren().forEach(c => c.setScale(0.5).setOrigin(0).refreshBody());

        this.physics.add.collider(this.player, this.platforms);
    }

    update() {
        this.player.update();
        this.fpsText.update();
    }
}
