import { Link, PrismaClient } from "@prisma/client";

class DataBase {
    private prisma = new PrismaClient();

    async getAll(): Promise<Link[]> {
        try {
            let res = await this.prisma.link.findMany();
            return res;
        } catch (e: any) {
            console.log("Error in Database: ", e)
            throw e;
        }
    }

    async get(id: string):Promise<Link|null> {
        try {
        let res = await this.prisma.link.findUnique({
            where: { id },
          });
          return res;
        } catch(e:any) {
            console.log("Error in Database: ", e);
            throw e;
        }
    }

    async create(obj: { id: string, url: string }): Promise<Link> {
        try {
            let res = await this.prisma.link.create({
                data: obj,
            });
            return res;
        } catch (e:any) {
            console.log("Error in Database: ", e);
            throw e;
        }
    }

    async updateClicks(id: string): Promise<Link> {
        try {
            let res = await this.prisma.link.update({
                where: { id },
                data: { clicks: { increment: 1 } },
            });
            return res;
        } catch (e:any) {
            console.log("Error in Database: ", e);
            throw e;
        }
    }
    
}

export default DataBase;