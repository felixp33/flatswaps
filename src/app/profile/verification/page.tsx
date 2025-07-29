"use client";
import { useState } from "react";
import Link from "next/link";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { CheckCircle } from "lucide-react";

export default function VerificationPage() {
    const [verified, setVerified] = useState(false);

    if (verified) {
        return (
            <ProfileLayout>
                <div className="p-6 text-center max-w-md mx-auto">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h1 className="text-2xl font-semibold mb-2">Verification Complete</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">This mocked flow marks your account as verified.</p>
                    <Link href="/profile" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Back to Profile</Link>
                </div>
            </ProfileLayout>
        );
    }

    return (
        <ProfileLayout>
            <div className="p-6 text-center max-w-md mx-auto space-y-4">
                <h1 className="text-2xl font-semibold">Verify Your Identity</h1>
                <p className="text-gray-600 dark:text-gray-400">Click the button below to simulate identity verification.</p>
                <button onClick={() => setVerified(true)} className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">Verify Me</button>
            </div>
        </ProfileLayout>
    );
}
