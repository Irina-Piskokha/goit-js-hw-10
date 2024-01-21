const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', createPromise);

function createPromise(evt) {
  //   evt.preventDefault();
  console.log(evt);
  //   const delay = evt.currentTarget.elements.delay.value;
  //   const state = evt.currentTarget.elements.state.value;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fullfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });
}

createPromise()
  .then(delay => {
    console.log(`✅ Fulfilled promise in ${delay}ms`);
  })
  .catch(delay => {
    console.log(`❌ Rejected promise in ${delay}ms`);
  });
