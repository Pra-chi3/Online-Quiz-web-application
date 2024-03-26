const questions = [
    {
      question: 'Q. 1) Which MySQL JOIN type returns only the matching rows from both tables?',
      options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
      answer: 'INNER JOIN',
      selected: null,
    },
    {
      question: 'Q. 2) In MySQL, which JOIN type includes all rows from the left table and matching rows from the right table?',
      options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
      answer: 'LEFT JOIN',
      selected: null,
    },
    {
      question: 'Q. 3) What is the syntax for performing a MySQL INNER JOIN?',
      options: ['INNER JOIN <table> ON <condition>', 'JOIN <table> ON <condition>', 'INNER <table> ON <condition>', 'INNER JOIN <condition> ON <table>'],
      answer: 'INNER JOIN <table> ON <condition>',
      selected: null,
    },
    {
      question: 'Q. 4) Which MySQL JOIN type combines every row from the left table with every row from the right table?',
      options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
      answer: 'CROSS JOIN',
      selected: null,
    },
    {
      question: 'Q. 5) The GROUP BY clause in MySQL is used to:',
      options: ['Sort the result set', 'Filter rows based on conditions', 'Group rows based on specific columns', 'Join multiple tables'],
      answer: 'Group rows based on specific columns',
      selected: null,
    },
    {
      question: 'Q. 6) In MySQL, the HAVING clause is used to:',
      options: ['Specify conditions for grouping rows', 'Filter rows before grouping', 'Filter grouped rows after grouping', 'Join multiple tables'],
      answer: 'Filter grouped rows after grouping',
      selected: null,
    },
    {
      question: 'Q. 7) Which MySQL operator is used to check for the existence of a subquery result?',
      options: ['EXISTS', 'ANY', 'ALL', 'IN'],
      answer: 'EXISTS',
      selected: null,
    },
    {
      question: 'Q. 8) Which MySQL function is used to handle NULL values by replacing them with a specified value?',
      options: ['IS NULL', 'IS NOT NULL', 'IFNULL', 'COALESCE'],
      answer: 'IFNULL',
      selected: null,
    },
    {
      question: 'Q. 9) The MySQL INSERT SELECT statement is used to:',
      options: ['Insert new rows into a table based on the result of a SELECT query', 'Update existing records in a table based on the result of a SELECT query', 'Delete rows from a table based on the result of a SELECT query', 'Sort the result set based on a SELECT query'],
      answer: 'Insert new rows into a table based on the result of a SELECT query',
      selected: null,
    },
    {
      question: 'Q. 10) Which MySQL statement is used to add comments in a query?',
      options: ['// This is a comment', '/* This is a comment */', '-- This is a comment', '# This is a comment'],
      answer: '-- This is a comment',
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
  