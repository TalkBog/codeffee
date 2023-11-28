"use client"
import { Heading, Button, NoticeMessageData, NoticeMessage } from "tp-kit/components";
import { TextInput, PasswordInput } from '@mantine/core';
import { useForm , zodResolver} from '@mantine/form';
import Link from "next/link";
import z from 'zod'
import { useState } from "react";

export default function page (){

    const [notices, setNotices] = useState<NoticeMessageData[]>([]);

    function addError() {
    setNotices(n => [...n, { type: "error", message: "Cette adresse n'est pas disponible" }]);
    }

    function addSuccess() {
    setNotices(n => [...n, { type: "success", message: "Votre inscription a bien été prise en compte. Valider votre adresse email pour vous connecter." }]);
    }

    function removeNotice(index:number) {
    setNotices(n => {
        delete(n[index]);
        return Object.values(n);
    });
    }

    const schema = z.object({
        name: z.string().nonempty(),
        email: z.string().email().nonempty(),
        password: z.string().min(6).nonempty()
      });

      const form = useForm({
        validate: zodResolver(schema),
      })

    return<>
        <Heading
        as="h1"
        size="md"
        variant="black"
        weight="bold"
        className="mb-4"
        >
        Inscription
        </Heading>
        {notices.map((notice, i) => <NoticeMessage key={i} {...notice} onDismiss={() => removeNotice(i)}/>)}

        <form className="flex flex-col gap-8" onSubmit={form.onSubmit((values) =>{ 
            console.log(values)
            addSuccess()
        })}>
             
            <TextInput
            variant="filled"
            label="Nom"
            description="Le nom qui sera utilisé dans vos commandes"
            withAsterisk
            placeholder="Maud zarella .. "
            {...form.getInputProps('name')}
            />

            <TextInput
            variant="filled"
            label="Adresse email"
            withAsterisk
            placeholder="lin.guini@barilla.it..."
            {...form.getInputProps('email')}
            />

            <PasswordInput
                variant="filled"
                label="Mot de passe"
                withAsterisk
                placeholder="Ke$$a..."
                {...form.getInputProps('password')}
            />
            <div className="flex flex-col gap-2">
                <Button
                fullWidth
                onClick={function noRefCheck(){}}
                size="lg"
                type="submit"
                variant="primary"
                >
                S'inscrire
                </Button>

                <Link
                className=" text-brand font-medium text-center p-4"
                href={"/connexion"}
                >
                Déja un compte ? Se connecter
                </Link>
            </div>
            

        </form>
    </>
}