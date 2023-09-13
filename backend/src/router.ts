import { promises } from "fs";

import { Application } from "express";
import { DefaultRestRoute, DefaultStaticRoute } from "@interfaces/routes.interface.js";

const restRoute: String = "/rest";
const staticRoute: String = "";

export const routerSetup = async (app: Application) => {
    const restDir: String[] = await promises.readdir("@routes/rest");

    for (const restDirCategory of restDir) {
        const categoryDir: String[] = await promises.readdir(`@routes/rest/${restDirCategory}`);

        for (const routeFile of categoryDir) {
            const routeData: DefaultRestRoute = (await import(`@routes/rest/${restDirCategory}/${routeFile}`)).default;

            app[routeData.method](`${restRoute}/${restDirCategory}/${routeData.endpoint}`, routeData.middlewares, routeData.handler);
        }
    }

    const staticDir: String[] = await promises.readdir("@backend/src/routes/static");

    for (const routeFile of staticDir) {
        const routeData: DefaultStaticRoute = (await import(`@routes/static/${routeFile}`)).default;

        app.get(`${staticRoute}/${routeData.endpoint}`, routeData.middlewares, routeData.handler);
    }
}