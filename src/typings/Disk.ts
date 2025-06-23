import type { User } from './User';

/**
 * @see https://yandex.ru/dev/disk/api/reference/response-objects.html#disk
 */
export interface Disk {
    /** Объем файлов, находящихся в Корзине, в байтах. */
    trash_size: number;

    /** Общий объем Диска, доступный пользователю, в байтах. */
    total_space: number;

    /** Объем файлов, уже хранящихся на Диске, в байтах. */
    used_space: number;

    /** Абсолютные адреса системных папок Диска.  */
    system_folders: {
        applications: string;
        downloads: string;

        // Неописанное
        odnoklassniki: string;
        google: string;
        instagram: string;
        vkontakte: string;
        mailru: string;
        facebook: string;
        social: string;
        scans: string;
        screenshots: string;
        photostream: string;
    };

    // Неописанное
    max_file_size: number;
    unlimited_autoupload_enabled: boolean;
    is_paid: boolean;
    user: User;
}
