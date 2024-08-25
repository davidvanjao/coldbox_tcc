import dynamic from 'next/dynamic';

const NavBar = dynamic(() => import('./NavBarComponent'), { ssr: false });

export default NavBar;
