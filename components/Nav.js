import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const Nav = () => (
  <NavStyles>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/">
      <a>COVID-19</a>
    </Link>
    <Link href="/">
      <a>About</a>
    </Link>
    <Link href="/">
      <a>Examples</a>
    </Link>
  </NavStyles>
);

export default Nav;
