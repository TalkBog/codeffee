"use client";
import {
  Heading,
  Button,
  NoticeMessageData,
  useZodI18n,
  NoticeMessage,
} from "tp-kit/components";
import { TextInput, PasswordInput } from "@mantine/core";
import Link from "next/link";
import z from "zod";
import { FormEvent, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useForm, zodResolver } from "@mantine/form";
import { redirect, useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

type schema = z.infer<typeof schema>;

export default function Page() {
  const router = useRouter();
  const [notices, setNotices] = useState<NoticeMessageData[]>([]);
  const supabase = createClientComponentClient();

  function addError() {
    setNotices((n) => [
      ...n,
      { type: "error", message: "L'email ou le mot de passe est invalide" },
    ]);
  }

  function removeNotice(index: number) {
    setNotices((n) => {
      delete n[index];
      return Object.values(n);
    });
  }

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  useZodI18n(z);
  const form = useForm<schema>({
    validate: zodResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  });
  return (
    <>
      <Heading as="h1" size="md" variant="black" weight="bold">
        Connexion
      </Heading>
      {notices.map((notice, i) => (
        <NoticeMessage key={i} {...notice} onDismiss={() => removeNotice(i)} />
      ))}
      <form
        className="flex flex-col gap-8"
        onSubmit={form.onSubmit(async (values) => {
          console.log("coucou");
          const email = values.email;
          const password = values.password;
          const result = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (result.error) {
            addError();
          } else {
            router.refresh();
          }
        })}
      >
        <TextInput
          variant="filled"
          label="Adresse email"
          withAsterisk
          placeholder="lin.guini@barilla.it..."
          {...form.getInputProps("email")}
        />

        <PasswordInput
          variant="filled"
          label="Mot de passe"
          withAsterisk
          placeholder="Ke$$a..."
          {...form.getInputProps("password")}
        />
        <div className="flex flex-col gap-2">
          <Button
            fullWidth
            onClick={function noRefCheck() {}}
            size="lg"
            type="submit"
            variant="primary"
          >
            Se connecter
          </Button>

          <Link
            className=" p-4 text-center font-medium text-brand"
            href={"/inscription"}
          >
            créer un compte
          </Link>
        </div>
      </form>
    </>
  );
}
