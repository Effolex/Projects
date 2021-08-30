const quizz =[
  {
    question:'Which is the best country?',
    options: {
    A: 'Brazil',
    B: 'USA',
    C: 'Russia',
    D: 'Australia'
    },
    answer: 'Brazil'
  },
  {
    question:'what is 1 plus 1?',
    options: {
    a: '2',
    b: '1',
    c: '4',
    d: '5'
    },
    answer: '2'
  },
  {
    question:'what is the best of the best?',
    options: {
    a: 'the best',
    b: 'the other best',
    c: 'the bestiest',
    d: 'the very best'
    },
    answer: 'the very best'
  },
];

const player = {
  points: 0,
  currentQuestion: 0,
  lastQuestion: quizz.length
}

const options = document.querySelector('#opcoes');
const buttonAnswer = document.querySelector('#button-answer');
const currentQuestion = player.currentQuestion;
const header = document.querySelector('#pergunta');


function selectAnswer(event) {
  const option = event.target;
  if (option.localName === 'ul')
  return;
  
  const oldOption = document.querySelector('.selected') ?? false;
  if(oldOption) {
    oldOption.classList.remove('selected');
  }
  option.classList.add('selected');
  
}

options.addEventListener('click', selectAnswer);

function questionCreation(index) {
  options.innerHTML = '';
  header.textContent = quizz[index].question;
  for (const key in quizz[index].options) {
    const li = document.createElement('li');
    li.textContent = `${key} - ${quizz[index].options[key]}`;
    options.appendChild(li);
  }
}

const isCorrect = answer => quizz[player.currentQuestion].answer === answer;

function showPoints() {
  header.textContent = 'Pontuacao final:'
  options.innerHTML = '';
  options.innerHTML = player.points;
  options.style.textAlign = 'center';
  options.style.fontSize = '50px'
}

function verifyAnswer() {
  const answer = document.querySelector('.selected');
  
  if(!answer) return;
  
  if(isCorrect(answer.textContent ??= '')) {
    player.points += 1;
  }
  player.currentQuestion += 1;
  if(player.currentQuestion === player.lastQuestion) {
    showPoints();
    return;
  }
  questionCreation(player.currentQuestion);
}

buttonAnswer.addEventListener('click', verifyAnswer)
questionCreation(player.currentQuestion);

console.log(player.lastQuestion);