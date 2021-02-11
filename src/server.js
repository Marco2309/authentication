import app from "./index";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server run on http://localhost:${PORT}`);
});