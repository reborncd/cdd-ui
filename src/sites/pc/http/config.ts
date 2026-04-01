// @ts-nocheck

export default function domain() {
	let domain: any = null;
	// @ts-ignore
	const env: string = process.env.NODE_ENV;

	switch (env) {
		case "production":
			domain = {
				requestHost: "",
			};
			break;
		default:
			domain = {
				requestHost: "",
			};
			break;
	}
	return domain;
}
