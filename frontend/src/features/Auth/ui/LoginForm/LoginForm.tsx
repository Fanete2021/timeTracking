import { FC, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './LoginForm.module.scss';
import { Button, ButtonTheme, Input, Text } from 'shared/ui';
import { useSelector } from 'react-redux';
import { getLoginState } from '../../model/selectors/getLoginState';
import { loginActions } from '../../model/slice/loginSlice';
import { login } from '../../model/services/login';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

export const LoginForm:FC<LoginFormProps> = (props) => {
  const {
    className,
    onSuccess
  } = props;

  const dispatch = useAppDispatch();

  const { username, password, isLoading, error } = useSelector(getLoginState);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [ dispatch ]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [ dispatch ]);

  const onLoginClick = (async () => {
    const result = await dispatch(login({ username, password }));

    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  });

  return (
    <div className={classNames(styles.LoginForm, {}, [ className ])}>
      <Text
        className={styles.title}
        title={'Форма авторизации'}
      />

      <div className={styles.block}>
        <Text
          className={styles.description}
          text={'Введите имя пользователя'}
        />

        <Input
          type="text"
          className={styles.input}
          placeholder={'Username'}
          onChange={onChangeUsername}
          value={username}
          icon={AiOutlineUser}
        />
      </div>

      <div className={styles.block}>
        <Text
          className={styles.description}
          text={'Введите пароль'}
        />

        <Input
          type="password"
          className={styles.input}
          placeholder={'Password'}
          onChange={onChangePassword}
          value={password}
          icon={RiLockPasswordLine}
        />
      </div>

      {error &&
        <Text
          className={styles.error}
          text={error}
        />
      }

      <Button
        className={styles.loginBtn}
        theme={ButtonTheme.OUTLINE}
        onClick={onLoginClick}
        disabled={isLoading}
      >
        Войти
      </Button>
    </div>
  );
};
