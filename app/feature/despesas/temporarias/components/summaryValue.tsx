import React from 'react'

const SummaryValue = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-muted-foreground text-xs">{label}</p>
        <p className="mt-1 text-sm font-semibold tabular-nums">{value}</p>
    </div>
);

export default SummaryValue