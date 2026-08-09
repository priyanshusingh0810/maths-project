from fastapi import APIRouter, HTTPException
from app.schemas.math_schemas import (
    GCDRequest, GCDResponse,
    CongruenceRequest, CongruenceResponse,
    ComplexRequest, ComplexResponse,
    PermCombRequest, PermCombResponse,
    LimitRequest, LimitResponse
)
from app.services.math_service import (
    calculate_gcd_service,
    calculate_congruence_service,
    calculate_complex_service,
    calculate_permutation_service,
    calculate_combination_service,
    evaluate_sympy_limit
)

router = APIRouter(prefix="/api", tags=["mathematics"])

@router.post("/gcd", response_model=GCDResponse)
def get_gcd(request: GCDRequest):
    try:
        data = calculate_gcd_service(request.a, request.b)
        return data
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"GCD Calculation Error: {str(e)}")

@router.post("/congruence", response_model=CongruenceResponse)
def get_congruence(request: CongruenceRequest):
    try:
        data = calculate_congruence_service(request.a, request.b, request.m)
        return data
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Congruence Error: {str(e)}")

@router.post("/complex", response_model=ComplexResponse)
def get_complex(request: ComplexRequest):
    try:
        z1_dict = {"real": request.z1.real, "imag": request.z1.imag}
        z2_dict = None
        if request.z2 is not None:
            z2_dict = {"real": request.z2.real, "imag": request.z2.imag}
            
        data = calculate_complex_service(z1_dict, z2_dict, request.operation)
        return data
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Complex Number Operations Error: {str(e)}")

@router.post("/permutation", response_model=PermCombResponse)
def get_permutation(request: PermCombRequest):
    try:
        data = calculate_permutation_service(request.n, request.r)
        return data
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Permutation Calculation Error: {str(e)}")

@router.post("/combination", response_model=PermCombResponse)
def get_combination(request: PermCombRequest):
    try:
        data = calculate_combination_service(request.n, request.r)
        return data
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Combination Calculation Error: {str(e)}")

@router.post("/limit", response_model=LimitResponse)
def get_limit(request: LimitRequest):
    try:
        data = evaluate_sympy_limit(request.expression, request.a)
        return data
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Limit Evaluation Error: {str(e)}")
