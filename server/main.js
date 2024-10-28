import { contentType as getContentType } from "https://deno.land/std@0.177.0/media_types/mod.ts";
import { extname } from "https://deno.land/std@0.177.0/path/mod.ts";

const PORT = 8000;

const denoListener = Deno.listen({ port: PORT });

handleHTTP();

async function handleHTTP() {
    console.log(`Server listening on port \x1b[33m${PORT}\x1b[0m`);
    console.log(`Open in browser: \x1b[34mhttp://localhost:${PORT}\x1b[0m`);

    for await (const connection of denoListener) {
        handleHTTPConnection(connection);
    }
}

async function handleHTTPConnection(connection) {
	let denoConnection = Deno.serveHttp(connection);

	for await (const event of denoConnection) {
        const request = event.request;
        const url = new URL(request.url);

        let path = "." + decodeURIComponent(url.pathname);

        if (path === "./") {
            path = "./index.html";
        }

        try {
            const file = await Deno.open(path);
            const stream = file.readable;
            const extension = extname(path);
            const contentType = getContentType(extension);
            const headers = new Headers({ "Content-Type": contentType });
            const response = new Response(stream, { headers });
            event.respondWith(response);
        } catch (error) {
            if (error instanceof Deno.errors.NotFound) {
                let response = new Response("Not Found", { status: 404 });
                event.respondWith(response);
            }
        }
	}
}