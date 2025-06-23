import type { Resource } from './Resource';

/**
 * @see https://yandex.ru/dev/disk/api/reference/response-objects.html#filesresourcelist
 */
export interface FilesResourceList {
    /** Массив последних загруженных файлов */
    items: Resource[];

    /** Максимальное количество элементов в массиве items, заданное в запросе. */
    limit: number;

    /** Смещение начала списка от первого ресурса в папке. */
    offset: number;
}
