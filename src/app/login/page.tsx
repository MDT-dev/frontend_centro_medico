import type { Metadata } from "next"
import Link from "next/link"
import { Home } from "lucide-react"
import { ImageCarousel } from "@/components/image-carousel"
import { Button } from "@/components/ui/button"
import { AuthForm } from "./components/auth-form"
import { Logo } from "@/components/ui-system/logo"

export const metadata: Metadata = {
    title: "Mwanganza - Autenticação - Centro Médico Digital",
    description: "Faça login na plataforma Centro Médico Digital - Mwanganza",
}

const carouselSlides = [
    {
        image: "/assets/image1.png",
        quote:
            "Transformando a gestão hospitalar com dados precisos, garantindo que o foco principal seja sempre o bem-estar e a recuperação do paciente.",
        author: "GESTÃO INTEGRADA",
    },
    {
        image: "/assets/image2.jpg",
        quote:
            "Agilidade no atendimento e prontuário eletrônico unificado: tecnologia a serviço da vida para decisões clínicas mais seguras e rápidas.",
        author: "EFICIÊNCIA CLÍNICA",
    },
    {
        image: "/assets/image3.jpg",
        quote:
            "Segurança de dados e conformidade com normas de saúde, protegendo as informações sensíveis de pacientes com criptografia de ponta.",
        author: "SEGURANÇA E PRIVACIDADE",
    },
    {
        image: "/assets/image4.jpg",
        quote:
            "Otimização de recursos e controle de estoque inteligente, reduzindo desperdícios e garantindo a disponibilidade de insumos críticos.",
        author: "CONTROLE OPERACIONAL",
    },
    {
        image: "/assets/image5.jpg",
        quote:
            "Humanização através da tecnologia: sistemas que diminuem filas e burocracia.",
        author: "ATENDIMENTO HUMANIZADO",
    },
]

export default function AuthenticationPage() {
    return (
        <div className="py-6 lg:py-0">
            <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative h-full flex-col bg-muted p-10 text-gray-50 dark:border-r lg:flex">
                    <ImageCarousel slides={carouselSlides} interval={4000} />

                    <div className="relative z-20 flex items-start text-lg font-medium">
                        <Link href="/">
                            <Logo/>
                        </Link>
                    </div>
                </div>

                {/* Right side - Auth Form */}
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <AuthForm />

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Ou</span>
                            </div>
                        </div>

                        <p className="px-8 text-center text-sm text-muted-foreground">
                            Ao clicar em continuar, você concorda com os nossos{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Termos de uso
                            </Link>{" "}
                            e{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Política de privacidade
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}