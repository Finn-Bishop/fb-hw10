class Pet {
  constructor(name, weight, happiness) {
    this._name = name;
    this._weight = weight;
    this._happiness = happiness;
  }

  get name() {
    return this._name;
  }

  get weight() {
    return this._weight;
  }

  get happiness() {
    return this._happiness;
  }

  set name(newName) {
    this._name = newName;
  }

  set weight(newWeight) {
    if (newWeight >= 0) {
      this._weight = newWeight;
    }
  }

  set happiness(newHappiness) {
    if (newHappiness >= 0) {
      this._happiness = newHappiness;
    }
  }
}

$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.

    // The pet's name (string), weight (number), and happiness (number)
    var activePetName = "Biscuit";
    const pets = [];
    pets.push(new Pet('Biscuit', 20, 5));
    pets.push(new Pet('Mittens', 15, 7));
    pets.push(new Pet('Whiskers', 10, 3));

    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);

    

    function clickedTreatButton() {
      console.log("meowmeowmeow");

      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      pets[0].happiness += 1;
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      // Decrease pet happiness
      // Decrease pet weight
      checkAndUpdatePetInfoInHtml();
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();
      updatePetInfoInHtml();
    }

    // Keeps weight and happiness from going below zero
    function checkWeightAndHappinessBeforeUpdating() {
      console.log("checked");
      if (pet_info.weight < 0) pet_info.weight = 0;
      if (pet_info.happiness < 0) pet_info.happiness = 0;
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      for(let i = 0; i < pets.length; i++) {
        if (pets[i].name === activePetName) {
          $('.name').text(pets[i].name);
          $('.pet-name-button').attr('id', pets[i].name);
          $('.weight').text(pets[i].weight);
          $('.happiness').text(pets[i].happiness);
          return; // Exit the loop once the active pet is found and updated
        }
      }
    }
})