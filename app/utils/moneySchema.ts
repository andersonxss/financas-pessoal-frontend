import { z } from "zod";

// FormData carries the hidden currency input as a decimal string in reais.
export const moneySchema = z.unknown().transform((value, ctx) => {
  const text = typeof value === "string" ? value.trim() : String(value);
  if (
    (typeof value !== "string" && typeof value !== "number") ||
    !/^-?\d+(?:\.\d{1,2})?$/.test(text) ||
    !Number.isFinite(Number(text)) ||
    Math.abs(Number(text)) > 99999999.99
  ) {
    ctx.addIssue({ code: "custom", message: "Informe um valor v?lido com at? duas casas decimais e limite de R$ 99.999.999,99." });
    return z.NEVER;
  }
  return Number(text);
});
