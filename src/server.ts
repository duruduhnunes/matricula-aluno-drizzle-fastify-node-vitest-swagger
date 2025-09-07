import { app } from "../src/app.ts";



app.listen({ port: 8080}).then(() =>{
    console.log("Server listening on http://localhost:8080");
})