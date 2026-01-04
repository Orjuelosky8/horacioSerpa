'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Share2, Star, User } from 'lucide-react';
import { RankingPodium } from './ranking-podium';
import { RankingList } from './ranking-list';
import { useState, useEffect } from 'react';
import { RankingUser } from '@/types/gamification';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data removed in favor of real API

export function RankingModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState<RankingUser[]>([]);
    const [loading, setLoading] = useState(false);

    // Soft Login & Actions State
    const [currentUser, setCurrentUser] = useState<RankingUser | null>(null);
    const [loginInput, setLoginInput] = useState('');
    const [loginError, setLoginError] = useState('');
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    // Fetch real data when modal opens
    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            fetch('/api/ranking')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setUsers(data);
                        // If we have a logged in user, refresh their data from the new list
                        if (currentUser) {
                            const updatedMe = data.find(u => u.fullName === currentUser.fullName);
                            if (updatedMe) setCurrentUser(updatedMe);
                        }
                    }
                })
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [isOpen, currentUser]);

    const handleLogin = async () => {
        if (!loginInput.trim()) return;
        setLoginError('');
        setLoading(true); // Reuse loading or local loading

        try {
            const res = await fetch('/api/gamification/login', {
                method: 'POST',
                body: JSON.stringify({ documentId: loginInput }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();

            if (data.success) {
                // Merge API user data with local ranking data structure
                // API returns { name, points, rank, referralCount, actions }
                const apiUser = data.user;

                setCurrentUser({
                    name: apiUser.name,
                    fullName: apiUser.name,
                    points: apiUser.points,
                    rank: apiUser.rank,
                    isCurrentUser: true,
                    referralCount: apiUser.referralCount,
                    // Store extra data in state if needed, or extends RankingUser
                });
                // We could also trigger a dashboard view here? 

            } else {
                setLoginError('Cédula no encontrada. Verifica que escribiste bien el número.');
            }
        } catch (err) {
            console.error(err);
            setLoginError('Error de conexión.');
        } finally {
            setLoading(false);
        }
    };

    // ... (Action Handler remains same) ...
    // Note: Action handler used FullName, now needs to ensure consistency. 
    // The previous action handler used Name as ID. The new one logic is Name/Phone.
    // Ideally we should update Action Handler to use ID too? 
    // For now, let's keep Action Handler using Name/Phone matching from the Sheet as ID is not passed to action API yet.
    // WAIT: The login uses ID. The action API searches by name/phone. 
    // Ideally pass the ID to action API.
    // Let's stick to Name matching in action API for now to avoid refactoring Action API again unless needed.
    // But Login provides the correct Name from ID. So it works.

    // ...

    const handleAction = async (actionId: string) => {
        if (!currentUser) return;
        setActionLoading(actionId);

        try {
            const res = await fetch('/api/gamification/complete-action', {
                method: 'POST',
                body: JSON.stringify({ userId: currentUser.fullName || currentUser.name, actionId }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();

            if (data.success) {
                // Update local state points
                const newPoints = data.newTotal;

                setUsers(prev => prev.map(u =>
                    u.fullName === currentUser.fullName
                        ? { ...u, points: newPoints }
                        : u
                ).sort((a, b) => b.points - a.points)); // Re-sort locally

                setCurrentUser(prev => prev ? { ...prev, points: newPoints } : null);
            } else if (data.alreadyDone) {
                // Maybe show a small "Ya lo tienes" tooltip/toast
            }
        } catch (e) {
            console.error(e);
        } finally {
            setActionLoading(null);
        }
    };


    const top3 = users.slice(0, 3);
    const rest = users.slice(3);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-yellow-400/10 border-yellow-400/50 hover:bg-yellow-400/20 text-yellow-600 ml-2 relative"
                    title="Ver Ranking"
                >
                    <Trophy className="h-5 w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0 overflow-hidden bg-white/95 backdrop-blur-md">
                <div className="flex flex-col md:flex-row h-full">

                    {/* Left/Top Panel: Ranking */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col h-full overflow-hidden">
                        <DialogHeader className="mb-6">
                            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                                <Trophy className="text-yellow-500 fill-yellow-500" />
                                Ranking Global (Top 25)
                            </DialogTitle>
                            <DialogDescription>
                                Los líderes de la campaña.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto pr-2">
                            {loading && !currentUser ? (
                                <div className="flex items-center justify-center h-64">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : (
                                <>
                                    <RankingPodium topUsers={top3} />
                                    <RankingList users={rest} currentUser={currentUser || undefined} />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right/Bottom Panel: Call to Actions (Gamification Sidebar) */}
                    <div className="w-full md:w-80 bg-slate-50 border-t md:border-t-0 md:border-l p-6 flex flex-col gap-6">

                        {!currentUser ? (
                            /* LOGIN STATE */
                            <div className="flex flex-col gap-4 justify-center h-full">
                                <div className="text-center">
                                    <h3 className="font-bold text-lg mb-2">👋 Hola, identifícate</h3>
                                    <p className="text-sm text-muted-foreground">Ingresa tu Cédula para ver tus puntos y misiones.</p>
                                </div>
                                <div className="space-y-2">
                                    <input
                                        type="number"
                                        placeholder="Número de documento..."
                                        className="w-full p-2 border rounded-md text-sm"
                                        value={loginInput}
                                        onChange={(e) => {
                                            setLoginInput(e.target.value);
                                            setLoginError(''); // Clear error on edit
                                        }}
                                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                                    />

                                    {loginError ? (
                                        <div className="bg-red-50 p-3 rounded-md border border-red-100 text-center animate-in fade-in slide-in-from-top-1">
                                            <p className="text-xs text-red-600 font-medium mb-2">{loginError}</p>
                                            <p className="text-xs text-muted-foreground mb-2">¿Aún no te has inscrito?</p>
                                            <a
                                                href="#unete"
                                                onClick={() => setIsOpen(false)}
                                                className="block w-full py-2 bg-red-600 text-white rounded-md text-xs font-bold hover:bg-red-700 transition-colors"
                                            >
                                                ¡Inscríbete ahora!
                                            </a>
                                        </div>
                                    ) : (
                                        <Button className="w-full" onClick={handleLogin} disabled={loading}>
                                            {loading ? 'Verificando...' : 'Ingresar'}
                                        </Button>
                                    )}

                                </div>
                                {!loginError && (
                                    <div className="text-center text-xs mt-4">
                                        ¿Aún no eres parte?
                                        <a href="#unete" onClick={() => setIsOpen(false)} className="text-primary font-bold ml-1 hover:underline">
                                            Regístrate
                                        </a>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* LOGGED IN ACTIONS STATE */
                            <>
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs uppercase px-1">
                                                {currentUser.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold leading-none line-clamp-1">{currentUser.name}</p>
                                                <p className="text-xs text-muted-foreground">{currentUser.points} XP</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-6 text-xs text-muted-foreground" onClick={() => setCurrentUser(null)}>
                                            Salir
                                        </Button>
                                    </div>

                                    <div className="bg-white p-3 rounded-xl border shadow-sm mb-4 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold uppercase text-muted-foreground">Tu Rango</span>
                                            <span className="text-xs font-bold text-yellow-600">#{currentUser.rank || '-'}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t">
                                            <span className="text-xs font-bold uppercase text-muted-foreground">Referidos</span>
                                            <span className="text-xs font-bold text-blue-600">{(currentUser as any).referralCount || '?'} Persona(s)</span>
                                        </div>
                                    </div>

                                    <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                                        <span className="text-red-500">⚡</span> Misiones Disponibles
                                    </h3>
                                    <div className="space-y-3">
                                        <Button
                                            variant="outline"
                                            className="w-full h-auto p-3 flex items-center justify-between bg-white hover:bg-slate-50"
                                            onClick={() => handleAction('share_whatsapp')}
                                            disabled={actionLoading === 'share_whatsapp'}
                                        >
                                            <div className="flex items-center gap-3 text-left">
                                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 shrink-0">
                                                    <Share2 className="w-4 h-4" />
                                                </div>
                                                <div className="text-sm">
                                                    <p className="font-semibold leading-tight">Compartir</p>
                                                    <p className="text-[10px] text-muted-foreground">En WhatsApp</p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full shrink-0">+50</span>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full h-auto p-3 flex items-center justify-between bg-white hover:bg-slate-50"
                                            onClick={() => handleAction('view_proposal')}
                                            disabled={actionLoading === 'view_proposal'}
                                        >
                                            <div className="flex items-center gap-3 text-left">
                                                <div className="bg-purple-100 p-2 rounded-lg text-purple-600 shrink-0">
                                                    <Star className="w-4 h-4" />
                                                </div>
                                                <div className="text-sm">
                                                    <p className="font-semibold leading-tight">Propuestas</p>
                                                    <p className="text-[10px] text-muted-foreground">Leer plan</p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full shrink-0">+20</span>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full h-auto p-3 flex items-center justify-between bg-white hover:bg-slate-50"
                                            onClick={() => handleAction('complete_profile')}
                                            disabled={actionLoading === 'complete_profile'}
                                        >
                                            <div className="flex items-center gap-3 text-left">
                                                <div className="bg-orange-100 p-2 rounded-lg text-orange-600 shrink-0">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <div className="text-sm">
                                                    <p className="font-semibold leading-tight">Perfil</p>
                                                    <p className="text-[10px] text-muted-foreground">Completar datos</p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full shrink-0">+100</span>
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-auto bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-6 text-white text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <User className="w-24 h-24" />
                                    </div>
                                    <h4 className="font-bold text-lg mb-2 relative z-10">¡Haz crecer el equipo!</h4>
                                    <p className="text-sm text-red-100 mb-4 relative z-10">Invita amigos y gana puntos por cada nivel.</p>
                                    <Button variant="secondary" className="w-full font-bold text-red-700 relative z-10">
                                        Copiar Link
                                    </Button>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
