import React, { FC, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Navbar.module.scss';
import { AppLink, Button, ButtonTheme, Modal, Switcher } from 'shared/ui';
import { LoginForm } from 'features/Auth';
import { RegistrationForm } from 'features/Registration';
import { getIsAuth, logout } from 'entities/User';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { NavbarItemsList } from 'widgets/Navbar/model/routerItems';

interface NavbarProps {
  className?: string;
}

const enum formVariants {
  LOGIN = 'Авторизация',
  REGISTRATION = 'Регистрация'
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const [ isAuthModal, setIsAuthModal ] = useState<boolean>(false);
  const [ currentIndexForm, setCurrentIndexForm ] = useState<number>(0);
  const dispatch = useAppDispatch();
  const isAuth = useSelector(getIsAuth);

  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [ dispatch ]);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const switcherHandler = useCallback((index: number) => {
    setCurrentIndexForm(index);
  }, [ setCurrentIndexForm ]);

  const getForm = useCallback((): JSX.Element => {
    switch (currentIndexForm) {
      case 0:
        return <LoginForm onSuccess={onCloseModal} />;
      case 1:
        return <RegistrationForm onSuccess={onCloseModal} />;
      default:
        return null;
    }
  }, [ currentIndexForm, onCloseModal ]);

  return (
    <div className={classNames(styles.Navbar, {}, [ className ])}>
      <div className={styles.router}>
        {NavbarItemsList.map((item) => {
          if (item.authOnly && !isAuth) {
            return null;
          }
          
          return (
            <AppLink
              className={styles.routerLink}
              key={item.path}
              to={item.path}
            >
              {item.text}
            </AppLink>
          );
        })}
      </div>

      {isAuth
        ?
        <div className={styles.user}>
          <Button
            className={styles.button}
            theme={ButtonTheme.CLEAR}
            onClick={onLogout}
          >
            Выход
          </Button>
        </div>
        :
        <div className={styles.user}>
          <Button
            className={styles.button}
            theme={ButtonTheme.CLEAR}
            onClick={onOpenModal}
          >
            Авторизация / Регистрация
          </Button>

          <Modal
            isOpen={isAuthModal}
            onClose={onCloseModal}
            lazy={true}
          >
            <Switcher
              variants={[ formVariants.LOGIN, formVariants.REGISTRATION ]}
              initialIndex={currentIndexForm}
              onChange={switcherHandler}
            />

            {getForm()}
          </Modal>
        </div>
      }
    </div>
  );
};