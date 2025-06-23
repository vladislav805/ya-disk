import type { ResourceBase } from './ResourceBase';
import type { ResourceSize } from './ResourceSize';

export interface ResourceEntry extends ResourceBase {
    /**
     * Ключ опубликованного ресурса.
     * Включается в ответ только если указанный файл или папка опубликован.
     */
    public_key?: string;

    /** MIME-тип файла. */
    mime_type: string;

    /**
     * Ссылка на уменьшенное изображение из файла (превью). Включается в ответ только для файлов поддерживаемых графических форматов.
     * Запросить превью можно только с OAuth-токеном пользователя, имеющего доступ к самому файлу.
     */
    preview?: string; // only if image/video

    /** MD5-хэш файла. */
    md5: string;

    /** sha256-хэш файла. */
    sha256: string;

    file?: string; // url to download

    antivirus_status: 'clean' | 'not-scanned';

    sizes?: ResourceSize[];
}
