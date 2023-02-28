export class AWSClass {
	private _id: string;
	private _accessKey: string;
	private _bucketName: string;
	private _aws: any;
	private _multer: any;

	constructor(id: string, accessKey: string, bucketName: string, aws: any, multer: any) {
		this._id = id;
		this._accessKey = accessKey;
		this._bucketName = bucketName;
		this._aws = new aws.S3({
			accessKeyId: this._id,
			secretAccessKey: this._accessKey,
		});
		this._multer = multer;
	}

	async uploadFile(fileType: string, fileName: string, body: string) {
		if (fileType == undefined || body == undefined) return false;

		// const params = {
		// 	Bucket: this._bucketName,
		// 	Body: body,
		// 	Key: `${fileName}.${fileType}`,
		// 	ContentEncoding: 'base64', // required
		// 	ACL: 'public-read',
		// 	ContentType: `image/${fileType}`, // required. Notice the back ticks
		// };

		// this._aws.upload(params, (err, data) => {
		// 	if (err) {
		// 		console.log(err);
		// 	}
		// 	console.log('uplaoded');
		// });

		var upload = multer({
			storage: multerS3({
					s3: s3,
					acl: 'public-read',
					bucket: 'bucket-name',
					key: function (req, file, cb) {
							console.log(file);
							cb(null, file.originalname); //use Date.now() for unique file keys
					}
			})
	});
	}

	async getFile() {
		const params = { Bucket: 'myBucket', Key: 'myImageFile.jpg' };
		const file = this._aws.getObject(params).createReadStream().pipe(file);
	}
}
