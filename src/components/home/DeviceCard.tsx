import type { Device } from "@/api/types";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function DeviceCard({ device }: { device: Device }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{device.name}</CardTitle>
        <CardDescription>
          Firmware {device.lastFirmware} - tipo {device.firmwareType}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
