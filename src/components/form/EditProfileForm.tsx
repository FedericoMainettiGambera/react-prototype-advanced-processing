import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useAuth } from "@/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { DateTime } from "luxon";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  fiscalCode: z.string(),
  birthdate: z.date(),
  genre: z.enum(["M", "F"]),
  address: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export function EditProfileForm() {
  const auth = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: auth.subjectsLog?.name1,
      lastName: auth.subjectsLog?.name2,
      fiscalCode: auth.subjectsLog?.id,
      address: `${auth.subjectsLog?.residencepayload[0].Address}, ${auth.subjectsLog?.residencepayload[0].LocalitaCap}`,
      birthdate: auth.subjectsLog?.birthdate ? DateTime.fromJSDate(new Date(auth.subjectsLog.birthdate)).toJSDate() : new Date(),
      genre: auth.subjectsLog?.gender,
    },
  });

  function onSubmit(values: FormData) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-x-2 gap-y-4 grid-cols-1 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="firstName">Nome</Label>
                <FormControl>
                  <Input id="firstName" placeholder="Inserisci il tuo nome" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="lastName">Cognome</Label>
                <FormControl>
                  <Input id="lastName" placeholder="Inserisci il tuo cognome" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fiscalCode"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="fiscalCode">Codice fiscale</Label>
                <FormControl>
                  <Input id="fiscalCode" placeholder="Inserisci il tuo codice fiscale" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="birthdate">Data di nascita</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? DateTime.fromJSDate(field.value).toLocaleString(DateTime.DATE_FULL) : <span>Scegli una data</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="address">Indirizzo di residenza</Label>
                  <FormControl>
                    <Input id="address" placeholder="Inserisci il tuo indirizzo di residenza" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Label>Genere</Label>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="M" />
                      </FormControl>
                      <Label className="font-normal">Maschio</Label>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="F" />
                      </FormControl>
                      <Label className="font-normal">Femmina</Label>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
