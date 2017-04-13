export default function(childRoute, component, path) {
  return Object.assign({}, childRoute, { component, path });
};