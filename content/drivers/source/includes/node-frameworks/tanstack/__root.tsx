import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../styles.css'  
import {Header} from '../components/Header'

//Configure TanStack Query Client with cache and retry options
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
        staleTime: 60 * 1000, // Data stays fresh for one minute
        retry: 1, // Retry failed requests once
        retryDelay: 1000 // Wait one second before retrying
        },
    },
})

export const Route = createRootRoute({
    component: () => (
        <html lang="en">
        <head>
            <HeadContent />
        </head>
        <body>
            <QueryClientProvider client={queryClient}>
            <Header />
            <main>
                <Outlet />
            </main>
            </QueryClientProvider>
            <Scripts />
        </body>
        </html>
    ),
    // Handle 404 errors for non-existent routes
    notFoundComponent: () => {
        return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
        </div>
        )
    }
})