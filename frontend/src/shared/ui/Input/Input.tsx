import React, { FC, ChangeEvent, InputHTMLAttributes, useCallback } from 'react';
import styles from './Input.module.scss';
import { IconType } from 'react-icons';
import { classNames } from 'shared/lib/classNames/classNames';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

interface InputProps extends HTMLInputProps {
  className?: string;
  onChange?: (value: string) => void;
  icon?: IconType;
}

export const Input: FC<InputProps> = (props) => {
  const {
    className,
    value,
    onChange,
    placeholder,
    icon,
    ...otherProps
  } = props;

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  }, [ onChange ]);

  return (
    <div className={classNames(styles.wrapper, {}, [ className ])}>
      {icon &&
        <div className={styles.icon}>
          {React.createElement(icon, { size: '20px' })}
        </div>
      }

      <input
        data-testid="input"
        className={styles.input}
        value={value}
        onChange={changeHandler}
        placeholder={placeholder}
        {...otherProps}
      />
    </div>
  );
};