import sys
import os

# Add the parent folder to the path so python can locate the app module
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.services.math_service import (
    calculate_gcd_service,
    calculate_congruence_service,
    calculate_complex_service,
    calculate_permutation_service,
    calculate_combination_service,
    evaluate_sympy_limit
)

def run_tests():
    print("=========================================")
    print("RUNNING MATHEMATICAL COMPONENT TESTS...")
    print("=========================================\n")
    
    # 1. GCD Test
    print("Test 1: GCD Euclidean Algorithm (48, 18)")
    gcd_res = calculate_gcd_service(48, 18)
    assert gcd_res["success"] == True
    assert gcd_res["result"] == 6
    print(f"  -> Success! GCD is {gcd_res['result']}")
    print("  -> Euclidean steps:")
    for step in gcd_res["steps"]:
        print(f"     Step {step.step_num}: {step.equation}")
    print()

    # 2. Congruence Test
    print("Test 2: Modular Congruence 17 == 5 (mod 12)")
    cong_res = calculate_congruence_service(17, 5, 12)
    assert cong_res["success"] == True
    assert cong_res["is_congruent"] == True
    assert cong_res["a_mod"] == 5
    assert cong_res["b_mod"] == 5
    print(f"  -> Success! Congruent status is {cong_res['is_congruent']}")
    print()

    # 3. Complex Addition Test
    print("Test 3: Complex Number Addition (2+3i) + (1+4i)")
    comp_res = calculate_complex_service(
        {"real": 2.0, "imag": 3.0},
        {"real": 1.0, "imag": 4.0},
        "add"
    )
    assert comp_res["success"] == True
    assert comp_res["result"]["real"] == 3.0
    assert comp_res["result"]["imag"] == 7.0
    print(f"  -> Success! Result is {comp_res['result']['real']} + {comp_res['result']['imag']}i")
    print()

    # 4. Permutation Test
    print("Test 4: Permutation 5P3")
    perm_res = calculate_permutation_service(5, 3)
    assert perm_res["success"] == True
    assert perm_res["result"] == 60
    print(f"  -> Success! 5P3 = {perm_res['result']}")
    print(f"  -> Expansion: {perm_res['expansion']}")
    print()

    # 5. Combination Test
    print("Test 5: Combination 5C3")
    comb_res = calculate_combination_service(5, 3)
    assert comb_res["success"] == True
    assert comb_res["result"] == 10
    print(f"  -> Success! 5C3 = {comb_res['result']}")
    print(f"  -> Expansion: {comb_res['expansion']}")
    print()

    # 6. Limit Test
    print("Test 6: Limit of (x^2 - 4) / (x - 2) as x -> 2")
    limit_res = evaluate_sympy_limit("(x**2 - 4)/(x - 2)", 2.0)
    assert limit_res["success"] == True
    assert limit_res["limit"] == "4"
    assert limit_res["limit_exists"] == True
    print(f"  -> Success! Limit as x->2 is {limit_res['limit']}")
    print("  -> SymPy limit evaluations:")
    for step in limit_res["steps"]:
        print(f"     {step}")
    print()
    
    print("=========================================")
    print("ALL TESTS PASSED SUCCESSFULLY!")
    print("=========================================")

if __name__ == "__main__":
    run_tests()
