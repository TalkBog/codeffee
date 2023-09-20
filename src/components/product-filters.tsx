import { ProductData, ProductsCategoryData } from "../../tp-kit/types";
import { TextInput, rem } from '@mantine/core';
import { Checkbox, Group } from '@mantine/core';
import { Button } from "../../tp-kit/components/button";
import { MagnifyingGlass } from "@phosphor-icons/react"


export default function ProductFilters({categories}:any, {onChange}:any){

    return <>
    <form onSubmit={onChange}>
        <TextInput
            placeholder="Rechercher une boisson"
        />
        <Checkbox.Group>
            {categories.map((categorie: any)=> <Checkbox value={categorie.slug} label={categorie.name + " (" + categorie.products.length+ ")"}/>)}
        </Checkbox.Group>
        <Button
        onClick={function noRefCheck(){}}
        size="md"
        type="submit"
        variant="primary"
        >
        Filtrer
        </Button>
    </form>
    
    </>

}