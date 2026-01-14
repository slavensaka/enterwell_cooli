import toast from 'react-hot-toast';

export const SUCCESS_TYPE = 'success';
export const ERROR_TYPE = 'error';
export const WARNING_TYPE = 'warning';
export const INFO_TYPE = 'info';

/**
 * Shows the notification.
 *
 * @param message Notification message
 * @param type Notification type
 * @param duration Duration in milliseconds (0 = infinite)
 * @returns toast id
 */
export function showNotification(message: string, type: string, duration: number = 0) {
  const options = { duration: duration === 0 ? Infinity : duration };

  switch (type) {
  case SUCCESS_TYPE:
    return toast.success(message, options);
  case ERROR_TYPE:
    return toast.error(message, options);
  case WARNING_TYPE:
  case INFO_TYPE:
  default:
    return toast(message, options);
  }
}

/**
 * Shows the success notification.
 *
 * @param message Success message
 * @returns toast id
 */
export function showSuccessNotification(message: string) {
  return showNotification(message, SUCCESS_TYPE, 3000);
}

/**
 * Shows the error notification.
 *
 * @param message Error message
 * @returns toast id
 */
export function showErrorNotification(message: string) {
  return showNotification(message, ERROR_TYPE);
}

/**
 * Shows the warning notification.
 *
 * @param message Warning message
 * @returns toast id
 */
export function showWarningNotification(message: string) {
  return showNotification(message, WARNING_TYPE);
}

/**
 * Shows the info notification.
 *
 * @param message Info message
 * @returns toast id
 */
export function showInfoNotification(message: string) {
  return showNotification(message, INFO_TYPE);
}

/**
 * Shows the default error notification.
 *
 * @returns toast id
 */
export function showDefaultErrorNotification() {
  return showErrorNotification('Trenutno nije moguće dohvatiti podatke. Osvježite stranicu da biste pokušali ponovno.');
}
