import math
import sympy as sp
from typing import List, Dict, Any, Tuple, Optional
from app.schemas.math_schemas import GCDStep, GraphPoint

def calculate_gcd_service(a: int, b: int) -> Dict[str, Any]:
    orig_a, orig_b = a, b
    a_abs, b_abs = abs(a), abs(b)
    
    steps = []
    curr_a, curr_b = a_abs, b_abs
    
    # If a < b, swap them to start Euclidean algorithm with a >= b
    swapped = False
    if curr_a < curr_b:
        curr_a, curr_b = curr_b, curr_a
        swapped = True
        
    step_num = 1
    if curr_b == 0:
        gcd_val = curr_a
        steps.append(GCDStep(
            step_num=1,
            equation=f"{curr_a} = 0 * 0 + {curr_a}",
            quotient=0,
            remainder=curr_a,
            a=curr_a,
            b=0
        ))
    else:
        while curr_b > 0:
            q = curr_a // curr_b
            r = curr_a % curr_b
            steps.append(GCDStep(
                step_num=step_num,
                equation=f"{curr_a} = {curr_b} * {q} + {r}",
                quotient=q,
                remainder=r,
                a=curr_a,
                b=curr_b
            ))
            curr_a = curr_b
            curr_b = r
            step_num += 1
        gcd_val = curr_a

    # Real-life applications list
    apps = [
        {"title": "Simplifying Fractions", "description": "Used to find the greatest common divisor of the numerator and denominator to simplify fractions to their lowest terms (e.g., 48/18 simplifies by dividing both by 6 to get 8/3)."},
        {"title": "Tiling and Grid Layouts", "description": "Determines the largest square tiles that can perfectly cover a rectangular floor of dimensions a x b without any cutting."},
        {"title": "Scheduling and Resource Division", "description": "Helps in dividing different groups of objects into equal-sized packages or aligning periodic event intervals."}
    ]
    
    explanation = f"Using the Euclidean Algorithm, we continuously divide the numbers and compute the remainder. The last non-zero remainder in the division process is the Greatest Common Divisor. Here, the final non-zero remainder is {gcd_val}."
    
    return {
        "success": True,
        "result": gcd_val,
        "steps": steps,
        "formula": r"\gcd(a, b) = \gcd(b, a \bmod b)",
        "explanation": explanation,
        "real_life_applications": apps
    }

def calculate_congruence_service(a: int, b: int, m: int) -> Dict[str, Any]:
    a_mod = a % m
    b_mod = b % m
    is_cong = (a_mod == b_mod)
    diff = a - b
    diff_mod = diff % m
    
    steps = [
        f"Calculate the remainder of a modulo m: {a} mod {m} = {a_mod}",
        f"Calculate the remainder of b modulo m: {b} mod {m} = {b_mod}",
        f"Find the difference between a and b: a - b = {a} - {b} = {diff}",
        f"Check if the difference is divisible by modulus m: ({diff}) mod {m} = {diff_mod}"
    ]
    
    if is_cong:
        explanation = f"Since the remainders are equal ({a_mod} == {b_mod}), we conclude that {a} ≡ {b} (mod {m}). The modulus {m} divides the difference ({a} - {b} = {diff}) without a remainder."
        steps.append(f"Conclusion: Congruence holds because {a_mod} = {b_mod} and {m} divides {diff} perfectly.")
    else:
        explanation = f"Since the remainders are different ({a_mod} != {b_mod}), we conclude that {a} ≢ {b} (mod {m}). The modulus {m} does not divide the difference ({a} - {b} = {diff}) without a remainder."
        steps.append(f"Conclusion: Congruence does not hold because {a_mod} != {b_mod} and {m} does not divide {diff} perfectly.")
        
    return {
        "success": True,
        "is_congruent": is_cong,
        "a_mod": a_mod,
        "b_mod": b_mod,
        "diff": diff,
        "diff_mod": diff_mod,
        "steps": steps,
        "formula": r"a \equiv b \pmod{m} \iff m \mid (a - b)",
        "explanation": explanation
    }

