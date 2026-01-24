import {
    GAME_WIDTH,
    GAME_HEIGHT,
    GRAVITY,
    PIPE_GAP,
    PIPE_SPEED,
    PIPE_SPAWN_INTERVAL,
    GROUND_HEIGHT,
    BIRD_START_X,
    BIRD_START_Y
} from '../utils/constants.js';

import Bird from '../objects/Bird.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.gameOverTriggered = false;
    }

    create() {
        // Gravity
        this.physics.world.gravity.y = GRAVITY;

        // Bird
        this.bird = new Bird(this, BIRD_START_X, BIRD_START_Y);

        // Ground
        this.ground = this.physics.add.staticImage(
            GAME_WIDTH / 2,
            GAME_HEIGHT - GROUND_HEIGHT / 2,
            'pipe'
        );
        this.ground.setScale(GAME_WIDTH / this.ground.width, GROUND_HEIGHT / this.ground.height);
        this.ground.refreshBody();

        // Pipes group
        this.pipes = this.physics.add.group();

        // Score
        this.score = 0;
        this.scoreText = this.add.text(GAME_WIDTH / 2, 40, '0', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5).setDepth(10);

        // Pipe timer
        this.pipeTimer = this.time.addEvent({
            delay: PIPE_SPAWN_INTERVAL,
            callback: this.spawnPipes,
            callbackScope: this,
            loop: true
        });

        // Collisions
        this.physics.add.collider(this.bird.sprite, this.ground, this.gameOver, null, this);
        this.physics.add.collider(this.bird.sprite, this.pipes, this.gameOver, null, this);

        // Controls
        this.input.keyboard.on('keydown-SPACE', () => this.bird.jump());
        this.input.keyboard.on('keydown-UP', () => this.bird.jump());
    }

    update() {
        if (this.gameOverTriggered) return;

        this.bird.update();

        this.pipes.getChildren().forEach(pipe => {
            pipe.setVelocityX(-PIPE_SPEED);

            // Score logic
            if (pipe.isScoreZone && !pipe.scored && pipe.x < this.bird.sprite.x) {
                pipe.scored = true;
                this.score++;
                this.scoreText.setText(this.score);
                this.sound.play('score');
            }

            if (pipe.x < -50) {
                pipe.destroy();
            }
        });

        // Out of bounds
        if (this.bird.sprite.y < 0 || this.bird.sprite.y > GAME_HEIGHT) {
            this.gameOver();
        }
    }

    spawnPipes() {
        const centerY = Phaser.Math.Between(150, GAME_HEIGHT - 150);

        // Top pipe
        const topPipe = this.pipes.create(GAME_WIDTH + 50, centerY - PIPE_GAP / 2, 'pipe')
            .setOrigin(0.5, 1);
        topPipe.body.allowGravity = false;

        // Bottom pipe
        const bottomPipe = this.pipes.create(GAME_WIDTH + 50, centerY + PIPE_GAP / 2, 'pipe')
            .setOrigin(0.5, 0);
        bottomPipe.body.allowGravity = false;

        // Invisible scoring zone
        const scoreZone = this.pipes.create(GAME_WIDTH + 50, centerY, null);
        scoreZone.body.setSize(10, PIPE_GAP);
        scoreZone.body.allowGravity = false;
        scoreZone.visible = false;
        scoreZone.isScoreZone = true;
        scoreZone.scored = false;
    }

    gameOver() {
        if (this.gameOverTriggered) return;

        this.gameOverTriggered = true;
        this.sound.play('hit');

        this.physics.pause();
        this.pipeTimer.remove();

        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'GAME OVER\nPress R to Restart', {
            fontSize: '24px',
            fill: '#fff',
            align: 'center'
        }).setOrigin(0.5);

        this.input.keyboard.once('keydown-R', () => this.scene.restart());
    }
}
