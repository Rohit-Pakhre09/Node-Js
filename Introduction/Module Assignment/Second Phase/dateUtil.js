export const today = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

export const now = () => new Date().toISOString();
