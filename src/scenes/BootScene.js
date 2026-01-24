export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('bird', 'assets/images/bird.png');
        this.load.image('pipe', 'assets/images/pipe.png');

        this.load.audio('flap', 'assets/audio/flap.mp3');
        this.load.audio('score', 'assets/audio/score.mp3');
        this.load.audio('hit', 'assets/audio/hit.mp3');
    }

    create() {
        this.scene.start('MenuScene');
    }
}
