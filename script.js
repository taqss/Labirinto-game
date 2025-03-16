

class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    preload() {
        this.load.image('startButton', 'assets/start.png');
        this.load.image('backgroundMenu', 'assets/background_menu.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundMenu');
        this.add.text(250, 100, "Jogo do Labirinto", { fontSize: "48px", fill: "#fff" });
        let startButton = this.add.image(400, 400, 'startButton').setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
        this.score = 0;
        this.hasKey = false;
    }

    preload() {
        this.load.image('player', 'assets/player.png');
        this.load.image('key', 'assets/key.png');
        this.load.image('enemy', 'assets/enemy.png');
        this.load.image('door', 'assets/door.png');
        this.load.tilemapTiledJSON('map', 'assets/map.json');
        this.load.image('tiles', 'assets/tileset.png');
        this.load.image('backgroundGame', 'assets/background_game.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundGame');
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("tileset", "tiles");
        map.createLayer("Ground", tileset, 0, 0);
        
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        
        this.spawnKey();
        this.door = this.physics.add.sprite(500, 200, 'door');
        this.physics.add.overlap(this.player, this.door, this.enterDoor, null, this);
        
        this.enemy = this.physics.add.sprite(400, 200, 'enemy');
        this.enemy.setVelocity(100, 100);
        this.enemy.setBounce(1, 1);
        this.enemy.setCollideWorldBounds(true);

        this.scoreText = this.add.text(16, 16, 'Placar: 0', { fontSize: '32px', fill: '#fff' });

        this.physics.add.overlap(this.player, this.keyItem, this.collectKey, null, this);
        this.physics.add.overlap(this.player, this.enemy, () => {
            this.scene.start('GameOverScene');
        });

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
        }
    }

    spawnKey() {
        if (this.keyItem) {
            this.keyItem.destroy();
        }
        let x = Phaser.Math.Between(50, 750);
        let y = Phaser.Math.Between(50, 550);
        this.keyItem = this.physics.add.sprite(x, y, 'key');
        this.physics.add.overlap(this.player, this.keyItem, this.collectKey, null, this);
        this.hasKey = false;
    }

    collectKey(player, key) {
        this.score += 10;
        this.scoreText.setText('Placar: ' + this.score);
        key.destroy();
        this.hasKey = true;
    }

    enterDoor(player, door) {
        if (this.hasKey) {
            this.scene.start('MenuScene2');
        }
    }
}

class MenuScene2 extends Phaser.Scene {
    constructor() {
        super("MenuScene2");
    }

    preload() {
        this.load.image('startButton', 'assets/start.png');
        this.load.image('backgroundMenu', 'assets/background_menu.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundMenu');
        this.add.text(250, 100, "Jogo do Labirinto - Fase Final", { fontSize: "20px", fill: "#fff" });
        let startButton = this.add.image(400, 400, 'startButton').setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene2');
        });
    }
}


class GameScene2 extends Phaser.Scene {
    constructor() {
        super("GameScene2");
        this.score = 0;
        this.hasKey2 = false;
    }

    preload() {
        this.load.image('player2', 'assets/player.png');
        this.load.image('key2', 'assets/key.png');
        this.load.image('enemy2', 'assets/enemy.png');
        this.load.image('door2', 'assets/door.png');
        this.load.tilemap2TiledJSON('map2', 'assets/map2.json');
        this.load.image('tiles2', 'assets/tileset.png');
        this.load.image('backgroundGame2', 'assets/background_game2.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundGame2');
        const map = this.make.tilemap2({ key: "map2" });
        const tileset = map.addTilesetImage("tileset", "tiles2");
        map.createLayer("Ground2", tileset, 0, 0);
        
        this.player2 = this.physics.add.sprite(100, 100, 'player2');
        this.player2.setCollideWorldBounds(true);
        this.player2.setBounce(0.2);
        
        this.spawnKey2();
        this.door2 = this.physics.add.sprite(500, 200, 'door2');
        this.physics.add.overlap(this.player2, this.door2, this.enterDoor, null, this);
        
        this.enemy2 = this.physics.add.sprite(400, 200, 'enemy2');
        this.enemy2.setVelocity(500, 450);
        this.enemy2.setBounce(1, 1);
        this.enemy2.setCollideWorldBounds(true);

        this.scoreText = this.add.text(16, 16, 'Placar: 0', { fontSize: '32px', fill: '#fff' });

        this.physics.add.overlap(this.player2, this.keyItem2, this.collectKey2, null, this);
        this.physics.add.overlap(this.player2, this.enemy2, () => {
            this.scene.start('GameOverScene');
        });

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.player2.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player2.setVelocityX(160);
        }

        if (this.cursors.up.isDown) {
            this.player2.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.player2.setVelocityY(160);
        }
    }

    spawnKey() {
        if (this.keyItem2) {
            this.keyItem2.destroy();
        }
        let x = Phaser.Math.Between(50, 750);
        let y = Phaser.Math.Between(50, 550);
        this.keyItem2 = this.physics.add.sprite(x, y, 'key2');
        this.physics.add.overlap(this.player2, this.keyItem2, this.collectKey2, null, this);
        this.hasKey2 = false;
    }

    collectKey2(player, key2) {
        this.score += 10;
        this.scoreText.setText('Placar: ' + this.score);
        key2.destroy();
        this.hasKey2 = true;
    }

    enterDoor(player2, door2) {
        if (this.hasKey2) {
            this.scene.start('WinScene');
        }
    }
}

class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    preload() {
        this.load.image('backgroundGameOver', 'assets/background_gameover.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundGameOver');
        this.add.text(300, 100, "Game Over", { fontSize: "48px", fill: "#f00" });
        this.input.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}

class WinScene extends Phaser.Scene {
    constructor() {
        super("WinScene");
    }

    preload() {
        this.load.image('backgroundWin', 'assets/background_win.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundWin');
        this.add.text(300, 100, "Você Ganhou!", { fontSize: "48px", fill: "#0f0" });
        this.input.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: { default: 'arcade', arcade: { debug: false } },
    scene: [MenuScene, MenuScene2, GameScene, GameScene2, GameOverScene, WinScene]
};

const game = new Phaser.Game(config);
