import ModalOpenComponentForm from "@/components/ModalOpenComponentForm";

export default function CompLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header className="fixed top-4 right-4 z-40">
                <ModalOpenComponentForm />
            </header>
            <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex items-center justify-center">
                {children}
            </main>
        </>
    );
}
