import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app, db } from '@/services/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const authenticateUser = async (user: string, password: string) => {
  try {
    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      user,
      password
    );

    if (userCredential && userCredential.user) {
      const userID = userCredential.user.uid;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any[] = [];
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      const userLogado = data.find((u) => u.id === userID);
      return { token: userLogado.id, user: userLogado.nome };
    }
  } catch (error) {
    console.error('Authentication error:', error);
  }
};

export const validateUserToken = async (userID: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any[] = [];
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  const userLogado = data.find((u) => u.id === userID);
  return { token: userLogado.id, user: userLogado.nome };
};
