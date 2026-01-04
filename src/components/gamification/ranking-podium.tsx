'use client';

import { RankingUser } from '@/types/gamification';
import { cn } from '@/lib/utils';
import { Trophy, Medal } from 'lucide-react';
import Image from 'next/image';

interface RankingPodiumProps {
    topUsers: RankingUser[];
}

export function RankingPodium({ topUsers }: RankingPodiumProps) {
    // Ensure we have 3 places
    const filledUsers = [
        topUsers.find(u => u.rank === 2), // Silver (Left)
        topUsers.find(u => u.rank === 1), // Gold (Center)
        topUsers.find(u => u.rank === 3), // Bronze (Right)
    ];

    return (
        <div className="flex justify-center items-end gap-2 md:gap-4 mb-8 pt-6">
            {filledUsers.map((user, index) => {
                if (!user) return <div key={index} className="w-24" />; // Spacer

                const isFirst = user.rank === 1;
                const isSecond = user.rank === 2;

                // Colors & Gradients
                let bgGradient = 'bg-gradient-to-t from-orange-400 to-orange-300'; // Bronze
                let borderColor = 'border-orange-200';
                let heightClass = 'h-32 md:h-40';
                let icon = <Medal className="w-8 h-8 text-white drop-shadow-md" />;
                let label = '3';

                if (isFirst) {
                    bgGradient = 'bg-gradient-to-t from-yellow-500 to-yellow-300';
                    borderColor = 'border-yellow-200';
                    heightClass = 'h-40 md:h-52';
                    icon = <Trophy className="w-10 h-10 text-white drop-shadow-md" />;
                    label = '1';
                } else if (isSecond) {
                    bgGradient = 'bg-gradient-to-t from-slate-400 to-slate-300';
                    borderColor = 'border-slate-200';
                    heightClass = 'h-36 md:h-44';
                    icon = <Medal className="w-8 h-8 text-white drop-shadow-md" />;
                    label = '2';
                }

                return (
                    <div key={user.rank} className="flex flex-col items-center group">
                        {/* Avatar / Icon */}
                        <div className={cn(
                            "mb-3 rounded-full border-4 p-1 bg-white shadow-xl transition-transform duration-300 group-hover:scale-105",
                            borderColor,
                            isFirst ? "w-24 h-24 md:w-28 md:h-28 -mt-6 relative z-10" : "w-16 h-16 md:w-20 md:h-20"
                        )}>
                            <div className="w-full h-full rounded-full bg-slate-50 flex items-center justify-center overflow-hidden">
                                <span className="text-2xl font-black text-slate-300">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            {isFirst && (
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce">
                                    <Trophy className="w-10 h-10 text-yellow-500 fill-yellow-400 drop-shadow-sm" />
                                </div>
                            )}
                        </div>

                        {/* Name & Points */}
                        <div className="text-center mb-3 px-1 pb-2">
                            <p className="font-bold text-sm md:text-base leading-tight line-clamp-2 w-24 md:w-32 text-foreground h-10 flex items-center justify-center">
                                {user.name}
                            </p>
                            <div className="mt-1 inline-block px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                                {user.points} XP
                            </div>
                        </div>

                        {/* Podium Block */}
                        <div className={cn(
                            "w-24 md:w-32 rounded-t-2xl flex items-start justify-center pt-4 shadow-lg transition-all hover:brightness-110 relative overflow-hidden",
                            heightClass,
                            bgGradient
                        )}>
                            <div className="absolute inset-x-0 top-0 h-px bg-white/50" />
                            <div className="flex flex-col items-center gap-1 opacity-90">
                                {icon}
                                <span className="text-4xl md:text-5xl font-black text-white drop-shadow-md mix-blend-overlay">
                                    {label}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
