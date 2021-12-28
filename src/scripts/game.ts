import 'phaser'
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_GRAVITY } from './constants'
import ExampleScene from './scenes/exampleScene'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'


const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, ExampleScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: DEFAULT_GRAVITY }
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
