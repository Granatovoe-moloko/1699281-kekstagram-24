const isEscapeKey = (evt) => evt.key === 'Escape';

const MESSAGE_TIME = 5000;

const showMessage = (message) => {
  const messageContainer = document.createElement('div');
  messageContainer.style.width = '50%';
  messageContainer.style.backgroundColor = 'white';
  messageContainer.style.color = 'black';
  messageContainer.style.textAlign = 'center';
  messageContainer.style.position = 'absolute';
  messageContainer.style.zIndex = 100;
  messageContainer.style.top = '40%';
  messageContainer.style.left = '25%';
  messageContainer.textContent = message;

  document.body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, MESSAGE_TIME);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {isEscapeKey, showMessage, debounce};
