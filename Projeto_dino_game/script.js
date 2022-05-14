const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let estaPulando = false;
let gameOver = false;
let position = 0;

function handleKeyUp(event) {
    //quando soltar a tecla space keycode 32
  if (event.keyCode === 32) {
    if (!estaPulando) {
      jump();
    }
  }
}

function jump() {
  estaPulando = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // se estiver pulando add intervalo para remover Bug da tecla space
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          estaPulando = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (gameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      
      clearInterval(leftTimer);
      background.removeChild(cactus);
      // se cactu sair da tela remover com remove.child
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      gameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
