document.getElementById('modifyBtn').addEventListener('click', async () => {
  const fileInput = document.getElementById('videoUpload');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please select a video file first.');
    return;
  }

  const formData = new FormData();
  formData.append('video', file);

  const modifyBtn = document.getElementById('modifyBtn');
  modifyBtn.disabled = true;
  modifyBtn.innerText = 'Processing...';

  try {
    const response = await fetch('https://nocopyright-backend-1.onrender.com/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to process video');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'remixed_video.mp4';
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    alert('Error processing video. Try again.');
  } finally {
    modifyBtn.disabled = false;
    modifyBtn.innerText = 'Modify';
  }
});