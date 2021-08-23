import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const NavLink = ({text, link, regex}) => {
  const {asPath} = useRouter();
  const [classList, setClassList] = useState(['NavLink']);

  useEffect(() => {
    if(regex){
      const test = regex.test(asPath);
      const newClassList = ['NavLink'];
      if(test) newClassList.push('active');
      if(newClassList !== classList) setClassList(newClassList);
    }
  }, [regex, asPath])

  return (
    <Link href={link}>
      <a className={classList.join(' ')}>{text}</a>
    </Link>
  )
}

export default NavLink
