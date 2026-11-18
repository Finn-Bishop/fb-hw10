class Pet {
  constructor(name, weight, happiness) {
    this._name = name;
    this._weight = weight;
    this._happiness = happiness;
  }

  // Getters and setters expose only the properties I want.
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

    // EVENT LISTENERS FOR SIDE BAR:
    // One call attaches a click listener to every .pet-card
    $('.pet-card').on('click', clickedPetCard);
    // END EVENT LISTNERS

    // KEYBOARD SHORTCUTS: T = Treat, P = Play, E = Exercise
    // .trigger('click') fires the button's click handlers as if it had been clicked
    $(document).on('keydown', function(event) {
      if (event.ctrlKey || event.metaKey || event.altKey) return; // leave browser shortcuts alone
      const key = event.key.toLowerCase();
      if (key === 't') $('.treat-button').trigger('click');
      if (key === 'p') $('.play-button').trigger('click');
      if (key === 'e') $('.exercise-button').trigger('click');
    });

    // Returns the Pet object whose name matches activePetName
    function getActivePet() {
      return pets.find(pet => pet.name === activePetName);
    }

    // Treat: more happiness, more weight
    function clickedTreatButton() {
      console.log("meowmeowmeow");
      const pet = getActivePet();
      pet.happiness += 1;
      pet.weight += 1;
      checkAndUpdatePetInfoInHtml();
    }

    // Play: more happiness, less weight
    function clickedPlayButton() {
      const pet = getActivePet();
      pet.happiness += 1;
      pet.weight -= 1;
      checkAndUpdatePetInfoInHtml();
    }

    // Exercise: less happiness, less weight
    function clickedExerciseButton() {
      const pet = getActivePet();
      pet.happiness -= 1;
      pet.weight -= 1;
      checkAndUpdatePetInfoInHtml();
    }

    // Makes the clicked sidebar card's pet the active pet
    function clickedPetCard() {
      const index = $('.pet-card').index(this); // 0, 1 or 2 — matches pets[0], pets[1], pets[2]
      if (pets[index]) {
        activePetName = pets[index].name;
        checkAndUpdatePetInfoInHtml();
      }
    }
  
    function checkAndUpdatePetInfoInHtml() {
      updatePetInfoInHtml();
    }
    /*
    // Keeps weight and happiness from going below zero
    function checkWeightAndHappinessBeforeUpdating() {
      console.log("checked");
      
    }
    */

    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      // Label each sidebar card with its own pet (card 1 = pets[0], card 2 = pets[1], ...)
      $('.pet-card').each(function(i) {
        if (pets[i]) {
          $(this).find('.card-name').text(pets[i].name);
          $(this).find('.pet-name-button').attr('id', pets[i].name);
        }
      });

      for(let i = 0; i < pets.length; i++) {
        if (pets[i].name === activePetName) {
          // Copy the image from the matching sidebar card into the main image
          const cardImage = $('.pet-card').eq(i).find('img');
          $('.pet-image').attr('src', cardImage.attr('src'));
          $('.pet-image').attr('alt', pets[i].name);

          $('.name').text(pets[i].name);
          $('.weight').text(pets[i].weight);
          $('.happiness').text(pets[i].happiness);
          return; // Exit the loop once the active pet is found and updated
        }
      }
    }
})