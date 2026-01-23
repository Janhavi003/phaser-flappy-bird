import { GRAVITY, FLAP_VELOCITY, BIRD_SCALE } from '../utils/constants.js'

export default class Bird extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bird')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setScale(BIRD_SCALE)
    this.setGravityY(GRAVITY)
    this.setCollideWorldBounds(true)

    // Fair hitbox
    this.body.setSize(this.width * 0.6, this.height * 0.6)
    this.body.setOffset(this.width * 0.2, this.height * 0.2)
  }

  flap() {
    this.setVelocityY(FLAP_VELOCITY)
    this.setAngle(-15)
  }

  update() {
    if (this.body.velocity.y > 0) {
      this.setAngle(20)
    }

    this.body.velocity.y = Phaser.Math.Clamp(
      this.body.velocity.y,
      -450,
      600
    )
  }
}
