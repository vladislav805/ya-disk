import type {
    DiskError,
    Disk,
    FilesResourceList,
    LastUploadedResourceList,
    Link,
    MediaType,
    Method,
    Operation,
    PublicResourcesList,
    Resource,
    OAuthParams,
} from '../typings';
import type { RequestResourceOptions } from './typings';

interface RequestParams {
    query?: Record<string, string | number | boolean | undefined>;
    body?: string | Record<string, string | number | Buffer | ArrayBuffer | Blob>;
}

export class YaDiskClient {
    /**
     * @see https://yandex.ru/dev/id/doc/dg/oauth/reference/web-client.html
     */
    public static getAuthorizeUrl(params: OAuthParams): string {
        const urlParams = new URLSearchParams({ response_type: 'token', ...params });

        return `https://oauth.yandex.ru/authorize?${urlParams.toString()}`;
    }

    public constructor(
        private readonly token = process.env.YA_DISK_TOKEN,
    ) {
        if (!token) {
            throw new Error('Token not specified');
        }
    }

    protected async request<T>(method: Method, path: string, params: RequestParams = {}): Promise<T> {
        const query = params.query
            ? '?' + new URLSearchParams(params.query as Record<string, string>).toString()
            : '';

        const response = await fetch(`https://cloud-api.yandex.net/v1/${path}${query}`, {
            method,
            body: params.body as BodyInit,
            headers: {
                'Authorization': `OAuth ${this.token}`,
            },
        });

        const json = await response.json();

        if (this.isDiskError(json)) {
            const error = new Error(json.description) as unknown as DiskError;
            error.description = json.error;

            throw error;
        }

        return json as T;
    }

    protected isDiskError(response: any): response is DiskError {
        return 'error' in response;
    }


    // Информация о диске
    /**
     * Данные о диске
     * @see https://yandex.ru/dev/disk/api/reference/capacity.html
     */
    public getDisk(): Promise<Disk> {
        return this.request<Disk>('GET', 'disk/');
    }


    // Информация о ресурсе
    /**
     * Данные о ресурсе
     * @param path Путь
     * @param options Дополнительные опции
     * @see https://yandex.ru/dev/disk/api/reference/meta.html
     */
    public getResource(path: string, options: RequestResourceOptions = {}): Promise<Resource> {
        return this.request('GET', 'disk/resources', {
            query: { path, ...options },
        });
    }

    /**
     * Данные о ресурсе в корзине
     * @param path Путь
     * @param options Дополнительные опции
     * @see https://yandex.ru/dev/disk/api/reference/meta.html
     */
     public getTrashResource(path: string, options: RequestResourceOptions = {}): Promise<Resource> {
        return this.request('GET', 'disk/trash/resources', {
            query: { path, ...options },
        });
    }

    /**
     * Плоский список файлов
     * @param options Опции
     * @see https://yandex.ru/dev/disk/api/reference/all-files.html
     */
    public getFiles(
        options: Omit<RequestResourceOptions, 'media_type'> & { media_type?: MediaType } = {},
    ): Promise<FilesResourceList> {
        return this.request('GET', 'disk/resources/files', { query: options });
    }

    /**
     * Получение последних загруженных файлов
     * @param options Дополнительные опции
     * @see https://yandex.ru/dev/disk/api/reference/recent-upload.html
     */
    public getLastUploaded(
        options: Omit<RequestResourceOptions, 'media_type'> & { media_type?: MediaType } = {},
    ): Promise<LastUploadedResourceList> {
        return this.request('GET', 'disk/resources/last-uploaded', { query: options });
    }

    /**
     * Модификация метаинформации ресурса
     * @param path Путь к файлу или директории
     * @param properties Свойства
     * @param fields Дополнительные опции
     * @see https://yandex.ru/dev/disk/api/reference/meta-add.html
     */
    public setResourceProperties(path: string, properties: Record<string, string>, fields?: string): Promise<Resource> {
        return this.request('PATCH', 'disk/resources/', {
            query: { path, fields },
            body: JSON.stringify(properties),
        });
    }


    // Скачивание и загрузка
    /**
     *
     * @param path Путь, по которому будет загружен файл вместе с его названием
     * @param overwrite Флаг перезаписи файла, если уже существует
     * @see https://yandex.ru/dev/disk/api/reference/upload.html#url-request
     */
    public getUploadUrl(
        path: string,
        overwrite: boolean = false,
    ): Promise<Link> {
        return this.request('GET', 'disk/resources/upload', {
            query: { path, overwrite },
        });
    }

    /**
     * Скачивание файла из интернета прямо на диск
     * @param path Путь, по которому будет загружен файл вместе с его названием
     * @param url URL с которого будет скачиваться файл
     * @param disable_redirects Флаг отключения редиректов
     * @see https://yandex.ru/dev/disk/api/reference/upload-ext.html
     */
    public uploadFileByUrl(path: string, url: string, disable_redirects: boolean = false): Promise<Link> {
        return this.request('POST', 'disk/resources/upload', {
            query: { path, url, disable_redirects },
        });
    }

