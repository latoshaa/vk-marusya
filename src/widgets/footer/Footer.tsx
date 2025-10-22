import { FC } from 'react';
import styles from './Footer.module.scss';
import VkIcon from "../../assets/vk.svg";
import YoutubeIcon from "../../assets/youtube.svg";
import OkIcon from "../../assets/ok.svg";
import TelegramIcon from "../../assets/telegram.svg";

export const Footer: FC = () => {
  const socialLinks = [
    {
      name: "VK",
      icon: VkIcon,
      url: "#",
    },
    {
      name: "YouTube",
      icon: YoutubeIcon,
      url: "#",
    },
    {
      name: "OK",
      icon: OkIcon,
      url: "#",
    },
    {
      name: "Telegram",
      icon: TelegramIcon,
      url: "#",
    },
  ];

  return (
    <footer className={styles.footer}>
        <div className={styles.container}>
            <div className={styles.socialLinks}>
                {socialLinks.map((social) => (
                    <a
                    key={social.name}
                    href={social.url}
                    className={styles.socialLinks}
                    target="_blank"
                    >
                        <img
                        src={social.icon}
                        alt={social.name}
                        className={styles.socialIcon}
                        />

                    </a>
                ))}

            </div>

        </div>

    </footer>
  )

};

