from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class GCDRequest(BaseModel):
    a: int = Field(..., description="First integer")
    b: int = Field(..., description="Second integer")

class GCDStep(BaseModel):
    step_num: int
    equation: str
    quotient: int
    remainder: int
    a: int
    b: int

class GCDResponse(BaseModel):
    success: bool
    result: int
    steps: List[GCDStep]
    formula: str
    explanation: str
    real_life_applications: List[Dict[str, str]]

class CongruenceRequest(BaseModel):
    a: int
    b: int
    m: int = Field(..., gt=0, description="Modulus must be greater than 0")

class CongruenceResponse(BaseModel):
    success: bool
    is_congruent: bool
    a_mod: int
    b_mod: int
    diff: int
    diff_mod: int
    steps: List[str]
    formula: str
    explanation: str

class ComplexInput(BaseModel):
    real: float
    imag: float

class ComplexRequest(BaseModel):
    z1: ComplexInput
    z2: Optional[ComplexInput] = None
    operation: str = Field(..., description="add, sub, mul, div, polar, cartesian")

class ComplexPolar(BaseModel):
    r: float
    theta: float  # in radians
    theta_deg: float  # in degrees

class ComplexResponse(BaseModel):
    success: bool
    result: ComplexInput
    result_polar: ComplexPolar
    z1_polar: ComplexPolar
    z2_polar: Optional[ComplexPolar] = None
    steps: List[str]
    formula: str
    explanation: str

class PermCombRequest(BaseModel):
    n: int = Field(..., ge=0, description="n must be non-negative")
    r: int = Field(..., ge=0, description="r must be non-negative")

class PermCombResponse(BaseModel):
    success: bool
    result: int
    steps: List[str]
    formula: str
    substitution: str
    expansion: str
    explanation: str

class GraphPoint(BaseModel):
    x: float
    y: Optional[float] = None
    label: str  # 'left', 'right', 'limit', 'regular'

class LimitRequest(BaseModel):
    expression: str = Field(..., description="Expression in x, e.g., (x^2-4)/(x-2)")
    a: float = Field(..., description="Value x approaches")

class LimitResponse(BaseModel):
    success: bool
    limit: str
    left_limit: str
    right_limit: str
    limit_exists: bool
    steps: List[str]
    formula: str
    points: List[GraphPoint]
    explanation: str
