  const questions = [
        {
          question: "Q. 1) Which command is used to display the location of the current working directory?",
          options: ["cd", "ls", "pwd", "mkdir"],
          answer: "pwd",
          selected: null,
        },
        {
          question: "Q. 2) What does the mkdir command do?",
          options: ["Remove a directory", "List the contents of a directory", "Create a new directory", "Rename a file or directory"],
          answer: "Create a new directory",
          selected: null,
        },
        {
          question: "Q. 3) Which command is used to delete a directory?",
          options: ["cd", "rmdir", "rm", "mv"],
          answer: "rmdir",
          selected: null,
        },
        {
          question: "Q. 4) What does the ls command do?",
          options: ["Change the current directory", "Create a new directory", "List the contents of a directory", "Rename a file or directory"],
          answer: "List the contents of a directory",
          selected: null,
        },
        {
          question: "Q. 5) How do you change the current directory using the cd command?",
          options: ["cd <directory name>", "cd ..", "cd /", "cd ~"],
          answer: "cd <directory name>",
          selected: null,
        },
        {
          question: "Q. 6) The touch command is used to:",
          options: ["Display the content of a file", "Remove a file", "Create empty files", "Copy the content of one file to another file"],
          answer: "Create empty files",
          selected: null,
        },
        {
          question: "Q. 7) Which command is used to remove a file?",
          options: ["rm", "rmdir", "cp", "mv"],
          answer: "rm",
          selected: null,
        },
        {
          question: "Q. 8) What does the cp command do?",
          options: ["Copy a file or directory", "Create a new directory", "Remove a file", "Move a file or directory"],
          answer: "Copy a file or directory",
          selected: null,
        },
        {
          question: "Q. 9) How do you move a file or directory using the mv command?",
          options: ["mv <file name> <directory path>", "mv <file name> <new file name>", "mv <file name>", "mv <directory name>"],
          answer: "mv <file name> <new file name>",
          selected: null,
        },
        {
          question: "Q. 10) The rename command is used to:",
          options: ["Delete files", "Rename directories", "Rename files", "Copy files"],
          answer: "Rename files",
          selected: null,
        },
      ];
   
  const tempAnswers = [];
  let currentQuestionIndex = 0;
  let timer;
  
  const QUESTION_STATE = {
    UNATTEMPTED: 'unattempted',
    ATTEMPTED: 'attempted',
    SAVED: 'saved', 
    SUBMITTED: 'submitted',
  };
  
  function startTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = 'Time remaining: 1:00';
  
    let minutes = 5;
    let seconds = 0;
  
    timer = setInterval(() => {
      seconds--;
      if (seconds < 0) {
        minutes--;
        seconds = 59;
      }
  
      timerElement.textContent = `Time remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
      if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        alert('Time is up!');
        displayResult();
      }
    }, 1000);
  
    return timer;
  }
  
  window.onload = function () {
    startTimer();
    loadQuestion();
  };
  
  function loadQuestion() {
    const questionsElement = document.getElementById('questions');
    const buttonsElement = document.getElementById('buttons');
    const submitButton = document.getElementById('submitButton');
    const nextButton = document.getElementById('nextButton');
    const finalSubmitButton = document.getElementById('finalSubmitButton');
  
    questionsElement.innerHTML = '';
    buttonsElement.innerHTML = '';
  
    const question = questions[currentQuestionIndex];
    const questionElement = document.createElement('div');
    const questionText = document.createElement('p');
    const options = document.createElement('div');
  
    questionText.textContent = question.question;
  
    question.options.forEach((option, optionIndex) => {
      const optionElement = document.createElement('div');
      const radio = document.createElement('input');
      const label = document.createElement('label');
  
      radio.type = 'radio';
      radio.name = `question${currentQuestionIndex}`;
      radio.value = option;
      radio.checked = question.selected === option;
  
      label.textContent = option;
  
      radio.addEventListener('change', () => {
        question.selected = option;
      });
  
      optionElement.appendChild(radio);
      optionElement.appendChild(label);
      options.appendChild(optionElement);
    });
  
    questionElement.appendChild(questionText);
    questionElement.appendChild(options);
    questionsElement.appendChild(questionElement);
  
    if (currentQuestionIndex === questions.length - 1) {
      submitButton.style.display = 'none';
      nextButton.style.display = 'none';
      finalSubmitButton.style.display = 'block';
    } else {
      submitButton.style.display = 'block';
      nextButton.style.display = 'block';
      finalSubmitButton.style.display = 'none';
    }
  
    buttonsElement.innerHTML = '';
    questions.forEach((q, index) => {
      const button = document.createElement('button');
      button.textContent = `Question ${index + 1}`;
      button.id = `questionButton${index}`; // Add this line
    
      if (q.state === QUESTION_STATE.ATTEMPTED) {
        button.style.backgroundColor = 'orange';
      } else if (q.state === QUESTION_STATE.SAVED) {
        button.style.backgroundColor = 'green';
      } else {
        button.style.backgroundColor = 'white';
      }
    
      button.addEventListener('click', () => {
        currentQuestionIndex = index;
        loadQuestion();
      });
      buttonsElement.appendChild(button);
    });
    countButtonColors();
    finalSubmitButton.addEventListener('click', () => {
      submitAnswer();
      displayResult();
    });
    
  }
  
  function submitAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.selected === null) {
      if (currentQuestionIndex !== questions.length - 1) {
        alert('Please select an option!');
        return;
      }
    }
    tempAnswers[currentQuestionIndex] = currentQuestion.selected;
    currentQuestion.state = QUESTION_STATE.SAVED;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      const unattemptedCount = countUnattemptedQuestions();
      const unsavedCount = countUnsavedAnswers();
  
      if (unattemptedCount > 0 || unsavedCount > 0) {
        const confirmation = confirm(`Are you sure? You haven't attempted ${unattemptedCount} question(s) and haven't saved ${unsavedCount} answer(s). Proceed to display the result?`);
  
        if (!confirmation) {
          currentQuestionIndex--;
          if (currentQuestionIndex < 0) {
            currentQuestionIndex = 0;
          }
          return;
        }
      }
  
      displayResult();
    }
  }
  
  
  
  function countUnattemptedQuestions() {
    return questions.filter((question) => question.state === QUESTION_STATE.UNATTEMPTED).length;
  }
  
  function countUnsavedAnswers() {
    return questions.filter((question) => question.state === QUESTION_STATE.ATTEMPTED).length;
  }
  
  
  function nextQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.selected === null) {
      currentQuestion.state = QUESTION_STATE.UNATTEMPTED;
    } else {
      currentQuestion.state = QUESTION_STATE.ATTEMPTED;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      displayResult();
    }
  }
  
  function displayResult() {
    clearInterval(timer);
  
    const resultElement = document.getElementById('quiz');
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      const answer = tempAnswers[index];
      if (answer === question.answer) {
        correctAnswers++;
      }
    });
    const percentage = ((correctAnswers / questions.length) * 100).toFixed(1);
  
    const resultText = `<div class="question"><h1>You scored ${correctAnswers} out of ${questions.length}</h1><br>
       <h2>Marks secured = ${correctAnswers * 5} / ${questions.length * 5}</h2><br>
       <h2>Percentage obtained = ${percentage} %</h2></div><br>
       <div class="button-container">
       <a href="dbana.html" style="margin-left: 100px ;">
          <button>Analysis</button> 
       </a><br>
       <a href="pg.html" style="margin-left: 200px ;">
          <button>Try Again</button> 
       </a>
       </div>
    `;
  
    resultElement.innerHTML = resultText;
    resultElement.style.display = 'block';
  
    const questionButtons = document.querySelectorAll('#buttons button');
    const lastQuestionButton = questionButtons[questionButtons.length - 1];
    const lastQuestion = questions[questionButtons.length - 1];
  
    if (lastQuestion.selected !== null) {
      lastQuestionButton.style.backgroundColor = 'green';
    } else {
      lastQuestionButton.style.backgroundColor = 'white';
    }
  
    const submitButton = document.getElementById('submitButton');
    const nextButton = document.getElementById('nextButton');
    const finalSubmitButton = document.getElementById('finalSubmitButton');
  
    submitButton.style.display = 'none';
    nextButton.style.display = 'none';
    finalSubmitButton.style.display = 'none';
  
    countButtonColors();
  }
  
  
  function countButtonColors() {
    const buttons = document.querySelectorAll('#buttons button');
    let orangeCount = 0;
    let whiteCount = 0;
    let greenCount = 0;
  
    buttons.forEach((button) => {
      if (button.style.backgroundColor === 'orange') {
        orangeCount++;
      } else if (button.style.backgroundColor === 'white') {
        whiteCount++;
      } else if (button.style.backgroundColor === 'green') {
        greenCount++;
      }
    });
  
    const countElement1 = document.getElementById('buttonCount1');
    countElement1.innerHTML = `${orangeCount}`;
    const countElement2 = document.getElementById('buttonCount2');
    countElement2.innerHTML = `${whiteCount}`;
    const countElement3 = document.getElementById('buttonCount3');
    countElement3.innerHTML = `${greenCount}`;
    
  }
  