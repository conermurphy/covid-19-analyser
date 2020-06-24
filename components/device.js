const size = {
  mobileL: '640px',
  tablet: '768px',
  laptopL: '1024px',
  desktop: '1280px',
};

const device = {
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
};

export default device;
