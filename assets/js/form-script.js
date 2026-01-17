// DOM elements
const DOMstrings = {
  stepsBtnClass: 'multisteps-form__progress-btn',
  stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
  stepsBar: document.querySelector('.multisteps-form__progress'),
  stepsForm: document.querySelector('.multisteps-form__form'),
  stepFormPanelClass: 'multisteps-form__panel',
  stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
};

// Track the current main step
let currentMainStep = 0;
let currentSubStep = 0;
let currentPanel = 0;

// Utility functions
const removeClasses = (elemSet, className) => {
  elemSet.forEach(elem => elem.classList.remove(className));
};

const findParent = (elem, parentClass) => {
  let currentNode = elem;
  while (!currentNode.classList.contains(parentClass)) {
    currentNode = currentNode.parentNode;
  }
  return currentNode;
};

const setActiveStep = (activeStepNum) => {
  removeClasses(DOMstrings.stepsBtns, 'js-active');
  DOMstrings.stepsBtns.forEach((elem, index) => {
    if (index <= activeStepNum) {
      elem.classList.add('js-active');
    }
  });
};

const setActivePanel = (activePanelNum) => {
  removeClasses(DOMstrings.stepFormPanels, 'js-active');
  DOMstrings.stepFormPanels.forEach((elem, index) => {
    if (index === activePanelNum) {
      elem.classList.add('js-active');
      //setFormHeight(elem);
    }
  });
};

/*
const setActiveSubStep = (activePanelNum) => {
  removeClasses(DOMstrings.stepFormPanels, 'js-active');
  DOMstrings.stepFormPanels.forEach((elem, index) => {
    if (index === activePanelNum) {
      elem.classList.add('js-active');
      setFormHeight(elem);
    }
  });
};
*/

const getActivePanel = () => {
  let activePanel;
  DOMstrings.stepFormPanels.forEach(elem => {
    if (elem.classList.contains('js-active')) {
      activePanel = elem;
    }
  });
  return activePanel;
};

/*
const formHeight = activePanel => {
  const activePanelHeight = activePanel.offsetHeight;
  DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;
};

const setFormHeight = () => {
  const activePanel = getActivePanel();
  formHeight(activePanel);
};
*/

