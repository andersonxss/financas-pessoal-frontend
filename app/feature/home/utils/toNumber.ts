export function toNumber(value: number | string | null | undefined) {
	if (typeof value === "number") {
		return Number.isFinite(value) ? value : 0;
	}

	if (typeof value !== "string") {
		return 0;
	}

	const normalized = value.trim();
	if (!normalized) {
		return 0;
	}

	if (/^-?\d+(\.\d+)?$/.test(normalized)) {
		return Number(normalized);
	}

	const currencyLike = normalized
		.replace(/\s|R\$/g, "")
		.replace(/\./g, "")
		.replace(",", ".");

	const parsed = Number(currencyLike);
	return Number.isFinite(parsed) ? parsed : 0;
}
