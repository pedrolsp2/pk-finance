import { FormValues } from '@/pages/Entrada/components/NovaEntrada';
import { db } from '@/services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getInitials } from '@/utils/stringFormatter';

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
}: NovaEntrada) => {
  try {
    const hash = generateRandomHashFromDate();
    const ID = `${getInitials(usuario || 'P K')}|${hash}`;

    await setDoc(doc(db, 'entrada', ID), {
      CATEGORIA: categoria,
      DATA: data,
      DESCRICAO: descricao,
      VALOR: valor,
    });
    return { status: 200, message: 'Inserido com sucesso!' };
  } catch (error) {
    return { status: 500, message: error };
  }
};
