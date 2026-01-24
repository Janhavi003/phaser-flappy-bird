import { GAME_WIDTH, GAME_HEIGHT } from '../utils/constants.js';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        this.add.text(GAME_WIDTH / 2, 200, 'FLAPPY BIRD', {
            fontSize: '40px',
            fill: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(GAME_WIDTH / 2, 300, 'Press SPACE or ↑ to Start', {
            fontSize: '18px',
            fill: '#fff'
        }).setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => this.scene.start('GameScene'));
        this.input.keyboard.once('keydown-UP', () => this.scene.start('GameScene'));
    }
}
