/**
 * @see https://yandex.ru/dev/disk/api/reference/response-objects.html#error
 */
export interface DiskError {
    /** Подробное описание ошибки в помощь разработчику. */
    description: string;

    /** Идентификатор ошибки для программной обработки */
    error: string;
}
