// Bola
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

// Raquete do jogador
let xRaquete = 5;
let yRaquete = 150;
const RAQUETE_COMPRIMENTO = 10;
const RAQUETE_ALTURA = 90;

// Raquete do oponente
let xRaqueteOponente = 580;
let yRaqueteOponente = 150;
const VELOCIDADE_RAQUETE = 10;

// Pontuação
let meusPontos = 0;
let pontosDoOponente = 0;

// Sons e Imagem
let raquetada;
let ponto;
let trilha;
let imagemFundo;

function preload() {
  trilha = loadSound('sons/trilha.mp3');
  ponto = loadSound('sons/ponto.mp3');
  raquetada = loadSound('sons/raquetada.mp3');
  imagemFundo = loadImage('imagens/galaxia.jpg');
}

function setup() {
  createCanvas(600, 400);
  // trilha.loop(); // Uncomment to play background music
}

function draw() {
  background(imagemFundo);
  moverEAtualizarBolinha();
  desenharBolinha();
  verificarColisaoBorda();
  desenharRaquete(xRaquete, yRaquete);
  moverRaqueteJogador();
  verificarColisaoRaquete(xRaquete, yRaquete);
  desenharRaquete(xRaqueteOponente, yRaqueteOponente);
  moverRaqueteOponente();
  verificarColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  mostrarPlacar();
  verificarPontuacao();
}

function desenharBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function moverEAtualizarBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificarColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function desenharRaquete(x, y) {
  rect(x, y, RAQUETE_COMPRIMENTO, RAQUETE_ALTURA);
}

function moverRaqueteJogador() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= VELOCIDADE_RAQUETE;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += VELOCIDADE_RAQUETE;
  }
}

function moverRaqueteOponente() {
  if (keyIsDown(87)) { // 'W' key
    yRaqueteOponente -= VELOCIDADE_RAQUETE;
  }
  if (keyIsDown(83)) { // 'S' key
    yRaqueteOponente += VELOCIDADE_RAQUETE;
  }
}

function verificarColisaoRaquete(x, y) {
  if (xBolinha + raio > x && xBolinha - raio < x + RAQUETE_COMPRIMENTO &&
      yBolinha + raio > y && yBolinha - raio < y + RAQUETE_ALTURA) {
    velocidadeXBolinha *= -1;
    // raquetada.play();
  }
}

function mostrarPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(0, 0, 255));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 0, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function verificarPontuacao() {
  if (xBolinha > 590) {
    meusPontos += 1;
    // ponto.play();
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    // ponto.play();
  }
}
