import React, { memo, useCallback } from 'react';
import styles from './ProfilePage.module.scss';
import { useSelector } from 'react-redux';
import { deleteUser, getUsername } from 'entities/User';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonTheme, Text } from 'shared/ui';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

const ProfilePage = memo(() => {
  const username = useSelector(getUsername);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!username) {
    navigate(routeConfig.main.path);
  }

  const onDelete = useCallback(() => {
    dispatch(deleteUser());
  }, [ dispatch ]);

  return (
    <div>
      <div className={styles.info}>
        <div className={styles.user}>
          <Text
            className={styles.title}
            title={'Информация о пользователе'}
          />

          <div className={styles.userField}>
            Имя пользователя {username}
          </div>
        </div>

        <div className={styles.actions}>
          <Text
            className={styles.title}
            title={'Действия'}
          />

          <div className={styles.btns}>
            <Button
              className={styles.delete}
              theme={ButtonTheme.OUTLINE}
              onClick={onDelete}
            >
              Удалить профиль
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        Статистика
      </div>
    </div>
  );
});

export default ProfilePage;