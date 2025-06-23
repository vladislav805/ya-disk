/**
 * @see https://yandex.ru/dev/id/doc/dg/oauth/reference/web-client.html#web-client__response-url
 */
export interface OAuthToken {
    /** Тип выданного токена. Всегда принимает значение «bearer». */
    token_type: 'bearer',

    /** OAuth-токен с запрошенными правами или с правами, указанными при регистрации приложения. */
    access_token: string;

    /** Время жизни токена в секундах. */
    expires_in: number;

    /**
     * Права, запрошенные разработчиком или указанные при регистрации приложения. Поле scope является
     * дополнительным и возвращается, если OAuth предоставил токен с меньшим набором прав, чем было запрошено.
     */
    scope: string;

    /** Значение параметра state из исходного запроса, если этот параметр был передан. */
    state?: string;

    refresh_token: string;
}
