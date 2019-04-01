let observers = [
  // { elem, callback }
];

let options = {
  threshold: 0,
  rootMargin: '0% 0% 70% 0%'
};

let onChange = function(entries) {
  entries.forEach(function({ target, intersectionRatio }) {
    if (intersectionRatio === 0) return;

    let observer = observers.find(i => i.elem === target);

    if (!observer) return;
    observer.callback();
  });
};


let io = new IntersectionObserver(onChange, options);

let onEnter = function(elem, callback) {
  io.observe(elem);
  observers.push({ elem, callback });
  return function unobserve() {
    observers.splice(observers.findIndex(i => i.elem === elem), 1);
    io.unobserve(elem);
  };
};

export { onEnter };