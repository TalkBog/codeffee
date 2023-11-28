"use client"
import { Heading, Button } from "tp-kit/components";
import { TextInput, PasswordInput } from '@mantine/core';
import { useForm , zodResolver} from '@mantine/form';
import Link from "next/link";
import z from 'zod'

export default function page (){

    const schema = z.object({
        name: z.string({required_error: "Le nom est requis", invalid_type_error: "Nom invalide"}).min(1,{message: "Le nom est requis"}),
        email: z.string({required_error: "L'email est requis"}).email({ message: "Adresse mail invalide" }),
        password: z.string({required_error: "Le mot de passe est requis", invalid_type_error: "Mot de passe invalide"}).min(6,{message: "Le mot de passe doit avoir au minimum 6 charactères"})
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
        >
        Inscription
        </Heading>

        <form className="flex flex-col gap-8" onSubmit={form.onSubmit((values) => console.log(values))}>
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