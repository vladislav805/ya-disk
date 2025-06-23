import type { ResourceType } from './consts';
import type { Resource } from './Resource';

/**
 * @see https://yandex.ru/dev/disk/api/reference/response-objects.html#publicresourcelist
 */
export interface PublicResourcesList {
    /** Массив последних загруженных файлов  */
    items: Resource[];

    /** Тип ресурса: «dir» — папка; «file» — файл. */
    type: ResourceType;

    /** Максимальное количество элементов в массиве items, заданное в запросе. */
    limit: number;

    /** Смещение начала списка от первого ресурса в папке. */
    offset: number;
};
