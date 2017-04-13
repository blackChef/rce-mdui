export default function(parsedRoute, component) {
  let { displayName } = component;

  let target = parsedRoute.childRoutes.find(item => item.component.displayName == displayName);
  if (target) return target.fullPath;
};