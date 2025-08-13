import NextAuth, { type DefaultSession } from "next-auth"
import Keycloak from "next-auth/providers/keycloak"
// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt"


const SAME_SITE_NONE = 'none';


declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            id: string | undefined
            /**
             * By default, TypeScript merges new interface properties and overwrites existing ones.
             * In this case, the default session user properties will be overwritten,
             * with the new ones defined above. To keep the default session user properties,
             * you need to add them back into the newly declared interface.
             */
        } & DefaultSession["user"]
    }
}



declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        id?: string
    }
}

// declare module "next-auth" {
//   interface Session {
//     error?: "RefreshTokenError"
//   }
// }

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Keycloak],
    // The AUTH_TRUST_HOST environment variable serves the same purpose as setting trustHost: true in your Auth.js configuration.
    // This is necessary when running Auth.js behind a proxy.
    // When set to true we will trust the X-Forwarded-Host and X-Forwarded-Proto headers passed to the app
    // by the proxy to auto-detect the host URL (AUTH_URL)
    // trustHost: true,
    cookies: {
        csrfToken: {
            name: 'next-auth.csrf-token',
            options: {
                sameSite: SAME_SITE_NONE,
                secure: true,
                // partitioned: true,
            },
        },
        pkceCodeVerifier: {
            name: 'next-auth.pkce.code_verifier',
            options: {
                sameSite: SAME_SITE_NONE,
                secure: true,
                // partitioned: true,
                path: '/', // https://datatracker.ietf.org/doc/html/rfc6265#section-5.1.4
                maxAge: 60 * 60 * 24 * 30, // 30 days
            },
        },
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: SAME_SITE_NONE,
                secure: true, //process.env.NODE_ENV === "production",
                path: "/",
            },
        },
        callbackUrl: {
            name: `next-auth.callback-url`,
            options: {
                sameSite: SAME_SITE_NONE,
                secure: true, //process.env.NODE_ENV === "production",
                path: "/",
            },
        },
        state: {
            name: 'next-auth.state',
            options: {
                sameSite: SAME_SITE_NONE,
                secure: true,
                // partitioned: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 30, // 30 days
            },
        }
        // add other cookies if needed
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.id = user.id
                token.name = user.name
            }
            console.log("callbacks jwt", token, user)
            return token
        },
        session({ session, token }) {
            console.log("callbacks session", session, token)
            session.user.id = token.id ?? ""
            session.user.name = token.name ?? ""
            return session
        },
    },
})

