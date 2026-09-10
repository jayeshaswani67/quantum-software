from fastapi import APIRouter

from app.quantum.circuits import create_bell_circuit
from app.quantum.simulator import simulate_circuit


router = APIRouter(
    prefix="/api/quantum",
    tags=["Quantum"]
)


@router.get("/bell")
def run_bell_state():

    circuit = create_bell_circuit()

    counts = simulate_circuit(
        circuit,
        shots=1000
    )

    return {
        "algorithm": "Bell State",
        "qubits": 2,
        "shots": 1000,
        "results": counts,
        "circuit": str(circuit)
    }