def get_polar_data(real: float, imag: float) -> Dict[str, float]:
    r = math.sqrt(real**2 + imag**2)
    theta = math.atan2(imag, real)
    theta_deg = math.degrees(theta)
    return {"r": r, "theta": theta, "theta_deg": theta_deg}

def calculate_complex_service(z1: Dict[str, float], z2: Optional[Dict[str, float]], op: str) -> Dict[str, Any]:
    z1_r, z1_i = z1["real"], z1["imag"]
    z1_polar = get_polar_data(z1_r, z1_i)
    
    z2_r, z2_i = 0.0, 0.0
    z2_polar = None
    if z2 is not None:
        z2_r, z2_i = z2["real"], z2["imag"]
        z2_polar = get_polar_data(z2_r, z2_i)
        
    steps = []
    res_r, res_i = 0.0, 0.0
    
    if op == "add":
        res_r = z1_r + z2_r
        res_i = z1_i + z2_i
        steps.append(f"Group the real and imaginary parts: ({z1_r} + {z2_r}) + ({z1_i} + {z2_i})i")
        steps.append(f"Sum of real parts: {z1_r} + {z2_r} = {res_r}")
        steps.append(f"Sum of imaginary parts: {z1_i} + {z2_i} = {res_i}")
        formula = r"z_1 + z_2 = (a + c) + (b + d)i"
        explanation = f"We add the real parts together ({z1_r} + {z2_r} = {res_r}) and the imaginary parts together ({z1_i} + {z2_i} = {res_i}) to get the resulting complex number {res_r} + {res_i}i."
    
    elif op == "sub":
        res_r = z1_r - z2_r
        res_i = z1_i - z2_i
        steps.append(f"Group the real and imaginary parts: ({z1_r} - {z2_r}) + ({z1_i} - {z2_i})i")
        steps.append(f"Difference of real parts: {z1_r} - {z2_r} = {res_r}")
        steps.append(f"Difference of imaginary parts: {z1_i} - {z2_i} = {res_i}")
        formula = r"z_1 - z_2 = (a - c) + (b - d)i"
        explanation = f"We subtract the real part of z2 from z1 ({z1_r} - {z2_r} = {res_r}) and the imaginary part of z2 from z1 ({z1_i} - {z2_i} = {res_i}) to obtain {res_r} + {res_i}i."
        
    elif op == "mul":
        res_r = z1_r * z2_r - z1_i * z2_i
        res_i = z1_r * z2_i + z1_i * z2_r
        steps.append(f"Apply FOIL method: ({z1_r} + {z1_i}i) * ({z2_r} + {z2_i}i)")
        steps.append(f"Expansion: {z1_r}*{z2_r} + {z1_r}*{z2_i}i + {z1_i}*{z2_r}i + {z1_i}*{z2_i}*(i^2)")
        steps.append(f"Recall that i^2 = -1: ({z1_r}*{z2_r} - {z1_i}*{z2_i}) + ({z1_r}*{z2_i} + {z1_i}*{z2_r})i")
        steps.append(f"Evaluate real part: {z1_r}*{z2_r} - {z1_i}*{z2_i} = {res_r}")
        steps.append(f"Evaluate imaginary part: {z1_r}*{z2_i} + {z1_i}*{z2_r} = {res_i}")
        formula = r"z_1 \cdot z_2 = (ac - bd) + (ad + bc)i"
        explanation = f"Using distributive multiplication and the identity i^2 = -1, we compute the product: ({z1_r} * {z2_r} - {z1_i} * {z2_i}) = {res_r} for the real part and ({z1_r} * {z2_i} + {z1_i} * {z2_r}) = {res_i} for the imaginary part."
        
    elif op == "div":
        denom = z2_r**2 + z2_i**2
        if denom == 0:
            raise ValueError("Division by zero complex number is not allowed.")
        res_r = (z1_r * z2_r + z1_i * z2_i) / denom
        res_i = (z1_i * z2_r - z1_r * z2_i) / denom
        steps.append(f"Multiply numerator and denominator by the conjugate of z2: {z2_r} - {z2_i}i")
        steps.append(f"Denominator product: ({z2_r} + {z2_i}i) * ({z2_r} - {z2_i}i) = {z2_r}^2 + {z2_i}^2 = {denom}")
        steps.append(f"Numerator product: ({z1_r} + {z1_i}i) * ({z2_r} - {z2_i}i) = ({z1_r}*{z2_r} + {z1_i}*{z2_i}) + ({z1_i}*{z2_r} - {z1_r}*{z2_i})i")
        steps.append(f"Numerator real part: {z1_r}*{z2_r} + {z1_i}*{z2_i} = {z1_r*z2_r + z1_i*z2_i}")
        steps.append(f"Numerator imaginary part: {z1_i}*{z2_r} - {z1_r}*{z2_i} = {z1_i*z2_r - z1_r*z2_i}")
        steps.append(f"Divide both parts by denominator: ({z1_r*z2_r + z1_i*z2_i})/{denom} + (({z1_i*z2_r - z1_r*z2_i})/{denom})i")
        formula = r"\frac{z_1}{z_2} = \frac{ac + bd}{c^2 + d^2} + \frac{bc - ad}{c^2 + d^2}i"
        explanation = f"To divide, we multiply both top and bottom by the complex conjugate of the denominator, expanding and simplifying to get {res_r:.4f} + {res_i:.4f}i."
        
    else:  # Modulus/Argument/Conversions for z1 alone
        res_r, res_i = z1_r, z1_i
        steps.append(f"Calculate modulus |z1|: sqrt({z1_r}^2 + {z1_i}^2) = {z1_polar['r']:.4f}")
        steps.append(f"Calculate argument arg(z1): atan2({z1_i}, {z1_r}) = {z1_polar['theta']:.4f} rad ({z1_polar['theta_deg']:.2f}°)")
        formula = r"z = r(\cos \theta + i\sin \theta)"
        explanation = f"For the complex number z = {z1_r} + {z1_i}i, the magnitude is {z1_polar['r']:.4f} and the angle/argument is {z1_polar['theta_deg']:.2f}°."

    res_polar = get_polar_data(res_r, res_i)
    
    return {
        "success": True,
        "result": {"real": res_r, "imag": res_i},
        "result_polar": res_polar,
        "z1_polar": z1_polar,
        "z2_polar": z2_polar,
        "steps": steps,
        "formula": formula,
        "explanation": explanation
    }

