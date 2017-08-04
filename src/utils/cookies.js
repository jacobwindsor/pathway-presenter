export function setCookie(
  name,
  value = '',
  expiresYear = new Date().getFullYear + 5,
  expiresMonth = new Date().getMonth(),
  expiresDay = new Date().getDay()
) {
  const expires = new Date(
    new Date().setFullYear(expiresYear, expiresMonth, expiresDay)
  ).toUTCString();
  document.cookie = `${name}=${value};expires=${expires}`;
}

export function removeCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export function checkCookie(name) {
  return document.cookie.indexOf(`${name}=`) < 0;
}
