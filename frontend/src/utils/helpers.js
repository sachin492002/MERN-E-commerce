export const formatPrice = (number) => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  }).format(number / 1);
};


export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);

  if (type === 'colors') {
    unique = unique.flat();
  }
  return ['all', ...new Set(unique)];
};