def get_factorial_expansion(n: int) -> str:
    if n == 0 or n == 1:
        return "1"
    if n <= 10:
        return " * ".join(str(i) for i in range(n, 0, -1))
    return f"{n} * {n-1} * {n-2} * ... * 1"

def calculate_permutation_service(n: int, r: int) -> Dict[str, Any]:
    if r > n:
        raise ValueError("r cannot be greater than n")
    
    val_n_fact = math.factorial(n)
    val_nmr_fact = math.factorial(n - r)
    result = val_n_fact // val_nmr_fact
    
    steps = [
        f"Verify constraints: n = {n}, r = {r}. Both are non-negative and {r} <= {n}.",
        f"Calculate n! = {n}! = {val_n_fact}",
        f"Calculate (n - r)! = ({n} - {r})! = {n-r}! = {val_nmr_fact}",
        f"Substitute into formula: {n}! / ({n} - {r})! = {val_n_fact} / {val_nmr_fact}"
    ]
    
    # Build expansion details
    n_exp = get_factorial_expansion(n)
    nmr_exp = get_factorial_expansion(n-r)
    expansion = f"nPr = ({n_exp}) / ({nmr_exp})"
    
    # Detail standard algebraic simplification
    if r == 0:
        simplified_factors = "1"
    else:
        simplified_factors = " * ".join(str(i) for i in range(n, n - r, -1))
    
    steps.append(f"Simplify by canceling shared factors in numerator and denominator: {simplified_factors} = {result}")
    
    explanation = f"Permutation counts the number of ways to arrange r unique items chosen from a pool of n. Since order matters, we divide the total arrangements of n items (n!) by the redundant arrangements of the remaining unchosen items ((n-r)!). The resulting permutations are {result}."
    
    return {
        "success": True,
        "result": result,
        "steps": steps,
        "formula": r"nPr = \frac{n!}{(n - r)!}",
        "substitution": f"P({n}, {r}) = \\frac{{{n}!}}{{{n-r}!}}",
        "expansion": expansion,
        "explanation": explanation
    }

