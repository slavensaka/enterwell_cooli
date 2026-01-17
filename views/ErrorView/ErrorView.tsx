'use client';

import React from 'react';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import styles from './ErrorView.module.scss';
import { useRouter } from 'next/navigation';

type ErrorViewProps = {
    statusCode: number;
    title: string;
    message: string;
    emoji?: string;
};

export default function ErrorView({
    statusCode,
    title,
    message,
    emoji = '🤔'
}: ErrorViewProps) {
    const router = useRouter();

    return (
        <div className={styles.container}>
            {/* Back Button */}
            <button onClick={() => router.back()} className={styles.backButton} aria-label="Nazad">
                <ArrowBackIcon />
            </button>

            <div className={styles.contentWrapper}>
                {/* Left Side: Illustration */}
                <div className={styles.illustrationSide}>
                    <div className={styles.imagePlaceholder}>
                        <span className={styles.statusCode}>{statusCode}</span>
                        <span className={styles.emoji}>{emoji}</span>
                    </div>
                </div>

                {/* Right Side: Text & Actions */}
                <div className={styles.textSide}>
                    <div className={styles.headingWrapper}>
                        <h1 className={styles.title}>{title}</h1>
                    </div>

                    <p className={styles.subtitle}>
                        {message}
                    </p>

                    <div className={styles.buttonGroup}>
                        <Link href="/recepti" className={styles.actionButton}>
                            <SearchIcon />
                            Pretraži
                        </Link>

                        <Link href="/" className={styles.actionButton}>
                            <HomeIcon />
                            Početna
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
