import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_COOKIE, validSession } from "@/lib/wedding-access";
import Wedding from "./wedding";

export default async function Home() {
  if (!(await validSession((await cookies()).get(ACCESS_COOKIE)?.value))) redirect("/access");
  return <Wedding />;
}
