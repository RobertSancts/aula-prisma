import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateClientUseCase {

    async execulte({ username, password }: IAuthenticateClient) {
        // receber username e password

        // verificar username cadastrato
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if (!client) {
            throw new Error("Username or password invalid");
        }
        // verificar senha corresponte ao username,
        const passwordMatch = await compare(password, client.password);

        if (!passwordMatch) {
            throw new Error("Username or password invalid");
        }
        // gerar o tokker

        const token = sign({ username }, "dfac6b7fc93a44bec9be2552697a436f", {
            subject: client.id,
            expiresIn: "1d"
        })

        return token

    }
}