import { prisma } from "../../../database/prismaClient";
import { hash } from "bcrypt";


interface ICreateClient {
    username: string;
    password: string;
}

export class CreateClientUseCase {

    async execute({ username, password }: ICreateClient) {

        // const name = username

        const clientExist = await prisma.clients.findFirst({
            where: {
                username: {

                }
            },
        });

        if (clientExist) {

            throw new Error("Cliente ja cadastrado");

        }

        const password_hash = await hash(password, 5)


        const result = await prisma.clients.create({
            data: {
                username: name,
                password: password_hash
            }
        })


        return result

    }


}