def calculate_combination_service(n: int, r: int) -> Dict[str, Any]:
    if r > n:
        raise ValueError("r cannot be greater than n")
        
    val_n_fact = math.factorial(n)
    val_r_fact = math.factorial(r)
    val_nmr_fact = math.factorial(n - r)
    result = val_n_fact // (val_r_fact * val_nmr_fact)
    
    steps = [
        f"Verify constraints: n = {n}, r = {r}. Both are non-negative and {r} <= {n}.",
        f"Calculate n! = {n}! = {val_n_fact}",
        f"Calculate r! = {r}! = {val_r_fact}",
        f"Calculate (n - r)! = ({n} - {r})! = {n-r}! = {val_nmr_fact}",
        f"Substitute into formula: {n}! / [{r}! * {n-r}!] = {val_n_fact} / [{val_r_fact} * {val_nmr_fact}]"
    ]
    
    n_exp = get_factorial_expansion(n)
    r_exp = get_factorial_expansion(r)
    nmr_exp = get_factorial_expansion(n-r)
    expansion = f"nCr = ({n_exp}) / [({r_exp}) * ({nmr_exp})]"
    
    # Detail standard algebraic simplification
    if r == 0:
        simplified_num = "1"
        simplified_den = "1"
    else:
        simplified_num = " * ".join(str(i) for i in range(n, n - r, -1))
        simplified_den = " * ".join(str(i) for i in range(r, 0, -1))
        
    steps.append(f"Cancel (n-r)!: ({simplified_num}) / ({simplified_den}) = {result}")
    
    explanation = f"Combination counts the number of ways to select r items from a pool of n, where the order of selection does not matter. To remove ordering from our permutations, we divide nPr by the arrangements of the chosen group (r!). This yields {result} combinations."
    
    return {
        "success": True,
        "result": result,
        "steps": steps,
        "formula": r"nCr = \frac{n!}{r!(n - r)!}",
        "substitution": f"C({n}, {r}) = \\frac{{{n}!}}{{{r}!({n-r})!}}",
        "expansion": expansion,
        "explanation": explanation
    }

