export default class Game extends Phaser.Scene {
    constructor() {

      super("game");
    }
  
    init() {

        this.perder = false;
        this.nivel = 1;

    }
  
    preload() {

        this.load.image("plataforma", "./assets/plataforma.png");
        this.load.image("pelota", "./assets/pelota.png");
        this.load.image("obstaculo", "./assets/obstaculo.png");

    }
  
    create() {

        this.plataforma = this.physics.add.sprite(400, 500, "plataforma").setScale (0.4).refreshBody();
        this.pelota = this.physics.add.sprite(400, 300, "pelota").setScale (0.5);

        this.plataforma.body.setAllowGravity(false);
        this.plataforma.body.setImmovable(true);

        
        this.pelota.setCollideWorldBounds(true);
        this.pelota.setBounce(1);

        this.physics.add.collider(this.pelota, this.plataforma);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.velocidadPlataforma = 200;

        this.textoNivel = this.add.text(16, 40, "Nivel:" + this.nivel, {
            fontSize: "20px",
            fill: "#FFFFFF",
            fontStyle: "bold",
          });



  }
  
  update() {
    if (this.cursors.left.isDown) {
        this.plataforma.setVelocityX(-this.velocidadPlataforma);
    } else if (this.cursors.right.isDown) {
        this.plataforma.setVelocityX(this.velocidadPlataforma);
    } else {
        this.plataforma.setVelocityX(0);
    }

    // if (this.cursors.up.isDown) {
    //     this.plataforma.setVelocityY(-this.velocidadPlataforma);
    // } else if (this.cursors.down.isDown) {
    //     this.plataforma.setVelocityY(this.velocidadPlataforma);
    // } else {
    // this.plataforma.setVelocityY(0);
    // }

  }

  sumarPuntos() {}

  pasarNivel() {}

  agregarObstaculo() {}

  perder(){}

  ganar(){}



}