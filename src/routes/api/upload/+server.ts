import { AWSClass } from '../../../classes/aws';
import AWS from 'aws-sdk';

const id = process.env.VITE_AWS_ACCOUNT_ACCESS_ID || import.meta.env.VITE_AWS_ACCOUNT_ACCESS_ID;
const accessKey =
	process.env.VITE_AWS_ACCOUNT_SECRET_ACCESS_KEY ||
	import.meta.env.VITE_AWS_ACCOUNT_SECRET_ACCESS_KEY;
const bucketKey = process.env.VITE_AWS_BUCKET_KEY || import.meta.env.VITE_AWS_BUCKET_KEY;

// const aws = new AWSClass(id, accessKey, bucketKey, AWS)

export async function POST({ request }) {
	// try {
	// Configure AWS SDK
	const s3 = new AWS.S3({
		accessKeyId: id,
		secretAccessKey: accessKey
	});

	// Get file from request
	const h = await request.json();
  console.log(h.avatar)
	const params = {
		Bucket: bucketKey,
		Key: 'pafeimage.jpg',
		Body: h.avatar,
		ContentEncoding: 'base64',
		ContentType: 'image/jpeg'
	};

	s3.putObject(params, function (err, data) {
		if (err) {
			console.log('Error uploading image: ', err);
		} else {
			console.log('Successfully uploaded image: ', data);
		}
	});

  return new Response('hekli')
}
