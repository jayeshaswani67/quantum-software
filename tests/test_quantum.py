from app.quantum.circuits import create_bell_circuit
from app.quantum.simulator import simulate_circuit


def test_bell_circuit():

    circuit = create_bell_circuit()

    counts = simulate_circuit(
        circuit,
        shots=1000
    )

    assert "00" in counts
    assert "11" in counts

    assert counts["00"] + counts["11"] == 1000