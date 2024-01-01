const question = [
    "nterms = 5","n1 , n2 , count = 0, 1 , 0","print('Fibonacci sequence')"," while count < n terms","print(n1)","fib = n1 + n2","n1,n2 = n2,fibo","count += 1"
    ];
    
    const container = document.getElementById('container');
    const codeContainer = document.getElementById('code-container');
    const checkButton = document.getElementById('checkButton');
    const answerButton = document.getElementById('answerButton');
    const resetButton = document.getElementById('resetButton');
    const para=document.querySelector(".para");
    const ans=document.querySelector(".ans");
    const into=document.querySelector(".into");
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
      ans.classList.add("hide");
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
        para.innerText='Correct! You arranged the code correctly.';
        ans.classList.remove("hide");
      } else {
        para.innerText='Incorrect. Please try again.';
        ans.classList.remove("hide");
      }
    }
    
    // Function to show the correct answer
    function showAnswer() {
      para.innerText=`Correct Answer:-\n${question.join('\n')}`;
      ans.classList.remove("hide");
  
    }
  
    into.addEventListener('click', ()=>{
      ans.classList.add("hide");
    });
    
    // Initialize the code challenge
    initializeCodeChallenge();
   /**"a = 5","b = 6","c = 7","s = (a + b + c) / 2","area = (s*(s-a)*(s-b)*(s-c)) ** 0.5","print('The area of the triangle is %0.2f' %area)"
  
  c = 7 */