import { Button } from '@/components/ui/button'
import { FileClock, FileText } from 'lucide-react'
import { Link } from 'react-router'

const TemporariasHeader = () => {
    return (
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <FileClock className="size-4" aria-hidden="true" />
                    Arquivos aguardando processamento
                </div>
                <h1
                    id="temporary-data-title"
                    className="mt-1 text-2xl font-semibold tracking-tight"
                >
                    Dados temporários
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">
                    Revise e processe os lançamentos extraídos dos documentos.
                </p>
            </div>

            <Button variant="outline" asChild>
                <Link to="/despesas/documentos">
                    <FileText aria-hidden="true" />
                    Enviar outro documento
                </Link>
            </Button>
        </header>
    )
}

export default TemporariasHeader