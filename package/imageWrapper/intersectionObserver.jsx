const observers = [
  // { elem, callback }
];

const options = {
  threshold: 0,
  rootMargin: '0% 0% 70% 0%'
};

const onChange = function(entries) {
  entries.forEach(function({ target, intersectionRatio }) {
    if (intersectionRatio === 0) return;

    const observer = observers.find(i => i.elem === target);

    if (!observer) return;
    observer.callback();
  });
};


const io = new IntersectionObserver(onChange, options);

const onEnter = function(elem, callback) {
  io.observe(elem);
  observers.push({ elem, callback });
  return function unobserve() {
    observers.splice(observers.findIndex(i => i.elem === elem), 1);
    io.unobserve(elem);
  };
};

export { onEnter };