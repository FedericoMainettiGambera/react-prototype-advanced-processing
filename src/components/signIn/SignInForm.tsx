import { useSignInMutation } from "@/api/mutation/useSignInMutation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export function SignInForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "raffaele.ciavarella@ciavarella.it",
      password: "Leona206_",
    },
  });

  const mutation = useSignInMutation();

  function onSubmit(values: FormData) {
    mutation.mutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          navigate({
            to: "/"
          })
        },
      }
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Ben tornato!</CardTitle>
          <CardDescription>Inserisci le tue credenziali</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="email">Email</Label>
                          <FormControl>
                            <Input id="email" type="email" placeholder="raffaele.ciavarella@ciavarella.it" required {...field} />
                          </FormControl>
                          <FormDescription>Suggerimento: raffaele.ciavarella@ciavarella.it</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                              Hai dimenticato la password?
                            </a>
                          </div>
                          <FormControl>
                            <Input id="password" type="password" required {...field} />
                          </FormControl>
                          <FormDescription>Suggerimento: Leona206_</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={mutation.isPending}>
                    Accedi
                  </Button>
                  {mutation.isError && <div className="text-[0.8rem] text-destructive">{mutation.error.message}</div>}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        Cliccando su accedi, accetti i nostri <a href="#">Termini di Servizio</a> e la <a href="#">Politica sulla Privacy</a>.
      </div>
    </div>
  );
}
