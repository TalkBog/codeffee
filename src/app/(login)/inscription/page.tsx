"use client"
import { Heading, Button } from "tp-kit/components";
import { TextInput, PasswordInput } from '@mantine/core';

export default function page (){
    return<>
        <Heading
        as="h1"
        size="md"
        variant="black"
        weight="bold"
        >
        Inscription
        </Heading>

        <form className="flex flex-col gap-8">
            <TextInput
            variant="filled"
            label="Nom"
            description="Le nom qui sera utilisé dans vos commandes"
            withAsterisk
            placeholder="Maud zarella .. "
            />

            <TextInput
            variant="filled"
            label="Adresse email"
            withAsterisk
            placeholder="lin.guini@barilla.it..."
            />

            <PasswordInput
                variant="filled"
                label="Mot de passe"
                withAsterisk
                placeholder="Ke$$a..."
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

                <Button
                className=" text-brand font-bold"
                fullWidth
                onClick={function noRefCheck(){}}
                size="md"
                variant="ghost"
                >
                Déja un compte ? Se connecter
                </Button>
            </div>
            

        </form>
    </>
}