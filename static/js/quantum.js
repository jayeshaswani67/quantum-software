/* =========================================================
   QUANTUMLAB FRONTEND
   ========================================================= */

"use strict";


/* =========================================================
   ELEMENTS
   ========================================================= */

const runButton =
    document.getElementById("runBtn");

const resetButton =
    document.getElementById("resetBtn");

const analyzeButton =
    document.getElementById("analyzeBtn");

const clearConsoleButton =
    document.getElementById("clearConsoleBtn");

const consoleOutput =
    document.getElementById("consoleOutput");

const shotsInput =
    document.getElementById("shotsInput");

const resultStatus =
    document.getElementById("resultStatus");

const totalShots =
    document.getElementById("totalShots");

const classificationElement =
    document.getElementById("classification");

const analysisElement =
    document.getElementById("analysisText");

const recommendationElement =
    document.getElementById("recommendationText");

const likelyStateElement =
    document.getElementById("likelyState");

const likelyProbabilityElement =
    document.getElementById("likelyProbability");

const qubitCountElement =
    document.getElementById("qubitCount");


/* =========================================================
   PROBABILITY ELEMENTS
   ========================================================= */

const probabilityElements = {

    "00": {
        bar: document.getElementById("bar00"),
        value: document.getElementById("prob00")
    },

    "01": {
        bar: document.getElementById("bar01"),
        value: document.getElementById("prob01")
    },

    "10": {
        bar: document.getElementById("bar10"),
        value: document.getElementById("prob10")
    },

    "11": {
        bar: document.getElementById("bar11"),
        value: document.getElementById("prob11")
    }

};


/* =========================================================
   CONSOLE
   ========================================================= */

function addConsole(message) {

    if (!consoleOutput) {
        return;
    }


    const line =
        document.createElement("div");

    line.className =
        "console-line";


    const time =
        document.createElement("span");

    time.className =
        "console-time";


    time.textContent =
        `[${new Date().toLocaleTimeString()}]`;


    line.appendChild(time);

    line.appendChild(
        document.createTextNode(message)
    );


    consoleOutput.appendChild(line);


    consoleOutput.scrollTop =
        consoleOutput.scrollHeight;
}


/* =========================================================
   FORMAT PROBABILITY
   ========================================================= */

function formatProbability(value) {

    const percentage =
        Number(value) * 100;

    if (percentage < 0.01) {
        return "0%";
    }


    return `${percentage.toFixed(1)}%`;
}


/* =========================================================
   UPDATE MEASUREMENTS
   ========================================================= */

function updateMeasurements(counts, shots) {

    const states =
        ["00", "01", "10", "11"];


    states.forEach(state => {

        const count =
            Number(counts[state] || 0);


        const probability =
            shots > 0
                ? count / shots
                : 0;


        const percentage =
            probability * 100;


        const elements =
            probabilityElements[state];


        if (!elements) {
            return;
        }


        elements.bar.style.width =
            `${percentage}%`;


        elements.value.textContent =
            formatProbability(probability);

    });


    totalShots.textContent =
        shots;
}


/* =========================================================
   RUN BELL EXPERIMENT
   ========================================================= */

async function runExperiment() {

    const shots =
        Number(shotsInput.value);


    if (!shots || shots < 100) {

        addConsole(
            "Invalid shots value. Minimum is 100."
        );

        shotsInput.focus();

        return;
    }


    runButton.disabled = true;

    resetButton.disabled = true;

    runButton.innerHTML =
        "<span>◌</span> Running...";


    resultStatus.textContent =
        "RUNNING";

    resultStatus.classList.add(
        "running"
    );


    addConsole(
        `Starting Bell State experiment with ${shots} shots...`
    );


    try {

        /*
         * Existing backend endpoint:
         *
         * GET /api/quantum/bell
         *
         * The current backend always uses 1000 shots.
         */

        const response =
            await fetch(
                "/api/quantum/bell"
            );


        if (!response.ok) {

            throw new Error(
                `Quantum API returned ${response.status}`
            );

        }


        const data =
            await response.json();


        console.log(
            "Quantum experiment:",
            data
        );


        updateMeasurements(
            data.results,
            data.shots
        );


        qubitCountElement.textContent =
            data.qubits;


        resultStatus.textContent =
            "COMPLETE";

        resultStatus.classList.remove(
            "running"
        );


        addConsole(
            "Quantum circuit executed successfully."
        );


        addConsole(
            `Algorithm: ${data.algorithm}`
        );


        addConsole(
            `Measurements: ${JSON.stringify(data.results)}`
        );


        addConsole(
            "Measurement distribution updated."
        );


        /*
         * Automatically run intelligence
         * after the experiment.
         */

        await analyzeExperiment();


    }
    catch (error) {

        console.error(error);


        resultStatus.textContent =
            "ERROR";

        resultStatus.classList.remove(
            "running"
        );


        addConsole(
            `Experiment error: ${error.message}`
        );

    }
    finally {

        runButton.disabled = false;

        resetButton.disabled = false;

        runButton.innerHTML =
            "<span>▶</span> Run Experiment";

    }

}


/* =========================================================
   QUANTUM INTELLIGENCE
   ========================================================= */

