const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const API_URL = import.meta.env.PROD ? '' : 'http://localhost:4242';

export const createPaymentIntent = async (amount) => {
  const res = await fetch(`${API_URL}/create-payment-intent`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      ...getAuthHeader() 
    },
    body: JSON.stringify({ amount }),
  });
  return await res.json();
};

export const generateCVFromAPI = async (text, language = 'en') => {
  const res = await fetch(`${API_URL}/generate-cv`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, language }),
  });
  if (!res.ok) {
    throw new Error('Failed to generate CV');
  }
  return await res.json();
};

export const saveCV = async (name, data) => {
  const res = await fetch(`${API_URL}/cvs`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify({ name, data }),
  });
  return await res.json();
};

export const getCVs = async () => {
    const res = await fetch(`${API_URL}/cvs`, {
        headers: { ...getAuthHeader() }
    });
    return await res.json();
};

export const deleteCV = async (id) => {
    await fetch(`${API_URL}/cvs/${id}`, {
        method: 'DELETE',
        headers: { ...getAuthHeader() }
    });
};
