const size = {
  mobileL: '640px',
  tablet: '768px',
  tabletL: '1024px',
  desktop: '1280px',
};

const device = {
  mobileL: `(max-width: ${size.tablet})`,
  tablet: `(max-width: ${size.tablet})`,
  tabletL: `(max-width: ${size.tabletL})`,
  desktop: `(max-width: ${size.desktop})`,
};

export default device;
