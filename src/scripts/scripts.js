document.querySelectorAll('.book-item').forEach((item, index) => {
  item.style.setProperty('--animation-order', index + 1);
});