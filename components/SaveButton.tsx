"use client";

import { useAppState } from "@/context/AppStateContext";

type SaveButtonProps = {
  listingId: string;
};

export default function SaveButton({ listingId }: SaveButtonProps) {
  const { isSaved, toggleSaved } = useAppState();
  const saved = isSaved(listingId);

  return (
    <button
      type="button"
      className={saved ? "save-button active" : "save-button"}
      onClick={() => toggleSaved(listingId)}
      aria-pressed={saved}
    >
      {saved ? "Saved" : "Save"}
    </button>
  );
}
