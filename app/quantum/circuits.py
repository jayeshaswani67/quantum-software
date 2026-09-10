from qiskit import QuantumCircuit


def create_bell_circuit():
    """
    Create a 2-qubit Bell state circuit.

    H gate puts qubit 0 into superposition.
    CNOT entangles qubit 0 and qubit 1.
    """

    circuit = QuantumCircuit(2, 2)

    circuit.h(0)
    circuit.cx(0, 1)

    circuit.measure([0, 1], [0, 1])

    return circuit