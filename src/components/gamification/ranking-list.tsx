'use client';

import { RankingUser } from '@/types/gamification';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RankingListProps {
    users: RankingUser[];
    currentUser?: RankingUser;
}

export function RankingList({ users, currentUser }: RankingListProps) {
    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex justify-between items-center text-xs font-medium text-muted-foreground mb-2 px-4">
                <span>Posición</span>
                <span>Usuario</span>
                <span>Puntos</span>
            </div>

            <ScrollArea className="h-[250px] md:h-[300px] w-full rounded-md border p-4 bg-background/50 backdrop-blur-sm">
                <div className="space-y-4">
                    {users.map((user) => (
                        <div
                            key={user.rank}
                            className={cn(
                                "flex items-center justify-between p-3 rounded-lg transition-colors",
                                user.isCurrentUser
                                    ? "bg-primary/10 border border-primary/20 shadow-sm"
                                    : "bg-card hover:bg-accent/50"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <span className={cn(
                                    "font-bold text-lg w-6 text-center",
                                    user.rank <= 3 ? "text-primary" : "text-muted-foreground"
                                )}>
                                    {user.rank}
                                </span>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={cn(
                                            "text-sm font-medium leading-none",
                                            user.isCurrentUser && "text-primary font-bold"
                                        )}>
                                            {user.name} {user.isCurrentUser && "(Tú)"}
                                        </span>
                                        <span className="text-xs text-muted-foreground">{/* Location or extra info could go here */}</span>
                                    </div>
                                </div>
                            </div>

                            <span className="font-bold text-sm">{user.points} XP</span>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            {/* Sticky Current User (if they are far down the list? - For now simple list) */}
        </div>
    );
}
