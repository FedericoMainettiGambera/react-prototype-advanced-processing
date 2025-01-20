import { usePrivacyQuery } from "@/api/query/usePrivacyQuery";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function PrivacyData() {
  const privacyQuery = usePrivacyQuery();

  if (!privacyQuery.isSuccess) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="px-4 sm:px-0 flex flex-col gap-1">
          <h3 className="font-semibold text-xl">Privacy</h3>
          <p className="max-w-2xl text-sm text-muted-foreground">Visualizzaza le autorizzazioni privacy.</p>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {Object.keys(privacyQuery.data).map(key => (
          <div key={key}>
            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <Checkbox checked={privacyQuery.data[key].value} />
              <div className="space-y-1 leading-none">
                <Label>{privacyQuery.data[key].key}</Label>
                <p className="text-[0.8rem] text-muted-foreground">{privacyQuery.data[key].label}</p>
                <div className="flex flex-row flex-wrap gap-2">
                  {privacyQuery.data[key].links?.map(link => (
                    <Button key={link.url} variant="link" size="sm" className="p-0 text-blue-600" asChild>
                      <a target="_blank" href={link.url}>
                        {link.label}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
