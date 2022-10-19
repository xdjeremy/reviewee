import React from 'react';
import {NextPage} from "next";
import {useEffectOnce} from "usehooks-ts";
import {supabase} from "../utils";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";

const Logout: NextPage = () => {
    const router = useRouter();
    useEffectOnce(() => {
        const logout = async () => {
            const { error } = await supabase.auth.signOut()
            if (error) {
                console.log(error)
                toast.error("Error logging out")
            }
        };
        logout().then(() => router.push("/login"));
    })
    return null;
};

export default Logout;
