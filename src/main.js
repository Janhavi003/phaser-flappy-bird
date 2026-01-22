import BootScene from './scenes/BootScene.js'
import MenuScene from './scenes/MenuScene.js'
import GameScene from './scenes/GameScene.js'

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 600,
  backgroundColor: '#70c5ce',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 900 },
      debug: false
    }
  },
  scene: [BootScene, MenuScene, GameScene]
}

new Phaser.Game(config)
