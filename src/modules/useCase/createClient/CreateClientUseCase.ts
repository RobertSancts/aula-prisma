import { prisma } from "../../../database/prismaClient";


interface ICreateClient {
    username: string;
    // paswword:
}

export class CreateClientUseCase {

    async execute({ username }: ICreateClient) {
        const name = username

        const clientExist = await prisma.clients.findFirst({
            where: {
                username: {
                    mode: "insensitive",
                    equals: name
                    
                },
            },
        });

        if (clientExist){

            throw new Error("Cliente ja cadastrado");
            
        }


        
        




        return clientExist

    }


}
