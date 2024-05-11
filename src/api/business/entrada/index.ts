import { FormValues } from '@/pages/Entrada/components/NovaEntrada';
import { db } from '@/services/firebase';
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { getInitials } from '@/utils/stringFormatter';
import { FirebaseReturnGet, FirebaseReturnInsert } from '@/types/Promise';
import { GastosType } from '@/pages/Gastos/components/Visualizacao';

interface NovaEntrada extends FormValues {
  data: Date | undefined;
  usuario: string | null;
  token: string | null;
}

function generateRandomHashFromDate(): string {
  const date = new Date();
  const dateString = date.toISOString();
  return dateString.replace(/[-:.]/g, '');
}

export const novaEntrada = async ({
  categoria,
  data,
  descricao,
  valor,
  usuario,
  token,
}: NovaEntrada): Promise<FirebaseReturnInsert> => {
  try {
    const hash = generateRandomHashFromDate();
    const ID = `${getInitials(usuario || 'P K')}|${hash}`;

    await setDoc(doc(db, 'entrada', ID), {
      CATEGORIA: categoria,
      DATA: data,
      DESCRICAO: descricao,
      VALOR: valor,
      USUARIO: token,
    });
    return { status: 200, message: 'Inserido com sucesso!' };
  } catch (error) {
    console.error(error);
    return { status: 500, message: 'Erro ao inserir' };
  }
};
export const buscarEntradas = async ({
  TOKEN,
}: {
  TOKEN: string;
}): Promise<FirebaseReturnGet<GastosType>> => {
  const citiesRef = collection(db, 'entrada');

  const q = query(citiesRef, where('USUARIO', '==', TOKEN));

  const querySnapshot = await getDocs(q);
  const data: GastosType[] = [];

  querySnapshot.forEach((doc) => {
    data.push(doc.data() as GastosType);
  });

  return { status: 200, body: data };
};

export const novoGasto = async ({
  categoria,
  data,
  descricao,
  valor,
  usuario,
  token,
}: NovaEntrada): Promise<FirebaseReturnInsert> => {
  try {
    const hash = generateRandomHashFromDate();
    const ID = `${getInitials(usuario || 'P K')}|${hash}`;

    await setDoc(doc(db, 'gasto', ID), {
      CATEGORIA: categoria,
      DATA: data,
      DESCRICAO: descricao,
      VALOR: valor,
      USUARIO: token,
    });
    return { status: 200, message: 'Inserido com sucesso!' };
  } catch (error) {
    console.error(error);
    return { status: 500, message: 'Erro ao inserir' };
  }
};
export const buscarGastos = async ({
  TOKEN,
}: {
  TOKEN: string;
}): Promise<FirebaseReturnGet<GastosType>> => {
  const citiesRef = collection(db, 'gasto');

  const q = query(citiesRef, where('USUARIO', '==', TOKEN));

  const querySnapshot = await getDocs(q);
  const data: GastosType[] = [];

  querySnapshot.forEach((doc) => {
    data.push(doc.data() as GastosType);
  });

  return { status: 200, body: data };
};
