import { signIn } from "next-auth/client";

export const Unauthenticated = () => {
    return (
        <div className="unauthenticated">
            <h1>You are not signed in.</h1>
            <p>
                <a href="#" onClick={() => {
                    signIn()
                }
                }>
                    Sign in
                </a>
            </p>
        </div>
    );
};
