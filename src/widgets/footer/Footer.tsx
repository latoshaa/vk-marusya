import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import VkIcon from "@shared/assets/icons/vk.svg";
import YoutubeIcon from "@shared/assets/icons/youtube.svg";
import OkIcon from "@shared/assets/icons/ok.svg";
import TelegramIcon from "@shared/assets/icons/telegram.svg";

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
            <Link
              key={social.name}
              to={social.url}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={social.icon}
                alt={social.name}
                className={styles.socialIcon}
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

