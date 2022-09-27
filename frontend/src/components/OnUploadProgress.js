import React from 'react';

const OnUploadProgress = (progressEvent) => {
  return console.log(
    'Upload Progress: ' +
      Math.round((progressEvent.loaded / progressEvent.total) * 100) +
      '%'
  );
};

export default OnUploadProgress;
