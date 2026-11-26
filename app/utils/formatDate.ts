import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat"; // import plugin
import "dayjs/locale/pt-br.js"; // import locale

dayjs.extend(advancedFormat); // use plugin
dayjs.locale("pt-br"); // use locale

export const formateDate = (value: string, format: string) => {
	return dayjs(value).format(format);
};

export const getFormateDate = (value: string) => {
	return value ? dayjs(value).toDate() : "";
};
