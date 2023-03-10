import { writable } from 'svelte/store';

import { supabase } from '../../supabaseClient';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer'

import { Auth } from '../../classes/auth';
import { DB } from '../../classes/db';
import { Parse } from '../../classes/parse';
import { PasswordReset } from '../../classes/passwordReset';
import { Posts } from '../../classes/posts';
import { User } from '../../classes/user';
import { Vote } from '../../classes/vote';


const authObj = new Auth(new Parse(), bcryptjs, supabase);
const dbObj = new DB(supabase);
const passwordResetObj = new PasswordReset(supabase, nodemailer)
const postsObj = new Posts(supabase)
const userObj = new User(supabase)
const voteObj = new Vote(supabase)


export const auth = writable(authObj);
export const db = writable(dbObj);
export const passwordReset = writable(passwordResetObj);
export const posts = writable(postsObj);
export const user = writable(userObj);
export const vote = writable(voteObj);