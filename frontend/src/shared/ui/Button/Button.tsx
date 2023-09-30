import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Button.module.scss';

export enum ButtonTheme {
  CLEAR = 'clear',
  OUTLINE = 'outline',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    theme,
    square,
    disabled,
    children,
    ...otherProps
  } = props;

  const mods: Record<string, boolean> = {
    [styles.square]: square,
    [styles.disabled]: disabled
  };

  const additional: string[] = [ className, styles[theme] ];

  return (
    <button
      type='button'
      className={classNames(styles.Button, mods, additional)}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};
