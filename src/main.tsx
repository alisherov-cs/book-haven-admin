import "@/styles/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import "@ant-design/v5-patch-for-react-19";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Providers } from "@/providers";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Providers>
                <RouterProvider router={router} />
            </Providers>
        </QueryClientProvider>
    </StrictMode>
);
