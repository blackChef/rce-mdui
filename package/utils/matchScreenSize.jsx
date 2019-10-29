export default function(type) {
  const sizes = {
    xxsmall: 0,
    xsmall: 360,
    small: 480,
    medium: 600,
    large: 960,
    xlarge: 1440,
  };

  return window.matchMedia( `(min-width: ${sizes[type]}px)` ).matches;
}