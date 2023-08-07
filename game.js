class Game {
    // Elements
    #colonyPanel = document.getElementById("colonyPanel");

    #populationBox = document.getElementById("populationBox");
    #queenAntsCounter = document.createElement("p");
    #workerAntsCounter = document.createElement("p");

    #suppliesBox= document.getElementById("suppliesBox");
    #foodCounter = document.createElement("p");
    #eggsCounter = document.createElement("p");

    #tasksPanel = document.getElementById("tasksPanel");

    #currentTaskLabel = document.createElement("p");
    #taskProgressLabel = document.createElement("p");

    #endTaskButton = document.createElement("a");
    #gatherFoodButton = document.createElement("a");

    #upgradesPanel = document.getElementById("upgradesPanel");

    #statsPanel = document.getElementById("statsPanel");

    #statQueenFertility = document.createElement("p");
    #statWorkerAntStrength = document.createElement("p");
    #statFoodGatherMultiplier = document.createElement("p");


    constructor() {
        // Attributes
        this.queenFertility = 0.01;
        this.workerAntStrength = 0.1;

        // Multipliers
        this.foodGatherMultiplier = 1.0;

        // Population
        this.queenAnts = [];
        this.workerAnts = 1;

        // Supplies
        this.food = 0;
        this.eggs = 0;

        // Tasks
        this.taskIdle = new Task("Idle", "Worker ants will do nothing at all", () => {}, () => {}, 100000, true);
        this.taskGatherFood = new Task("Gather food", "Send worker ants to search for food", () => { this.food += this.foodGatherRate }, () => { }, 1000, true);

        this.currentTask = this.taskIdle;

        // Setup
        this.setupLayout();

        setInterval(() => { this.updateCounters(); }, 100);

        // Testing
        this.makeNewQueen();
    }

    // Accessors
    get foodGatherRate() { return this.workerAnts * this.workerAntStrength * this.foodGatherMultiplier; }

    // Updates
    updateCounters() {
        this.#queenAntsCounter.innerHTML = "Queen Ants: " + this.queenAnts.length;
        this.#workerAntsCounter.innerHTML = "Worker Ants: " + this.workerAnts;

        this.#foodCounter.innerHTML = "Food: " + this.food.toFixed(2);
        this.#eggsCounter.innerHTML = "Eggs: " + this.eggs.toFixed(2);
    }

    updateQueenAnts() {
        for (let i = 0; i < this.queenAnts; i++) {

        }
    }

    // Set current task and update page elements
    setTask(task) {
        this.currentTask.stop();

        this.currentTask = task;
        task.start();

        this.#currentTaskLabel.innerHTML = "Current task: " + task.name;
        if (!task.indefinite)
            this.#taskProgressLabel.innerHTML = "Progress: " + task.progress + "%";

        if (task != this.taskIdle) {
            this.#endTaskButton.style.display = "block";
            this.#taskProgressLabel.style.display = "block";
        } else {
            this.#endTaskButton.style.display = "none";
            this.#taskProgressLabel.style.display = "none";
        }

        console.log("Current task set to '" + task.name + "'");
    }

    // Make a new Queen Ant
    makeNewQueen() {
        let queen = {
            hunger : 100,
            progress : 0
        };

        this.queenAnts.push(queen);
    }


    // Setup page layout
    setupLayout() {
        //
        // Colony Panel

        this.updateCounters();

        this.#populationBox.appendChild(this.#queenAntsCounter);
        this.#populationBox.appendChild(this.#workerAntsCounter);
        this.#suppliesBox.appendChild(this.#foodCounter);
        this.#suppliesBox.appendChild(this.#eggsCounter);

        this.#colonyPanel.appendChild(this.#populationBox);
        this.#colonyPanel.appendChild(this.#suppliesBox);


        //
        // Tasks Panel

        this.#currentTaskLabel.innerHTML = "Current task: " + this.currentTask.name;
        this.#tasksPanel.appendChild(this.#currentTaskLabel);
        this.#tasksPanel.appendChild(this.#taskProgressLabel);

        this.#endTaskButton.innerHTML = "> Cancel current task<br>";
        this.#endTaskButton.setAttribute("title", this.taskIdle.desc);
        this.#endTaskButton.addEventListener("click", () => { this.setTask(this.taskIdle); });
        this.#endTaskButton.style.display = "none";
        this.#tasksPanel.appendChild(this.#endTaskButton);

        this.#gatherFoodButton.innerHTML = "> Gather food<br>";
        this.#gatherFoodButton.setAttribute("title", this.taskGatherFood.desc);
        this.#gatherFoodButton.addEventListener("click", () => { this.setTask(this.taskGatherFood); });
        this.#tasksPanel.appendChild(this.#gatherFoodButton);


        //
        // Upgrades Panel

        this.#upgradesPanel.style.display = "none";


        //
        // Stats Panel
        this.#statQueenFertility.innerHTML = "Queen Fertility: " + this.queenFertility;
        this.#statWorkerAntStrength.innerHTML = "Worker Ant Strength: " + this.workerAntStrength;
        this.#statFoodGatherMultiplier.innerHTML = "Food Gather Multiplier: " + this.foodGatherMultiplier;

        this.#statsPanel.appendChild(this.#statQueenFertility);
        this.#statsPanel.appendChild(this.#statWorkerAntStrength);
        this.#statsPanel.appendChild(this.#statFoodGatherMultiplier);
    }
}