const geocode = (address, callback) => {
  // simulates async call
  setTimeout(() => {
    const data = {
      longitude: 0,
      latitude: 0,
    };

    callback(data);
  }, 2000);
};

// calling the function, passing two parameters
geocode('Philadelphia', (data) => {
  console.log(data);
});

/**
 * Callback Challenge
 *
 */
const add = (a, b, callback) => {
  // simulating async call with 2-sec delay
  setTimeout(() => {
    const sum = a + b;
    callback(sum);
  }, 2000);
};

add(1, 4, (data) => {
  console.log(data);
});
