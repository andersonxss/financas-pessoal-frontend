interface IMeses {
	id: number;
	name: string;
}
interface IAnos {
	id: number;
	name: string;
}
const data = new Date();
export const mesAtual = data.getMonth() + 1;
export const anos: Array<IAnos> = [
	{ id: 2025, name: "2025" },
	{ id: 2026, name: "2026" },
];
export const meses: Array<IMeses> = [
	{ id: 1, name: "Janeiro" },
	{ id: 2, name: "Fevereiro" },
	{ id: 3, name: "Março" },
	{ id: 4, name: "Abril" },
	{ id: 5, name: "Maio" },
	{ id: 6, name: "Junho" },
	{ id: 7, name: "Julho" },
	{ id: 8, name: "Agosto" },
	{ id: 9, name: "Setembro" },
	{ id: 10, name: "Outubro" },
	{ id: 11, name: "Novembro" },
	{ id: 12, name: "Dezembro" },
];
