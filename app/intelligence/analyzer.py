from typing import Dict


def calculate_probabilities(
    counts: Dict[str, int],
    shots: int
):
    probabilities = {}

    for state, count in counts.items():
        probabilities[state] = round(
            count / shots,
            4
        )

    return probabilities


def analyze_measurements(
    counts: Dict[str, int],
    shots: int
):
    probabilities = calculate_probabilities(
        counts,
        shots
    )

    if not counts:
        return {
            "status": "error",
            "message": "No measurement results available."
        }

    most_common_state = max(
        counts,
        key=counts.get
    )

    highest_count = counts[most_common_state]

    highest_probability = (
        highest_count / shots
    )

    number_of_states = len(counts)

    # Determine whether this looks like a Bell state
    bell_like = (
        "00" in counts
        and "11" in counts
        and
        "01" not in counts
        and
        "10" not in counts
    )

    if bell_like:

        circuit_type = "Entangled Bell state"

        explanation = (
            "The measurements are concentrated around "
            "|00⟩ and |11⟩. This is the expected behavior "
            "of a two-qubit Bell state."
        )

        recommendation = (
            "Try changing or removing the CNOT gate and "
            "observe how the correlation changes."
        )

    elif number_of_states == 1:

        circuit_type = "Deterministic state"

        explanation = (
            "The circuit produced one dominant measurement "
            "state. The current circuit behaves approximately "
            "deterministically."
        )

        recommendation = (
            "Add a Hadamard gate to introduce superposition."
        )

    else:

        circuit_type = "Superposition / mixed measurement"

        explanation = (
            "Multiple computational basis states were "
            "measured. This indicates that the circuit "
            "produces a non-trivial probability distribution."
        )

        recommendation = (
            "Inspect the gates responsible for creating "
            "superposition and interference."
        )

    return {

        "status": "success",

        "classification": circuit_type,

        "most_likely_state": {
            "state": most_common_state,
            "probability": round(
                highest_probability,
                4
            )
        },

        "probabilities": probabilities,

        "analysis": explanation,

        "recommendation": recommendation,

        "shots": shots
    }