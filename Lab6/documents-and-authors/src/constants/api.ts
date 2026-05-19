import { environment } from '../environments/environment';

const isPhp =
  environment.baseApiUrl.includes('controllers');

export const API = {

  authors: isPhp
    ? `${environment.baseApiUrl}/author_controller.php`
    : `${environment.baseApiUrl}/author`,

  documents: isPhp
    ? `${environment.baseApiUrl}/document_controller.php`
    : `${environment.baseApiUrl}/document`,

  login: isPhp
    ? `${environment.baseApiUrl}/auth_controller.php?action=login`
    : `${environment.baseApiUrl}/auth/login`,

  register: isPhp
    ? `${environment.baseApiUrl}/auth_controller.php?action=register`
    : `${environment.baseApiUrl}/auth/register`
};