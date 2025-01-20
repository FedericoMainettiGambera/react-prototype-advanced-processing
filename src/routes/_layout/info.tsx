import { Card, CardContent } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { Book, Building2, FileCheck, Smartphone } from "lucide-react";

export const Route = createFileRoute("/_layout/info")({
  component: InfoPage,
});

const appName = "React Prototype";
const appVersion = "1.0.0";
const appBuild = "1";
const appDate = "2025-01-20";

interface AppInfoItem {
  icon: React.ReactNode;
  title: string;
  texts: string[];
}

const settingsAppInfo: AppInfoItem[] = [
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Applicazione",
    texts: [
      `${appName} versione ${appVersion} (${appBuild})`,
      `IT-MF-000030209 @UE, ${appDate}`,
      `UDI: 1517306271-4974277611746716340AV${appVersion}`,
    ],
  },
  {
    icon: <FileCheck className="w-8 h-8" />,
    title: "Certificati",
    texts: ["Direttiva (UE) 93/42/EEC", "Medical device IIa", "MINISTERO DELLA SALUTE ITALIANO", "BD / RDM : 2163646 - CND : V030299"],
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Azienda",
    texts: [
      "Advanced Processing srl",
      "Startup innovativa",
      "Via Don Arcangelo Tadini 49",
      "25125 Brescia (BS) - Italy",
      "Italia",
      "Telefono: +39 333 788 9552",
      "info@advancedprocessing.it",
      "CEO: Raffaele Ciavarella",
      "Partita IVA: IT04119780981",
    ],
  },
  {
    icon: <Book className="w-8 h-8" />,
    title: "Manuale",
    texts: ["Consulta il manuale per l'uso"],
  },
];

export default function InfoPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">Informazioni sull'applicazione</h1>
        <div className="grid gap-8 md:grid-cols-2">
          {settingsAppInfo.map((item, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 mr-4">{item.icon}</div>
                  <h2 className="text-2xl font-semibold ">{item.title}</h2>
                </div>
                <div className="space-y-2">
                  {item.texts.map((text, i) => (
                    <p key={i} className="">
                      {text}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
