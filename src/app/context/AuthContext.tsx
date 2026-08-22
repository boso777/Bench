'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    activeForm: number;
    setActiveForm: (form: number) => void;
    closeForm: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [activeForm, setActiveForm] = useState(0);

    const closeForm = () => setActiveForm(0);

    return (
        <AuthContext.Provider value={{ activeForm, setActiveForm, closeForm }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve essere usato dentro un AuthProvider');
    }
    return context;
}