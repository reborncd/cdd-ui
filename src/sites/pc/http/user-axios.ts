import fetch from "./http";

/**
 * 登录
 * @param username
 * @param password
 * @param uuid
 * @param code
 * @returns
 */
export function passWordLogin(username: string, password: string, uuid: string, code: string) {
	return fetch({
		url: `/auth/password?username=${username}&password=${password}&uuid=${uuid}&code=${code}`,
		method: "post",
	});
}
