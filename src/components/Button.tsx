import { Icon } from './Icon';

import '../styles/button.scss';
import { ButtonHTMLAttributes, memo, useEffect } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  iconName: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  selected: boolean;
}

export function ButtonComponent({ iconName, title, selected, ...rest }: ButtonProps) {
  console.log(title)
  return (
    <button type="button" {...(selected && { className: 'selected' })} {...rest}>
      <Icon name={iconName} color={selected ? '#FAE800' : '#FBFBFB'} />
      {title}
    </button>
  );
}

export const Button = memo(ButtonComponent, (a, b) => {
  return Object.is(a.selected, b.selected)
})