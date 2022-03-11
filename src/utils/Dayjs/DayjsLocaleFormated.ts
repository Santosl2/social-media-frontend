import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/pt";

dayjs.extend(updateLocale);
dayjs.extend(relativeTime);

const localeObject = {
  name: "pt", // name String
  relativeTime: {
    // relative time format strings, keep %s %d as the same
    future: "em %s", // e.g. in 2 hours, %s been replaced with 2hours
    past: "%s atrás",
    s: "a alguns segundos",
    m: "um minuto atrás",
    mm: "%d minutos atrás",
    h: "uma hora atrás",
    hh: "%d horas atrás", // e.g. 2 hours, %d been replaced with 2
    d: "um dia atrás",
    dd: "%d dias atrás",
    M: "a um mês atrás",
    MM: "%d meses atrás",
    y: "a um ano atrás",
    yy: "%d anos atrás",
  },
};

dayjs.updateLocale("pt", { localeObject }); // load locale for later use
dayjs.locale("pt");
export default dayjs;
