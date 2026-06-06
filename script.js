// Simple script for FormSubmit flow and user feedback
document.addEventListener('DOMContentLoaded', () => {
  const statusMessage = document.getElementById('form-status');
  const params = new URLSearchParams(window.location.search);
  if (params.get('submitted') === 'true') {
    if (statusMessage) {
      statusMessage.textContent = 'Thank you! Your request was sent. We will contact you soon.';
      statusMessage.style.color = '#0f766e';
    }
  }
  console.log('US Academy Institute site loaded (FormSubmit mode)');
});
}
