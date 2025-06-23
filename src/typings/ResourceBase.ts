import type { ResourceType } from './consts';
import type { ResourceExif } from './ResourceExif';

export interface ResourceBase {
    /** Имя ресурса. */
    name: string;

    /** EXIF */
    exif?: ResourceExif;

    /** ? */
    resource_id: string;

    /** Дата и время создания ресурса, в формате ISO 8601 */
    created: string;

    /** Дата и время изменения ресурса, в формате ISO 8601 */
    modified: string;

    /**
     * Полный путь к ресурсу на Диске.
     *
     * В метаинформации опубликованной папки пути указываются относительно самой папки. Для опубликованных файлов
     * значение ключа всегда «/».
     *
     * Для ресурса, находящегося в Корзине, к атрибуту может быть добавлен уникальный идентификатор
     * (например, trash:/foo_1408546879). С помощью этого идентификатора ресурс можно отличить от других удаленных
     * ресурсов с тем же именем.
     */
    path: string;

    /** ? */
    media_type: string;

    /** ? */
    comment_ids: Partial<Record<'private_resource' | 'public_resource', string>>;

    // custom_properties: Record<string, unknown>;

    /**
     * Ссылка на опубликованный ресурс.
     * Включается в ответ только если указанный файл или папка опубликован.
     */
    public_url?: string;

    /** Тип ресурса: «dir» — папка; «file» — файл. */
    type: ResourceType;

    /** Размер файла. */
    size: number;
}
