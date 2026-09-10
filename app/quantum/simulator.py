from qiskit_aer import AerSimulator


def simulate_circuit(circuit, shots=1000):
    """
    Run a quantum circuit on a local classical simulator.
    """

    simulator = AerSimulator()

    job = simulator.run(
        circuit,
        shots=shots
    )

    result = job.result()

    counts = result.get_counts()

    return counts