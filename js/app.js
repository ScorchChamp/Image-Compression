
window.addEventListener("load", function () {
const imageInput = document.getElementById('image-input');
const compressionLevelInput = document.getElementById('compression-level');
const output = document.getElementById('output');
const originalSizeElement = document.getElementById('original-size');
const compressedSizeElement = document.getElementById('compressed-size');
const sizeReductionElement = document.getElementById('size-reduction');
const downloadButtonElement = document.getElementById('download-button');
let image;

const compressImage = () => {
  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    image = new Image();
    image.addEventListener('load', () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      let { width, height } = image;
      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(image, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg', compressionLevelInput.value / 100);
      const imageElement = document.createElement('img');
      imageElement.src = dataUrl;
      output.innerHTML = '';
      output.appendChild(imageElement);

      const newSize = window.atob(dataUrl.substring(dataUrl.indexOf(',') + 1)).length;
      const sizeReduction = ((file.size - newSize) / file.size) * 100;
      originalSizeElement.textContent = formatBytes(file.size);
      compressedSizeElement.textContent = formatBytes(newSize);
      sizeReductionElement.textContent = sizeReduction.toFixed(2);
      downloadButtonElement.href = dataUrl;
    });
    image.src = reader.result;
  });
  reader.readAsDataURL(file);
};

compressionLevelInput.addEventListener('input', compressImage);
imageInput.addEventListener('input', compressImage);
const maxSize = 800;

const formatBytes = (bytes) => {
  let unit;
  const units = ['bytes', 'KB', 'MB', 'GB'];
  for (unit = 0; bytes >= 1024; unit++) bytes /= 1024;
  return `${bytes.toFixed(2)} ${units[unit]}`;
};
});
