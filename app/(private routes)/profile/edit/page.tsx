"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../../lib/store/authStore";
import { updateMe } from "../../../../lib/api/clientApi";
import css from "./EditProfile.module.css";

export default function EditProfilePage() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const username = formData.get("username") as string;
    try {
      const updated = await updateMe({ username });
      setUser(updated);
      router.push("/profile");
    } catch {
      console.error("Failed to update profile");
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        {user?.avatar && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}
        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              className={css.input}
              defaultValue={user?.username ?? ""}
            />
          </div>
          <p>Email: {user?.email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
