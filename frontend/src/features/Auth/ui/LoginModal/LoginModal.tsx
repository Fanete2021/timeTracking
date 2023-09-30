import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui';
import { LoginForm } from '../LoginForm/LoginForm';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = memo((props: LoginModalProps) => {
  const {
    className,
    isOpen,
    onClose
  } = props;

  return (
    <Modal
      className={classNames('', {}, [ className ])}
      isOpen={isOpen}
      onClose={onClose}
      lazy={true}
    >
      <LoginForm onSuccess={onClose} />
    </Modal>
  );
});
