import type { Method } from './consts';

/**
 * @see https://yandex.ru/dev/disk/api/reference/response-objects.html#link
 */
export interface Link {
    /** URL. Может быть шаблонизирован, см. ключ templated. */
    href: string;

    /** HTTP-метод для запроса URL из ключа href. */
    method: Method;

    /**
     * Признак URL, который был шаблонизирован согласно RFC 6570.
     * Если URL шаблонизирован: прежде чем отправлять запрос на этот адрес, следует указать нужные значения
     * параметров вместо значений в фигурных скобках.
     */
    templated: boolean;
};
