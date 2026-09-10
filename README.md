# QuantumLab ⚛️

> A web-based quantum experimentation and intelligence platform built with **FastAPI, Qiskit, Qiskit Aer, HTML, CSS, and JavaScript**.

QuantumLab provides a lightweight environment for running quantum experiments locally, visualizing measurement results, and automatically interpreting quantum behavior through a Quantum Intelligence layer.

The goal is to evolve QuantumLab from a simple quantum simulator interface into an **interactive quantum experimentation platform**.

---

## ✨ Features

### Quantum Simulation

* Local quantum circuit simulation using Qiskit Aer
* Bell State experiment
* Configurable measurement shots
* Quantum measurement results
* Computational basis state probabilities

### Quantum Visualization

* Quantum circuit visualization
* Measurement probability bars
* Quantum state representation
* Experiment status indicators
* Real-time experiment console

### Quantum Intelligence

QuantumLab includes an initial rule-based intelligence engine that analyzes experimental measurements.

It can currently identify:

* **Entangled Bell State**
* **Deterministic State**
* **Superposition / Mixed Measurement**
* Most likely measurement state
* Measurement probabilities
* Experiment recommendations

Example:

```text
Classification
↓
Entangled Bell state

Most likely state
↓
|00⟩

Analysis
↓
Measurements are concentrated around |00⟩ and |11⟩.

Recommendation
↓
Try changing or removing the CNOT gate and observe
how the correlation changes.
```

---

# 🧠 How QuantumLab Works

The current architecture is:

```text
                    QuantumLab
                        │
          ┌─────────────┼─────────────┐
          │             │             │
       Frontend      FastAPI       Intelligence
          │             │             │
          │             ▼             │
          │          Qiskit           │
          │             │             │
          │             ▼             │
          │       Aer Simulator       │
          │             │             │
          └─────────────┼─────────────┘
                        │
                        ▼
                Measurement Data
                        │
                        ▼
              Quantum Intelligence
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
          Analysis          Recommendation
```

---

# 🔬 Current Experiment

QuantumLab currently demonstrates a two-qubit **Bell State**.

The circuit is:

```text
q0 ─── H ───●──── Measure
            │
q1 ─────────X──── Measure
```

Mathematically:

```text
|00⟩

    ↓ H

(|00⟩ + |10⟩) / √2

    ↓ CNOT

(|00⟩ + |11⟩) / √2
```

The expected measurement distribution is approximately:

```text
|00⟩  █████████████████████████  ~50%

|01⟩                              ~0%

|10⟩                              ~0%

|11⟩  █████████████████████████  ~50%
```

The exact results vary slightly because the simulator performs repeated measurements.

---

# 🏗️ Project Structure

```text
quantum-software/
│
├── app/
│   ├── __init__.py
│   ├── main.py
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   ├── routes.py
│   │   └── intelligence_routes.py
│   │
│   ├── quantum/
│   │   ├── __init__.py
│   │   ├── circuits.py
│   │   └── simulator.py
│   │
│   ├── intelligence/
│   │   ├── __init__.py
│   │   └── analyzer.py
│   │
│   └── templates/
│       └── index.html
│
├── static/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── quantum.js
│
├── tests/
│   └── test_quantum.py
│
├── .gitignore
├── README.md
└── requirements.txt
```

---

# ⚙️ Tech Stack

| Technology | Purpose                              |
| ---------- | ------------------------------------ |
| Python     | Backend language                     |
| FastAPI    | REST API                             |
| Qiskit     | Quantum circuit framework            |
| Qiskit Aer | Local quantum simulator              |
| HTML       | Frontend structure                   |
| CSS        | Interface styling                    |
| JavaScript | Frontend logic and API communication |
| Pytest     | Testing                              |

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/jayeshaswani67/quantum-software.git
```

Enter the project:

```bash
cd quantum-software
```

---

## 2. Create a virtual environment

Windows:

```powershell
python -m venv .venv
```

Activate it:

```powershell
.venv\Scripts\Activate.ps1
```

If PowerShell activation is blocked, you can run:

```powershell
.venv\Scripts\python.exe -m pip install -r requirements.txt
```

---

## 3. Install dependencies

```powershell
python -m pip install -r requirements.txt
```

The main dependencies are:

```text
qiskit
qiskit-aer
fastapi
uvicorn
numpy
pytest
```

---

# ▶️ Run QuantumLab

Start the FastAPI server:

```powershell
python -m uvicorn app.main:app --reload
```

You should see something similar to:

```text
Uvicorn running on http://127.0.0.1:8000
```

Open:

```text
http://127.0.0.1:8000
```

QuantumLab should now be running locally.

---

# 🔌 API

## Run Bell State

### Endpoint

```text
GET /api/quantum/bell
```

Example:

```text
http://127.0.0.1:8000/api/quantum/bell
```

Example response:

```json
{
  "algorithm": "Bell State",
  "qubits": 2,
  "shots": 1000,
  "results": {
    "00": 503,
    "11": 497
  }
}
```

---

## Quantum Intelligence

### Endpoint

```text
GET /api/intelligence/analyze-bell
```

Example response:

```json
{
  "experiment": "Bell State",
  "measurements": {
    "00": 503,
    "11": 497
  },
  "intelligence": {
    "status": "success",
    "classification": "Entangled Bell state",
    "most_likely_state": {
      "state": "00",
      "probability": 0.503
    },
    "analysis": "The measurements are concentrated around |00⟩ and |11⟩.",
    "recommendation": "Try changing or removing the CNOT gate."
  }
}
```

---

# 📚 API Documentation

FastAPI automatically provides interactive API documentation.

After starting the server, open:

```text
http://127.0.0.1:8000/docs
```

You can test the QuantumLab endpoints directly from the Swagger interface.

---

# 🧪 Running Tests

Run:

```powershell
pytest
```

For more detailed output:

```powershell
pytest -v
```

---

# 🧩 Quantum Intelligence Architecture

The initial intelligence layer is intentionally simple and deterministic.

It receives measurement results:

```text
{
    "00": 503,
    "11": 497
}
```

Then calculates probabilities:

```text
00 → 50.3%

