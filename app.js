document.getElementById('modifyBtn').addEventListener('click', () => {
  const fileInput = document.getElementById('videoUpload');
  const file = fileInput.files[0];
  const progressBar = document.getElementById('progressBar');
  const modifyBtn = document.getElementById('modifyBtn');

  if (!file) {
    alert('Please select a video file first.');
    return;
  }

  const formData = new FormData();
  formData.append('video', file);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://nocopyright-backend-1.onrender.com/api/process', true);

  xhr.upload.onprogress = function (e) {
    if (e.lengthComputable) {
      const percentComplete = Math.round((e.loaded / e.total) * 100);
      progressBar.style.width = percentComplete + '%';
      progressBar.textContent = percentComplete + '%';
    }
  };

  xhr.onloadstart = function () {
    progressBar.style.width = '0%';
    progressBar.textContent = '0%';
    modifyBtn.disabled = true;
    modifyBtn.textContent = 'Uploading...';
  };

  xhr.onload = function () {
    if (xhr.status === 200) {
      progressBar.style.width = '100%';
      progressBar.textContent = 'Done';

      const blob = xhr.response;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'remixed_video.mp4';
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      alert('Error processing video.');
    }
    modifyBtn.disabled = false;
    modifyBtn.textContent = 'Modify';
  };

  xhr.onerror = function () {
    alert('Network Error. Try again.');
    modifyBtn.disabled = false;
    modifyBtn.textContent = 'Modify';
  };

  xhr.responseType = 'blob';
  xhr.send(formData);
});