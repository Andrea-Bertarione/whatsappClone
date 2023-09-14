import { promises } from "fs";
import { Application, Request, Response, NextFunction, ErrorRequestHandler } from "express";

import { DefaultRestRoute, DefaultStaticRoute } from "@interfaces/routes.interface.js";

const restRoute: string = "/rest";
const staticRoute: string = "";

export const routerSetup = async (app: Application) => {
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).send("Something broke!");
    });


  try {
    // Load and mount REST routes
    const restDir: string[] = await promises.readdir("./backend/src/routes/rest");

    for (const restDirCategory of restDir) {
      const categoryDir: string[] = await promises.readdir(`./backend/src/routes/rest/${restDirCategory}`);

      for (const routeFile of categoryDir) {
        const routePath = `./routes/rest/${restDirCategory}/${routeFile}`;
        const routeData: DefaultRestRoute = (await import(routePath)).default;

        // Validate route data
        if (validateRouteData(routeData)) {
          app[routeData.method](
            `${restRoute}/${restDirCategory}/${routeData.endpoint}`,
            routeData.middlewares,
            routeData.handler
          );
        } else {
          console.error(`Invalid route data in file: ${routePath}`);
        }
      }
    }

    // Load and mount static routes
    const staticDir: string[] = await promises.readdir("./backend/src/routes/static");

    for (const routeFile of staticDir) {
      const routePath = `./routes/static/${routeFile}`;
      const routeData: DefaultStaticRoute = (await import(routePath)).default;

      // Validate route data
      if (validateRouteData(routeData)) {
        app.get(
          `${staticRoute}/${routeData.endpoint}`,
          routeData.middlewares,
          routeData.handler
        );
      } else {
        console.error(`Invalid route data in file: ${routePath}`);
      }
    }
  } catch (error) {
    console.error("Error while setting up routes:", error);
    // Handle and log errors gracefully
  }
};

export const validateRouteData = (routeData: any): routeData is DefaultRestRoute | DefaultStaticRoute => {
  return (
    routeData != undefined &&
    typeof routeData === "object" &&
    typeof routeData.method === "string" &&
    typeof routeData.endpoint === "string" &&
    Array.isArray(routeData.middlewares) &&
    typeof routeData.handler === "function" &&
    Object.keys({
        method: "GET",
        endpoint: "/api/users",
        middlewares: [],
        handler: () => {},
        ...routeData
    }).length == 4
  );
}
