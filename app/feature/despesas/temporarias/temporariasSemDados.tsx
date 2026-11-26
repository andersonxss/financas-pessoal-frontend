const TemporariasSemDados = ({ children, title, text }: { children: React.ReactNode; title: string; text: string; }) => {
    return (
        <div className="bg-card flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">

            {children}
            <h2 className="mt-4 font-semibold">
                {title}
            </h2>
            <p className="text-muted-foreground mt-1 max-w-md text-sm">
                {text}
            </p>
        </div>
    )
}

export default TemporariasSemDados