def evaluate_sympy_limit(expr_str: str, a_val: float) -> Dict[str, Any]:
    x = sp.Symbol('x')
    
    try:
        # standard mathematical translations (like sin x to sin(x))
        clean_expr = expr_str.replace("^", "**")
        expr = sp.sympify(clean_expr, locals={"x": x})
    except Exception as e:
        raise ValueError(f"Failed to parse function expression: {str(e)}")
        
    # Convert limit point to exact SymPy representation (integer/rational)
    try:
        a_sym = sp.nsimplify(a_val)
    except Exception:
        a_sym = sp.sympify(a_val)

    # Evaluate left, right, and two-sided limits
    try:
        l_lim = sp.limit(expr, x, a_sym, dir='-')
        r_lim = sp.limit(expr, x, a_sym, dir='+')
        two_sided = sp.limit(expr, x, a_sym, dir='+-')
    except Exception as e:
        raise ValueError(f"Evaluation error: {str(e)}")
        
    def clean_sym_value(val) -> str:
        if val == sp.oo:
            return "Infinity"
        elif val == -sp.oo:
            return "-Infinity"
        elif val == sp.zoo:
            return "Complex Infinity"
        elif isinstance(val, sp.Limit):
            return "Undefined"
        return str(val)

    left_str = clean_sym_value(l_lim)
    right_str = clean_sym_value(r_lim)
    two_sided_str = clean_sym_value(two_sided)
    
    # Limit exists if left-hand limit equals right-hand limit, and is not undefined/infinite
    limit_exists = (l_lim == r_lim) and (left_str not in ["Undefined", "Complex Infinity"])
    
    steps = [
        f"Function: f(x) = {expr_str}",
        f"Evaluate limit as x approaches {a_val}",
        f"Left-hand limit: lim(x->{a_val}-) f(x) = {left_str}",
        f"Right-hand limit: lim(x->{a_val}+) f(x) = {right_str}"
    ]
    
    if limit_exists:
        steps.append(f"Since Left-Hand Limit ({left_str}) = Right-Hand Limit ({right_str}), the two-sided limit exists and equals {two_sided_str}.")
    else:
        steps.append(f"Since Left-Hand Limit ({left_str}) is not equal to Right-Hand Limit ({right_str}) or is undefined, the two-sided limit does NOT exist.")
        
    # Simplify expression to explain hole removal if applicable
    simplified_expr = sp.simplify(expr)
    explanation = f"To find the limit of f(x) as x approaches {a_val}, we inspect the values of f(x) when x is very close to {a_val} from both sides."
    if simplified_expr != expr:
        steps.insert(2, f"Simplify expression: f(x) factors/simplifies to {simplified_expr}")
        explanation += f" By simplifying f(x) to {simplified_expr}, we can remove removable discontinuities (holes) and evaluate by direct substitution, yielding {two_sided_str}."

    # Generate graph points
    # We want to sample around x = a_val
    points: List[GraphPoint] = []
    
    # We will sample 20 points to the left, 20 to the right, and the limit point at a
    left_sample_x = [a_val - 2.0 + (i * 0.1) for i in range(20)] # a - 2.0 to a - 0.1
    right_sample_x = [a_val + 0.1 + (i * 0.1) for i in range(20)] # a + 0.1 to a + 2.0
    
    # Sample left points
    for sx in left_sample_x:
        # evaluate using direct substitution in SymPy
        try:
            val = float(expr.subs(x, sx).evalf())
            if not math.isnan(val) and not math.isinf(val):
                points.append(GraphPoint(x=round(sx, 4), y=round(val, 4), label="left"))
        except Exception:
            pass
            
    # Add limit point at x = a_val
    try:
        if limit_exists:
            lim_val = float(two_sided.evalf())
            points.append(GraphPoint(x=a_val, y=round(lim_val, 4), label="limit"))
        else:
            # check left limit value
            if left_str not in ["Infinity", "-Infinity", "Undefined", "Complex Infinity"]:
                points.append(GraphPoint(x=a_val, y=round(float(l_lim.evalf()), 4), label="limit"))
            else:
                points.append(GraphPoint(x=a_val, y=None, label="limit"))
    except Exception:
        points.append(GraphPoint(x=a_val, y=None, label="limit"))
        
    # Sample right points
    for sx in right_sample_x:
        try:
            val = float(expr.subs(x, sx).evalf())
            if not math.isnan(val) and not math.isinf(val):
                points.append(GraphPoint(x=round(sx, 4), y=round(val, 4), label="right"))
        except Exception:
            pass
            
    # Sort points by x coordinate
    points.sort(key=lambda p: p.x)
    
    return {
        "success": True,
        "limit": two_sided_str,
        "left_limit": left_str,
        "right_limit": right_str,
        "limit_exists": limit_exists,
        "steps": steps,
        "formula": r"\lim_{x \to a} f(x)",
        "points": points,
        "explanation": explanation
    }
