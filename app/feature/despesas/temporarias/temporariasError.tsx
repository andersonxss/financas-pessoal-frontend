import { AlertCircle } from 'lucide-react'

const TemporariasError = ({ children, error, title }: { children?: React.ReactNode; error?: string; title?: string; }) => {
    return (
        <div
            className="border-destructive/40 bg-destructive/10 flex items-start gap-3 rounded-lg border p-4 text-sm"
            role="alert"
        >
            {children}
            <AlertCircle
                className="mt-0.5 size-4 shrink-0"
                aria-hidden="true"
            />
            <div>
                <p className="font-semibold">
                    {title}
                </p>
                <p className="text-muted-foreground mt-1">{error}</p>
            </div>
        </div>
    )
}

export default TemporariasError