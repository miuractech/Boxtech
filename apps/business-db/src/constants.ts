import { collection, doc } from 'firebase/firestore';
import { db } from './configs/firebaseconfig';
export type firebaseErrorType = { code: string; message: string };

export const clientDbRef = collection(db, 'clients');
export const kycDbRef = collection(db, 'kyc');
export const clientMetaDoc = doc(collection(db, 'clients'), 'meta');
export const categoryRef = collection(db, 'Categories');
export const costRef = collection(db, 'Cost');
export const defaultErrorMessage = 'Something went wrong, Try again.';