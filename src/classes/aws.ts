export class AWS {
	id: string;
	accessKey: string;
	bucketKey: string;

	constructor(id: string, accessKey: string, bucketKey: string) {
		this.id = id;
		this.accessKey = accessKey;
		this.bucketKey = bucketKey;;
	}

  async uploadFile(fileType: string, b64String: string) {
    if (fileType == undefined || b64String == undefined) return false

    
  }

  async getFile() {

  }
}