// Event listeners
DOMstrings.stepsForm.addEventListener('click', (e) => {
  const eventTarget = e.target;

  const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);
  let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);

  // Function to check if the required fields are filled
  const validateInputs = (panel) => {
    // Check radio and checkbox inputs
    const requiredInputs = panel.querySelectorAll("input[type='radio']:checked, input[type='checkbox']:checked");

    // Check text inputs
    const requiredTextInputs = panel.querySelectorAll("input[type='text'][required]");
    const emptyTextInputs = Array.from(requiredTextInputs).filter(input => input.value.trim() === '');

    if ((requiredInputs.length === 0 || emptyTextInputs.length > 0) && panel.id != 'generali-3-12') {
      // Show alert if any required fields are not filled
      var alertModal = document.getElementById('alertModal');
      alertModal.style.display = 'block';
      return false;
    }

    return true;
  };


  // CHECK IF THE CLICKED ELEMENT IS A PREV OR NEXT BUTTON
  if (eventTarget.id === 'MainStepNext') {
    currentMainStep++;
    currentPanel++;
    if (!validateInputs(activePanel)) return; // Stop if validation fails

    setActiveStep(currentMainStep);
    setActivePanel(currentPanel);
  }

  else if (eventTarget.id === 'MainStepPrev') {
    currentMainStep--;
    currentPanel--;

    setActiveStep(currentMainStep);
    setActivePanel(currentPanel);
  }

  else if (eventTarget.id === 'SubStepNext') {

    if (!validateInputs(activePanel)) return; // Stop if validation fails
    console.log('SubStepNext clicked');
    currentPanel++;

    console.log('Setting active panel to: ' + currentPanel);
    setActivePanel(currentPanel);
  }

  else if (eventTarget.id === 'SubStepPrev') {
    currentPanel--;

    console.log('\nSUB STEP PREV');
    console.log('Setting active panel to: ' + currentPanel);
    setActivePanel(currentPanel);
  }

  else if (eventTarget.id === 'modalpacksbtn') {
    modal = document.getElementById('modalpacks');
    modal.style.display = 'block';
  }

  else {
    console.log('Else');
  }

});

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Disable the submit button to avoid multiple submissions
  let button = document.getElementById("submitButton");
  button.textContent = "Invio...";
  button.disabled = true;

  
  const formData = new FormData(event.target);
  const data = {};

  // Convert FormData into an object (fixing checkboxes)
  formData.forEach((value, key) => {
    // If key already exists, it means it's a multi-select (checkbox)
    if (data[key]) {
      data[key] += ` & ${value}`;  // Append multiple values using " & " separator
    } else {
      data[key] = value;  // Store the first value normally
    }
  });
  // Log the dynamically created data object
  console.log('Data being sent:', data);

  // Send the data to the server
  fetch('https://script.google.com/macros/s/AKfycbzijBZF2_2Y921X2majRFbiPofNhZGkb9i0XDDV3JO8-iRphhdSfgIAZ5_Th-xn_W2X/exec', {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(response => response.json())

    .then(result => {
      console.log('Success:', result);

      // Hide all existing content
      document.body.innerHTML = '';

      // Create a container for the message
      const successContainer = document.createElement('div');
      successContainer.style.cssText = "display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center;";

      // Create an image element
      const successImage = document.createElement('img');
      successImage.src = "../assets/img/green-tick.png"; // Replace with the actual path to your tick PNG
      successImage.alt = 'green-tick image';
      successImage.style.cssText = "width: 200px; height: 200px; margin-bottom: 40px;";

      // Create a success message
      const successMessage = document.createElement('p');
      successMessage.textContent = 'Questionario inviato con successo! Reindirizzamento in corso ...';
      successMessage.style.cssText = "font-size: 22px; font-weight: bold; color: #2E7D32;"; // Dark green color

      // Append elements to the container
      successContainer.appendChild(successImage);
      successContainer.appendChild(successMessage);

      // Append the container to the body
      document.body.appendChild(successContainer);

      // Redirect to homepage after 3 seconds
      setTimeout(() => {
        window.location.href = '../home';
      }, 3000);
    })

    .catch(error => {
      console.error('Error:', error)


      // Hide all existing content
      document.body.innerHTML = '';

      // Create a container for the message
      const errorContainer = document.createElement('div');
      errorContainer.style.cssText = "display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center;";

      // Create an image element
      const errorImage = document.createElement('img');
      errorImage.src = "../assets/img/panda-error.svg";

      errorImage.alt = 'panda error image';
      errorImage.style.cssText = "width: 200px; height: 200px; margin-bottom: 40px;";

      // Create a success message
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Errore nell\'invio del questionario... La preghiamo di riprovare.';
      errorMessage.style.cssText = "font-size: 22px; font-weight: bold; color: #990606;"; // Dark red color

      // Append elements to the container
      errorContainer.appendChild(errorImage);
      errorContainer.appendChild(errorMessage);

      // Append the container to the body
      document.body.appendChild(errorContainer);

      // Redirect to homepage after 3 seconds
      setTimeout(() => {
        window.location.href = '/questionario';
      }, 5000);
    });
});


/* EVENT LISTENER FOR THE PROGRESS BAR

DOMstrings.stepsBar.addEventListener('click', (e) => {
  const eventTarget = e.target;
  console.log("Bar clicked");

  if(eventTarget.id === 'info'){
    console.log('Info clicked');

    currentMainStep = 0;
    currentSubStep = 0;

    setActiveStep(currentMainStep);
    setActivePanel(currentMainStep + 1);

  }

  else if(eventTarget.id === 'about'){
    console.log('About clicked');

    currentMainStep = 1;
    setActiveStep(currentMainStep);
    setActivePanel(currentMainStep + 1);
  }

  else if(eventTarget.id === 'contact'){
    console.log('Contact clicked');

    currentMainStep = 2;
    setActiveStep(currentMainStep);
    setActivePanel(currentMainStep + 1);
  }

  else if(eventTarget.id === 'selection'){
    console.log('selection clicked');

    currentMainStep = 3;
    setActiveStep(currentMainStep);
    setActivePanel(currentMainStep + 1);
  }

  else{
    console.log('Else');
  }
});
*/


// Set form height on load
//window.addEventListener('load', setFormHeight, false);

// Set form height on resize
//window.addEventListener('resize', setFormHeight, false);