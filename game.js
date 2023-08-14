export default class Game extends Phaser.Scene {
    constructor() {

      super("game");
    }
  
    init() {

        this.perder = false;
        this.nivel = 1;

        this.choque = 0;

    }
  
    preload() {

        this.load.image("plataforma", "./assets/plataforma.png");
        this.load.image("pelota", "./assets/pelota.png");
        this.load.image("obstaculo", "./assets/obstaculo.png");

    }
  
    create() {

        this.plataforma = this.physics.add.sprite(400, 500, "plataforma").setScale (0.4).refreshBody();
        this.pelota = this.physics.add.sprite(400, 300, "pelota").setScale (0.5);

        this.plataforma.setCollideWorldBounds(true);
        this.plataforma.body.setAllowGravity(false);
        this.plataforma.body.setImmovable(true);

        
        this.pelota.setCollideWorldBounds(true);
        this.pelota.setBounce(1);
        this.pelota.body.setCircle(25);
        this.pelota.body.setFriction(0);



        this.physics.add.collider(
            this.pelota,
            this.plataforma,
            this.sumarPuntos,
            null,
            this
            );

        this.cursors = this.input.keyboard.createCursorKeys();
        this.velocidadPlataforma = 500;
        this.velocidadPelota = 300;

        this.pelota.setVelocity(this.velocidadPelota, - this.velocidadPelota);

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

    sumarPuntos(_pelota,_plataforma) {

        this.choque = this.choque + 1;

        console.log ("choque " + this.choque)

        if (this.choque == 10) {
            this.choque = 0;
            this.pasarNivel();
        }

    }

  pasarNivel() {

    console.log ("pasarNivel");

    if (this.nivel == 21) {
        this.ganar();
    }

    const colorAleatorio = Phaser.Display.Color.RandomRGB();
        this.cameras.main.setBackgroundColor(colorAleatorio.color);

    this.nivel++;
    this.textoNivel.setText("Nivel: " + this.nivel);

    this.velocidadPelota *= 1.1;


  }

  agregarObstaculo() {}

  perder(){}

  ganar(){}



}