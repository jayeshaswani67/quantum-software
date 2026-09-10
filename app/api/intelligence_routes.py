from fastapi import APIRouter

from app.quantum.circuits import create_bell_circuit
from app.quantum.simulator import simulate_circuit

from app.intelligence.analyzer import (
    analyze_measurements
)


router = APIRouter(
    prefix="/api/intelligence",
    tags=["Quantum Intelligence"]
)


@router.get("/analyze-bell")
def analyze_bell():

    circuit = create_bell_circuit()

    shots = 1000

    counts = simulate_circuit(
        circuit,
        shots=shots
    )

    intelligence = analyze_measurements(
        counts,
        shots
    )

    return {

        "experiment": "Bell State",

        "circuit": str(circuit),

        "measurements": counts,

        "intelligence": intelligence

    }