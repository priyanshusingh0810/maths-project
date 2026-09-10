export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://math-explorer-backend.onrender.com/api';

export interface GCDStep {
  step_num: number;
  equation: string;
  quotient: number;
  remainder: number;
  a: number;
  b: number;
}

export interface GCDResponse {
  success: boolean;
  result: number;
  steps: GCDStep[];
  formula: string;
  explanation: string;
  real_life_applications: Array<{ title: string; description: string }>;
}

export interface CongruenceResponse {
  success: boolean;
  is_congruent: boolean;
  a_mod: number;
  b_mod: number;
  diff: number;
  diff_mod: number;
  steps: string[];
  formula: string;
  explanation: string;
}

export interface ComplexInput {
  real: number;
  imag: number;
}

export interface ComplexPolar {
  r: number;
  theta: number;
  theta_deg: number;
}

export interface ComplexResponse {
  success: boolean;
  result: ComplexInput;
  result_polar: ComplexPolar;
  z1_polar: ComplexPolar;
  z2_polar?: ComplexPolar;
  steps: string[];
  formula: string;
  explanation: string;
}

export interface PermCombResponse {
  success: boolean;
  result: number;
  steps: string[];
  formula: string;
  substitution: string;
  expansion: string;
  explanation: string;
}

export interface GraphPoint {
  x: number;
  y: number | null;
  label: 'left' | 'right' | 'limit' | 'regular';
}

export interface LimitResponse {
  success: boolean;
  limit: string;
  left_limit: string;
  right_limit: string;
  limit_exists: boolean;
  steps: string[];
  formula: string;
  points: GraphPoint[];
  explanation: string;
}

export const mathApi = {
  async getGCD(a: number, b: number): Promise<GCDResponse> {
    const res = await fetch(`${API_BASE_URL}/gcd`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a, b }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'GCD calculation failed.');
    }
    return res.json();
  },

  async getCongruence(a: number, b: number, m: number): Promise<CongruenceResponse> {
    const res = await fetch(`${API_BASE_URL}/congruence`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a, b, m }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Congruence check failed.');
    }
    return res.json();
  },

  async getComplex(z1: ComplexInput, z2: ComplexInput | null, operation: string): Promise<ComplexResponse> {
    const res = await fetch(`${API_BASE_URL}/complex`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ z1, z2, operation }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Complex operation failed.');
    }
    return res.json();
  },

  async getPermutation(n: number, r: number): Promise<PermCombResponse> {
    const res = await fetch(`${API_BASE_URL}/permutation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ n, r }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Permutation calculation failed.');
    }
    return res.json();
  },

  async getCombination(n: number, r: number): Promise<PermCombResponse> {
    const res = await fetch(`${API_BASE_URL}/combination`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ n, r }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Combination calculation failed.');
    }
    return res.json();
  },

  async getLimit(expression: string, a: number): Promise<LimitResponse> {
    const res = await fetch(`${API_BASE_URL}/limit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expression, a }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Limit evaluation failed.');
    }
    return res.json();
  },
};
