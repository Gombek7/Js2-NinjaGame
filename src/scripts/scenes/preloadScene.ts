export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    //images
    this.load.image('background', 'assets/img/background.jpg');
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')

    //sprites
    this.load.image('platform', 'assets/sprites/block.png');
    this.load.image('hearth', 'assets/sprites/hearth.png');
    this.load.image('empty_hearth', 'assets/sprites/empty_hearth.png');

    //spritessheets
    this.load.spritesheet('player', 'assets/spritesheets/ninja.png',
        { frameWidth: 120, frameHeight: 120 }
    );
    this.load.spritesheet('player_attacks', 'assets/spritesheets/ninja_attacks.png',
        { frameWidth: 180, frameHeight: 120 }
    );


  }

  create() {
    //this.scene.start('ExampleScene')
    this.scene.start('MainScene');

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
