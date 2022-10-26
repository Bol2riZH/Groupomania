export const formData = (data) => {
  const formData = new FormData();
  for (const prop in data) {
    data[prop] && formData.append(prop, data[prop]);
  }
  return formData;
};

export const formEditData = (imageUrl, data) => {
  const formData = new FormData();
  formData.append('imageUrl', imageUrl);
  for (const prop in data) {
    data[prop] && formData.append(prop, data[prop]);
  }
  return formData;
};
