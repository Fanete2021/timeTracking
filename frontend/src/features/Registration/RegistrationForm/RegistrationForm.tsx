import { FC, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './RegistrationForm.module.scss';
import { Button, ButtonTheme, Input, Text } from 'shared/ui';
import { useSelector } from 'react-redux';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getRegistrationState } from 'features/Registration/model/selectors/getRegistrationState';
import { registrationActions } from '../model/slice/registrationSlice';
import { registration } from '../model/services/registration';
import { BsArrowRepeat } from 'react-icons/bs';

interface RegistrationFormProps {
  className?: string;
  onSuccess: () => void;
}

export const RegistrationForm:FC<RegistrationFormProps> = (props) => {
  const {
    className,
    onSuccess
  } = props;

  const dispatch = useAppDispatch();

  const { username, password, repeatedPassword, isLoading, error } = useSelector(getRegistrationState);
  const [ usernameError, setUsernameError ] = useState<string>('');
  const [ passwordError, setPasswordError ] = useState<string>('');
  const [ repeatedPasswordError, setRepeatedPasswordError ] = useState<string>('');

  const onChangeUsername = useCallback((value: string) => {
    dispatch(registrationActions.setUsername(value));
  }, [ dispatch ]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(registrationActions.setPassword(value));
  }, [ dispatch ]);

  const onChangeRepeatedPassword = useCallback((value: string) => {
    dispatch(registrationActions.setRepeatedPassword(value));
  }, [ dispatch ]);

  const onRegistrationClick = (async () => {
    let isError = false;

    if (username.length < 5 || username.length > 15) {
      isError = true;
      setUsernameError('Username должен содержать от 5 до 15 символов');
    }

    if (password.length < 5 || password.length > 20) {
      isError = true;
      setPasswordError('Password должен содержать от 5 до 20 символов');
    }

    if (repeatedPassword != password) {
      isError = true;
      setRepeatedPasswordError('Пароли не совпадают');
    }

    if (!isError) {
      setPasswordError('');
      setUsernameError('');
      setRepeatedPasswordError('');

      const result = await dispatch(registration({ username, password }));

      if (result.meta.requestStatus === 'fulfilled') {
        onSuccess();
      }
    }
  });

  return (
    <div className={classNames(styles.RegistrationForm, {}, [ className ])}>
      <Text
        className={styles.title}
        title={'Форма регистрации'}
      />

      <div className={styles.block}>
        <Text
          className={styles.description}
          text={'Введите имя пользователя'}
        />

        {usernameError &&
          <Text
            className={styles.error}
            text={usernameError}
          />
        }

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

        {passwordError &&
          <Text
            className={styles.error}
            text={passwordError}
          />
        }

        <Input
          type="password"
          className={styles.input}
          placeholder={'Password'}
          onChange={onChangePassword}
          value={password}
          icon={RiLockPasswordLine}
        />
      </div>

      <div className={styles.block}>
        <Text
          className={styles.description}
          text={'Повторите пароль'}
        />

        {repeatedPasswordError &&
          <Text
            className={styles.error}
            text={repeatedPasswordError}
          />
        }

        <Input
          type="password"
          className={styles.input}
          placeholder={'Repeated password'}
          onChange={onChangeRepeatedPassword}
          value={repeatedPassword}
          icon={BsArrowRepeat}
        />
      </div>

      {!usernameError && !passwordError && !repeatedPasswordError && error &&
        <Text
          className={styles.error}
          text={error}
        />
      }

      <Button
        className={styles.registrationBtn}
        theme={ButtonTheme.OUTLINE}
        onClick={onRegistrationClick}
        disabled={isLoading}
      >
        Зарегистрироваться
      </Button>
    </div>
  );
};