    /**
     * Получение ссылки на скачивание файла
     * @param path Путь к скачиваемому файлу
     * @see https://yandex.ru/dev/disk/api/reference/content.html
     */
    public getDownloadLink(path: string): Promise<Link> {
        return this.request('GET', 'disk/resources/download', { query: { path }});
    }


    // Операции с ресурсами
    /**
     * Копирование ресурса
     * @param source Исходный ресурс
     * @param destination Место назначения
     * @param overwrite Флаг о перезаписи, если ресурс уже существует
     * @see https://yandex.ru/dev/disk/api/reference/copy.html
     */
    public copyResource(source: string, destination: string, overwrite: boolean = false): Promise<Link> {
        return this.request('POST', 'disk/resources/copy', { query: { from: source, path: destination, overwrite }});
    }

    /**
     * Перемещение ресурса
     * @param source Исходный ресурс
     * @param destination Место назначения
     * @param overwrite Флаг о перезаписи, если ресурс уже существует
     * @see https://yandex.ru/dev/disk/api/reference/move.html
     */
    public moveResource(source: string, destination: string, overwrite: boolean = false): Promise<Link> {
        return this.request('POST', 'disk/resources/move', { query: { from: source, path: destination, overwrite }});
    }

    /**
     *
     * @param path Путь к ресурсу, который нужно удалить
     * @param permanently true, если удалить сразу; false, если переместить в корзину
     * @see https://yandex.ru/dev/disk/api/reference/delete.html
     */
    public deleteResource(path: string, permanently: boolean = false): Promise<Link> {
        return this.request('DELETE', 'disk/resources', { query: { path, permanently } });
    }

    /**
     * Создание директории
     * @param path Путь к создаваемой директории
     * @see https://yandex.ru/dev/disk/api/reference/create-folder.html
     */
    public async createDirectory(path: string): Promise<boolean> {
        const result = await this.request<Link>('PUT', 'disk/resources', { query: { path } });

        return result?.href !== undefined;
    }


    // Опубликованные ресурсы
    /**
     * Публикация ресурса
     * @param path Путь к публикемому ресурсу
     * @see https://yandex.ru/dev/disk/api/reference/publish.html#publish-q
     */
    public publishResource(path: string): Promise<Link> {
        return this.request('PUT', 'disk/resources/publish', { query: { path } });
    }

    /**
     * Закрытие доступа к ресурсу
     * @param path Путь к ресурсу
     * @see https://yandex.ru/dev/disk/api/reference/publish.html#unpublish-q
     */
    public unpublishResource(path: string): Promise<Link> {
        return this.request('PUT', 'disk/resources/unpublish', { query: { path } });
    }


    /**
     * Данные о публичном ресурсе (по ссылке)
     * @see https://yandex.ru/dev/disk/api/reference/public.html#meta
     * @param public_key Ключ публичного файла или директории
     * @param path Путь
     * @param options Дополнительные опции
     */
    public getPublicResource(public_key: string, path: string = '', options: RequestResourceOptions = {}): Promise<Resource> {
        return this.request('GET', 'disk/public/resources', {
            query: { public_key, path, ...options },
        });
    }




    // https://yandex.ru/dev/disk/api/reference/public.html#download
    // - disk/public/resources/download
    // https://yandex.ru/dev/disk/api/reference/public.html#save
    // - disk/resources/download

    /**
     * Список опубликованных ресурсво
     * @see https://yandex.ru/dev/disk/api/reference/recent-public.html
     */
    public getPublishedResources(options: Omit<RequestResourceOptions, 'preview_crop'> = {}): Promise<PublicResourcesList> {
        return this.request('GET', 'disk/resources/public', { query: options });
    }


    // Корзина
    /**
     * Очистка корзины или удаление конкретного ресурса из корзины
     * @param path Путь к ресурсу, если нужно удалить конкретный
     * @see https://yandex.ru/dev/disk/api/reference/trash-delete.html
     */
    public deleteResourceFromTrash(path?: string): Promise<Link> {
        return this.request('DELETE', 'disk/trash/resources', { query: { path }});
    }

    /**
     * Восстановление ресурса из корзины
     * @param path Путь к ресурсу, который нужно восстановить
     * @param options Дополнительные опции
     * @see https://yandex.ru/dev/disk/api/reference/trash-restore.html
     */
    public restoreResourceFromTrash(
        path: string,
        options: Partial<{
            name: string;
            overwrite: boolean;
        }> = {},
    ): Promise<Link> {
        return this.request('PUT', 'disk/trash/resources/restore', {
            query: { path, ...options },
        });
    }


    // Операции
    /**
     * Информация о исполнении операции
     * @param operationId Идентификатор операции
     * @see https://yandex.ru/dev/disk/api/reference/operations.html
     */
    public getOperationStatus(operationId: string): Promise<Operation> {
        return this.request('GET', `disk/operations/${operationId}`);
    }
}
