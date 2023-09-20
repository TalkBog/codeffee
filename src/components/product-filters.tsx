import { ProductData, ProductsCategoryData } from "../../tp-kit/types";
import { TextInput, rem,  } from '@mantine/core';
import { Checkbox, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Button } from "../../tp-kit/components/button";
import { MagnifyingGlass } from "@phosphor-icons/react"
import { ProductFiltersResult } from "@/types";

type Props = {
    categories: ProductsCategoryData[],
    onChange : (value:ProductFiltersResult) => void,
}

export default function ProductFilters({categories, onChange}: Props){
    const form = useForm<ProductFiltersResult>({
        initialValues:{
            "categoriesSlug": [],
            "search" : ''
        }
        
    })
    
    return <>
    <form onSubmit={form.onSubmit((values) => {
        console.log(values)
        onChange(values)
    })}>
        <TextInput id="textInput"
        placeholder="Rechercher une boisson"
        {...form.getInputProps('search')}
        />
        <Checkbox.Group {...form.getInputProps('categoriesSlug')} >
            {categories.map((categorie: any, index)=> <Checkbox id={"checkbox"+index} value={categorie.slug} label={categorie.name + " (" + categorie.products.length+ ")"}/>)}
        </Checkbox.Group>
        <Button size="md" type="submit" variant="primary"> Filtrer </Button>
    </form>
    
    </>

}