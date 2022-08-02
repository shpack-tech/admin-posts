export const secondsToDate = (seconds: number): string => {
	const date = new Date(Date.UTC(1970, 0, 1));
	date.setUTCSeconds(seconds);
	return date.toUTCString();
};

export const getCookie = (cookieName: string): string | null => {
	const nameLenPlus = cookieName.length + 1;
	return (
		document.cookie
			.split(';')
			.map((cookie) => cookie.trim())
			.filter((cookie) => {
				return cookie.substring(0, nameLenPlus) === `${cookieName}=`;
			})
			.map((cookie) => {
				return decodeURIComponent(cookie.substring(nameLenPlus));
			})[0] || null
	);
};

export const deleteAuthCookies = () => {
	document.cookie = 'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
