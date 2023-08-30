// Model
const model = {
    selectedMode: "",
    selectedOption: "",
    selectedDrinks: ""
};

 

// View
const view = {
    renderDropdownMode: function (options) {
        const dropdownMode = document.createElement("select");
        dropdownMode.id = "dropdownMode";
        options.forEach((option) => {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.textContent = option;
            dropdownMode.appendChild(optionElement);
        });
        document.body.appendChild(dropdownMode);
    },

 

    renderDropdownDrinkList: function (options) {
        const dropdown = document.createElement("select");
        dropdown.id = "dropdownDrinkSelection";
        options.forEach((option) => {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.textContent = option;
            dropdown.appendChild(optionElement);
        });
        document.body.appendChild(dropdown);
    }
};

 

// Controller
const controller = {
    init: function () {        
        view.renderDropdownMode(["", "Patron", "Bartender"]);
        //console.log(this);
        document.querySelector("#dropdownMode").addEventListener("change", this.handleDropdownModeChange.bind(this));

    },

 

    handleDropdownModeChange: function (event) {
        const selectedOption = event.target.value;
        model.selectedMode = selectedOption;

 

        if (selectedOption.length == "") {
            alert("Please Make a Selection.");
        }
        else
        {            
            var divActionLabel = document.querySelector("#divNextAction")
            if (divActionLabel != null)
                divActionLabel.remove();

 

            // clear drink order 
            var dropdownDrinkSelectionRef = document.querySelector("#dropdownDrinkSelection")
            // Clear all options by removing child elements
            if (dropdownDrinkSelectionRef != null) 
                dropdownDrinkSelectionRef.options.length = 0;


 

            divActionLabel = document.createElement("Div");
            divActionLabel.id = "divNextAction";
            //alert('model.selectedMode: ' + model.selectedMode);

 

            if (model.selectedMode == 'Patron')
            {
                divActionLabel.innerHTML = "Welcome, please select a Drink from our menu: ";
                document.body.appendChild(divActionLabel);

 

                view.renderDropdownDrinkList(["", "Beer", "Red Wine", "White Wine", "Rum & Coke", "Vodka & Tonic"]);
                document.querySelector("#dropdownDrinkSelection").addEventListener("change", this.handleDrinkSelectionChange);
            }
            else
            {            
                //alert('2.model.selectedDrinks: ' + model.selectedDrinks);

 

                // add queued items to DDL:
                var arrayFromDelimitedString = model.selectedDrinks.split(',');

 

                divActionLabel.innerHTML = "Bartender, please process the " + arrayFromDelimitedString.length + " drink(s) in queue!"; // + model.selectedDrinks;
                document.body.appendChild(divActionLabel);

 

                view.renderDropdownDrinkList(arrayFromDelimitedString);
            }  
            const lineBreak = document.createElement("br");
            document.body.appendChild(lineBreak);           
        }
    },

 

    handleDrinkSelectionChange: function (event) {
        //console.log("here!");
        const selectedOption = event.target.value;
        alert('Thanks, your ' + selectedOption + ' has been sent to the queue.');
        if (model.selectedDrinks.length == 0)
            model.selectedDrinks = selectedOption;
        else
            model.selectedDrinks += ',' + selectedOption;
    },
};

 

// Initialize the controller
controller.init();