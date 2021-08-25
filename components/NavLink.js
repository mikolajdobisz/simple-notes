import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const NavLink = ({text, link, regex}) => {
  const {asPath} = useRouter();
  const [classList, setClassList] = useState(['NavLink']);

  const getLinkClasses = () => {
    let classString = "NavLink ";
    if(regex){
      const test = regex.test(asPath);
      if(test) classString = classString + "active";
    }
    return classString;
  }

  return (
    <Link href={link}>
      <a className={getLinkClasses()}>{text}</a>
    </Link>
  )
}

export default NavLink
