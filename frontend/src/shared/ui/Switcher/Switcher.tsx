import { classNames } from 'shared/lib/classNames/classNames';
import  styles from './Switcher.module.scss';
import { useState } from 'react';

interface SwitcherProps {
  className?: string;
  variants: string[];
  onChange?: (index: number) => void;
  initialIndex?: number;
}

export const Switcher = (props: SwitcherProps) => {
  const {
    className,
    variants,
    onChange,
    initialIndex = 0
  } = props;

  const [ choiceIndex, setChoiceIndex ] = useState<number>(initialIndex);

  const onClick = (index: number) => {
    setChoiceIndex(index);
    onChange(index);
  };

  return (
    <div className={classNames(styles.Switcher, {}, [ className ])}>
      {variants.map((variant, index) => (
        <div
          className={`${variant === variants[choiceIndex] ? styles.currentVariant : styles.variant}`}
          onClick={() => onClick(index)}
          key={variant}
        >
          {variant}
        </div>
      ))}
    </div>
  );
};