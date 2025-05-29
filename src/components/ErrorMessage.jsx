import styles from '../styles/ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className={styles.errorBox}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
