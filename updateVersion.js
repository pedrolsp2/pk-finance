import fs from 'fs';

let envContents = fs.readFileSync('.env.production', 'utf8');

const match = envContents.match(/VITE_VERSION=(\d{8})\.(\d{3})/);

if (match) {
  const year = match[1].substring(0, 4);
  const month = match[1].substring(4, 6);
  const day = match[1].substring(6, 8);
  let versionNumber = parseInt(match[2], 10);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString().padStart(4, '0');
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const currentDay = currentDate.getDate().toString().padStart(2, '0');

  if (year === currentYear && month === currentMonth && day === currentDay) {
    versionNumber++;
  } else {
    versionNumber = 1;
  }

  const newVersion = `${currentYear}${currentMonth}${currentDay}.${versionNumber
    .toString()
    .padStart(3, '0')}`;
  envContents = envContents.replace(
    /VITE_VERSION=(\d{8})\.(\d{3})/,
    `VITE_VERSION=${newVersion}`
  );

  fs.writeFileSync('.env.production', envContents);
}
