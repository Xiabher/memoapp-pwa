import {initDb} from "@/lib/Database";

export default async function InitDatabase() {
    await initDb();
    return null;
}
