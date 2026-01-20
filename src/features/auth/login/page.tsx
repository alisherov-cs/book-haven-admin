import { ToggleTheme } from "@/features/theme";
import { LoginForm } from "./components";

export default function LoginPage() {
    return (
        <main className="bg-base h-screen text-primary flex items-center justify-center">
            <LoginForm />
            <ToggleTheme />
        </main>
    );
}
