import app from "./network/index";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("Servidor escuchando sobre el puerto", PORT);
});