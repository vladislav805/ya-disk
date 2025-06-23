import type { Resource } from './Resource';

/**
 * @see https://yandex.ru/dev/disk/api/reference/response-objects.html#lastuploadedresourcelist
 */
export interface LastUploadedResourceList {
    /** Массив последних загруженных файлов. */
    items: Resource[];

    /** Максимальное количество элементов в массиве items, заданное в запросе. */
    limit: number;
}
