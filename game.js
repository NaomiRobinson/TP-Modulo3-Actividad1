export default class Game extends Phaser.Scene {
    constructor() {

      super("game");
    }
  
    init() {

        this.nivel = 1;
        this.choque = 0;
        this.puntos = 0;

    }

    preload() {

        this.load.image("plataforma", "./assets/hielo.png");
        this.load.image("pelota", "./assets/pingu.png");
        this.load.image("obstaculo", "./assets/cubo.png");

    }

    create() {

        this.plataforma = this.physics.add.sprite(400, 500, "plataforma").setScale (0.8).refreshBody();
        this.pelota = this.physics.add.sprite(200, 200, "pelota").setScale (0.3);

        this.physics.world.setBoundsCollision(true, true, true, false);

        this.grupoObstaculos = this.physics.add.staticGroup();

        this.plataforma.setCollideWorldBounds(true);
        this.plataforma.body.setAllowGravity(false);
        this.plataforma.setBounce(1);
 
        this.pelota.setCollideWorldBounds(true);
        this.pelota.setBounce(1);
        this.pelota.body.setCircle(70);
        this.pelota.body.setFriction(0);



        this.physics.add.collider(
            this.pelota,
            this.plataforma,
            this.sumarPuntos,
            null,
            this
            );

            this.physics.add.collider(
                this.pelota,
                this.grupoObstaculos,
                );

            this.physics.add.collider(
                this.grupoObstaculos,
                this.plataforma,
            );

        this.cursors = this.input.keyboard.createCursorKeys();
        this.velocidadPlataforma = 500;
        this.velocidadPelota = 300;

        this.pelota.setVelocity(this.velocidadPelota, this.velocidadPelota);

        this.textoNivel = this.add.text(16, 20, "Nivel:" + this.nivel, {
            fontSize: "20px",
            fill: "#FFFFFF",
            fontStyle: "bold",
        });

        this.textoPuntos = this.add.text(16, 40, "Puntaje:" + this.puntos, {
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

    if (this.cursors.up.isDown && this.plataforma.y > 300) {
        this.plataforma.setVelocityY(-this.velocidadPlataforma);
    } else if (this.cursors.down.isDown && this.plataforma.y < this.cameras.main.height - 50) {
        this.plataforma.setVelocityY(this.velocidadPlataforma);
    } else {
        this.plataforma.setVelocityY(0);

    if (this.pelota.y > this.cameras.main.height) {
        this.perder();
    }
    }

}

sumarPuntos(_pelota,_plataforma) {

    if (this.pelota.body.velocity.x > 0) {
        this.pelota.body.setVelocity(this.velocidadPelota, -this.velocidadPelota);
    } else {
        this.pelota.body.setVelocity(-this.velocidadPelota, -this.velocidadPelota);
    }

    this.choque = this.choque + 1;

    this.puntos = this.puntos + 10;

    console.log ("choque " + this.choque)
    this.textoPuntos.setText("Puntaje:" + this.puntos);

    if (this.choque == 3) {
        this.choque = 0;
        this.pasarNivel();
    }

}

pasarNivel() {

    console.log ("paso de Nivel");


    const colorAleatorio = Phaser.Display.Color.RandomRGB();
    this.cameras.main.setBackgroundColor(colorAleatorio.color);

    this.nivel++;
    this.textoNivel.setText("Nivel: " + this.nivel);

    this.velocidadPelota *= 1.1;

    this.agregarObstaculo();

    if (this.nivel == 21) {
        this.ganar();
    }
    


}

agregarObstaculo() {
    const x = Phaser.Math.Between(50, 750);
    const y = Phaser.Math.Between(100, 400);
    const scale = Phaser.Math.FloatBetween(0.3, 0.8);
    const obstaculo = this.physics.add.staticSprite(x, y, "obstaculo").setScale(scale).refreshBody();
    
    this.grupoObstaculos.add(obstaculo);
}

perder(){
    this.grupoObstaculos.getChildren().forEach(obstaculo => {
        obstaculo.disableBody(true, true);
    });
    this.plataforma.disableBody(true, true);
    this.pelota.disableBody(true, true);

    this.textoPerder = this.add.text(155, 200, "Has perdido", {
        fontSize: "70px",
        fill: "#FFFFFF",
        // fontStyle: "bold",
    });

    this.textoPerder = this.add.text(60, 300, "reinicia la página para intentarlo de nuevo ", {
        fontSize: "25px",
        fill: "#FFFFFF",
        // fontStyle: "bold",
    });

    this.textoNivel.destroy();
    this.textoPuntos.destroy();
    

}

ganar(){
    this.grupoObstaculos.getChildren().forEach(obstaculo => {
        obstaculo.disableBody(true, true);
    });
    this.plataforma.disableBody(true, true);
    this.pelota.disableBody(true, true);

    this.textoGanar = this.add.text(100, 200, "FELICITACIONES", {
        fontSize: "70px",
        fill: "#FFFFFF",
        // fontStyle: "bold",
    });

    this.textoGanar = this.add.text(100, 300, "reinicia la página para jugar de nuevo ", {
        fontSize: "25px",
        fill: "#FFFFFF",
        // fontStyle: "bold",
    });

    this.textoNivel.destroy();
    this.textoPuntos.destroy();
}

}