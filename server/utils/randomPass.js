// generate the random password for the user if he used google login
import { nanoid } from "nanoid";

export const randomPass = (num) => {
   return nanoid(num);
};
