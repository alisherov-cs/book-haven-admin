import type { TProvider } from "@/types/provider.types";
import { PageHeaderProvider } from "@/store";
import { ThemeProvider } from "@/store/themeStore";
import { AntConfigProvider } from "./antConfigProvider";
import { BreadcrumbProvider } from "@/store/breadcrumbStore";
import { MessageProvider } from "./messageProvider";

export const Providers = ({ children }: TProvider) => {
    return (
        <PageHeaderProvider>
            <ThemeProvider>
                <BreadcrumbProvider>
                    <AntConfigProvider>
                        <MessageProvider>{children}</MessageProvider>
                    </AntConfigProvider>
                </BreadcrumbProvider>
            </ThemeProvider>
        </PageHeaderProvider>
    );
};
