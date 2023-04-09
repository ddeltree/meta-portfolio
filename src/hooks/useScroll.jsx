import { useEffect, useState } from 'react';

export function useScroll() {
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);
  const handleScroll = () => {
    const currScrollY = window.scrollY;
    if (prevScrollY < currScrollY) setScrollDirection('down');
    else if (prevScrollY > currScrollY) setScrollDirection('up');
    setPrevScrollY(currScrollY);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [window.scrollY]);
  return { scrollDirection };
}
