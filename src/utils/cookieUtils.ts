export const getCookieValue = (cookieName: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${cookieName}=`);

  if (parts.length === 2) {
    const part = parts.pop()?.split(";").shift();
    if (part) {
      return part;
    }
  }
  return null;
};
export const setCookieValue = (
  cookieName: string,
  cookieValue: string,
  days: number
) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
};

export const clearCookie = (cookieName: string) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
};
