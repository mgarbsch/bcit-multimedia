class PersonsService {
	constructor() {
		this.url = "data/persons.json";
	}
	get() {
		return this.request(this.url, "GET");
	}
	request(url, method, body) {
		method = method.toUpperCase();
		body = body !== undefined ? ((typeof body === 'string') ? body : JSON.stringify(body)) : null;
		
		let pr = new Promise((resolve, reject) => {
			let res = null;
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						res = { code: this.status, data: xhr.responseText };
						resolve(res);
					}
					else {
						res = { code: this.status, error: xhr.response };
						reject(res);
					}
				}
			};
			xhr.onerror = function(e) {
				res = { code: this.status, error: xhr.response };
				reject(res);
			};
			xhr.open(method, url, true);
			switch (method) {
				case 'GET':
				case 'DELETE':
					xhr.send();
					break;
				case 'POST':
				case 'PUT':
					xhr.send(body);
					break;
			}
		});
		return pr;
	}
}