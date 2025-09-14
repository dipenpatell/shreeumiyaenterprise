export const generateRandomId = () => {
  // Example: 8-character alphanumeric
  return Math.random().toString(36).substring(2, 10);
};