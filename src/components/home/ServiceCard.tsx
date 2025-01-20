import type { Service } from "@/api/types";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row items-center gap-2">
          <div>{service.Name1}</div>
          <div
            className="size-2 rounded-full"
            style={{
              backgroundColor: `#${service.Config.Color}`,
            }}
          />
        </CardTitle>
        <CardDescription>
          {service.Algorithm.date} v.{service.Algorithm.version}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
