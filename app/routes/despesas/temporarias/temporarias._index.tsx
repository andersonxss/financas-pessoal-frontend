import {
    data, useLoaderData,
} from "react-router";
import { Page } from "@/components";
import {
    getTemporaryDespesas,
    type TemporaryPdfBatch,
} from "@/server/despesas.server";
import { getActionErrorMessage } from "@/utils/actionError";
import TemporariasHeader from "@/feature/despesas/temporarias/temporariasHeader";
import TemporariasError from "@/feature/despesas/temporarias/temporariasError";
import TemporariasSemDados from "@/feature/despesas/temporarias/temporariasSemDados";
import TemporariasCardsItem from "@/feature/despesas/temporarias/temporariasCardsItem";
import { AlertCircle, FileClock } from "lucide-react";

interface LoaderData {
    uploads: TemporaryPdfBatch[];
    error: string | null;
}

const getRequestErrorMessage = (
    error: unknown,
    fallback: string,
    operation: "carregar" | "excluir" = fallback.toLowerCase().includes("remov")
        ? "excluir"
        : "carregar",
): string =>
    getActionErrorMessage(error, {
        resource: "os dados temporários",
        operation,
        fallbackMessage: fallback,
    });

export async function loader() {
    try {
        return data<LoaderData>({
            uploads: await getTemporaryDespesas(),
            error: null,
        });
    } catch (error) {
        return data<LoaderData>(
            {
                uploads: [],
                error: getRequestErrorMessage(
                    error,
                    "Não foi possível carregar os dados temporários.",
                    "excluir",
                ),
            },
            { status: 502 },
        );
    }
}


export default function TemporaryDespesas() {
    const { uploads, error } = useLoaderData<typeof loader>();
    return (
        <Page title="Dados temporários">
            <section className="space-y-5" aria-labelledby="temporary-data-title">
                <TemporariasHeader />
                {error && (
                    <TemporariasError error={error} title="Falha ao carregar os dados temporários" >
                        <AlertCircle
                            className="mt-0.5 size-4 shrink-0"
                            aria-hidden="true"
                        />
                    </TemporariasError>)}
                {!error && (uploads.length === 0 ? (
                    <TemporariasSemDados
                        title="Nenhum dado temporário encontrado"
                        text="Envie um documento de despesas para gerar lançamentos que possam ser revisados antes do processamento." >
                        <FileClock
                            className="text-muted-foreground size-10"
                            aria-hidden="true"
                        />
                    </TemporariasSemDados>
                ) : (
                    <div className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {uploads.map((upload) => (
                            <TemporariasCardsItem key={upload.id} upload={upload} />
                        ))}
                    </div>
                ))}
            </section>
        </Page>
    );
}

