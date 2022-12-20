import React from 'react';
import { AuthContext } from '../context/auth';
import { UserAuth } from '../context/AuthContext';

function useAuth() {
    const value =  UserAuth()

    if (!value) {
        throw new Error("AuthContext's value is undefined.");
    }

    return value;
}

export { useAuth };