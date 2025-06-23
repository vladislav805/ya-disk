import type { ResourceBase } from './ResourceBase';
import type { ResourceList } from './ResourceList';

/**
 * @see https://yandex.ru/dev/disk/api/reference/response-objects.html#resource
 */
export interface Resource extends ResourceBase {
    /**
     * Ключ опубликованного ресурса.
     * Включается в ответ только если указанный файл или папка опубликован.
     */
    public_key?: string;

    /**
     * Ресурсы, непосредственно содержащиеся в папке (содержит объект ResourceList).
     * Включается в ответ только при запросе метаинформации о папке.
     */
    _embedded: ResourceList;
}
