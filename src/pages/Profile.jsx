import React from "react";
import ProfileForm from "../components/dashboard/ProfileForm";
import DynamicTitle from "../components/shared/DynamicTitle";

const Profile = () => {
    return (
        <div className="min-h-screen bg-bg-secondary/50 dark:bg-bg-secondary/30 p-4 md:p-8">
            <DynamicTitle title="Profile" />
            <div className="max-w-4xl mx-auto">
                <ProfileForm />
            </div>
        </div>
    );
};

export default Profile;