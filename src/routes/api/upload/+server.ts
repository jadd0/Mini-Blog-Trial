import { AWSClass } from '../../../classes/aws'
import AWS from 'aws-sdk'

const id = process.env.VITE_AWS_ACCOUNT_ACCESS_ID || import.meta.env.VITE_AWS_ACCOUNT_ACCESS_ID
const accessKey = process.env.VITE_AWS_ACCOUNT_SECRET_ACCESS_KEY || import.meta.env.VITE_AWS_ACCOUNT_SECRET_ACCESS_KEY
const bucketKey = process.env.VITE_AWS_BUCKET_KEY || import.meta.env.VITE_AWS_BUCKET_KEY

const aws = new AWSClass(id, accessKey, bucketKey, AWS)

export async function GET({ request }) {

  // console.log(trial)
}
// const aws = new AWS();