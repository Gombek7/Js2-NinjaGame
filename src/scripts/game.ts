import 'phaser'
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from './constants'
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
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