async function analyzeExperiment() {

    if (!analyzeButton) {
        return;
    }


    analyzeButton.disabled = true;

    analyzeButton.textContent =
        "Analyzing...";


    classificationElement.textContent =
        "Analyzing experiment";


    addConsole(
        "Quantum Intelligence analyzing experiment..."
    );


    try {

        const response =
            await fetch(
                "/api/intelligence/analyze-bell"
            );


        if (!response.ok) {

            throw new Error(
                `Intelligence API returned ${response.status}`
            );

        }


        const data =
            await response.json();


        console.log(
            "Quantum Intelligence:",
            data
        );


        const intelligence =
            data.intelligence;


        /*
         * Classification
         */

        classificationElement.textContent =
            intelligence.classification;


        /*
         * Analysis
         */

        analysisElement.textContent =
            intelligence.analysis;


        /*
         * Recommendation
         */

        recommendationElement.textContent =
            intelligence.recommendation;


        /*
         * Most likely state
         */

        if (
            intelligence.most_likely_state
        ) {

            const state =
                intelligence.most_likely_state.state;

            const probability =
                intelligence.most_likely_state.probability;


            likelyStateElement.textContent =
                `|${state}⟩`;


            likelyProbabilityElement.textContent =
                formatProbability(probability);

        }


        addConsole(
            `Classification: ${intelligence.classification}`
        );


        addConsole(
            `Most likely state: ${intelligence.most_likely_state.state}`
        );


        addConsole(
            "Quantum Intelligence analysis completed."
        );

    }
    catch (error) {

        console.error(error);


        classificationElement.textContent =
            "Analysis unavailable";


        analysisElement.textContent =
            "The intelligence service could not analyze this experiment.";


        recommendationElement.textContent =
            "Check that the FastAPI intelligence endpoint is running.";


        addConsole(
            `Intelligence error: ${error.message}`
        );

    }
    finally {

        analyzeButton.disabled = false;

        analyzeButton.textContent =
            "✦ Analyze Experiment";

    }

}


/* =========================================================
   RESET
   ========================================================= */

function resetExperiment() {

    const states =
        ["00", "01", "10", "11"];


    states.forEach(state => {

        const elements =
            probabilityElements[state];


        elements.bar.style.width =
            "0%";


        elements.value.textContent =
            "0%";

    });


    totalShots.textContent =
        "1000";


    resultStatus.textContent =
        "READY";


    resultStatus.classList.remove(
        "running"
    );


    classificationElement.textContent =
        "Waiting for experiment";


    analysisElement.textContent =
        "Run a quantum experiment to generate an automated analysis.";


    recommendationElement.textContent =
        "Your next experiment will appear here.";


    likelyStateElement.textContent =
        "—";


    likelyProbabilityElement.textContent =
        "—";


    addConsole(
        "Experiment state reset."
    );

}


/* =========================================================
   CLEAR CONSOLE
   ========================================================= */

function clearConsole() {

    consoleOutput.innerHTML = "";


    addConsole(
        "Console cleared."
    );

}


/* =========================================================
   GATE BUTTONS
   ========================================================= */

const gateButtons =
    document.querySelectorAll(
        ".gate-btn"
    );


gateButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            gateButtons.forEach(
                item =>
                    item.classList.remove(
                        "selected"
                    )
            );


            button.classList.add(
                "selected"
            );


            const gate =
                button.dataset.gate;


            addConsole(
                `Gate selected: ${gate}`
            );

        }
    );

});


/* =========================================================
   SIDEBAR NAVIGATION
   ========================================================= */

const navItems =
    document.querySelectorAll(
        ".nav-item[data-section]"
    );


navItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            navItems.forEach(
                nav =>
                    nav.classList.remove(
                        "active"
                    )
            );


            item.classList.add(
                "active"
            );


            const section =
                item.dataset.section;


            let target;


            if (section === "experiment") {

                target =
                    document.getElementById(
                        "experimentSection"
                    );

            }
            else if (section === "circuit") {

                target =
                    document.getElementById(
                        "circuitSection"
                    );

            }
            else if (section === "intelligence") {

                target =
                    document.getElementById(
                        "intelligenceSection"
                    );

            }
            else if (section === "history") {

                target =
                    document.getElementById(
                        "historySection"
                    );

            }


            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

});


/* =========================================================
   DOCUMENTATION
   ========================================================= */

const docsButton =
    document.getElementById(
        "docsBtn"
    );


if (docsButton) {

    docsButton.addEventListener(
        "click",
        () => {

            addConsole(
                "Documentation: QuantumLab uses FastAPI, Qiskit and Aer."
            );

        }
    );

}


/* =========================================================
   API
   ========================================================= */

const apiButton =
    document.getElementById(
        "apiBtn"
    );


if (apiButton) {

    apiButton.addEventListener(
        "click",
        () => {

            window.open(
                "/docs",
                "_blank"
            );

        }
    );

}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */

runButton.addEventListener(
    "click",
    runExperiment
);


resetButton.addEventListener(
    "click",
    resetExperiment
);


analyzeButton.addEventListener(
    "click",
    analyzeExperiment
);


clearConsoleButton.addEventListener(
    "click",
    clearConsole
);


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializeQuantumLab() {

    addConsole(
        "QuantumLab frontend connected."
    );


    addConsole(
        "FastAPI backend detected at /api."
    );


    addConsole(
        "Quantum simulator ready."
    );

}


initializeQuantumLab();