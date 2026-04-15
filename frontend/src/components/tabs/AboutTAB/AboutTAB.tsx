import { motion } from "framer-motion"

import Container from "@/components/containers/Container/Container"
import Title from "@/components/ui/Title/Title"


export default function AboutTAB() {
    return (
        <Container
            className="flex items-center justify-center min-h-[70vh]
                bg-linear-to-b from-white to-gray-100 px-6 overflow-y-hidden"
        >
            <motion.div
                className="max-w-3xl bg-white shadow-xl rounded-2xl p-8 border
                    border-gray-200"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Title level={1} className="text-3xl font-bold text-gray-800 mb-4">
                    O que é StorEdge?
                </Title>

                <p className="text-gray-600 leading-relaxed text-lg mb-4">
                    O <span className="font-semibold text-gray-800">StorEdge</span> é
                    uma plataforma moderna de gerenciamento de estoque, projetada para
                    oferecer performance, segurança e simplicidade. Ele permite que você
                    organize, acesse e proteja seu estoque com eficiência.
                </p>

                <p className="text-gray-600 leading-relaxed text-lg mb-4">
                    Com uma interface intuitiva e arquitetura escalável, o StorEdge se
                    adapta tanto a projetos pessoais quanto a aplicações de grande porte.
                    Seu foco é reduzir a complexidade enquanto mantém alto desempenho e
                    confiabilidade.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
                        <Title level={3} className="font-semibold text-gray-800">
                            Rápido
                        </Title>
                        <p className="text-sm text-gray-600 mt-1">
                            Acesso otimizado e baixa latência.
                            </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
                        <Title level={3} className="font-semibold text-gray-800">
                            Seguro
                        </Title>
                        <p className="text-sm text-gray-600 mt-1">
                            Proteção de dados com criptografia moderna.
                            </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
                        <Title level={3} className="font-semibold text-gray-800">
                            Escalável
                        </Title>
                        <p className="text-sm text-gray-600 mt-1">
                            Cresce conforme sua necessidade.
                        </p>
                    </div>
                </div>
            </motion.div>
        </Container>
    )
}
