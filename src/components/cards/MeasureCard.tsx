import type { Measure } from "@/api/types";
import { Card, CardHeader, CardTitle } from "../ui/card";

export default function MeasureCard({ measure }: { measure: Measure }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{measure.Id}</CardTitle>
      </CardHeader>
    </Card>
  );
}
