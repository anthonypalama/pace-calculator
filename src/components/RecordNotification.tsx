import { toast } from "sonner";
import { handleShare } from "@/utils/shareUtils";

export const showRecordNotification = (distance: string, time: string) => {
  toast.success(
    `🎉 Nouveau record personnel sur ${distance} !`,
    {
      duration: 5000,
      className: "record-notification",
      description: `Félicitations ! ${time}`,
      action: {
        label: "Partager",
        onClick: () => handleShare(distance, time),
      },
      style: {
        backgroundColor: '#F2FCE2',
        fontSize: '1.2rem',
        padding: '1rem',
        animation: 'bounce 0.5s ease-in-out',
      },
    }
  );
};