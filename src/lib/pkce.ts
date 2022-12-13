const client_id = '0ae87b4234354ac9bac082e1af030bdc';
export function generateRandomString(length: number) {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export class PKCE {
	client_id: string;
	accessToken: string;
	refreshToken: string;
	code: string;
	codeVerifier: string;
	codeChallenge: string;
	redirect_uri: string;
	expires_at: number;
	constructor(redirect_uri: string) {
		this.client_id = client_id;
		this.accessToken = '';
		this.refreshToken = '';
		this.code = '';
		this.codeVerifier = '';
		this.codeChallenge = '';
		this.redirect_uri = redirect_uri;
		this.expires_at = 0;
	}
	generateChallenge = async (codeVerifier: string) => {
		this.codeVerifier = codeVerifier;
		const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier));

		this.codeChallenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
			.replace(/=/g, '')
			.replace(/\+/g, '-')
			.replace(/\//g, '_');
		return this.codeChallenge;
	};

	getURLWithSearchParams = (url: string | URL, params: any) => {
		const obj = new URL(url);
		obj.search = new URLSearchParams(params).toString();

		return obj.toString();
	};

	getRefreshToken = async (code: string, code_verifier: string) => {
		// Dont know if fetch works here.

		const res = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			body: new URLSearchParams({
				client_id: this.client_id,
				grant_type: 'authorization_code',
				code: code,
				redirect_uri: this.redirect_uri,
				code_verifier: code_verifier
			})
		});

		// Get seconds as timestamp
		this.expires_at = Math.floor(Date.now() / 1000);

		const json = await res.json();

		if (json.error) {
			console.log(json.error);
			return { error: json.error };
		}

		this.expires_at += json.expires_at;
		this.accessToken = json.access_token;
		this.refreshToken = json.refresh_token;

		return {
			expires_at: this.expires_at,
			access_token: this.accessToken,
			refresh_token: this.refreshToken
		};
	};

	token = async (refreshToken: string) => {
		const res = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			body: new URLSearchParams({
				client_id: this.client_id,
				grant_type: 'refresh_token',
				refresh_token: refreshToken
			})
		});

		const json = await res.json();

		if (json.error) {
			console.log(json.error);
			return { error: json.error };
		}

		this.expires_at = Math.floor(Date.now() / 1000) + json.expires_at;
		this.accessToken = json.access_token;
		this.refreshToken = json.refresh_token;

		return {
			expires_at: this.expires_at,
			access_token: this.accessToken,
			refreshToken: this.refreshToken
		};
	};
}
