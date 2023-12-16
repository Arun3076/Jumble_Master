const question = [
    "num = 8", "if num % 2 == 0:", "    print('Even')", "else:", "    print('Odd')"
  ];
  
  const container = document.getElementById('container');
  const codeContainer = document.getElementById('code-container');
  const checkButton = document.getElementById('checkButton');
  const answerButton = document.getElementById('answerButton');
  const resetButton = document.getElementById('resetButton');
  
  let codeOrder = [];
  
  // Function to shuffle an array
  function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
  
  // Function to render the code boxes in the UI
  function renderCode() {
    codeContainer.innerHTML = '';
    codeOrder.forEach((line, index) => {
      const codeBox = document.createElement('div');
      codeBox.classList.add('code-box');
      codeBox.draggable = true;
      codeBox.dataset.index = index;
      codeBox.textContent = line;
      codeContainer.appendChild(codeBox);
  
      // Re-add event listeners for drag and drop
      codeBox.addEventListener('dragstart', handleDragStart);
      codeBox.addEventListener('dragover', handleDragOver);
      codeBox.addEventListener('drop', handleDrop);
    });
  }
  
  // Function to initialize the code challenge
  function initializeCodeChallenge() {
    codeOrder = shuffleArray(question);
    renderCode();
  }
  
  // Event listeners for drag and drop
  function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.index);
  }
  
  function handleDragOver(event) {
    event.preventDefault();
  }
  
  function handleDrop(event) {
    event.preventDefault();
    const sourceIndex = event.dataTransfer.getData('text/plain');
    const targetIndex = event.target.dataset.index;
  
    // Swap the positions of the dragged and dropped elements
    [codeOrder[sourceIndex], codeOrder[targetIndex]] = [codeOrder[targetIndex], codeOrder[sourceIndex]];
  
    // Update the UI with the new order
    renderCode();
  }
  
  // Event listener for the "Check Answer" button
  checkButton.addEventListener('click', checkAnswer);
  
  // Event listener for the "Show Answer" button
  answerButton.addEventListener('click', showAnswer);
  
  // Event listener for the "Reset" button
  resetButton.addEventListener('click', initializeCodeChallenge);
  
  // Function to check if the answer is correct
  function checkAnswer() {
    const correctOrder = question.join('');
    const userOrder = codeOrder.join('');
  
    if (correctOrder === userOrder) {
      alert('Correct! You arranged the code correctly.');
    } else {
      alert('Incorrect. Please try again.');
    }
  }
  
  // Function to show the correct answer
  function showAnswer() {
    alert(`Correct Answer:\n${question.join('\n')}`);
  }
  
  // Initialize the code challenge
  initializeCodeChallenge();
  