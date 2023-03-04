import { writable } from 'svelte/store';
import { get } from 'svelte/store';

import { supabase } from '../../supabaseClient';
import bcryptjs from 'bcryptjs';

import { DB } from '../../classes/db';
import { Auth } from '../../classes/auth';
import { Parse } from '../../classes/parse';
import { User } from '../../classes/user';


// INIT

const dbObj = new DB(supabase);
const authObj = new Auth(new Parse(), bcryptjs, supabase);
const userObj = new User(supabase);


// OBJECTS

export const db = writable(dbObj);
export const auth = writable(authObj);
export const user = writable(userObj);
