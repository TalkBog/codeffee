"use client"
import { Button, MenuBar } from "tp-kit/components";
import {Basket} from "@phosphor-icons/react"

export default function Menu(){
    return <>
        <MenuBar trailing={<Button variant="ghost" className="w-50 h-50 flex items-center self-end justify-items-center justify-self-end"><Basket size={25} /></Button>}/>
    </>
}