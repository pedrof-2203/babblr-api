export namespace UserPatterns {
  const PREFIX = 'identity.user';

  export const FIND_ALL = `${PREFIX}.find-all`;
  export const FIND_BY_ID = `${PREFIX}.find-by-id`;
  export const FIND_BY_EMAIL = `${PREFIX}.find-by-email`;

  export const CREATE = `${PREFIX}.create`;
  export const UPDATE = `${PREFIX}.update`;
  export const DELETE = `${PREFIX}.delete`;
}