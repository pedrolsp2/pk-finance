export const minutesToHours = (minutes: number) => {
  if (typeof minutes !== 'number' || minutes < 0) {
    return '';
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursText = hours > 0 ? `${hours}h` : '';
  const minutesText = remainingMinutes > 0 ? `${remainingMinutes}min` : '';

  return hoursText + (hoursText && minutesText ? ' ' : '') + minutesText;
};

export const getInitials = (name: string) => {
  const nameArray = name.split(' ');

  const [firstName, lastName] = [nameArray[0], nameArray[nameArray.length - 1]];

  return nameArray.length > 1 ? `${firstName[0]}${lastName[0]}` : firstName[0];
};

export const valueReal = (numeroString: number) => {
  const numeroFormatado = numeroString.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return numeroFormatado;
};