11 → 49.7%
```

The analyzer looks for patterns in the distribution.

For example:

```text
00 + 11
   │
   ▼
Strong correlation
   │
   ▼
Bell-like distribution
   │
   ▼
Entangled Bell State
```

This provides a foundation for a more advanced intelligence system.

---

# 🛣️ Roadmap

QuantumLab is being developed toward a more advanced quantum experimentation environment.

## Phase 1 — Foundation

* [x] FastAPI backend
* [x] Qiskit integration
* [x] Aer simulator
* [x] Bell State experiment
* [x] Measurement visualization
* [x] Quantum Intelligence prototype
* [x] API documentation

## Phase 2 — Interactive Quantum IDE

* [ ] Visual circuit builder
* [ ] Drag-and-drop quantum gates
* [ ] Multiple qubits
* [ ] Custom circuits
* [ ] Dynamic circuit simulation
* [ ] Circuit JSON representation
* [ ] Circuit export/import

Example future circuit:

```text
q0 ─── H ─────●──── X ─── M
              │
q1 ───────────X──── H ─── M
```

---

## Phase 3 — Quantum Intelligence

The intelligence engine will move beyond simple classification.

Planned capabilities:

```text
Circuit
   ↓
Circuit Analysis
   ↓
Quantum Simulation
   ↓
Measurement Analysis
   ↓
Pattern Detection
   ↓
Quantum Explanation
   ↓
Optimization Suggestions
```

Potential features:

* Entanglement detection
* Superposition detection
* Interference analysis
* Gate efficiency analysis
* Circuit complexity analysis
* Error pattern detection
* Experiment comparison
* Automated experiment recommendations
* Natural-language explanations

---

# 🤖 Future Quantum Copilot

A future version of QuantumLab could include a natural-language quantum assistant.

For example:

```text
User:

Why am I getting mostly |00⟩ and |11⟩?
```

QuantumLab:

```text
Your circuit appears to create a Bell-like
correlation between the two qubits.

The H gate creates superposition, while the
CNOT gate correlates the second qubit with
the first.

That's why |01⟩ and |10⟩ occur very rarely.
```

The goal is to make quantum computing easier to understand without hiding the underlying mathematics.

---

# ⚡ Future Architecture

The long-term platform could evolve into:

```text
                    QuantumLab
                        │
              ┌─────────┴─────────┐
              │                   │
        Circuit Builder      AI Copilot
              │                   │
              ▼                   ▼
         Circuit Engine      Explanation
              │                   │
              ▼                   │
       Quantum Simulator         │
              │                   │
              └─────────┬─────────┘
                        ▼
                Quantum Analysis
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
      Optimize       Explain       Predict
          │             │             │
          └─────────────┼─────────────┘
                        ▼
                Experiment Results
```

---

# 🎯 Vision

The long-term vision for QuantumLab is to create a developer-friendly environment where users can:

```text
Build
  ↓
Simulate
  ↓
Visualize
  ↓
Understand
  ↓
Optimize
  ↓
Experiment
```

Instead of only running quantum circuits, QuantumLab aims to help users understand **why the circuit behaves the way it does**.

---

# 💡 Why This Project?

Quantum computing can be difficult to approach because users often have to work across:

* Quantum mathematics
* Circuit design
* Programming frameworks
* Simulators
* Measurement statistics
* Hardware concepts

QuantumLab explores how these pieces can be brought together into a single developer-oriented environment.

---

# 🔐 Current Limitations

This project is currently a local quantum simulation platform.

It does **not** yet execute circuits on real quantum hardware.

The current Quantum Intelligence system is also **rule-based**, rather than a large language model.

These limitations are intentional starting points for future development.

---

# 📈 Future Possibilities

Potential future integrations include:

* Real quantum hardware
* Cloud quantum backends
* Advanced circuit optimization
* Quantum error mitigation
* Quantum machine learning
* RAG-based quantum documentation assistant
* LLM-powered quantum copilot
* Experiment history
* Circuit sharing
* Collaborative experiments
* Quantum algorithm library

---

# 🤝 Contributing

Contributions and ideas are welcome.

A simple development workflow:

```bash
git checkout -b feature/my-feature
```

Make your changes, then:

```bash
git add .
git commit -m "Add my feature"
git push origin feature/my-feature
```

Then open a pull request.

---

# 📜 License

This project is currently intended as an open-source learning and experimentation project.

A formal license can be added as the project matures.

---

# 👨‍💻 Author

**Jayesh Aswani**

Building at the intersection of:

```text
Software Engineering
        +
Artificial Intelligence
        +
Quantum Computing
        +
Deep Technology
```

---

## ⭐ Project Status

**Early Development**

QuantumLab is actively evolving from a Bell State demonstration into a broader quantum experimentation and intelligence platform.

If you find the project interesting, consider ⭐ starring the repository and following the development.
