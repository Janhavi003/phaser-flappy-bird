import { BIRD_JUMP_FORCE } from '../utils/constants.js';

export default class Bird {
    constructor(scene, x, y) {
        this.scene = scene;

        this.sprite = scene.physics.add.sprite(x, y, 'bird');
        this.sprite.setScale(0.25);
        this.sprite.setCollideWorldBounds(false);

        // VERY IMPORTANT
        this.sprite.body.setGravityY(0); // world gravity applies
    }

    jump() {
        this.sprite.setVelocityY(BIRD_JUMP_FORCE);
        this.sprite.setAngle(-20);
        this.scene.sound.play('flap');
    }

    update() {
        
        if (this.sprite.angle < 90) {
            this.sprite.angle += 2;
        }
    }
}
