import { prisma } from "../../../database/prismaClient";
import { hash } from "bcrypt";


interface ICreateClient {
    username: string;
    password: string;
}

export class CreateClientUseCase {

    async execute({ username, password }: ICreateClient) {

        const name = username
        // por algum  motivo a chamada abaixo carrega o primeiro usuarios cadastrado
        // console.log("02 dentro do metodo", username);

        const clientExist = await prisma.clients.findFirst({
            where: {
                username: {
                    mode: "insensitive",
                    equals: name

                }
            },
        });

        // console.log("03 retorno do banco", clientExist?.username);


        if (clientExist) {

            throw new Error("Cliente ja cadastrado");

        }

        const password_hash = await hash(password, 5)


        const result = await prisma.clients.create({
            data: {
                username,
                password: password_hash
            }
        })


        return result

    }


}
