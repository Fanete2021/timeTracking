import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Text.module.scss';

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
}

export const Text: FC<TextProps> = (props) => {
  const {
    className,
    title,
    text,
  } = props;

  return (
    <div className={classNames(styles.Text, {}, [ className ])}>
      {title &&
        <p className={styles.title}>
          {title}
        </p>
      }

      {text &&
        <p className={styles.text}>
          {text}
        </p>
      }
    </div>
  );
};
