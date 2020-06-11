import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const Nav = () => (
  <NavStyles>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/#covid">
      <a>COVID-19</a>
    </Link>
    <Link href="/#about">
      <a>About</a>
    </Link>
    <Link href="/#examples">
      <a>Examples</a>
    </Link>
  </NavStyles>
);

export default Nav;
