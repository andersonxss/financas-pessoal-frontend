import { useLoaderData } from "react-router";
import { Page } from "@/components";
import MembrosTable from "@/feature/membros/membrosTable";
import { getMembros, getConvites } from "@/server";

export async function loader() {
    const [members, convites] = await Promise.all([
        getMembros(),
        getConvites()
    ]);
    return { members: members, convites: convites };
}


export default function Memnbros() {
    const { members, convites } = useLoaderData<typeof loader>();
    console.log(convites)
    return (
        <Page title="Membros">
            <MembrosTable members={members} />
        </Page>
    )

}
