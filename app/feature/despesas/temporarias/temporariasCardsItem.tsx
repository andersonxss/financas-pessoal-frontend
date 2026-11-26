import type { TemporaryPdfBatch } from '@/server'
import { Link } from 'react-router';
import {
    Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from '@/utils';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ReceiptText } from "lucide-react";
import { ActionDataTable, } from '@/components';

const TemporariasCardsItem = ({ upload }: { upload: TemporaryPdfBatch }) => {

    const total = upload.data.reduce((sum, item) => {
        const value = Number(item.valor);
        return Number.isFinite(value) ? sum + value : sum;
    }, 0);
    const itemOccurrences = new Map<string, number>();
    const visibleItems = upload.data.slice(0, 3).map((item) => {
        const itemSignature = JSON.stringify(item);
        const occurrence = itemOccurrences.get(itemSignature) ?? 0;
        itemOccurrences.set(itemSignature, occurrence + 1);

        return {
            item,
            previewId: `${itemSignature}-${occurrence}`,
        };
    });
    const remainingItems = Math.max(upload.dataCount - visibleItems.length, 0);

    return (
        <Card className="gap-0 overflow-hidden py-0">
            <CardHeader className="border-b py-5">
                <div className="min-w-0">
                    <CardTitle className="flex items-center gap-2">
                        <ReceiptText className="size-4 text-lime-500" aria-hidden="true" />
                        Lote temporário
                    </CardTitle>
                </div>
                <CardAction>
                    <Badge variant="outline">
                        {upload.dataCount} {upload.dataCount === 1 ? "item" : "itens"}
                    </Badge>
                </CardAction>
            </CardHeader>

            <CardContent className="space-y-4 py-5">
                <div>
                    <p className="text-muted-foreground text-xs">Valor identificado</p>
                    <p className="mt-1 text-lg font-semibold tabular-nums">
                        {formatCurrency(total)}
                    </p>
                </div>

                <ul className="space-y-2" aria-label="Prévia dos lançamentos">
                    {visibleItems.map(({ item, previewId }) => (
                        <li
                            key={previewId}
                            className="bg-muted/40 flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm"
                        >
                            <span className="min-w-0 truncate">
                                {item.descricao || "Lançamento sem descrição"}
                            </span>
                            <span className="shrink-0 font-medium tabular-nums">
                                {formatCurrency(Number(item.valor) || 0)}
                            </span>
                        </li>
                    ))}
                    {remainingItems > 0 && (
                        <p className="text-muted-foreground px-1 text-xs">
                            Mais {remainingItems}{" "}
                            {remainingItems === 1 ? "lançamento" : "lançamentos"}
                        </p>
                    )}
                </ul>
            </CardContent>

            <CardFooter className="grid grid-cols-2 gap-2 border-t py-4">

                <ActionDataTable idPag={upload.id}
                    module="das despesas."
                    router="despesas/temporarias"
                    text="Remover"
                />

                <Button asChild>
                    <Link to={`/despesas/temporarias/${upload.id}`}>
                        Revisar lançamentos
                        <ArrowRight aria-hidden="true" />
                    </Link>
                </Button>


            </CardFooter>
        </Card>
    )
}

export default TemporariasCardsItem;