import { Stethoscope } from "lucide-react";

export function Logo() {
    return (
        <div className="flex items-center gap-2">
            <div title="Logo do Centro Médico Digital" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Stethoscope className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground leading-none">Centro Médico</span>
                <span className="text-[10px] font-medium text-primary">Digital</span>
            </div>
        </div>
    )
}
